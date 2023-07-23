module.exports = hasSum;

/** @returns Boolean */  
function hasSum(nums, k) {
  const seen = {};

  for (let i = 0; i < nums.length; i++) {
    // Смотрим, какое второе число нам нужно, чтобы набрать необходимую сумму
    const complement = k - nums[i];
    // Проверяем, есть ли оно в числе тех, что мы уже проверили
    // Если есть, то значит, что такая сумма существует
    if (seen[complement]) {
      return true;
    }
    // Если нет, то записываем пройденное значение в ключ хэшмапа и идем дальше
    seen[nums[i]] = true;
  }

  // Если мы прошлись по всему массиву и не нашли 2 числа с нужной суммой, то возвращаем false
  return false;
}