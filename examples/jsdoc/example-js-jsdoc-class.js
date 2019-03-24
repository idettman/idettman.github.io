// GREAT EXAMPLES!!!!
// ON COMPLEX ISSUES!!!!!!
// ISAAC
// ISAAC
// ISAAC
// ISAAC
// ISAAC

// SAYS;

// https://github.com/jsdoc3/jsdoc/issues/260
// https://github.com/jsdoc3/jsdoc/issues/260

// Ability to document callback arguments #260

// Via email, @micmath pointed out that there's already a way to do this by documenting the callback as an inner function. No new tags required! Here's an example:

/**
 * Classy class.
 * @class
 */
function TestClass() {}

/**
 * Called after doing asynchronous stuff.
 * @name TestClass~TestCb
 * @function
 * @param {String} err - Information about the error.
 * @param {Number} int - An integer of joy.
 * @return undefined
 */

/**
 * Do asynchronous stuff.
 * @param {string} name - A name.
 * @param {TestClass~TestCb} callback - The callback function.
 * @return undefined
 */
TestClass.prototype.doAsyncStuff = function(name, callback) {
    // ...
};