
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


/**
 * @typedef {{selector: string, rules: Array.<string>}} CSSRuleVo
 */

/**
 * @param {string} selector
 * @param {Array.<string>} rules
 * @returns {CSSRuleVo}
 */
const createCSSRuleVo = (selector, rules) => {
	return Object.create(Object.prototype, {
		selector: {
			value: selector
		},
		rules: {
			value: rules
		}
	});
};

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
const dynamicComponetStyles = createStyleElement('dynamic-component-rules');

dynamicComponetStyles.insertRule(htmlRule, dynamicComponetStyles.cssRules.length);
dynamicComponetStyles.insertRule(bodyRule, dynamicComponetStyles.cssRules.length);


