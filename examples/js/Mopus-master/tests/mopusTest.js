
const Mopus = require('../package/src/Mopus.js')


const mopus = new Mopus({
	entry: ['./Hero.js', './zabu.caca'],
	outputDir: 'dist',
	// processExports: false,
	// processImports: false,
	// processRequires: false,
	// processClassFields: false,
	rules: {
		'*.caca': 'raw-file'
	},

	project: {
		'standard': {},
		// 'noExports': {processExports: false},
		// 'noClassFields': {processClassFields: false},
		// 'minified': {minify: true},
	},

	logTimers: true,
	logInput: true,
	logOutput: true,
	logErrors: true,
})

// console.log(mopus.modules)
mopus.compile()
