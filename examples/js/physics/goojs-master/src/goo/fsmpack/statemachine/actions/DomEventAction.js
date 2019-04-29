var Action = require('../../../fsmpack/statemachine/actions/Action');

function DomEventAction(/*id, settings*/) {
	Action.apply(this, arguments);

	this.domElements = null;
}

DomEventAction.prototype = Object.create(Action.prototype);
DomEventAction.prototype.constructor = DomEventAction;

DomEventAction.external = {
	key: 'domEvent',
	name: 'DOM Event Listen',
	type: 'misc',
	description: 'Adds a DOM event listener on one or many elements (specified by a query selector), and performs a transition on a given event.',
	canTransition: true,
	parameters: [{
		name: 'Event name',
		key: 'eventName',
		type: 'string',
		description: 'DOM event to listen to, for example "click", "mousedown", "keydown", etc.',
		'default': 'click'
	},{
		name: 'Query Selector',
		key: 'querySelector',
		type: 'string',
		description: 'Query selector that matches your DOM element(s). For example, set "canvas" if you want to match all <canvas> elements, or ".myClass" to match all elements with your class.',
		'default': 'body'
	},{
		name: 'Use capture',
		key: 'useCapture',
		type: 'boolean',
		description: '',
		'default': true
	},{
		name: 'Stop propagation',
		key: 'stopPropagation',
		type: 'boolean',
		description: '',
		'default': true
	},{
		name: 'Prevent Default',
		key: 'preventDefault',
		type: 'boolean',
		description: '',
		'default': false
	}],
	transitions: [{
		key: 'event',
		description: 'State to transition to when the DOM event triggers.'
	}]
};

DomEventAction.getTransitionLabel = function (transitionKey, actionConfig) {
	return 'On ' + actionConfig.options.eventName;
};

DomEventAction.prototype.enter = function (fsm) {
	this.eventListener = function (evt) {
		fsm.send(this.transitions.event);
		if (this.stopPropagation) {
			evt.stopPropagation();
		}
		if (this.preventDefault) {
			evt.preventDefault();
		}
	}.bind(this);

	var elements = this.domElements = document.querySelectorAll(this.querySelector);
	for (var i = 0; i < elements.length; i++) {
		elements[i].addEventListener(this.eventName, this.eventListener, !!this.useCapture);
	}
};

DomEventAction.prototype.exit = function () {
	var elements = this.domElements;
	if (!elements) {
		return;
	}
	for (var i = 0; i < elements.length; i++) {
		elements[i].removeEventListener(this.eventName, this.eventListener);
	}
	this.domElements = null;
};

module.exports = DomEventAction;