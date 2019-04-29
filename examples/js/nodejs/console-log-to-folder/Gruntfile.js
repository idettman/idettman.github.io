const write_console_output_file = require('./write-console-output-file');

const fs = require('fs'),
    path = require('path');
    // del = require("del"),
    // hash = require('object-hash'),
    // link_tools = require('./link_tools'),
    // request_tools = require('./request_tools'),
    // update_accounts_versions = require('./update_labels_tools').update_accounts_with_labels,
    // logger = require('./logger').logger,
    // log_error_and_exit = require('./logger').log_error_and_exit,
    // log_grunt_fatal = require('./logger').log_grunt_fatal;

// const config = require(path.resolve(__dirname, "../conf/config.json"));
    // packager_config = require(path.resolve(__dirname, "../conf/packager-config.json"));


// const account_configuration_type = config.configuration_types.account.name,
//     account_item_type = config.configuration_types.account.item_type,
//     build_output_dir = packager_config.outputDir;
//
// const yargs = require("yargs")
//     .boolean('watch')
//     .argv;

// let accounts = yargs.accounts;

// let buildTask = require("prebid-packager");

// process.on('unhandledRejection', error => {
//     log_error_and_exit('Aborted. Reason: ' + error.message);
// }).on('uncaughtException', error => {
//     log_error_and_exit('Aborted. Reason: ' + error.message);
// });

module.exports = function (grunt) {
  
  // grunt.loadNpmTasks('grunt-strip-code');
  grunt.registerTask('foo', 'Bull shit mofo', function() {
    
    console.log('pro', process.title)
    const done = this.async();
    
    setTimeout(function() {
      console.log('shit shit shit')
      done()
    }, 1000);
    
  })
  
  grunt.registerTask('default', ['foo']);

};
