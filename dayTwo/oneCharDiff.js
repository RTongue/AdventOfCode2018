const axios = require('axios');
const options = require('./axiosOptions.json');

/*

Example:

abcde
fghij
klmno
pqrst
fguij
axcye
wvxyz

fgij

*/

const isOneDifferent = (strA, strB) => {
  let numDifferent = 0;
  for (let i = 0; i < strA.length; i++) {
    if (strA[i] !== strB[i]) numDifferent++;
    if (numDifferent > 1 && i > 1) return false;
  }
  return numDifferent === 1;
}

const getSameChars = (strA, strB) => {
  let sameChars = '';
  for (let i = 0; i < strA.length; i++) {
    if (strA[i] === strB[i]) {
      sameChars += strA[i];
    }
  }
  return sameChars;
}

(async function oneCharDiff() {
  const { data } = await axios(options);
  const ids = data.trim().split('\n');
  const idLength = ids[0].length;
  let commonLetters = null;
  
  for (let i = 0; i < idLength; i++) {
    ids.sort((a, b) => {
      const aSubstr = a.slice(0, i) + a.slice(i + 1);
      const bSubstr = b.slice(0, i) + b.slice(i + 1);
      if (a < b) return -1;
      if (b < a) return 1;
      return 0;
    });
    
    for (let j = 0; j < ids.length - 1; j++) {
      if (isOneDifferent(ids[j], ids[j + 1])) {
        commonLetters = getSameChars(ids[j], ids[j + 1]);
        break;
      }
    }
    
    if (commonLetters) break;
  }
  
  console.log('Common letters between two ids:', commonLetters);
  
})();
