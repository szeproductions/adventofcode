function getArgs () {
  const args = {};
  process.argv.forEach((val) => {
    val = val.split('=');
    if(val[1])
      args[val[0]] = val[1];
  })

  if(!args.year) {
    console.log('Please specify a year (node index.js year=<year>');
    process.exit(-1);
  }

  if(!args.day) {
    console.log('Please specify a day (node index.js day=<day>)');
    process.exit(-1);
  }

  if(!args.input) {
    args.input = `./${args.year}/challenges/day${args.day}/input.txt`;
  } else {
    args.input = `./${args.year}/challenges/day${args.day}/${args.input}`;
  }

  if(!args.part) {
    args.part = [1, 2];
  } else {
    args.part = [parseInt(args.part)];
  }

  return args;
}

const fs = require('fs');
const p = getArgs();

const input = fs.readFileSync(getArgs().input).toString();
const includeFile = `./${p.year}/challenges/day${p.day}/${p.day}.js`
const task = require(includeFile);

getArgs().part.forEach(part => {
  task(part, input);
})