
const { stringify } = JSON

const {
	NEEDS_PARENTHESES,
	EXPRESSIONS_PRECEDENCE,
	formatComments,
	formatSequence,
	formatVariableDeclaration,
	formatBinaryExpressionPart,
	hasCallExpression
} = require('./utils.js')



let ForInStatement,
	FunctionDeclaration,
	RestElement,
	BinaryExpression,
	ArrayExpression,
	BlockStatement

function isSuperCall(n) {
	return n.type == 'ExpressionStatement'
		&& n.expression.type == 'CallExpression'
		&& n.expression.callee
		&& n.expression.callee.type == 'Super'
}


module.exports = {
	Program(node, state) {
		const indent = state.indent.repeat(state.indentLevel)
		const { lineEnd } = state
		const statements = node.body
		const { length } = statements
		for (let i = 0; i < length; i++) {
			const statement = statements[i]
			state.write(indent)
			this[statement.type](statement, state)
			state.write(lineEnd)
		}
	},
	BlockStatement: (BlockStatement = function(node, state) {
		const indent = state.indent.repeat(state.indentLevel++)
		const { lineEnd } = state
		const statementIndent = indent + state.indent
		state.write('{')
		const statements = node.body
		const isClass = (node.type == 'ClassBody') && state.processClassFields
		const classFields = state.processClassFields && node.classFields

		// we write the special constructor function
		if (isClass && node.fields && !node.hasConstructorMethod) {
			state.write(lineEnd+statementIndent)
			this.MethodDefinition(node.constructorMethod, state)
		}

		// we write the inner statements
		if ((statements != null && statements.length > 0) || classFields) {
			state.write(lineEnd)

			// we check if there is a 'super' call
			let hasSuper = false
			if (classFields && classFields.hasSuperClass && statements && statements.length > 0) {
				for (let statement of statements) {
					if (isSuperCall(statement)) {
						hasSuper = true
						break
					}
				}
			}

			// we write class fields
			if (classFields && !hasSuper) {
				// if it has a super class and class fields, but no 'super' call...
				if (classFields.hasSuperClass)  // ... we add it
					state.write(statementIndent + 'super()' + lineEnd)
				this.ClassFields(classFields, state)
			}

			for (let statement of statements) {
				// we do not write field definitions in the block, but inside the constructor
				// and we do not write static methods / fields /neither
				if (isClass && (statement.static || statement.type == 'FieldDefinition'))
					continue

				state.write(statementIndent)
				this[statement.type](statement, state)
				state.write(lineEnd)

				// if we just called the 'super' constructor
				if (hasSuper && isSuperCall(statement)) {
					this.ClassFields(classFields, state)
					hasSuper = false
				}
			}
			state.write(indent)
		}
		state.write('}')
		state.indentLevel--
	}),
	ClassBody: BlockStatement,
	EmptyStatement(node, state) {
		state.write(';')
	},
	ExpressionStatement(node, state) {
		const precedence = EXPRESSIONS_PRECEDENCE[node.expression.type]
		if (
			precedence === NEEDS_PARENTHESES ||
			(precedence === 3 && node.expression.left.type[0] === 'O')
		) {
			// Should always have parentheses or is an AssignmentExpression to an ObjectPattern
			state.write('(')
			this[node.expression.type](node.expression, state)
			state.write(')')
		} else {
			this[node.expression.type](node.expression, state)
		}
		state.write(';')
	},
	IfStatement(node, state) {
		state.write('if (')
		this[node.test.type](node.test, state)
		state.write(') ')
		this[node.consequent.type](node.consequent, state)
		if (node.alternate != null) {
			state.write(state.lineEnd)
			state.write(state.indent.repeat(state.indentLevel))
			state.write('else ')
			this[node.alternate.type](node.alternate, state)
		}
	},
	LabeledStatement(node, state) {
		this[node.label.type](node.label, state)
		state.write(': ')
		this[node.body.type](node.body, state)
	},
	BreakStatement(node, state) {
		state.write('break')
		if (node.label != null) {
			state.write(' ')
			this[node.label.type](node.label, state)
		}
		state.write(';')
	},
	ContinueStatement(node, state) {
		state.write('continue')
		if (node.label != null) {
			state.write(' ')
			this[node.label.type](node.label, state)
		}
		state.write(';')
	},
	WithStatement(node, state) {
		state.write('with (')
		this[node.object.type](node.object, state)
		state.write(') ')
		this[node.body.type](node.body, state)
	},
	SwitchStatement(node, state) {
		const indent = state.indent.repeat(state.indentLevel++)
		const { lineEnd } = state
		state.indentLevel++
		const caseIndent = indent + state.indent
		const statementIndent = caseIndent + state.indent
		state.write('switch (')
		this[node.discriminant.type](node.discriminant, state)
		state.write(') {' + lineEnd)
		const { cases: occurences } = node
		const { length: occurencesCount } = occurences
		for (let i = 0; i < occurencesCount; i++) {
			const occurence = occurences[i]
			if (occurence.test) {
				state.write(caseIndent + 'case ')
				this[occurence.test.type](occurence.test, state)
				state.write(':' + lineEnd)
			} else {
				state.write(caseIndent + 'default:' + lineEnd)
			}
			const { consequent } = occurence
			const { length: consequentCount } = consequent
			for (let i = 0; i < consequentCount; i++) {
				const statement = consequent[i]
				state.write(statementIndent)
				this[statement.type](statement, state)
				state.write(lineEnd)
			}
		}
		state.indentLevel -= 2
		state.write(indent + '}')
	},
	ReturnStatement(node, state) {
		state.write('return')
		if (node.argument) {
			state.write(' ')
			this[node.argument.type](node.argument, state)
		}
		state.write(';')
	},
	ThrowStatement(node, state) {
		state.write('throw ')
		this[node.argument.type](node.argument, state)
		state.write(';')
	},
	TryStatement(node, state) {
		state.write('try ')
		this[node.block.type](node.block, state)
		if (node.handler) {
			const { handler } = node
			state.write(' catch (')
			this[handler.param.type](handler.param, state)
			state.write(') ')
			this[handler.body.type](handler.body, state)
		}
		if (node.finalizer) {
			state.write(' finally ')
			this[node.finalizer.type](node.finalizer, state)
		}
	},
	WhileStatement(node, state) {
		state.write('while (')
		this[node.test.type](node.test, state)
		state.write(') ')
		this[node.body.type](node.body, state)
	},
	DoWhileStatement(node, state) {
		state.write('do ')
		this[node.body.type](node.body, state)
		state.write(' while (')
		this[node.test.type](node.test, state)
		state.write(');')
	},
	ForStatement(node, state) {
		state.write('for (')
		if (node.init != null) {
			const { init } = node
			if (init.type[0] === 'V') {
				formatVariableDeclaration(state, init)
			} else {
				this[init.type](init, state)
			}
		}
		state.write('; ')
		if (node.test) {
			this[node.test.type](node.test, state)
		}
		state.write('; ')
		if (node.update) {
			this[node.update.type](node.update, state)
		}
		state.write(') ')
		this[node.body.type](node.body, state)
	},
	ForInStatement: (ForInStatement = function(node, state) {
		state.write('for (')
		const { left } = node
		if (left.type[0] === 'V') {
			formatVariableDeclaration(state, left)
		} else {
			this[left.type](left, state)
		}
		// Identifying whether node.type is `ForInStatement` or `ForOfStatement`
		state.write(node.type[3] === 'I' ? ' in ' : ' of ')
		this[node.right.type](node.right, state)
		state.write(') ')
		this[node.body.type](node.body, state)
	}),
	ForOfStatement: ForInStatement,
	DebuggerStatement(node, state) {
		state.write('debugger;' + state.lineEnd)
	},
	FunctionDeclaration: (FunctionDeclaration = function(node, state) {
		state.write(
			(node.async ? 'async ' : '') +
				(node.generator ? 'function* ' : 'function ') +
				(node.id ? node.id.name : ''),
			node
		)
		formatSequence(state, node.params)
		state.write(' ')
		this[node.body.type](node.body, state)
	}),
	FunctionExpression: FunctionDeclaration,
	VariableDeclaration(node, state) {
		formatVariableDeclaration(state, node)
		state.write(';')
	},
	VariableDeclarator(node, state) {
		this[node.id.type](node.id, state)
		if (node.init != null) {
			state.write(' = ')
			this[node.init.type](node.init, state)
		}
	},

	ImportDeclaration(node, state) {
		if (state.moduleFragments)
			return state.addFragment(node)

		const { specifiers, source } = node
		const { length } = specifiers

		// if we transform imports for Mopus
		if (state.processImports) {
			if (state.processImports == 'delete')
				return
			const isGlobal = source.truePath.startsWith('global:')
			const moduleName = state.module(source.truePath)

			if (!length)  // we juste execute the module
				return state.write(moduleName)

			// if we have specifiers (variables to create)
			let namespace = ''
			let isoVars = []
			let vars = []

			for (let specifier of specifiers) {
				let {name} = specifier.local

				if (specifier.type == 'ImportNamespaceSpecifier')
					namespace = name
				else if (specifier.type == 'ImportDefaultSpecifier')
					vars.push('const '+name+' = '+moduleName+(isGlobal?'':'.default'))
				else if (specifier.imported.name != name)
					vars.push('const '+name+' = '+moduleName+'.'+specifier.imported.name)
				else
					isoVars.push(specifier.local.name)
			}

			// we write isoVars and the namespace
			if (isoVars.length || namespace) {
				state.write('const ')

				if (isoVars.length)
					state.write('{'+ isoVars.join(', ') +'} = ')
				if (namespace)
					state.write(namespace + ' = ')
				state.write(moduleName)
				if (vars.length)
					state.write(state.lineEnd)
			}

			// we write non-iso vars
			state.write(vars.join(state.lineEnd))

			return
		}


		state.write('import ')
		// NOTE: Once babili is fixed, put this after condition
		// https://github.com/babel/babili/issues/430
		let i = 0
		if (length > 0) {
			for (; i < length; ) {
				if (i > 0) {
					state.write(', ')
				}
				const specifier = specifiers[i]
				const type = specifier.type[6]
				if (type === 'D') {
					// ImportDefaultSpecifier
					state.write(specifier.local.name, specifier)
					i++
				} else if (type === 'N') {
					// ImportNamespaceSpecifier
					state.write('* as ' + specifier.local.name, specifier)
					i++
				} else {
					// ImportSpecifier
					break
				}
			}
			if (i < length) {
				state.write('{')
				for (;;) {
					const specifier = specifiers[i]
					const { name } = specifier.imported
					state.write(name, specifier)
					if (name !== specifier.local.name) {
						state.write(' as ' + specifier.local.name)
					}
					if (++i < length) {
						state.write(', ')
					} else {
						break
					}
				}
				state.write('}')
			}
			state.write(' from ')
		}
		this.Literal(node.source, state)
		state.write(';')
	},
	ExportDefaultDeclaration(node, state) {
		if (state.moduleFragments)
			return state.addFragment(node)

		// if we transform imports for Mopus
		if (state.processExports) {
			if (state.processExports != 'delete') {
				if (node.declaration.type == 'Identifier') {
					state.export('default', node.declaration.name)
					state.write(';')
					return
				}
				state.write('exports.default = ')
			}
		}
		else
			state.write('export default ')
		this[node.declaration.type](node.declaration, state)
		state.write(';')
	},
	ExportNamedDeclaration(node, state) {
		if (state.moduleFragments)
			return state.addFragment(node)

		if (state.processExports == 'delete')
			return

		if (!state.processExports)
			state.write('export ')

		// Function, class or variable(s) declaration
		const {declaration, source} = node
		if (declaration) {
			this[declaration.type](declaration, state)

			// Variable declaration
			if (state.processExports) {
				if (declaration.type == 'VariableDeclaration') {
					for (let variable of declaration.declarations)
						state.export(variable.id.name)
				}
				else  // Class or function declaration
					state.export(declaration.id.name)
			}
		}

		// Variable names to export
		else {
			if (state.processExports) {
				for (let specifier of node.specifiers) {
					let local = specifier.local.name
					if (source)
						local = state.module(source.truePath) + '.' + local
					state.export(specifier.exported.name, local)
				}
				return  // we write nothing
			}

			state.write('{')
			const { specifiers } = node,
				{ length } = specifiers
			if (length > 0) {
				for (let i = 0; ; ) {
					const specifier = specifiers[i]
					const { name } = specifier.local
					state.write(name, specifier)
					if (name !== specifier.exported.name) {
						state.write(' as ' + specifier.exported.name)
					}
					if (++i < length) {
						state.write(', ')
					} else {
						break
					}
				}
			}
			state.write('}')
			if (node.source) {
				state.write(' from ')
				this.Literal(node.source, state)
			}
		}
		state.write(';')
	},
	ExportAllDeclaration(node, state) {
		if (state.moduleFragments)
			return state.addFragment(node)

		// if we transform imports for Mopus
		if (state.processExports) {
			if (state.processExports != 'delete')
				state.write('Object.assign(exports, '+ state.module(node.source.truePath) +')')
		}
		else {
			state.write('export * from ')
			this.Literal(node.source, state)
		}
		state.write(';')
	},
	MethodDefinition(node, state) {
		if (node.static && !state.processClassFields)
			state.write('static ')
		const kind = node.kind[0]
		if (kind === 'g' || kind === 's') {
			// Getter or setter
			state.write(node.kind + ' ')
		}
		if (node.value.async) {
			state.write('async ')
		}
		if (node.value.generator) {
			state.write('*')
		}
		if (node.computed) {
			state.write('[')
			this[node.key.type](node.key, state)
			state.write(']')
		} else {
			this[node.key.type](node.key, state)
		}
		formatSequence(state, node.value.params)
		state.write(' ')
		this[node.value.body.type](node.value.body, state)
	},
	ClassExpression(node, state) {
		this.ClassDeclaration(node, state)
	},
	ArrowFunctionExpression(node, state) {
		state.write(node.async ? 'async ' : '', node)
		const { params } = node
		if (params != null) {
			// Omit parenthesis if only one named parameter
			if (params.length === 1 && params[0].type[0] === 'I') {
				// If params[0].type[0] starts with 'I', it can't be `ImportDeclaration` nor `IfStatement` and thus is `Identifier`
				state.write(params[0].name, params[0])
			} else {
				formatSequence(state, node.params)
			}
		}
		state.write(' => ')
		if (node.body.type[0] === 'O') {
			// Body is an object expression
			state.write('(')
			this.ObjectExpression(node.body, state)
			state.write(')')
		} else {
			this[node.body.type](node.body, state)
		}
	},
	ThisExpression(node, state) {
		state.write('this', node)
	},
	Super(node, state) {
		state.write('super', node)
	},
	RestElement: (RestElement = function(node, state) {
		state.write('...')
		this[node.argument.type](node.argument, state)
	}),
	SpreadElement: RestElement,
	YieldExpression(node, state) {
		state.write(node.delegate ? 'yield*' : 'yield')
		if (node.argument) {
			state.write(' ')
			this[node.argument.type](node.argument, state)
		}
	},
	AwaitExpression(node, state) {
		state.write('await ')
		if (node.argument) {
			this[node.argument.type](node.argument, state)
		}
	},
	TemplateLiteral(node, state) {
		const { quasis, expressions } = node
		state.write('`')
		const { length } = expressions
		for (let i = 0; i < length; i++) {
			const expression = expressions[i]
			state.write(quasis[i].value.raw)
			state.write('${')
			this[expression.type](expression, state)
			state.write('}')
		}
		state.write(quasis[quasis.length - 1].value.raw)
		state.write('`')
	},
	TaggedTemplateExpression(node, state) {
		this[node.tag.type](node.tag, state)
		this[node.quasi.type](node.quasi, state)
	},
	ArrayExpression: (ArrayExpression = function(node, state) {
		state.write('[')
		if (node.elements.length > 0) {
			const { elements } = node,
				{ length } = elements
			for (let i = 0; ; ) {
				const element = elements[i]
				if (element != null) {
					this[element.type](element, state)
				}
				if (++i < length) {
					state.write(', ')
				} else {
					if (element == null) {
						state.write(', ')
					}
					break
				}
			}
		}
		state.write(']')
	}),
	ArrayPattern: ArrayExpression,
	ObjectExpression(node, state) {
		const indent = state.indent.repeat(state.indentLevel++)
		const { lineEnd } = state
		const propertyIndent = indent + state.indent
		state.write('{')
		if (node.properties.length > 0) {
			state.write(lineEnd)
			const comma = ',' + lineEnd
			const { properties } = node,
				{ length } = properties
			for (let i = 0; ; ) {
				const property = properties[i]
				state.write(propertyIndent)
				this.Property(property, state)
				if (++i < length) {
					state.write(comma)
				} else {
					break
				}
			}
			state.write(lineEnd)
			state.write(indent + '}')
		} else {
			state.write('}')
		}
		state.indentLevel--
	},
	Property(node, state) {
		if (node.method || node.kind && node.kind[0] !== 'i') {
			// Either a method or of kind `set` or `get` (not `init`)
			this.MethodDefinition(node, state)
		} else {
			if (!node.shorthand) {
				if (node.computed) {
					state.write('[')
					this[node.key.type](node.key, state)
					state.write(']')
				} else {
					this[node.key.type](node.key, state)
				}
				state.write(': ')
			}
			this[node.value.type](node.value, state)
		}
	},
	ObjectPattern(node, state) {
		state.write('{')
		if (node.properties.length > 0) {
			const { properties } = node,
				{ length } = properties
			for (let i = 0; ; ) {
				this[properties[i].type](properties[i], state)
				if (++i < length) {
					state.write(', ')
				} else {
					break
				}
			}
		}
		state.write('}')
	},
	SequenceExpression(node, state) {
		formatSequence(state, node.expressions)
	},
	UnaryExpression(node, state) {
		if (node.prefix) {
			state.write(node.operator)
			if (node.operator.length > 1) {
				state.write(' ')
			}
			if (
				EXPRESSIONS_PRECEDENCE[node.argument.type] <
				EXPRESSIONS_PRECEDENCE.UnaryExpression
			) {
				state.write('(')
				this[node.argument.type](node.argument, state)
				state.write(')')
			} else {
				this[node.argument.type](node.argument, state)
			}
		} else {
			// FIXME: This case never occurs
			this[node.argument.type](node.argument, state)
			state.write(node.operator)
		}
	},
	UpdateExpression(node, state) {
		// Always applied to identifiers or members, no parenthesis check needed
		if (node.prefix) {
			state.write(node.operator)
			this[node.argument.type](node.argument, state)
		} else {
			this[node.argument.type](node.argument, state)
			state.write(node.operator)
		}
	},
	AssignmentExpression(node, state) {
		this[node.left.type](node.left, state)
		state.write(' ' + node.operator + ' ')
		this[node.right.type](node.right, state)
	},
	AssignmentPattern(node, state) {
		this[node.left.type](node.left, state)
		state.write(' = ')
		this[node.right.type](node.right, state)
	},
	BinaryExpression: (BinaryExpression = function(node, state) {
		if (node.operator === 'in') {
			// Avoids confusion in `for` loops initializers
			state.write('(')
			formatBinaryExpressionPart(state, node.left, node, false)
			state.write(' ' + node.operator + ' ')
			formatBinaryExpressionPart(state, node.right, node, true)
			state.write(')')
		} else {
			formatBinaryExpressionPart(state, node.left, node, false)
			state.write(' ' + node.operator + ' ')
			formatBinaryExpressionPart(state, node.right, node, true)
		}
	}),
	LogicalExpression: BinaryExpression,
	ConditionalExpression(node, state) {
		if (
			EXPRESSIONS_PRECEDENCE[node.test.type] >
			EXPRESSIONS_PRECEDENCE.ConditionalExpression
		) {
			this[node.test.type](node.test, state)
		} else {
			state.write('(')
			this[node.test.type](node.test, state)
			state.write(')')
		}
		state.write(' ? ')
		this[node.consequent.type](node.consequent, state)
		state.write(' : ')
		this[node.alternate.type](node.alternate, state)
	},
	NewExpression(node, state) {
		state.write('new ')
		if (
			EXPRESSIONS_PRECEDENCE[node.callee.type] <
				EXPRESSIONS_PRECEDENCE.CallExpression ||
			hasCallExpression(node.callee)
		) {
			state.write('(')
			this[node.callee.type](node.callee, state)
			state.write(')')
		} else {
			this[node.callee.type](node.callee, state)
		}
		formatSequence(state, node['arguments'])
	},
	CallExpression(node, state) {
		if (node.callee && node.callee.name == 'require') {
			if (node.arguments[0].type == 'Literal') {
				if (state.moduleFragments)
					return state.addFragment(node)

				// we transform the require for Mopus
				if (state.processRequires)
					return state.write(state.module(node.truePath))
			}
		}

		if (
			EXPRESSIONS_PRECEDENCE[node.callee.type] <
			EXPRESSIONS_PRECEDENCE.CallExpression
		) {
			state.write('(')
			this[node.callee.type](node.callee, state)
			state.write(')')
		} else {
			this[node.callee.type](node.callee, state)
		}
		formatSequence(state, node['arguments'])
	},
	MemberExpression(node, state) {
		if (
			EXPRESSIONS_PRECEDENCE[node.object.type] <
			EXPRESSIONS_PRECEDENCE.MemberExpression
		) {
			state.write('(')
			this[node.object.type](node.object, state)
			state.write(')')
		} else {
			this[node.object.type](node.object, state)
		}
		if (node.computed) {
			state.write('[')
			this[node.property.type](node.property, state)
			state.write(']')
		} else {
			state.write('.')
			this[node.property.type](node.property, state)
		}
	},
	MetaProperty(node, state) {
		state.write(node.meta.name + '.' + node.property.name, node)
	},
	Identifier(node, state) {
		state.write(node.name, node)
	},
	Literal(node, state) {
		if (node.raw != null) {
			state.write(node.raw, node)
		} else if (node.regex != null) {
			this.RegExpLiteral(node, state)
		} else {
			state.write(stringify(node.value), node)
		}
	},
	RegExpLiteral(node, state) {
		const { regex } = node
		state.write(`/${regex.pattern}/${regex.flags}`, node)
	},


	// Class declaration
	ClassDeclaration(node, state) {
		if (state.moduleFragments)
			return state.addFragment(node)


		if (state.processClassFields && !node.id && node.staticFields)
			state.write('Object.defineProperties(')

		state.write('class ' + (node.id ? `${node.id.name} ` : ''), node)
		if (node.superClass) {
			state.write('extends ')
			this[node.superClass.type](node.superClass, state)
			state.write(' ')
		}
		this.ClassBody(node.body, state)

		// we then write the static fields
		if (state.processClassFields && node.staticFields) {
			const indent = state.indent.repeat(state.indentLevel)


			if (!node.id) {
				state.write(',\n' + indent + 'Object.getOwnPropertyDescriptors(')
				this.ObjectExpression(node.staticFields, state)
				state.write('))')
			}

			else {
				// first, methods (and getters/setters)
				if (node.staticFields.methods.properties.length) {
					state.write('\n' + indent + 'Object.defineProperties('+node.id.name+',\n')
					state.write(indent + 'Object.getOwnPropertyDescriptors(')
					this.ObjectExpression(node.staticFields.methods, state)
					state.write('))')
				}

				// then, simple static values
				for (let field of node.staticFields.fields.properties) {
					state.write('\n' + indent + node.id.name + '.')
					this[field.key.type](field.key, state)
					state.write(' = ')
					this[field.value.type](field.value, state)
				}
			}
		}
	},


	// Multiple class fields
	ClassFields(node, state) {
		// -- Using [[set]]
		const indent = state.indent.repeat(state.indentLevel)
		let first = true
		for (let field of node.body) {
			state.write(indent)
			this.FieldDefinition(field, state, true)
			state.write(state.lineEnd)
		}

		// -- Using [[define]]
		// state.write('Object.defineProperties(this, {\n')
		// const indent = state.indent.repeat(state.indentLevel++)
		// for (let field of node.body) {
		//   state.write(indent + state.indent)
		//   this[field.key.type](field.key, state)
			
		//   state.write(': {writable:true,configurable:true,enumerable:true,value: ')
		//   this[field.value.type](field.value, state)
		//   state.write(' }\n')
		// }
		// state.indentLevel--
		// state.write(indent + '})')
	},

	// Single class field
	FieldDefinition(node, state, inClass=false) {
		if (node.static && !state.processClassFields)
			state.write('static ')
		if (state.processClassFields && inClass)
			state.write('this.')
		this[node.key.type](node.key, state)
		state.write(inClass || !state.processClassFields ? ' = ' : ': ')
		this[node.value.type](node.value, state)
	},
}
