const _ = require('lodash');

module.exports = function(part, input) {
  const lines = input.split('\n');
  const records = sortRecords(getRecords(lines));

  if(part == 1) {
    const guards = getGuards(records);
    let longestSleepGuard = null;
    Object.keys(guards).forEach(gId => {
      const guard = guards[gId];
      if(!longestSleepGuard || longestSleepGuard.sleepTime < guard.sleepTime) {
        longestSleepGuard = guard;
      }

    });
    
    const longestSleepMinute = _.maxBy(_.keys(longestSleepGuard.sleep),
                                        o => longestSleepGuard.sleep[o]);
    
    console.log(longestSleepGuard.id * longestSleepMinute);
  }
  else {
    const guards = getGuards(records);
    const m = _(guards).map((g) => ({
      id: g.id,
      max: _(g.sleep).entries().maxBy((pair) => pair[1]) // [min, count]
    })).maxBy((x) => (x.max ? x.max[1] : -Infinity));
    console.log(m);
    console.log(m.id * m.max[0]);
  }
  
}

const getGuards = (records) => {
  let gId = null;
  const guards = {};

  records.forEach((rec, index) => {  
    if(rec.message.includes('begins shift')) {
      gId = rec.guardId;
      if(!guards[gId]) {
        guards[gId] = {id: gId, sleep: {}, sleepTime: 0}
      }
    }

    else if(rec.message.includes('asleep')) {

    }

    else {
      for(let i = records[index - 1].minute; i < rec.minute; i++) {
        guards[gId].sleep[i] = (guards[gId].sleep[i] || 0) + 1
        guards[gId].sleepTime++
      }
    }
  });

  return guards;
}

const getRecords = (lines) => {
  const records = [];
  const reg = /\[(1518-(\d\d)-(\d\d) (\d\d):(\d\d))\] ([\sa-zA-Z]+([#0-9]*\s*)[\sa-zA-Z]+)/; 

  lines.forEach(line => {
    line.replace(reg, (match, timestamp, month, day, hour, minute, message, guardId) => {
      records.push({
        match: match,
        timestamp: timestamp,
        month: +month,
        day: +day,
        hour: +hour,
        minute: +minute,
        message: message,
        guardId: +guardId.replace('#', ''),
      });

      return match;
    });
  });

  return records;
}

const sortRecords = (records) => {
  return records.sort((a, b) => {
    const valA = new Date(a.timestamp).getTime() * -1;
    const valB = new Date(b.timestamp).getTime() * -1;

    return valB - valA;
  });
}