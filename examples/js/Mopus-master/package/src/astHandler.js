/**
This module defines several methodes used to create / modify a source code AST.
Require the needed methods from this module.
*/

// we load acorn and its plugins
const acorn = require('../modules/acorn/acorn.js')
const {Node, getLineInfo} = acorn
const {dirname} = require('path').posix
const classFields = require('../modules/acorn-class-fields/classFields.js')
const staticClassFields = require('../modules/acorn-static-class-fields/staticClassFields.js')
const dynamicImport = require('../modules/acorn-dynamic-import/dynamicImport.js')
const xParser = acorn.Parser
	.extend(classFields)
	.extend(staticClassFields)
	.extend(dynamicImport)
const {
	renderAST,
	generateModuleFragments,
	renderModuleFragments,
} = require('../modules/astring/astring.js')
const {clk} = require('./utils.js')


/**
* Full and simple AST walker.
*/
function walk(node, handler, parent=null) {
	if (node instanceof Node) {
		for (let prop in node)
			walk(node[prop], handler, node)
		handler[node.type] && handler[node.type].call(node, parent)
	}

	else if (Array.isArray(node)) {
		for (let elt of node)
			walk(elt, handler, parent)
	}
}


function addModuleLink(mopus, mod, links, node, type, value) {
	let path = mopus.truePath(value, dirname(mod.path))
	if (path) {
		node.truePath = path
		if (!path.startsWith('global:'))
			links[type].push(path)
	}
	else if (!links[type].moduleNotFound)
		links[type].moduleNotFound = {value, pos: node.start, loc: getLineInfo(mod.rawContent, node.start)}
}


/**
* Parse a module's source code.
* Also find class fields and add informations into the AST for an easy string generation
* The export and import paths will be converted into true paths.
*/
function parse(mopus, mod) {
	const source = mod.rawContent
	let ast = xParser.parse(source, {
		sourceType: 'module',
		allowReturnOutsideFunction: mopus.options.allowReturnOutsideFunction,
		allowImportExportEverywhere: mopus.options.allowImportExportEverywhere,
	})
	const links = {
		Requires: [],
		Imports: [],
		Exports: [],
	}
	const addLink = addModuleLink.bind(null, mopus, mod, links)


	walk(ast, {
		// -- Class fields
		ClassBody(parent) {
			// if we have class field definitions
			if (this.fields) {
				this.hasConstructorMethod = !!this.constructorMethod
				
				if (!this.hasConstructorMethod) {
					this.constructorMethod = AST.generate.constructorMethod()
					// this.body.push(this.constructorMethod)
				}

				// we add the fields to the constructor function
				let blockStatement = this.constructorMethod.value.body
				blockStatement.classFields = AST.generate.classFields(this.fields)
				blockStatement.classFields.hasSuperClass = !!parent.superClass
				// statement.body.push()
				this.fields = true
			}

			// if we have static fields, we send it to the class declaration
			if (this.staticFields) {
				const {fields, methods} = this.staticFields

				if (parent.id) {
					parent.staticFields = {
						fields: {properties: fields},
						methods: {properties: methods}
					}
				}
				else {  // wit no id, we mix fields and methods
					parent.staticFields = {properties: fields.concat(methods)}
				}
				this.staticFields = true
			}
		},

		FieldDefinition(parent) {
			if (parent.type == 'ClassBody') {
				fieldType = 'fields'
				if (this.static) {
					if (!parent.staticFields)
						parent.staticFields = {fields: [], methods: []}
					parent.staticFields.fields.push(this)
				}
				else {
					if (!parent[fieldType])
						parent[fieldType] = []
					parent[fieldType].push(this)
				}
			}
		},

		MethodDefinition(parent) {
			if (parent.type == 'ClassBody') {
				if (this.kind == 'constructor')
					parent.constructorMethod = this
				else if (this.static) {
					if (!parent.staticFields)
						parent.staticFields = {fields: [], methods: []}
					parent.staticFields.methods.push(this)
				}
			}
		},


		ImportDeclaration() {
			addLink(this.source, 'Imports', this.source.value)
		},

		ExportNamedDeclaration() {
			if (this.source)
				addLink(this.source, 'Exports', this.source.value)
		},

		ExportAllDeclaration() {
			addLink(this.source, 'Exports', this.source.value)
		},

		CallExpression(parent) {
			if (this.callee && this.callee.name == 'require') {
				if (this.arguments.length != 1) {
					const err = new SyntaxError('A require call expect one and only one argument')
					err.pos = this.start
					err.loc = getLineInfo(source, this.start)
					throw err
				}

				else if (this.arguments[0].type == 'Literal') {
					addLink(this, 'Requires', this.arguments[0].value)
				}
				
				else if (!mopus.options.allowDynamicRequires) {
					const err = new SyntaxError('Dynamic requires not allowed')
					err.pos = this.arguments[0].start
					err.loc = getLineInfo(source, this.arguments[0].start)
					throw err
				}
			}

			// else if (this.callee && this.callee.type == 'Super') {
			// 	console.log('SUPER !', parent)
			// }
		},
	})

	return {ast, links}
}


parse.toModuleFragments = function(mopus, mod) {
	const {ast, links} = parse(mopus, mod)
	return {links, fragments: generateModuleFragments(ast)}
}

const nullParser = Object.create(null)
nullParser.options = Object.create(null)

const AST = {
	generate: {
		constructorMethod() {
			let node = new Node(nullParser, 0)
			node.type = 'MethodDefinition'
			node.kind = 'constructor'
			node.static = false
			node.computed = false
			node.key = AST.generate.key('constructor')
			node.value = AST.generate.emptyFunction()
			return node
		},

		classFields(fields=[]) {
			let node = new Node(nullParser, 0)
			node.type = 'ClassFields'
			node.body = fields  // list of FieldDeclaration nodes
			return node
		},

		key(name) {
			let node = new Node(nullParser, 0)
			node.type = 'Identifier'
			node.name = name
			return node
		},

		emptyFunction() {
			let node = new Node(nullParser, 0)
			node.type = 'FunctionExpression'
			node.id = null
			node.expression = false
			node.generator = false
			node.async = false
			node.params = []
			node.body = AST.generate.emptyBlockStatement()
			return node
		},


		emptyBlockStatement() {
			let node = new Node(nullParser, 0)
			node.type = 'BlockStatement'
			node.body = []
			return node
		},
	}
}





module.exports = {AST, parse, renderAST, renderModuleFragments}