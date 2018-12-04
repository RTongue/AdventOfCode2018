const axios = require('axios');
const options = require('./axiosOptions.json');

(async function () {
  try {
    const { data } = await axios(options);
    const claims = data.trim()
      .split('\n')
      .map(claim => {
        const claimElements = claim.split(' ');
        const coordinates = claimElements[2].split(',');
        const area = claimElements[3].split('x');
        return {
          id: claimElements[0],
          x: Number(coordinates[0]),
          y: Number(coordinates[1].slice(0, coordinates[1].length - 1)),
          width: Number(area[0]),
          height: Number(area[1])
        };
      });
    
    const seenInches = new Map();
    let numOverlappedInches = 0;
    
    claims.forEach(({ x, y, width, height }) => {
      for (let i = x; i < x + width; i++) {
        for (let j = y; j < y + height; j++) {
          if (seenInches.has(i)) {
            const seenYs = seenInches.get(i);
            if (seenYs[j] !== undefined) {
              if (seenYs[j] === 1) numOverlappedInches++;
              seenYs[j]++;
            } else {
              seenYs[j] = 1;
            }
          } else {
            const seenYs = [];
            seenYs[j] = 1;
            seenInches.set(i, seenYs);
          }
        }
      }
    });
    
    console.log('Number of overlapped inches:', numOverlappedInches);
    
    // Find the unique claim
    for (let idx = 0; idx < claims.length; idx++) {
      const { id, x, y, width, height } = claims[idx];
      let unique = true;
      for (let i = x; i < x + width; i++) {
        for (let j = y; j < y + height; j++) {
          const ys = seenInches.get(i);
          if (ys[j] > 1) {
            unique = false;
            break;
          }
        }
        if (!unique) break;
      }
      if (unique) {
        console.log('Unique ID:', id);
      }
    }
    
  } catch (err) {
    console.error(err);
  }
})();