
const fs = require('fs')
const acorn = require('acorn')
const classFields = require('acorn-class-fields')
const parser = acorn.Parser.extend(classFields)

const src = String(fs.readFileSync('./Super.js'))
let ast = parser.parse(src, {sourceType: 'module'})

console.log(ast)
