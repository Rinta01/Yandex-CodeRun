function createCountdown(num) {
    let cur = Number.isInteger(num) && num > 0 ? num : 0;
    return () => {
      if(cur <= 0){
        console.log(0)
        return 0;
      }
  
      const as = cur--
        console.log(as)
        return as;
    }
  }

  const c = createCountdown(-1);
  c();
  c();
  c();
  c();
  c();
  c();
  c();