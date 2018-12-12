const fs = require('fs');

const countCharRepeats = (input) => {
  const chars = input.split('');
  const charCount = {};

  for (char of chars) {
    if (!(char in charCount)) {
      charCount[char] = 1;
    }
    else {
      charCount[char] += 1;
    }
  }

  return charCount;
}

const checksumFromBoxIds = () => {
  const input = fs.readFileSync('./02input.txt').toString();
  const lines = input.split('\n');
  const mult = [0, 0];

  lines.forEach(line => {
    const charCount = countCharRepeats(line);
    let multTwo = false;
    let multThree = false;

    for (char in charCount) {
      if (charCount[char] === 2) {
        multTwo = true;
      }

      if (charCount[char] === 3) {
        multThree = true
      }
    }

    if (multTwo === true) {
      mult[0] += 1;
    }

    if (multThree === true) {
      mult[1] += 1;
    }

  });

  return mult[0] * mult[1];
}

const findFabricBoxes = () => {
  const input = fs.readFileSync('./02input.txt').toString();
  const lines = input.split('\n');

  lines.sort();
  lines.some((l, i) => {
    if (i === 0) return false;

    let n = 0;
    const same = [];
    // suppose them are the same length
    l.split('').forEach((c, j) => {
      if (c !== lines[i - 1][j]) n++;
      else same.push(c);
    });

    if (n === 1) {
      result = same.join('');
      console.log(result);
      return true;
    }
  });
}
console.log('Task 1 Solution: ', checksumFromBoxIds());
findFabricBoxes();
// console.log('Task 2', findFabricBoxes())


