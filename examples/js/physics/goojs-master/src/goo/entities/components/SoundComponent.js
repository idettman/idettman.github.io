var Component = require('../../entities/components/Component');
var AudioContext = require('../../sound/AudioContext');
var Vector3 = require('../../math/Vector3');
var MathUtils = require('../../math/MathUtils');

//! AT: every method here is prefixed with a check for AudioContext. Is it really needed? can it just be refactored away?
//Or, isn't just one (the first) warning enough - it might ruing everything if flooding the console

/**
 * Component that adds sound to an entity.
 * @example-link http://code.gooengine.com/latest/visual-test/goo/addons/Sound/Sound-vtest.html Working example
 * @extends {Component}
 */
function SoundComponent() {
	Component.apply(this, arguments);

	this.type = 'SoundComponent';

	this._system = null;

	/**
	 * Current sounds in the entity. Add a sound using {@link SoundComponent#addSound}.
	 * @type {Array<Sound>}
	 */
	this.sounds = [];

	this._isPanned = true;
	this._outDryNode = AudioContext.getContext().createGain();
	this._outWetNode = AudioContext.getContext().createGain();
	this.connectTo();
	this._pannerNode = AudioContext.getContext().createPanner();
	this._pannerNode.connect(this._outDryNode);
	this._inNode = AudioContext.getContext().createGain();
	this._inNode.connect(this._pannerNode);

	// The 2D sounds are always in camera space
	// Do we need another outDryNode for 2D?
	this._inNode2d = AudioContext.getContext().createGain();
	this._inNode2d.connect(this._outDryNode);

	this._oldPosition = new Vector3();
	this._position = new Vector3();
	this._orientation = new Vector3();
	this._attachedToCamera = false;

	this._autoPlayDirty = false;

	// @ifdef DEBUG
	Object.seal(this);
	// @endif
}

SoundComponent.type = 'SoundComponent';

SoundComponent.prototype = Object.create(Component.prototype);
SoundComponent.prototype.constructor = SoundComponent;

/**
 * Add a sound to the component
 * @param {Sound} sound
 */
SoundComponent.prototype.addSound = function (sound) {
	if (this.sounds.indexOf(sound) === -1) {
		if (sound.spatialize) {
			sound.connectTo([this._inNode, this._outWetNode]);
		} else {
			sound.connectTo([this._inNode2d]);
		}
		this.sounds.push(sound);
		this._autoPlayDirty = true;
	}
};

/**
 * Remove sound from component
 * @param {Sound} sound
 */
SoundComponent.prototype.removeSound = function (sound) {
	var idx = this.sounds.indexOf(sound);
	if (idx > -1) {
		sound.stop();
		this.sounds.splice(idx, 1);

		if (sound.spatialize) {
			sound.disconnectFrom([this._inNode, this._outWetNode]);
		} else {
			sound.disconnectFrom([this._inNode2d]);
		}
	}
};

/**
 * Get a component's sound by id
 * @param {string} id
 * @returns {Sound}
 */
SoundComponent.prototype.getSoundById = function (id) {
	for (var i = 0; i < this.sounds.length; i++) {
		if (this.sounds[i].id === id) {
			return this.sounds[i];
		}
	}
};

/**
 * Connect output of component to audionodes
 * @param {Object} [nodes]
 * @param {AudioNode} [nodes.dry]
 * @param {AudioNode} [nodes.wet]
 */
SoundComponent.prototype.connectTo = function (nodes) {
	this._outDryNode.disconnect();
	this._outWetNode.disconnect();
	if (nodes && nodes.dry) {
		this._outDryNode.connect(nodes.dry);
	}
	if (nodes && nodes.wet) {
		this._outWetNode.connect(nodes.wet);
	}
};

/**
 * Updates the component valueas according to config
 * @param {Object} [config]
 * @param {number} [config.volume] A number between 0 and 1.
 * @param {number} [config.reverb] A number between 0 and 1.
 */
SoundComponent.prototype.updateConfig = function (config) {
	if (config.volume !== undefined) {
		this._outDryNode.gain.value = MathUtils.clamp(config.volume, 0, 1);
	}
	if (config.reverb !== undefined) {
		this._outWetNode.gain.value = MathUtils.clamp(config.reverb, 0, 1);
	}
};

SoundComponent.prototype._autoPlaySounds = function () {
	var sounds = this.sounds;
	for (var i = 0; i < sounds.length; i++) {
		var sound = sounds[i];
		if (sound.autoPlay) {
			sound.play();
		}
	}
};

/**
 * Updates position and orientation of component and thereby all connected sounds.
 * Since all sounds in the engine are relative to the current camera, the model view matrix needs to be passed to this method.
 * @param {Object} settings See {@link SoundSystem}
 * @param {Matrix4} mvMat The model view matrix from the current camera, or falsy if the component is attached to the camera.
 * @param {number} tpf
 * @hidden
 */
SoundComponent.prototype.process = function (settings, mvMat/*, tpf*/) {
	this._pannerNode.rolloffFactor = settings.rolloffFactor;
	this._pannerNode.maxDistance = settings.maxDistance;

	if (this._autoPlayDirty && this._system && !this._system.passive) {
		this._autoPlaySounds();
		this._autoPlayDirty = false;
	}

	if (this._attachedToCamera || !mvMat) {
		// The component is attached to the current camera.
		if (this._isPanned) {
			this._inNode.disconnect();
			this._inNode.connect(this._outDryNode);
			this._isPanned = false;
		}
		this._pannerNode.setPosition(0, 0, 0);
		this._pannerNode.setOrientation(0, 0, 0);
		return;
	} else if (!this._isPanned) {
		this._inNode.disconnect();
		this._inNode.connect(this._pannerNode);
		this._isPanned = true;
	}

	mvMat.getTranslation(this._position);
	this._oldPosition.set(this._position);
	this._orientation.setDirect(0, 0, -1);
	this._orientation.applyPostVector(mvMat);

	this._pannerNode.setPosition(this._position.x, this._position.y, this._position.z);
	this._pannerNode.setOrientation(this._orientation.x, this._orientation.y, this._orientation.z);
};

module.exports = SoundComponent;
