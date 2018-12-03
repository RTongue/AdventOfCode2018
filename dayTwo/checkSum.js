const axios = require('axios');
const options = require('./axiosOptions.json');

const countChars = id => {
  const charCount = {};
  for (let j = 0; j < id.length; j++) {
    const char = id[j];
    if (!charCount[char]) charCount[char] = 0;
    charCount[char]++;
  }
  return charCount;
}

(async function checkSum() {
  const { data } = await axios(options);
  const ids = data.trim().split('\n');
  let appearsTwice = 0;
  let appearsThreeTimes = 0;
  
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    const charCount = countChars(id);
    const repeatedInId = new Set();
    for (const count of Object.values(charCount)) {
      if (count === 2) repeatedInId.add(2);
      if (count === 3) repeatedInId.add(3);
    }
    
    if (repeatedInId.has(2)) appearsTwice++;
    if (repeatedInId.has(3)) appearsThreeTimes++;
  }
  
  console.log('Check Sum of Ids:', appearsTwice * appearsThreeTimes);
})();