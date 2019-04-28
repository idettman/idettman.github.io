
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
 * @param {CSSRuleVo} cssRuleVo
 * @returns {string}
 */
const convertCSSRuleCSSTextToString = cssRuleVo => cssRuleVo.rules.join(';');

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
 * @type {createCSSRuleCallback}
 */
const createCSSText = compose(convertCSSRuleCSSTextToString, createCSSRuleVo);


/**
 * @param {Document} document
 * @param {string} id [id=dynamic-style]
 * @returns {CSSStyleSheet}
 */
const createStyleElement = (document, id = 'dynamic-rules') => {

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
	'height: 100%',
	'margin: 0'
]);

/**
 * @type {string}
 */
const bodyRule = createCSSRule('body', [
	'background-color: purple',
	'border: 6px solid white',
	'height: 100%',
	'box-sizing: border-box',
	'margin: 0'
]);

/**
 * @type {CSSStyleSheet}
 */
const dynamicComponentStyles = createStyleElement(document, 'dynamic-component-rules');

dynamicComponentStyles.insertRule(htmlRule, dynamicComponentStyles.cssRules.length);
dynamicComponentStyles.insertRule(bodyRule, dynamicComponentStyles.cssRules.length);

setTimeout(function ()
{
	// TODO Refactor CSSRuleVo into two components and associate them
	// this will make updating the cssText more granular

	dynamicComponentStyles.rules[0].style.cssText = createCSSText('html', [
		'height: 95%',
		'margin: 20px'
	]);

	console.dir(dynamicComponentStyles);
}, 3000);

