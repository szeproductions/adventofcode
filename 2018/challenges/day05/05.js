module.exports = function(part, input) {
  // input = 'dabAcCaCBAcCcaDA';
  if(part == 1) {
    const cleaned = removeAdjacentUnites(input);
    console.log(cleaned.length);
  }
  else {
    let shortest = null;
    for(let c = 10; c < 36; c++) {
      let rm = [c.toString(36).toLowerCase(), c.toString(36).toUpperCase()];

      let cleaned = removeAdjacentUnites(input, rm)
      if(shortest === null || cleaned.length < shortest) {
        shortest = cleaned.length;
      }
    }

    console.log(shortest);
  }
}

const removeAdjacentUnites = (input, remove = []) => {
  const patterns = [...remove];
  for(let i = 10; i < 36; i++) {
    let c = i.toString(36);
    patterns.push(c.toLowerCase() + c.toUpperCase());
    patterns.push(c.toUpperCase() + c.toLowerCase());
  }

  let cleaned = input;
  patterns.forEach(p => {
    cleaned = cleaned.split(p).join('');
  });

  if(cleaned === input) {
    return cleaned;
  }
  else {
    return removeAdjacentUnites(cleaned);
  }
}