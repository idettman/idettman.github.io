var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
var log_stdout = process.stdout;

console.error = function consoleErrorOverride() {
  var logItems = [];
  for (var i = 0; i < arguments.length; i++) {
    logItems.push(arguments[i]);
  }
  var timestampDate = new Date();
  var formattedTimestamp = '[' + timestampDate.getHours() + ':' + timestampDate.getMinutes() + ':' + timestampDate.getSeconds() + '] ERROR: ';
  var logStr = formattedTimestamp + logItems.join(', ');
  log_file.write(util.format(logStr) + '\n');
  log_stdout.write(util.format(logStr) + '\n');
};
console.log = function consoleLogOverride() {
  var logItems = [];
  for (var i = 0; i < arguments.length; i++) {
    logItems.push(arguments[i]);
  }
  var timestampDate = new Date();
  var formattedTimestamp = '[' + timestampDate.getHours() + ':' + timestampDate.getMinutes() + ':' + timestampDate.getSeconds() + '] ';
  var logStr = formattedTimestamp + logItems.join(', ');
  log_file.write(util.format(logStr) + '\n');
  log_stdout.write(util.format(logStr) + '\n');
};

console.log('foo', 'bar', 'baz');
console.log('foo5', 'baz5');
console.error('foo6', 9, new Date());
console.log('foo6', 9, new Date());