
'use strict';

/**
 * @param {Function} a - Function is called using the result of 'b' as the argument
 * @param {Function} b - Function 'b' is executed first with the callback arguments; the result is passed to 'a'
 * @returns {*}
 */
function compose (a, b)
{
	return (...args) => a(b(...args));
}

class CSSRuleVo
{
	/**
	 * @param {string} selector
	 * @param {Array.<string>} rules
	 */
	constructor(selector, rules)
	{
		this.selector = selector;
		this.rules = rules;
		Object.freeze(this);
	}
}

/**
 * @param {string} selector
 * @param {Array.<string>} rules
 * @returns {CSSRuleVo}
 */
const createCSSRuleVo = (selector, rules) => new CSSRuleVo(selector, rules);

/**
 * @param {CSSRuleVo} cssRuleVo
 * @returns {string}
 */
const convertCSSRuleToString = cssRuleVo => `${cssRuleVo.selector} { ${cssRuleVo.rules.join(';')} }`;


/**
 * @callback createCSSRuleCallback
 * @param {string} selector
 * @param {Array.<string>} rules
 * @returns {string}
 */

/**
 * @type {createCSSRuleCallback}
 */
const createCSSRule = compose(convertCSSRuleToString, createCSSRuleVo);


/**
 * @param {string} id [id=dynamic-style]
 * @returns {CSSStyleSheet}
 */
const createStyleElement = (id = 'dynamic-rules') => {

	/**
	 * @type {HTMLStyleElement}
	 */
	const style = document.createElement('style');
	style.setAttribute('id', id);
	style.setAttribute('type', 'text/css');
	document.head.appendChild(style);
	
	return style.sheet;
}


/**
 * @type {string}
 */
const htmlRule = createCSSRule('html', [
	'margin: 10px'
]);

/**
 * @type {string}
 */
const bodyRule = createCSSRule('body', [
	'background-color:purple',
	'border:20px solid orange'
]);

/**
 * @type {CSSStyleSheet}
 */
const dynamicComponentStyles = createStyleElement('dynamic-component-rules');

dynamicComponentStyles.insertRule(htmlRule, dynamicComponentStyles.cssRules.length);
dynamicComponentStyles.insertRule(bodyRule, dynamicComponentStyles.cssRules.length);


