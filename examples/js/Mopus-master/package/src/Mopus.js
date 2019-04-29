


const fs = require('fs')
const path = require('path').posix.join
const {basename, extname, relative} = require('path').posix
const osPath = require('path').resolve
const globToPattern = require('../modules/glob-to-pattern')

const Project = require('./Project.js')
const {Module, ScriptModule, RawFileModule, UrlModule} = require('./Module.js')
const {isFile, isGlobalModule, clk, clm, locationError} = require('./utils.js')

const defaultRules = {
	module: /\.(js|mjs|ejs|ts)$/,
	text: /\.(html|txt|md|text)$/,
	asset: /\.(css|styl|less|scss|sass|svg|png|jpg|jpeg|woff|woff2|otf|ttf)$/,
}


const globalOptions = {
	root: '',
	projects: [],  // the the list of projects
	rules: {},
	folderRules: {},

	allowDynamicRequires: true,
	externalModules: null,  // list of modules not to be included in the bundle
	allowImportExportEverywhere: false,  // by default, only top-level import and exports allowed
	allowReturnOutsideFunction: true,  // by default, we can use returns everywhere

	logs: true,
	logInput: true,
	logOutput: true,
	logTimers: false,
	logErrors: true,

	globstar: false,
}


/*
* Wrapper for the relative function which is bugged (at least on windows)
*/
function relativePath(path) {
	let r = relative(path)
	return r.startsWith('....') ? '../..' + r.slice(4) : r
}



class Mopus {
	constructor(options={}) {
		this.logs = {input: [], output:[]}
		this.modules = {}
		this.options = {}
		Object.assign(this.options, globalOptions)
		Object.assign(this.options, options)
		options = this.options
		const globOptions = {
			extended: true,
			globstar: options.globstar
		}

		try {
			if (options.logs && options.logTimers)
				console.time('Creating dependency tree')

			// we transform the glob rules into javascript patterns
			this.rules = []
			for (let rule in options.rules) {
				let action = options.rules[rule]

				// let's find the correct action
				if (action == 'script')
					action = ScriptModule
				else if (action == 'raw-file')
					action = RawFileModule
				else if (action == 'url')
					action = UrlModule
				else if (typeof action == 'string')
					action = require(action)

				let exp = globToPattern(rule, globOptions)
				exp.action = action
				this.rules.push(exp)
			}

			// same for folder rules
			this.folderRules = []
			for (let rule in options.folderRules) {
				let exp = globToPattern(rule, globOptions)
				exp.action = options.folderRules[rule]
				this.folderRules.push(exp)
			}


			// we create a shortcut to access the projects
			if (!options.projects)
				options.projects = []
			if (!Array.isArray(options.projects))
				throw "The projects option should be an array or null"
			if (!options.projects.length)
				options.projects.push({})
			this.projects = options.projects


			// we transform the externalModules into a Set
			if (options.externalModules && !Array.isArray(options.externalModules))
				options.externalModules = [options.externalModules]
			options.externalModules = new Set(options.externalModules)

			// for every project we read dependent modules
			let index = 0

			for (let project of this.projects) {
				project = new Project(this, project)
				if (project.output in this.projects)
					throw "Two projects cannot have the same output value"
				this.projects[index++] = project
				// this.projects[project.output] = project

				// for every entry file of the project, we add the module
				// (this will also add sub-modules)
				for (let entry of project.entry)
					this.addModule_noCatch(entry, project)

				// if a custom input is given as parameter, we parse it
				if (project.mainModule)
					this.addDependencies(project.mainModule, project)
			}

			if (options.logs && options.logInput)
				console.log(this.logs.input.join('\n'))
			if (options.logs && options.logTimers) {
				console.timeEnd('Creating dependency tree')
				console.log('')
			}
		}

		catch (error) {
			this.error = error
			if (options.logs && options.logErrors)
				console.log('\n' + clk.err('/!\\ ') + error+'\n')
			else throw error
		}
	}



	// Shortcut for single-project situations
	get project() {return this.projects[0]}


	addModule(truePath, fromProject=null) {
		if (!this.options.logErrors)
			return this.addModule_noCatch(truePath, fromProject)

		try {
			return this.addModule_noCatch(truePath, fromProject)
		}
		catch (err) {
			console.log(err)
			return null
		}
	}

	/**
	* Add a module to this.modules (and all the sub-modules)
	* @param fromProject - indicates if the new module is added by one project.
	*/
	addModule_noCatch(truePath, fromProject=null) {
		if (truePath.startsWith('global:'))
			return null
		let filePath = (truePath[0] == '/' ? truePath.slice(1) : truePath)

		// we don't parse twice the same file
		if (!(truePath in this.modules)) {
			// we log the new module
			if (this.options.logInput)
				this.logs.input.push(clk.yellow.bold('< ')+clk.magenta.bold(filePath))

			let action = null

			// we find the right action for the module
			for (let rule of this.rules) {
				// if it's a match, let's execute the right action
				if (rule.test(filePath)) {
					action = rule.action
					break
				}
			}

			// no custom action rule ; let's do default actions
			if (!action) {
				if (defaultRules.module.test(filePath))
					action = ScriptModule
				else if (defaultRules.text.test(filePath))
					action = RawFileModule
				else if (defaultRules.asset.test(filePath))
					action = UrlModule
			}

			// if no action found : no rule for the given file
			if (!action) {
				let msg = clk.err("Extension of module ") + clm(truePath, false) + clk.err(' is not supported')
				msg += clk.yellow('\n→ If you want this extension to be supported, you need to create a new rule')
				throw msg
			}

			// we execute the action to get the module
			this.modules[truePath] = action(this, truePath)
		}



		let newModule = this.modules[truePath]
		
		if (newModule) {
			// if we found something, we store it and load the dependencies
			this.modules[truePath] = newModule

			// with same module but different project, dependencies can be different
			// so we parse for it event though the module is already loaded
			if (newModule.dependencies) {
				if (fromProject)
					this.addDependencies(newModule, fromProject)
				else {
					for (let project of this.projects)
						this.addDependencies(newModule, project)
				}
			}
		}

		return newModule
	}



	/**
	* Add the dependencies from the module *mod*, given the project *project*
	*/
	addDependencies(mod, project) {
		mod.dependencies(project).forEach(dependency =>
			this.addModule_noCatch(dependency, project)
		)
	}



	/**
	* Delete a module from this.modules
	*/
	deleteModule(truePath) {
		return delete this.modules[truePath]
	}


	/**
	* Update a module. To use after a file modification.
	*/
	updateModule(truePath) {
		this.modules[truePath] = null
		return this.addModule(truePath)
	}




	/**
	* Return a true path from a module path (exemple : add the '.js' extension, or find the right node_modules folder the module is in)
	* There can be three types of module URI :
	* i- The 'relative' path : './myModule' => look relatively to the current file folder
	* ii- The 'node_modules' path : 'myModule' => look relatively to the node_modules folder
	* iii- The 'absolute' path : '/myModule' => look absolutely the file or folder
	*/
	truePath(filePath, dir='') {
		// if no dir, it means we look for an entry point
		if (!dir) {
			if (filePath[0] != '.' && filePath[0] != '/')
				filePath = './' + filePath
		}

		// relative or absolute path
		if (filePath[0] == '.' || filePath[0] == '/') {
			return this.resolvePath(path(dir, filePath))
		}

		// else, it's a node_modules path
		const modulePath = path('node_modules', filePath)
		let climber = ''

		let target = path(dir, climber, modulePath)
		let osTarget = osPath(this.options.root, target)
		let lastOsTarget = null

		while (osTarget != lastOsTarget) {
			let result = this.resolvePath(target, osTarget)
			if (result)
				return result
			
			climber += '../'
			target = path(dir, climber, modulePath)
			lastOsTarget = osTarget
			osTarget = osPath(this.options.root, target)
		}

		if (isGlobalModule(filePath, this.options.externalModules))
			return 'global:'+filePath

		return null
	}



	/**
	* Try to find if the existing path points to a file.
	*/
	resolvePath(filePath, osFilePath=null) {
		if (!osFilePath)
			osFilePath = osPath(this.options.root, filePath)

		if (!filePath.endsWith('.js') && !filePath.endsWith('.ejs') && !filePath.endsWith('.mjs') && !filePath.endsWith('.ts')) {
			if (isFile(osFilePath+'.js'))
				return filePath+'.js'
			if (isFile(osFilePath+'.ts'))
				return filePath+'.ts'
			if (isFile(osFilePath+'.ejs'))
				return filePath+'.ejs'
			if (isFile(osFilePath+'.mjs'))
				return filePath+'.mjs'
		}

		if (fs.existsSync(osFilePath)) {
			const stats = fs.statSync(osFilePath)

			if (stats.isFile())
				return filePath
			
			// if it's a folder, we look for the linked file using options.folderRules
			if (stats.isDirectory())
				return this.resolveDirectory(filePath)
		}

		return null
	}
	
	


	/**
	* Indicate if the given directory is 'executable' and if so, return the file to execute. 
	*/
	resolveDirectory(filePath) {
		const folderName = basename(filePath)
		let result

		for (let rule of this.folderRules) {
			if (rule.test(filePath)) {
				if (result = this.resolvePath(path(filePath, rule.action)))
					return result
			}
		}

		// No rule with a corresponding file found ; we execute default action
		// First, we look at a package.json file
		let targets = []
		let pack = osPath(this.options.root, filePath, 'package.json')
		if (isFile(pack)) {
			let json
			try {
				json = JSON.parse(fs.readFileSync(pack))
			} catch (err) {
				throw "Bad JSON syntax in the '"+pack+"' file : " + err
			}
			if (json.main)
				targets.push(json.main)
		}
		targets.push('index', folderName)

		for (let target of targets) {
			if (result = this.resolvePath(path(filePath, target)))
				return result
		}

		return null
	}





	/**
	* Return an OS path from a true path
	*/
	finalPath(truePath) {
		return osPath(this.options.root, truePath)
	}




	/**
	* Compile every project and return the first project result.
	*/
	compile() {
		if (this.error)
			return

		if (this.options.logs) {
			this.logs.output = []
			if (this.options.logTimers)
				console.time('Rendering output')
		} 


		let result = {}
		for (let project of this.projects)
			result[project.output] = project.compile()

		if (this.options.logs) {
			console.log(this.logs.output.join('\n'))
			if (this.options.logTimers)
				console.timeEnd('Rendering output')
		}
		return result
	}
}


Mopus.Module = Module
module.exports = Mopus