const axios = require('axios');
const options = require('./axiosOptions.json');

(async function () {
  try {
    const { data } = await axios(options);
    const timeline = data.trim()
      .split('\n')
      .map(entry => {
        const dayTime = entry.slice(entry.indexOf('[') + 1, entry.indexOf(']')).split(' ');
        return {
          time: new Date(`${dayTime[0]}T${dayTime[1]}:00.000Z`),
          action: entry.slice(entry.indexOf(']') + 2)
        };
      })
      .sort((a, b) => a.time.getTime() - b.time.getTime());
    
    const guards = {};
    let guard = null;
    let asleep = null;
    
    for (let i = 0; i < timeline.length; i++) {
      const entry = timeline[i];
      
      switch(entry.action) {
        case 'falls asleep':
          asleep = entry.time.getTime();
          break;
        case 'wakes up':
          const timeAsleep = (entry.time.getTime() - asleep) / 60000;
          guards[guard] += timeAsleep;
          break;
        default:
          guard = entry.action.split(' ')[1];
          guards[guard] = 0;
      }
      
      if (entry.action.includes('begins shift')) {
        guard = entry.action.split(' ')[1];
        guards[guard] = 0;
      }
    }
    
    let mostSleep = 0;
    let sleepiestGuard = null;
    
    for (const [guard, timeSleeping] of Object.entries(guards)) {
      if (timeSleeping > mostSleep) {
        mostSleep = timeSleeping;
        sleepiestGuard = guard;
      }
    }
    
    
      
  } catch (err) {
    console.error(err);
  }
})();