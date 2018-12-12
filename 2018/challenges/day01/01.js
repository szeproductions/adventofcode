module.exports = function(part, input) {
  const lines = input.split('\n');
  //console.log(input);
  if(part === 1) {
    console.log(searchFrequency(lines).reduce((a, b) => a+b, 0));
  }
  else {
    console.log(findFirstDuplicate(lines));
  }
}

const searchFrequency = (inputArr) => {
  const frequencies = inputArr.map((freq) => { 
    return parseInt(freq);
  });

  return frequencies;
}

const findFirstDuplicate2 = (lines) => {
  const frequencies = searchFrequency(lines);
  const offset = frequencies.reduce((a, b) => a+b, 0);

  console.log(frequencies.length, offset * frequencies.length);
}

const findFirstDuplicate = (lines) => {
  const frequencies = searchFrequency(lines);
  const calcFreqArr = [0];
  let duplicate = null;

  let index = 0;
  // console.time('Task2');
  while(duplicate === null) {
    if(index >= frequencies.length) {
      index = 0;
    }

    const newFreq = calcFreqArr[calcFreqArr.length - 1] + frequencies[index++];
    if(calcFreqArr.includes(newFreq)) {
      duplicate = newFreq;
    }


    calcFreqArr.push(newFreq);
  }
  // console.log(calcFreqArr.length);
  // console.timeEnd('Task2');
  return duplicate;
}
