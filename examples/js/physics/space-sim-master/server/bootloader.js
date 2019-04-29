/**
 * Babelifier and common library setup
 * Supports FILE environment variable & --file command line flag
 */

'use strict' // eslint-disable-line strict

GLOBAL._ = require('lodash')
GLOBAL.moment = require('moment')

const path = require('path')
const argv = require('minimist')(process.argv.slice(2))

let file = argv.file || process.env.FILE || './index'
try { file = JSON.parse(file) } catch (e) { /**/ }
file = path.resolve(__dirname, file)

require('babel-core/register')
require(file)
