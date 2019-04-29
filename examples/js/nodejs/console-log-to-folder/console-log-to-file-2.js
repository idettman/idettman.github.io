const fs = require('fs');
const myLogFileStream = fs.createWriteStream('./debug2.log');

var fn = process.stdout.write;

function write() {
  fn.apply(process.stdout, arguments);
  myLogFileStream.write.apply(myLogFileStream, arguments);
}

process.stdout.write = write;

console.log('BARFOOOs')