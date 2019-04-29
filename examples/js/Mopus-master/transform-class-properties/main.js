
// we load acorn and its plugins
const acorn = require('../package/modules/acorn/acorn.js')
const {Node, getLineInfo} = acorn
const classFields = require('../package/modules/acorn-class-fields/classFields.js')
const staticClassFields = require('../package/modules/acorn-static-class-fields/staticClassFields.js')
const xParser = acorn.Parser
	.extend(classFields)
	.extend(staticClassFields)
const {
	renderAST,
	generateModuleFragments,
	renderModuleFragments,
} = require('../package/modules/astring/astring.js')



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


/*
* Parse a source code.
* Find class fields and add informations into the AST for an easy string generation.
*/
function parse(source, options={}) {
	let ast = xParser.parse(source, options)
	let exports = {}
	let imports = {}

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
			imports.push(this.source.value)
		},

		ExportNamedDeclaration() {
			exports.push(this.source.value)
		},

		ExportAllDeclaration() {
			exports.push(this.source.value+':*')
		},
	})

	return {ast, imports, exports}
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


function transform(source, options={}) {
	const {ast, imports, exports} = parse(source, options)
	return {
		imports,
		exports,
		code: renderAST(ast, {
			processClassFields: true,
			processImports: 'delete',
			processExports: 'delete',
		})
	}
}





module.exports = {parse, render: renderAST, transform}