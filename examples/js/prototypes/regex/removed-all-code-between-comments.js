/**
 * remove all code defined by start and end code comments
 * @example
 * /\* start-test-block *\/
 * 
 * REMOVE ALL CODE USED FOR EXPORTING UNIT TEST SPECIFIC CODE
 * 
 * /\* end-test-block *\/
 */
const removeCodeBlock = /\/\* start-test-block \*\/((?:.|\n)*)\/\* end-test-block \*\//gm


