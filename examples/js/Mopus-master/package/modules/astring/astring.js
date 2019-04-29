// Astring is a tiny and fast JavaScript code generator from an ESTree-compliant AST.
//
// Astring was written by David Bonnet and released under an MIT license.
//
// The Git repository for Astring is available at:
// https://github.com/davidbonnet/astring.git
//
// Please use the GitHub bug tracker to report issues:
// https://github.com/davidbonnet/astring/issues

const baseGenerator = require('./generator.js')
const EMPTY_OBJECT = Object.create(null)

class State {
	constructor(options={}) {
		this.output = ''
		this.generator = baseGenerator
		this.MOPUS = 'møpus'

		// Formating setup
		this.indent = '\t'
		this.lineEnd = '\n'
		this.indentLevel = 0

		Object.assign(this, options)
		if (this.moduleFragments)
			this.fragments = []
	}


	// Render the call of a module
	module(name) {
		if (name.startsWith('global:'))
			return "require('"+name.slice(7)+"')"
		return this.MOPUS + "('" + name + "')"
	}

	export(local, exported='') {
		if (!this.exportValues)
			this.exportValues = Object.create(null)
		this.exportValues[local] = (local == exported ? '' : exported)
	}

	addFragment(node) {
		if (this.output)
			this.fragments.push(this.output)
		this.fragments.push(node)
		this.output = ''
	}

	write(code) {
		this.output += code
	}

	toString() {
		let {output, lineEnd, indent} = this

		// we add the export values
		if (this.exportValues) {
			let keys = -3
			for (let k in this.exportValues)
				if (++keys == 0) break

			if (keys) {  // if 1 or 2 keys
				for (let local in this.exportValues)
					output += 'exports.'+local+' = '+(this.exportValues[local]||local)+'\n'
			}
			else {  // more than 2 keys
				output += 'Object.assign(exports, {'
				
				for (let local in this.exportValues) {
					output += local
					if (this.exportValues[local])
						output += ':' + this.exportValues[local]
					output += ','
				}
				
				output += lineEnd + '})' + lineEnd
			}

		}

		return output
	}
}

/**
* Returns a string representing the rendered code of the provided AST `node`.

* (module fragments are fragments of code and export/require/)
*/
function renderAST(node, options={}) {
	const state = new State(options)
	state.generator[node.type](node, state)
	return state.toString()
}


function generateModuleFragments(node) {
	const state = new State({moduleFragments: true})
	state.generator[node.type](node, state)
	if (state.output)  // we add the last fragment
		state.fragments.push(state.output)
	return state.fragments
}


function renderModuleFragments(fragments, options={}) {
	const state = new State(options)
	const {lineEnd} = state

	for (let frag of fragments) {
		if (typeof frag == 'string') {
			if (state.output[state.output.length-1] == lineEnd)
				state.output += frag.trimStart()
			else
				state.output += frag
		}
		else
			state.generator[frag.type](frag, state)
	}
	return state.toString().trim()
}

module.exports = {renderAST, generateModuleFragments, renderModuleFragments}