#!/usr/bin/env node

/**
* This file is used when Mopus is called from the CLI
*/

const {clk} = require('./utils.js')

if (process.argv[2] == '-h' || process.argv[2] == '--help') {
	console.log('\n'+clk.magentaBright('Møpus') + " is the fast and tiny's " + clk.blueBright('Lepzulnag') +" bundler.\nFor help and information, visit the website : "+clk.magentaBright("https://www.npmjs.com/package/mopus"))
	return
}

const fs = require('fs')

if (process.argv[2] == '-v' || process.argv[2] == '--version') {
	const path = require('path').resolve
	let pack = JSON.parse(fs.readFileSync(path(__dirname, '../package.json')))
	console.log(clk.magenta.bold('Møpus ')+clk.yellowBright(pack.version))
	return
}


const Mopus = require('./Mopus.js')


function trueValue(arg) {
	return arg == 'true'? true : (arg == 'false'? false : arg)
}

// we open the configuration file (mopus.json)
try {
	var options = {}
	if (fs.existsSync('./mopus.json')) {
		let fileContent

		// let's try to read the file
		try { fileContent = fs.readFileSync('./mopus.json') }
		catch (err) {
			let msg = clk.err("Error opening the configuration file ")
			msg += clk.yellow("'mopus.json'") + '\n'
			msg += err.message
			throw  msg
		}

		// let's try to parse the JSON
		try { Object.assign(options, JSON.parse(fileContent)) }
		catch (err) {
			let msg = clk.err("Bad JSON syntax in the configuration file ")
			msg += clk.yellow("'mopus.json'") + '\n'
			msg += err.message
			throw  msg
		}
	}


	// we read the options from the CLI
	// (we can only build one project from the CLI)
	let lastArg = 'entry'
	let firstEntry = true
	const fullArg = {
		'i': 'input',
		'o': 'output',
		're': 'processRequires',
		'im': 'processImports',
		'ex': 'processExports',
		'cf': 'processClassFields',
		'm': 'minify',
		'r': 'root',
		'l': 'logs',
		't': 'target',
		'w': 'wrap',
		'f': 'format',
	}

	// let's loop throught the arguments
	for (let arg of process.argv.slice(2)) {
		if (arg[0] == '-') {
			if (arg[1] == '-') // verbose argument
				lastArg = arg.slice(2)
			else  // mini argument
				lastArg = fullArg[arg.slice(1)]
		}

		else {
			// value or new entry
			if (lastArg == 'entry') {
				if (firstEntry) {
					firstEntry = false
					options.entry = []
				}
				options.entry.push(arg)
			}

			else {
				options[lastArg] = trueValue(arg)
				lastArg = 'entry'
			}
		}
	}


	// we create the Mopus and we compile directly
	// console.log(options)
	new Mopus(options).compile()
}

catch (err) {
	if (options.logs && options.logErrors)
		console.log(clk.err('/!\\ ') + err +'\n')
	else
		throw err
}
