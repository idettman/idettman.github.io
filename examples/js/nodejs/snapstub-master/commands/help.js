'use strict';

function helpCmd() {
	console.log(`
Usage:
  snapstub [command]

Available commands:
  help         Output usage info
  version      Get current version number
  save         Saves data from stdin straight to a url location
  start        Starts the built-in static mock server
  add <url>    Takes a snapshot of a given url and stores in the local fs

Options:
  --method     Specifies different http methods to use, defaults to GET
  --header     Adds a custom header to the request
  --verbose    Output debug info when used along with the start command
  --silent     Mutes output when used along with the start command

More info:
  https://github.com/ruyadorno/snapstub
`);
}

module.exports = helpCmd;

