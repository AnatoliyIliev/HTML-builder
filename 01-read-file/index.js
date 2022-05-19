const fs = require('fs');
const path = require('path');

const text = path.join(__dirname, 'text.txt');

const stream = fs.createReadStream(text, 'utf-8');

stream.on('data', data => {
  console.log(data);
});
