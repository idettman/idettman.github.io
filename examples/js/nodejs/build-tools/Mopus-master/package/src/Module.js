/**
A module is a file that has been imported.
Every file that can be imported can be a module (js, ts, ejs, but also images, etc...)
We have the following module types :
- ScriptModule  (like js, ts, ejs, etc...)
- RawFileModule  (like html, txt, xml, json, etc...)
- UrlModule  (like images, fonts, css, etc...)
+ any custom module created by the user

A module class must satisfy the following interface :
@input fileContent, filePath
@method render(config)

*/

const fs = require('fs')
const {parse, renderModuleFragments} = require('./astHandler.js')
const {dirname} = require('path')
const {clk, clm, locationError} = require('./utils.js')


function Module(mopus, truePath) {
	if (truePath) {
		let finalPath = mopus.finalPath(truePath)
		return {
			path: truePath,
			fileName: finalPath.replace(/\\/g, '\\\\'),
			dirname: dirname(finalPath).replace(/\\/g, '\\\\'),
			rawContent: fs.readFileSync(mopus.finalPath(truePath)),
		}
	}

	return {rawContent: ''}
}


// A simple rawfile module
function RawFileModule(m, p) {
	return Object.assign(Module(m, p), {
		render() {
			let content = String(this.rawContent).replace(/\\/g, '\\\\').replace(/`/g, '\\`')
			return '`'+content+'`'
		}
	})
}


// A simple url module
function UrlModule(m, p) {
	return Object.assign(Module(m,p), {
		render() {
			return "'/"+this.path+"'"
		}
	})
}



// A script module
function ScriptModule(m, p) {
	const self = Object.assign(Module(m, p), ScriptModulePrototype)
	self.parse(m)
	return self
}

const ScriptModulePrototype = {
	parse(mopus) {
		if (this.rawContent) try {

			Object.assign(this, parse.toModuleFragments(mopus, this))

		} catch (err) {
			if (!mopus.options.logs || !mopus.options.logErrors)
				throw err

			let content = String(this.rawContent)

			// we send a beautiful and comprehensive error message
			let msg = clk.err(err.message)
			if (this.path)
				msg += clk.gray.bold.italic(" at ") + clm(this.path)
			msg += locationError(this.rawContent, err.pos, err.loc)


			throw msg
		}
	},


	// Return a Set of the direct dependencies of the module (not sub-dependencies)
	dependencies(project) {
		let result = new Set

		for (let type of ['Imports', 'Requires', 'Exports']) {
			if (project['process' + type]) {

				// if module not found, we display a very beautiful error message
				if (this.links[type].moduleNotFound) {
					const {value, pos, loc} = this.links[type].moduleNotFound

					let msg = clk.err("Cannot find the module ")+clm(value, false)
					if (this.path)
						msg += clk.gray.bold(" imported at ")+clm(this.path)
					msg += locationError(this.rawContent, pos, loc)
					
					throw msg
				}

				for (let link of this.links[type]) {
					// if it's a global module but target is not node
					if (link.startsWith('global:') && project.target != 'node') {
						// another beautiful error message
						throw clk.err("Cannot load the global module ") + clm(link.slice(7), false) + clk.err(" unless you specify the project option ") + clk.gray("`target: 'node'`")
					}

					// we add the dependency
					result.add(link)
				}
			}
		}

		return result
	},

	// Return a Set of all dependencies (including sub-dependencies)
	allDependencies(project) {
		let dependencies = new Set

		this.dependencies(project).forEach(dependency => {
			dependencies.add(dependency)
			const mod = project.modules[dependency]

			// if we have subdependencies, we add them too
			if (mod && mod.allDependencies) {
				mod.allDependencies(project).forEach(dependency =>
					dependencies.add(dependency)
				)
			}
		})

		return dependencies
	},

	// The string result depends on the project options
	toString(project) {
		let result = ''
		const options = {
			processRequires: project.processRequires,
			processImports: project.processImports,
			processExports: project.processExports,
			processClassFields: project.processClassFields,
		}

		return renderModuleFragments(this.fragments, options)
	},

	// Render into a wrapped string
	render(project) {
		let args = 'module={exports:{}}'
		if (project.target == 'node' && project.localDirnames && this.path)
			args += ',__dirname="'+this.dirName+'",__filename="'+this.fileName+'"'
		let content = this.toString(project)
		return 'function('+args+') {'+(content?'\nconst {exports} = module;\n'+content:'')+'\nreturn module.exports\n}'
	},
}




ScriptModule.fromSource = function(mopus, source) {
	let sm = ScriptModule()
	sm.rawContent = source
	sm.parse(mopus)
	return sm
}



module.exports = {Module, RawFileModule, UrlModule, ScriptModule}
