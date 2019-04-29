

const path = require('path').posix.join
const {basename, extname, dirname} = require('path').posix
const {ScriptModule} = require('./Module')
const osPath = require('path').resolve
const fs = require('fs')
const {clk, clm} = require('./utils')

const defaultProject = {
	output: 'bundle',
	entry: 'src',
	entryDir: '',
	entryAsModule: true,  // if false, then entries scope are accessibles from other modules
	input: '',  // instead of having files as entries, we can have an input source
	outputDir: '',
	outputType: 'file',  // 'file'|'string'|'buffer'
	processRequires: true,
	processImports: true,
	processExports: true,
	processClassFields: true,
	minify: false,
	format: 'executable',  // 'executable' | 'module' | "mopusModule"
	target: 'iso',  // 'node' | 'iso'
	localDirnames: true,  // indicates, if the target is node, whether __dirname and __filename are related to the folder they are built from, or the folder they are built to
	exportEntries: false,  // should the entry files be exported - or only executed
}


const MOPUS = 'møpus'


let minify = null
function loadMinifier() {
	minify = require('../modules/butternut/butternut.js').squash
}

let mopusTemplate = null
function loadMopusTemplate() {
	mopusTemplate = String(fs.readFileSync(osPath(__dirname, './møpus.js')))
}


// Render a module call (or a module definition)
function renderMopusModule(name, value) {
	return MOPUS+"('"+name+"'"+ (arguments.length==2 ? ', '+value : '') +')'
}

// Wrap a string around an instantly invoked function
function wrapIIFE(str, args='') {
	return '(function('+args+') {\n'+str.trimEnd()+'\n})()'
}



/**
* The class Project is used to define one single project.
* A project contains different config options, plus some methods, like toString.
*/
class Project {
	constructor(mopus, projectOptions) {
		Object.assign(this, defaultProject)
		for (let prop in this) {
			if (prop in mopus.options)
				this[prop] = mopus.options[prop]
		}
		Object.assign(this, projectOptions)
		if (!Array.isArray(this.entry))  // we make sure it's an array
			this.entry = (this.entry ? [this.entry] : [])
		if (!this.entry.length && !this.input)
			this.entry.push('src')

		if (!this.output)
			throw "The output option of a project must not be empty"

		this.mopus = mopus
		this.modules = mopus.modules

		// we convert each entry to a true path
		for (let i=0; i < this.entry.length; i++) {
			let entry = path(this.entryDir, this.entry[i])
			let truePath = mopus.truePath(entry)
			if (!truePath)
				throw clk.err("Cannot find the entry module ") + clm(entry, false)
			this.entry[i] = truePath
		}

		// if we have an input string
		if (this.input)
			this.mainModule = ScriptModule.fromSource(mopus, this.input)
	}


	get dependencies() {
		let result = new Set
		for (let entry of this.entry) {
			if (this.entryAsModule)
				result.add(entry)

			if (this.modules[entry].allDependencies) {
				this.modules[entry].allDependencies(this).forEach (
					dependency => result.add(dependency)
				)
			}
		}
		if (this.mainModule && this.mainModule.allDependencies) {
			this.mainModule.allDependencies(this).forEach (
				dependency => result.add(dependency)
			)			
		}
		return result
	}



	// Render the project to one single string - or a stream - or a buffer
	compile() {
		let result = ''
		const activeModules = (this.processExports || this.processImports || this.processRequires)


		// we add the mopus initializer
		if (activeModules) {
			
			// we write the mopus module handler
			if (this.format != 'mopusModule') {
				if (!mopusTemplate)
					loadMopusTemplate()
				result += mopusTemplate
			}

			// we write the dependencies
			this.dependencies.forEach(dependency => {
				let mod = this.modules[dependency]
				if (mod) {
					let content = mod.render(this)
					result += renderMopusModule(dependency, content)
					result += '\n'
				}
			})


			// we freeze modules objects
			result += MOPUS+'()\n'

			// we write the entries
			if (this.entryAsModule) {
				if (this.exportEntries) {
					if (this.format == 'executable')
						result += 'const exports={}\n'
					for (let entry of this.entry)
						result += 'Object.assign(exports,' + renderMopusModule(entry) + ')' + '\n'
					if (this.format == 'executable')
						result += 'return exports\n'
				}
				else {
					for (let entry of this.entry)
						result += renderMopusModule(entry) + '\n'
				}
			}
			else {
				for (let entry of this.entry)
					result += this.modules[entry].toString(this) + '\n'
			}
		}

		// if no modules
		else {
			for (let entry of this.entry) {
				result += "/*** '" + entry + "' ***\n" + this.modules[entry].toString(this)
				result += '\n'
			}
		}


		// we write the custom input
		if (this.mainModule) {
			result += this.mainModule.toString(this)
			result += '\n'
		}


		// we wrap the result
		if (this.format == 'executable')
			result = wrapIIFE(result)

		// we minify it
		if (this.minify) {
			if (!minify)
				loadMinifier()
			if (minify)
				result = minify(result).code
		}


		// we write the output file
		let fileName = null
		if (this.outputType == 'file') {
			fileName = this.output
			if (!fileName.endsWith('.js'))
				fileName += '.js'

			const writeFile = () => {
				fs.writeFile(osPath(this.outputDir, fileName), result, (err) => {
					if (err)
						throw clk.err("Cannot write the file '")+clk.yellow(osPath(this.outputDir, fileName))+"'"
				})
			}

			// we create the folder - if needed - and write the file
			if (this.outputDir) {
				fs.mkdir(this.outputDir, {recursive: true}, (err) => {
					if (err)
						throw clk.err("Cannot create the folder '")+clk.yellow(osPath(this.outputDir))+"'"
					writeFile()
				})
			}
			else
				writeFile()
		}


		// we log the output
		if (this.mopus.options.logs && this.mopus.options.logOutput) {
			let msg = clk.green.bold('> ')+clk.bold(fileName||this.output)+' '
			if (this.minify)
				msg += clk.detail('(minified) ')

			if (result.length < 1024)
				msg += clk.info(result.length +" octets")
			else if (result.length < 1048576)
				msg += clk.info((result.length / 1024).toFixed(1) +" ko")
			else
				msg += clk.info((result.length / 1024 / 1024).toFixed(1) +" mo")

			this.mopus.logs.output.push(msg)
		}


		// we return the result
		return this.outputType == 'buffer' ? Buffer.from(result) : result
	}

}






module.exports = Project