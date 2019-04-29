const fs = require('fs');
const logFileStream = fs.createWriteStream('./debug3.log');

function getLogPrefix(label) {
  const timestampDate = new Date();
  return '[' + timestampDate.getHours() + ':' + timestampDate.getMinutes() + ':' + timestampDate.getSeconds() + '] ' + label;
}
function convertArgsToArray(args, label = '') {
  const argsArr = Array.prototype.slice.call(args);
  argsArr[0] = getLogPrefix(label) + argsArr[0];
  return argsArr; 
}

const fnOut = process.stdout.write;
function writeStdout() {
  const args = convertArgsToArray(arguments);
  fnOut.apply(process.stdout, arguments);
  logFileStream.write.apply(logFileStream, args);
}
process.stdout.write = writeStdout;

const fnErr = process.stderr.write;
function writeStderr() {
  const args = convertArgsToArray(arguments, 'ERROR: ');
  fnErr.apply(process.stderr, arguments);
  logFileStream.write.apply(logFileStream, args);
}
process.stderr.write = writeStderr;

console.log('BARFOOOs', 'one', 'two')
console.log('BARFOOOs', 'one', 'two')
console.log('BARFOOOs', 'one', 'two')
console.log('BARFOOOs', 'one', 'two')
console.log('BARFOOOs', 'one', 'two')
console.error('NOPE0', 'HUG:one')
setTimeout(function() {
  console.error('DKDKDKDKDKDK', 'NOOOOOO');
}, 3000)