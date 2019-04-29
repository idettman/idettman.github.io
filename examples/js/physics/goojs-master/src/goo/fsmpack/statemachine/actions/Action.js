var FsmUtils = require('../../../fsmpack/statemachine/FsmUtils');

/**
 * @param {string} id
 * @param {Object} settings
 * @private
 */
function Action(id, settings) {
	this.id = id;
	this.configure(settings || {});
}

/* this should be called by the constructor and by the handlers when new options are loaded */
Action.prototype.configure = function (settings) {
	FsmUtils.setParameters.call(this, settings, this.constructor.external.parameters);
	FsmUtils.setTransitions.call(this, settings, this.constructor.external.transitions);
};

/* this gets executed on enter - called once, when the host state becomes active */
Action.prototype.enter = function (/*fsm*/) {
};

/* this gets executed on update - called on every frame */
Action.prototype.update = function (/*fsm*/) {
};

/* this is called by external functions; also the place to cleanup whatever _setup did */
Action.prototype.exit = function (/*fsm*/) {
};

/* this is called when the machine just started */
Action.prototype.ready = function (/*fsm*/) {
};

/* this is called when the machine stops and makes sure that any changes not undone by exit methods get undone */
Action.prototype.cleanup = function (/*fsm*/) {
};

module.exports = Action;
