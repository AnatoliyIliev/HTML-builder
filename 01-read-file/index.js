const fs = require('fs');
const path = require('path');

const text = path.join(__dirname, 'text.txt');

const stream = new fs.ReadStream(text, {encoding: 'utf-8'});

stream.on('readable', () => {
  const data = stream.read();
  console.log(data);
});

stream.on('end', () => {
  console.log('end');
});

stream.on('error', (error) => {
  if(error.code === 'ENOENT') {
    console.log('File no found');
  } else {
    console.log(error);
  }
});
