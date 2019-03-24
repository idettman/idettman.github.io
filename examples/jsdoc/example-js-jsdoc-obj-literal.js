/**
 * @typedef {Object} InitParams
 * @property {number} [timeout]
 * @property {boolean} [skip]
 */

/**
 * Result object passed to callback
 * @typedef {Object} CallbackResult
 * @property {string} status - callback result status
 * @property {Object|string|number|Array} [data]
 */

/**
 * General use callback
 * @callback stdCallback
 * @param {CallbackResult} result
 */

/**
 * @namespace scripts
 */
var scripts = {
    /**
     * @memberof scripts
     */
    'common': {
        /**
         * @function
         * @param {InitParams} params - initialization params
         * @param {stdCallback} [callback] - function called on initialization complete
         * @returns {boolean} - Returns initialize success or failure
         * @memberOf scripts.common
         */
        init: function(params, callback) {
            if (params.skip) {

            }
            if (params.timeout) {

            }
            if (callback) {

            }
            return true;
        },

        finalize: function(result) {

        }
    },
    /**
     * @name home
     * @memberof scripts
     */
    'home': {
        init: function() {

        },
        finalize: function() {

        }
    },
};

scripts.common.init({
        timeout: 3,
        skip: false
    },
    function(result) {
        if (!result) return;
        if (result.data) {

        }
        if (result.status) {

        }
    });

/**
 * Refer to the property with {@link scripts.common.} (note the double quotes).
 */