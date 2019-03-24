const fs = require('fs');
const console = require('console')
const myLogFileStream = fs.createWriteStream('./debug1.log');

const myConsole = new console.Console(myLogFileStream, myLogFileStream);
myConsole.log('FOOOO')