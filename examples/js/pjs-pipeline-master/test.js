require('source-map-support').install();
var traceur = require('traceur');
traceur.require.makeDefault();
require('./src/tests.js');
