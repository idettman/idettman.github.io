
const Mopus = require('../package/src/Mopus.js')


const mopus = new Mopus({
	folderRules: {
		'D$': 'myRandomFile'
	},
	target: 'node',
	input: `
		import testA from './testFolderA';
		import testB from './testFolderB';
		import testC from './testFolderC';
		import testD from './testFolderD';
		console.log(testA)
		console.log(testB)
		console.log(testC)
		console.log(testD)
	`
})

// console.log(mopus.project.mainModule)
mopus.compile()