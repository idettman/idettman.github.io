const {transform} = require('./main.js')

const src = `
class Zabu {
	x = 12
	y = 1121
}
`

console.log(transform(src))