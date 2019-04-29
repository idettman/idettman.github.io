
const fs = require('fs')
const clk = require('chalk')
clk.err = clk.red.bold
clk.detail = clk.gray.italic
clk.info = clk.green

const globalModulesList = new Set([
	'fs',
	'path',
	'http',
	'http2',
	'https',
	'process',
	'child_process',
	'cluster',
	'events',
	'os',
	'inspector',
	'Math',
	'net',
	'querystring',
	'readline',
	'repl',
	'stream',
	'string_decoder',
	'util',
	'trace_events',
	'tty',
	'tls',
	'dgram',
	'v8',
	'vm',
	'worker_threads',
	'zlib',
	'perf_hooks',
	'url',
])

function isGlobalModule(moduleName, externalModules=null) {
	return globalModulesList.has(moduleName) || (externalModules && externalModules.has(moduleName))
}

function isFile(path) {
	return (fs.existsSync(path) && fs.statSync(path).isFile())
}



// colored module
function clm(name, underline=true) {
	return clk.magentaBright("'"+ (underline ? clk.underline(name) : name) +"'")
}


// colored line/column position error
function locationError(source, pos, loc) {
	let start = pos
	let end = pos
	let c
	const content = String(source)
	let msg = ''

	// we calculate the start and the end of the error statement
	while ((c = content[--start]) && c != ';' && c != '\n' && c != '\r');
	while ((c = content[++start]) && (c == ' ' || c == '\t'));  // we trim
	while ((c = content[++end]) && c != ';' && c != '\n' && c != '\r');
	let erroredStatement = content.substring(start, end)

	if (loc) {
		msg += '\n'
		msg += clk.red('    ')
		msg += clk.gray('Line ')+clk.greenBright(loc.line)+clk.gray(' Column ')+clk.yellow(loc.column)
	}
	msg += '\n\n'+erroredStatement+'\n'

	for (let x=start; x < pos; x++)
		msg += ' '
	msg += clk.yellowBright.bold('^')

	return msg
}


module.exports = {isFile, isGlobalModule, clk, clm, locationError}
