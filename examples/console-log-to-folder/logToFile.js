const fs = require('fs');

/**
 * @param {Arguments} args
 * @param {string} label
 * @returns {Array}
 */
function convertArgsToArray(args, label = '') {
  const timestampAndLabel = '[' + (new Date()).toTimeString().slice(0, 8) + ']';
  return [
    [timestampAndLabel, label, args[0]].join(' ')
  ].concat(Array.prototype.slice.call(args).slice(1));
}

/**
 * @param {WriteStream} logFileStream
 * @param {Function} processStdoutWrite
 * @param {Function} processStderrWrite
 */
function overrideStdoutAndStdErr(logFileStream, processStdoutWrite, processStderrWrite) {
  // OVERRIDE process.stdout.write
  function patchStdoutWrite() {
    processStdoutWrite.apply(process.stdout, arguments);
    logFileStream.write.apply(logFileStream, convertArgsToArray(arguments));
  }
  process.stdout.write = patchStdoutWrite;

  // OVERRIDE process.stderr.write
  function patchStderrWrite() {
    processStderrWrite.apply(process.stderr, arguments);
    logFileStream.write.apply(logFileStream, convertArgsToArray(arguments, 'ERROR:'));
  }
  process.stderr.write = patchStderrWrite;
}

module.exports = {
  /**
   * @param {string} path
   * @param {string} filename
   */
  init: function init(path, filename = 'log') {
    if (!path || !filename) {
      console.error('Error, console file output arguments path/file are undefined:', path, filename);
      return;
    }
    // Synchronously tests a user's permissions for the file or directory specified 
    try {
      fs.accessSync(path, fs.constants.R_OK | fs.constants.W_OK);
      console.log('Console output is writing to file:', path + filename);
      overrideStdoutAndStdErr(fs.createWriteStream(path + filename), process.stdout.write, process.stderr.write);
    } catch (e) {
      console.error('Error, console output file path is not valid:' +  (path + filename), e);
    }
  }
}