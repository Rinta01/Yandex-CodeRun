// Для чтения входных данных в Node.js необходимо использовать
// модуль readline, который работает с потоком ввода-вывода
// (stdin/stdout) и позволяет читать строки.
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const operateNumber = (targetNumber) => {
    const intermediateResults = [1];
    const minOperations = new Array(targetNumber + 1).fill(Infinity);
    minOperations[1] = 0;

    let currentNumber = 1;
    while (currentNumber <= targetNumber) {
        const nextNumber2 = currentNumber * 2;
        const nextNumber3 = currentNumber * 3;
        const nextNumber1 = currentNumber + 1;

        if (nextNumber2 <= targetNumber) {
            minOperations[nextNumber2] = Math.min(minOperations[nextNumber2], minOperations[currentNumber] + 1);
        }
        if (nextNumber3 <= targetNumber) {
            minOperations[nextNumber3] = Math.min(minOperations[nextNumber3], minOperations[currentNumber] + 1);
        }
        if (nextNumber1 <= targetNumber) {
            minOperations[nextNumber1] = Math.min(minOperations[nextNumber1], minOperations[currentNumber] + 1);
        }

        currentNumber++;
    }

    return { iterations: minOperations[targetNumber], intermediateResults };
};

// Данные во входном потоке могут состоять из нескольких строк.
// Чтобы прочитать их, можно использовать метод rl.on(),
// который вызывается каждый раз при появлении новой строки
// в потоке ввода.
// Чтобы вывести результат в поток вывода (stdout),
// можно использовать метод console.log().
// Пример:
// console.log('Результат:', result);

// Пример решения задачи "Вычислите сумму A+B":
rl.on('line', (line) => {
    try {
        const { iterations, intermediateResults } = operateNumber(+line);
        console.log(iterations);
        console.log(intermediateResults.join(' '));
    } catch (e) {
        console.error(e);
    }
    rl.close();
});
