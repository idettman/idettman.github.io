/**
 * This module adds User ID support to prebid.js
 */

/**
 * @typedef {Object} SubmoduleConfig
 * @property {string} name - primary key to link with configuration data, and logging details
 * @property {SubmoduleStorage} [storage] - browser storage type, key, and expiration data
 * @property {SubmoduleParams} [params] - contains url and partner values for constructing request url
 * @property {Object} [value] - properties to pass directly (no processing or storing) to bid adapters
 */

/**
 * @typedef {Object} SubmoduleStorage
 * @property {string} type - browser storage type (html5 or cookie)
 * @property {string} name - key name to use when saving/reading to local storage or cookies
 * @property {number} [expires] - time to live for browser cookie or local storage item
 */

/**
 * @typedef {Object} SubmoduleParams
 * @property {string} partner - partner url param value
 * @property {string} url - webservice request url used to load Id data
 */

/**
 * @typedef {Object} Submodule
 * @property {string} name - name used connect submodule and the config, IE: submodule.name == submoduleConfig.name
 * @property {decode} decode - decode the user's id data that was returned from this submodule's getId method
 * @property {getId} getId - returns user's id data or a callback that will be asynchronous with a callback passed as the argument to return the response
 */

/**
 * @callback getId
 * @param {SubmoduleParams} [submoduleConfigParams] - optional, contains url and partner properties used construct the request to retrieve user id data
 * @param {Object} [consentData] - optional, GDPR consent data for testing before making user id request
 * @returns {(loadUserIdCallback|Object|string)}
 */

/**
 * @callback loadUserIdCallback
 * @param {function} loadUserIdCompleteCallback - called after request to endpoint has completed or timeout/failed
 */

/**
 * @callback loadUserIdCompleteCallback
 * @param {Object} [response] - user's id data if request completed successfully
 */

/**
 * @callback decode
 * @param {(Object|string}} idData - stored or loaded user data
 * @returns {Object} - user id formatted for passing to bid adapters
 */

/**
 * @typedef {Object} SubmoduleContainer
 * @property {Submodule} submodule - submodule for ID Type implementing decode and getId methods
 * @property {SubmoduleConfig} submoduleConfig - configuration values save/retrieve user's id data from cookies/localStorage
 * @property {Object} [idObj] - decoded User ID data that will be appended to bids
 * @property {function} [callback] - asynchronous function responsible for making a request to obtain the user's id data
 */

import {ajax} from '../src/ajax.js';
import {config} from '../src/config.js';
import events from '../src/events.js';
import * as utils from '../src/utils.js';
import find from 'core-js/library/fn/array/find';
import {gdprDataHandler} from '../src/adapterManager.js';

const CONSTANTS = require('../src/constants.json');

const MODULE_NAME = 'User ID';
const COOKIE = 'cookie';
const LOCAL_STORAGE = 'html5';
const DEFAULT_SYNC_DELAY = 500;

/**
 * @type {number} - delay after auction to make webrequests for id data
 */
export let syncDelay;

/**
 * @type {Array.<SubmoduleContainer>}
 */
export let submodules;

/**
 * @type {Array.<SubmoduleContainer>}
 */
let initializedSubmodules;

/**
 * @alias {Submodule}
 */
export const unifiedIdSubmodule = {
    name: 'unifiedId',
    decode(value) {
        return {
            'tdid': value['TDID']
        }
    },
    getId(submoduleConfigParams, consentData) {
        const partner = (submoduleConfigParams && typeof submoduleConfigParams.partner === 'string') ? submoduleConfigParams.partner : 'prebid';
        const url = (submoduleConfigParams && typeof submoduleConfigParams.url === 'string') ? submoduleConfigParams.url : `http://match.adsrvr.org/track/rid?ttd_pid=${partner}&fmt=json`;

        return function (callback) {
            ajax(url, response => {
                let responseObj;
                if (response) {
                    try {
                        responseObj = JSON.parse(response);
                    } catch (error) {
                        utils.logError(error);
                    }
                }
                callback(responseObj);
            }, undefined, { method: 'GET' });
        }
    }
};

/**
 * @alias {Submodule}
 */
export const pubCommonIdSubmodule = {
    name: 'pubCommonId',
    decode(value) {
        return {
            'pubcid': value
        }
    },
    getId() {
        // If the page includes its own pubcid object, then use that instead.
        if (typeof window['PublisherCommonId'] === 'object') {
            return window['PublisherCommonId'].getId();
        }
        // Otherwise get the existing cookie or create a new id.
        return utils.generateUUID();
    }
};

/**
 * @param {SubmoduleStorage} storage
 * @param {string} value
 * @param {number|string} expires
 */
export function setStoredValue(storage, value, expires) {
    try {
        const valueStr = (typeof value === 'object') ? JSON.stringify(value) : value;
        const expiresStr = (new Date(Date.now() + (expires * (60 * 60 * 24 * 1000)))).toUTCString();

        if (storage.type === COOKIE) {
            utils.setCookie(storage.name, valueStr, expiresStr);
        } else if (storage.type === LOCAL_STORAGE) {
            localStorage.setItem(`${storage.name}_exp`, expiresStr);
            localStorage.setItem(storage.name, encodeURIComponent(valueStr));
        }
    } catch (error) {
        utils.logError(error);
    }
}

/**
 * @param {SubmoduleStorage} storage
 * @returns {string}
 */
export function getStoredValue(storage) {
    let storedValue;
    try {
        if (storage.type === COOKIE) {
            storedValue = utils.getCookie(storage.name);
        } else if (storage.type === LOCAL_STORAGE) {
            const storedValueExp = localStorage.getItem(`${storage.name}_exp`);
            // empty string means no expiration set
            if (storedValueExp === '') {
                storedValue = localStorage.getItem(storage.name);
            } else if (storedValueExp) {
                if ((new Date(storedValueExp)).getTime() - Date.now() > 0) {
                    storedValue = decodeURIComponent(localStorage.getItem(storage.name));
                }
            }
        }
        // we support storing either a string or a stringified object,
        // so we test if the string contains an stringified object, and if so convert to an object
        if (typeof storedValue === 'string' && storedValue.charAt(0) === '{') {
            storedValue = JSON.parse(storedValue);
        }
    } catch (e) {
        utils.logError(e);
    }
    return storedValue;
}

/**
 * test if consent module is present, applies, and is valid for local storage (purpose 1)
 * @param {Object} consentData
 * @returns {boolean}
 */
export function hasGDPRConsent(consentData) {
    if (consentData && typeof consentData.gdprApplies === 'boolean' && consentData.gdprApplies) {
        if (!consentData.consentString) {
            return false;
        }
        if (consentData.vendorData && consentData.vendorData.purposeConsents && consentData.vendorData.purposeConsents['1'] === false) {
            return false;
        }
    }
    return true;
}

/**
 * @param {SubmoduleContainer[]} submodules
 * @param {function} [processCompleted] - not required, executed when all callbacks have returned responses
 */
export function processSubmoduleCallbacks(submodules, processCompleted) {
    submodules.forEach(function(submodule) {
        submodule.callback(function callbackCompleted (idObj) {
            // clear callback, this prop is used to test if all submodule callbacks are complete below
            submodule.callback = undefined;

            // if valid, id data should be saved to cookie/html storage
            if (idObj) {
                setStoredValue(submodule.config.storage, idObj, submodule.config.storage.expires);

                // cache decoded value (this is copied to every adUnit bid)
                submodule.idObj = submodule.submodule.decode(idObj);
            } else {
                utils.logError(`${MODULE_NAME}: ${submodule.submodule.name} - request id responded with an empty value`);
            }

            // Done when every submodule callback is set to 'undefined'
            if (submodules.every(item => typeof item.callback === 'undefined')) {
                // Notify done through calling processCompleted
                if (typeof processCompleted === 'function') {
                    processCompleted();
                }
            }
        });
    });
}

/**
 * @param {Object[]} adUnits
 * @param {SubmoduleContainer[]} submodules
 */
export function addIdDataToAdUnitBids(adUnits, submodules) {
    const submodulesWithIds = submodules.filter(item => typeof item.idObj === 'object' && item.idObj !== null);
    if (submodulesWithIds.length) {
        if (adUnits) {
            adUnits.forEach(adUnit => {
                adUnit.bids.forEach(bid => {
                    // append the User ID property to bid
                    bid.userId = submodulesWithIds.reduce((carry, item) => {
                        Object.keys(item.idObj).forEach(key => {
                            carry[key] = item.idObj[key];
                        });
                        return carry;
                    }, {});
                });
            });
        }
    }
}

/**
 * Hook is executed before adapters, but after consentManagement. Consent data is requied because
 * this module requires GDPR consent with Purpose #1 to save data locally.
 * The two main actions handled by the hook are:
 * 1. check gdpr consentData and handle submodule initialization.
 * 2. append user id data (loaded from cookied/html or from the getId method) to bids to be accessed in adapters.
 * @param {object} reqBidsConfigObj required; This is the same param that's used in pbjs.requestBids.
 * @param {function} fn required; The next function in the chain, used by hook.js
 */
export function requestBidsHook(fn, reqBidsConfigObj) {
    // initialize submodules only when undefined
    if (typeof initializedSubmodules === 'undefined') {
        initializedSubmodules = initSubmodules(submodules, gdprDataHandler.getConsentData());
        if (initializedSubmodules.length) {
            // list of sumodules that have callbacks that need to be executed
            const submodulesWithCallbacks = initializedSubmodules.filter(item => typeof item.callback === 'function');

            if (submodulesWithCallbacks.length) {
                // wait for auction complete before processing submodule callbacks
                events.on(CONSTANTS.EVENTS.AUCTION_END, function auctionEndHandler() {
                    events.off(CONSTANTS.EVENTS.AUCTION_END, auctionEndHandler);

                    // when syncDelay is zero, process callbacks now, otherwise dealy process with a setTimeout
                    if (syncDelay > 0) {
                        setTimeout(function() {
                            processSubmoduleCallbacks(submodulesWithCallbacks);
                        }, syncDelay);
                    } else {
                        processSubmoduleCallbacks(submodulesWithCallbacks);
                    }
                });
            }
        }
    }

    // pass available user id data to bid adapters
    addIdDataToAdUnitBids(reqBidsConfigObj.adUnits || $$PREBID_GLOBAL$$.adUnits, initializedSubmodules);

    // calling fn allows prebid to continue processing
    return fn.call(this, reqBidsConfigObj);
}

/**
 * @param {Object[]} submodules
 * @param {Object} consentData
 * @returns {string[]} initialized submodules
 */
export function initSubmodules(submodules, consentData) {
    // gdpr consent with purpose one is required, otherwise exit immediately
    if (!hasGDPRConsent(consentData)) {
        utils.logWarn(`${MODULE_NAME} - gdpr permission not valid for local storage, exit module`);
        return [];
    }
    return submodules.reduce((carry, item) => {
        // There are two submodule configuration types to handle: storage or value
        // 1. storage: retrieve user id data from cookie/html storage or with the submodule's getId method
        // 2. value: pass directly to bids
        if (item.config && item.config.storage) {
            const storedId = getStoredValue(item.config.storage);
            if (storedId) {
                // cache decoded value (this is copied to every adUnit bid)
                item.idObj = item.submodule.decode(storedId);
            } else {
                // getId will return user id data or a function that will load the data
                const getIdResult = item.submodule.getId(item.config.params, consentData);

                // If the getId result has a type of function, it is asynchronous and cannot be called until later
                if (typeof getIdResult === 'function') {
                    item.callback = getIdResult;
                } else {
                    // A getId result that is not a function is assumed to be valid user id data, which should be saved to users local storage
                    setStoredValue(item.config.storage, getIdResult, item.config.storage.expires);

                    // cache decoded value (this is copied to every adUnit bid)
                    item.idObj = item.submodule.decode(getIdResult);
                }
            }
        } else if (item.config.value) {
            // cache decoded value (this is copied to every adUnit bid)
            item.idObj = item.config.value;
        }

        carry.push(item);
        return carry;
    }, []);
}

/**
 * list of submodule configurations with valid 'storage' or 'value' obj definitions
 * * storage config: contains values for storing/retrieving User ID data in browser storage
 * * value config: object properties that are copied to bids (without saving to storage)
 * @param {SubmoduleConfig[]} submoduleConfigs
 * @param {Submodule[]} enabledSubmodules
 * @returns {SubmoduleConfig[]}
 */
export function getValidSubmoduleConfigs(submoduleConfigs, enabledSubmodules) {
    if (!Array.isArray(submoduleConfigs)) {
        return [];
    }

    // list of browser enabled storage types
    const validStorageTypes = [];
    if (utils.localStorageIsEnabled()) {
        validStorageTypes.push(LOCAL_STORAGE);
    }
    if (utils.cookiesAreEnabled()) {
        validStorageTypes.push(COOKIE);
    }

    return submoduleConfigs.reduce((carry, submoduleConfig) => {
        // every submodule config obj must contain a valid 'name'
        if (!submoduleConfig || typeof submoduleConfig.name !== 'string' || !submoduleConfig.name) {
            return carry;
        }

        // Validate storage config
        // contains 'type' and 'name' properties with non-empty string values
        // 'type' must be a value currently enabled in the browser
        if (submoduleConfig.storage &&
            typeof submoduleConfig.storage.type === 'string' && submoduleConfig.storage.type &&
            typeof submoduleConfig.storage.name === 'string' && submoduleConfig.storage.name &&
            validStorageTypes.indexOf(submoduleConfig.storage.type) !== -1) {
            carry.push(submoduleConfig);
        } else if (submoduleConfig.value !== null && typeof submoduleConfig.value === 'object') {
            // Validate value config
            // must be valid object with at least one property
            carry.push(submoduleConfig);
        }
        return carry;
    }, []);
}

/**
 * @param config
 * @param {Array.<Submodule>} enabledSubmodules
 */
export function init (config, enabledSubmodules) {
    submodules = [];
    initializedSubmodules = undefined;

    // exit immediately if opt out cookie exists
    if (utils.cookiesAreEnabled()) {
        if (utils.getCookie('_pbjs_id_optout')) {
            utils.logInfo(`${MODULE_NAME} - opt-out cookie found, exit module`);
            return;
        }
    }

    // listen for config userSyncs to be set
    config.getConfig('usersync', ({usersync}) => {
        if (usersync) {
            syncDelay = (typeof usersync.syncDelay !== 'undefined') ? usersync.syncDelay : DEFAULT_SYNC_DELAY;

            // filter any invalid configs out
            const submoduleConfigs = getValidSubmoduleConfigs(usersync.userIds, enabledSubmodules);
            if (submoduleConfigs.length === 0) {
                // exit module, if no valid configurations exist
                return;
            }

            // get list of submodules with valid configurations
            submodules = enabledSubmodules.reduce((carry, enabledSubmodule) => {
                // try to find submodule configuration for submodule, if config exists it should be enabled
                const submoduleConfig = find(submoduleConfigs, item => item.name === enabledSubmodule.name);

                if (submoduleConfig) {
                    // append {SubmoduleContainer} containing the submodule and config
                    carry.push({
                        submodule: enabledSubmodule,
                        config: submoduleConfig,
                        idObj: undefined
                    });
                }
                return carry;
            }, []);

            // complete initialization if any submodules exist
            if (submodules.length) {
                // priority has been set so it loads after consentManagement (which has a priority of 50)
                $$PREBID_GLOBAL$$.requestBids.before(requestBidsHook, 40);
                utils.logInfo(`${MODULE_NAME} - usersync config updated for ${submodules.length} submodules`);
            }
        }
    });
}

init(config, [pubCommonIdSubmodule, unifiedIdSubmodule]);
