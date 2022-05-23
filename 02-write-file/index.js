const fs = require('fs');
const path = require('path');
const { stdin, stdout } = require('process');

const text = path.join(__dirname, 'textFile.txt');
const stream = fs.createWriteStream(text, 'utf-8');

stdout.write(
  'Hello! Write what you want and press "Strl - С" or "exit" to exit. Thank you.\n',
);

stdin.on('data', data => {
  if (data.toString().trim() === 'exit') {
    process.exit();
  } else {
    stream.write(data.toString());
  }
});

process.on('SIGINT', () => process.exit());
process.on('exit', () => {
  console.log('\nGood luck');
});
