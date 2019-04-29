var Action = require('../../../fsmpack/statemachine/actions/Action');

/**
 * @private
 * @extends Action
 */
function WaitAction(/*id, settings*/) {
	Action.apply(this, arguments);

	/**
	 * Current time, in milliseconds.
	 * @type {number}
	 */
	this.currentTime = 0;

	/**
	 * Wait time, in milliseconds.
	 * @type {number}
	 */
	this.totalWait = 0;

	this.completed = false;
}

WaitAction.prototype = Object.create(Action.prototype);
WaitAction.prototype.constructor = WaitAction;

WaitAction.external = {
	key: 'Wait',
	name: 'Wait',
	type: 'animation',
	description: 'Performs a transition after a specified amount of time. A random time can be set, this will add between 0 and the set random time to the specified wait time.',
	canTransition: true,
	parameters: [{
		name: 'Time (ms)',
		key: 'waitTime',
		type: 'float',
		description: 'Base time in milliseconds before transition fires.',
		'default': 5000
	}, {
		name: 'Random (ms)',
		key: 'randomTime',
		type: 'float',
		description: 'A random number of milliseconds (between 0 and this value) will be added to the base wait time.',
		'default': 0
	}],
	transitions: [{
		key: 'timeUp',
		description: 'State to transition to when time up.'
	}]
};

WaitAction.getTransitionLabel = function (transitionKey/*, actionConfig*/){
	return transitionKey === 'timeUp' ? 'On Wait End' : undefined;
};

WaitAction.prototype.enter = function () {
	this.completed = false;
	this.currentTime = 0;
	this.totalWait = parseFloat(this.waitTime) + Math.random() * parseFloat(this.randomTime);
};

WaitAction.prototype.update = function (fsm) {
	this.currentTime += fsm.getTpf() * 1000;
	if (this.currentTime >= this.totalWait && !this.completed) {
		this.completed = true;
		fsm.send(this.transitions.timeUp);
	}
};

module.exports = WaitAction;