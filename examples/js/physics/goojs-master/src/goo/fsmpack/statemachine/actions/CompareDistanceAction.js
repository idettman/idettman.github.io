var Action = require('../../../fsmpack/statemachine/actions/Action');
var Renderer = require('../../../renderer/Renderer');

function CompareDistanceAction(/*id, settings*/) {
	Action.apply(this, arguments);
}
CompareDistanceAction.prototype = Object.create(Action.prototype);
CompareDistanceAction.prototype.constructor = CompareDistanceAction;

CompareDistanceAction.external = {
	key: 'Compare Distance',
	name: 'Camera Distance',
	type: 'collision',
	description: 'Performs a transition based on the distance to the main camera or to a location.',
	canTransition: true,
	parameters: [{
		name: 'Current camera',
		key: 'camera',
		type: 'boolean',
		description: 'Measure the distance to the current camera or to an arbitrary point.',
		'default': true
	}, {
		name: 'Position',
		key: 'position',
		type: 'position',
		description: 'Position to measure the distance to; Will be ignored if previous option is selected.',
		'default': [0, 0, 0]
	}, {
		name: 'Value',
		key: 'value',
		type: 'float',
		description: 'Value to compare to.',
		'default': 0
	}, {
		name: 'Tolerance',
		key: 'tolerance',
		type: 'float',
		'default': 0
	}, {
		name: 'Type',
		key: 'distanceType',
		type: 'string',
		control: 'dropdown',
		description: 'The type of distance.',
		'default': 'Euclidean',
		options: ['Euclidean', 'Manhattan']
	}, {
		name: 'On every frame',
		key: 'everyFrame',
		type: 'boolean',
		description: 'Repeat this action every frame.',
		'default': true
	}],
	transitions: [{
		key: 'less',
		description: 'State to transition to if the measured distance is smaller than the specified value.'
	}, {
		key: 'equal',
		description: 'State to transition to if the measured distance is about the same as the specified value.'
	}, {
		key: 'greater',
		description: 'State to transition to if the measured distance is greater than the specified value.'
	}]
};

var labels = {
	less: 'On camera distance < X',
	equal: 'On camera distance == X',
	greater: 'On camera distance > X'
};

CompareDistanceAction.getTransitionLabel = function (transitionKey /*, actionConfig*/){
	return labels[transitionKey];
};

CompareDistanceAction.prototype.compare = function (fsm) {
	var entity = fsm.getOwnerEntity();
	var translation = entity.transformComponent.sync().worldTransform.translation;
	var delta;

	if (this.camera) {
		delta = translation.clone().sub(Renderer.mainCamera.translation);
	} else {
		delta = translation.clone().subDirect(this.position[0], this.position[1], this.position[2]);
	}

	var distance;
	if (this.type === 'Euclidean') {
		distance = delta.length();
	} else {
		distance = Math.abs(delta.x) + Math.abs(delta.y) + Math.abs(delta.z);
	}
	var diff = this.value - distance;

	if (Math.abs(diff) <= this.tolerance) {
		fsm.send(this.transitions.equal);
	} else if (diff > 0) {
		fsm.send(this.transitions.less);
	} else {
		fsm.send(this.transitions.greater);
	}
};

CompareDistanceAction.prototype.enter = function (fsm) {
	if (!this.everyFrame) {
		this.compare(fsm);
	}
};

CompareDistanceAction.prototype.update = function (fsm) {
	if (this.everyFrame) {
		this.compare(fsm);
	}
};

module.exports = CompareDistanceAction;