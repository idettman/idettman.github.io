'use strict';

/**
 * @function
 * @param containerElement {HTMLElement}
 */
var view = function view (containerElement, cssText)
{
	// @type {HTMLElement}
	this.element;

	this.init = () => {
		this.element = document.createElement('div');
		this.element.style.cssText = cssText;
		containerElement.appendChild(this.element);

		console.log('init');
	};

	this.destroy = () => {
		if (this.element)
		{
			if (this.element.parentNode)
			{
				this.element.parentNode.removeChild(this.element);
			}
			this.element = undefined;
		}

		console.log('destroy');
	};
};

/**
 * @param {Document} document
 * @param {string} id
 * @returns {CSSStyleSheet}
 */
function createStyleSheet (document, id)
{
	/* @type {HTMLStyleElement} */
	var style = document.createElement('style');
	style.setAttribute('id', id);
	style.appendChild(document.createTextNode(''));
	document.head.appendChild(style);
	return style.sheet;
}

/**
 * @param {string} rule
 * @returns {number} - index where rule was inserted; can be used to update or delete rule
 */
function addRule (rule)
{
	console.log('addRule: %O', rule);

	let ruleIndex = this.cssRules.length;
	this.insertRule(rule, ruleIndex);
	return ruleIndex;
}

/**
 * @param containerObject {*}
 * @param containerMethod {Function}
 * @returns {Function}
 */
function combine(containerObject, containerMethod)
{
	console.log('combine: %O %O', containerObject, containerMethod);
	return function combineApplyArguments (...args)
	{
		return containerMethod.apply(containerObject, args);
	}
}

/**
 * @type {{
 * 	selector: string,
 * 	rules: Array.<string>
 * }}
 */
const ruleVo = {
	selector: null,
	rules: null
};

/**
 * @return {string}
 */
function converToString ()
{
	return `${this.selector}{` + this.rules.join(';') + `}`;
}

/**
 * @callback createCSSRuleVo
 * @param {string} selector
 * @param {Array.<string>} ruleProperties
 * @returns {ruleVo}
 */
/**
 * @param {string} selector
 * @param {Array.<string>} ruleProperties
 * @returns {createCSSRuleVo}
 */
function getRuleVo (selector, ruleProperties)
{
	this.selector = selector;
	this.rules = ruleProperties;
	return this;
}

/**
 * @type {createCSSRuleVo}
 */
const populateRule = combine (ruleVo, getRuleVo);

const rule1 = populateRule('body', ['background-color:purple']);
console.log('rule1 %O', rule1);

function compose(...args)
{
	return function (scope, result)
	{
		for (let i = args.length -1; i > -1; i--)
		{
			result = args[i].call(scope, result);
		}
	}
}

var __slice = Array.prototype.slice;

function sequence (...args)
{
	return compose.apply(this, __slice.call(args).reverse());
}

/**
 * @type {CSSStyleSheet} sheet
 */
const sheet = createStyleSheet(document, 'component-blocks');

/**
 * @callback addRuleToStyleSheet
 * @param {string} rule
 * @returns {number}
 */
/**
 * @type {addRuleToStyleSheet}
 */
const addRuleToCss = combine(sheet, addRule);

//console.log('addRuleToCss %O', addRuleToCss);
//addRuleToCss(populateRule('body', ['background-color:purple']));
//addRuleToCss(ruleFactory('body', ['background-color:green','border: 10px solid black']));
// console.dir(sheet);
