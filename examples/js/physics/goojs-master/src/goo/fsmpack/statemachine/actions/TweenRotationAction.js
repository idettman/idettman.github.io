var Action = require('../../../fsmpack/statemachine/actions/Action');
var Quaternion = require('../../../math/Quaternion');
var Matrix3 = require('../../../math/Matrix3');
var MathUtils = require('../../../math/MathUtils');
var Easing = require('../../../util/Easing');

function TweenRotationAction(/*id, settings*/) {
	Action.apply(this, arguments);

	this.quatFrom = new Quaternion();
	this.quatTo = new Quaternion();
	this.quatFinal = new Quaternion();
	this.completed = false;
}

TweenRotationAction.prototype = Object.create(Action.prototype);
TweenRotationAction.prototype.constructor = TweenRotationAction;

TweenRotationAction.external = {
	key: 'Tween Rotation',
	name: 'Tween Rotate',
	type: 'animation',
	description: 'Transition to the set rotation, in angles.',
	canTransition: true,
	parameters: [{
		name: 'Rotation',
		key: 'to',
		type: 'rotation',
		description: 'Rotation.',
		'default': [0, 0, 0]
	}, {
		name: 'Relative',
		key: 'relative',
		type: 'boolean',
		description: 'If true add, otherwise set.',
		'default': true
	}, {
		name: 'Time (ms)',
		key: 'time',
		type: 'float',
		description: 'Time it takes for this movement to complete.',
		'default': 1000
	}, {
		name: 'Easing type',
		key: 'easing1',
		type: 'string',
		control: 'dropdown',
		description: 'Easing type.',
		'default': 'Linear',
		options: ['Linear', 'Quadratic', 'Exponential', 'Circular', 'Elastic', 'Back', 'Bounce']
	}, {
		name: 'Direction',
		key: 'easing2',
		type: 'string',
		control: 'dropdown',
		description: 'Easing direction.',
		'default': 'In',
		options: ['In', 'Out', 'InOut']
	}],
	transitions: [{
		key: 'complete',
		description: 'State to transition to when the rotation completes.'
	}]
};

TweenRotationAction.getTransitionLabel = function (transitionKey/*, actionConfig*/){
	return transitionKey === 'complete' ? 'On Tween Rotation Complete' : undefined;
};

TweenRotationAction.prototype.enter = function (fsm) {
	var entity = fsm.getOwnerEntity();
	var transformComponent = entity.transformComponent.sync();

	this.startTime = fsm.getTime();

	this.quatFrom.fromRotationMatrix(transformComponent.transform.rotation);
	this.quatTo.fromRotationMatrix(new Matrix3().fromAngles(this.to[0] * MathUtils.DEG_TO_RAD, this.to[1] * MathUtils.DEG_TO_RAD, this.to[2] * MathUtils.DEG_TO_RAD));
	if (this.relative) {
		this.quatTo.mul(this.quatFrom);
	}
	this.completed = false;
};

TweenRotationAction.prototype.update = function (fsm) {
	if (this.completed) {
		return;
	}
	var entity = fsm.getOwnerEntity();
	var transform = entity.transformComponent.sync().transform;

	var t = Math.min((fsm.getTime() - this.startTime) * 1000 / this.time, 1);
	var fT = Easing[this.easing1][this.easing2](t);
	Quaternion.slerp(this.quatFrom, this.quatTo, fT, this.quatFinal);

	this.quatFinal.toRotationMatrix(transform.rotation);
	entity.transformComponent.setUpdated();

	if (t >= 1) {
		fsm.send(this.transitions.complete);
		this.completed = true;
	}
};

module.exports = TweenRotationAction;