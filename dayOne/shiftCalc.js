const axios = require('axios');
const options = require('./axiosOptions.json');

(async function () {
  const { data } = await axios(options);

  function shiftCalculate(shifts) {
    const shiftsArr = shifts.trim().split('\n');
    return shiftsArr.reduce((accum, shift) => {
      const op = shift[0];
      const num = Number(shift.slice(1));
      return op === '+' 
        ? accum + num
        : accum - num;
    }, 0);
  }

  function repeatFrequecy(shifts) {
    const shiftsArr = shifts.trim().split('\n');
    const seenFrequencies = [];
    const opsArr = shiftsArr.map(el => el[0]);
    const numsArr = shiftsArr.map(el => Number(el.slice(1)));
    
    let i = 0;
    let frequency = 0;
    
    while (!seenFrequencies[frequency]) {
      seenFrequencies[frequency] = true;
      frequency = opsArr[i % opsArr.length] === '+'
        ? frequency + numsArr[i % numsArr.length]
        : frequency - numsArr[i % numsArr.length];
      i++;
    }
    
    return frequency;
  }

  console.log('Puzzle one:', shiftCalculate(data));
  console.log('Puzzle two:', repeatFrequecy(data));  
})();
