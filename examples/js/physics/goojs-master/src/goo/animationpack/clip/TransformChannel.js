var AbstractAnimationChannel = require('../../animationpack/clip/AbstractAnimationChannel');
var TransformData = require('../../animationpack/clip/TransformData');
var Quaternion = require('../../math/Quaternion');

/**
 * An animation channel consisting of a series of transforms interpolated over time.
 * @param channelName our name.
 * @param {Array} times our time offset values.
 * @param {Array} rotations the rotations to set on this channel at each time offset.
 * @param {Array} translations the translations to set on this channel at each time offset.
 * @param {Array} scales the scales to set on this channel at each time offset.
 */
function TransformChannel(channelName, times, rotations, translations, scales, blendType) {
	AbstractAnimationChannel.call(this, channelName, times, blendType);

	if (rotations.length / 4 !== times.length || translations.length / 3 !== times.length || scales.length / 3 !== times.length) {
		throw new Error('All provided arrays must be the same length (accounting for type)! Channel: ' + channelName);
	}

	this._rotations = new Float32Array(rotations);
	this._translations = new Float32Array(translations);
	this._scales = new Float32Array(scales);
}

var tmpQuat = new Quaternion();
var tmpQuat2 = new Quaternion();

TransformChannel.prototype = Object.create(AbstractAnimationChannel.prototype);

/*
 * Creates a data item for this type of channel
 * @returns {TransformData}
 */
TransformChannel.prototype.createStateDataObject = function () {
	return new TransformData();
};

/*
 * Applies the channels animation state to supplied data item
 * @param {number} sampleIndex
 * @param {number} fraction
 * @param {TransformData} value The data item to apply animation to
 */

TransformChannel.prototype.setCurrentSample = function (sampleIndex, fraction, applyTo) {
	var transformData = applyTo;

	// shortcut if we are fully on one sample or the next
	var index4A = sampleIndex * 4, index3A = sampleIndex * 3;
	var index4B = (sampleIndex + 1) * 4, index3B = (sampleIndex + 1) * 3;
	if (fraction === 0.0) {
		transformData._rotation.x = this._rotations[index4A + 0];
		transformData._rotation.y = this._rotations[index4A + 1];
		transformData._rotation.z = this._rotations[index4A + 2];
		transformData._rotation.w = this._rotations[index4A + 3];

		transformData._translation.x = this._translations[index3A + 0];
		transformData._translation.y = this._translations[index3A + 1];
		transformData._translation.z = this._translations[index3A + 2];

		transformData._scale.x = this._scales[index3A + 0];
		transformData._scale.y = this._scales[index3A + 1];
		transformData._scale.z = this._scales[index3A + 2];
		return;
	} else if (fraction === 1.0) {
		transformData._rotation.x = this._rotations[index4B + 0];
		transformData._rotation.y = this._rotations[index4B + 1];
		transformData._rotation.z = this._rotations[index4B + 2];
		transformData._rotation.w = this._rotations[index4B + 3];

		transformData._translation.x = this._translations[index3B + 0];
		transformData._translation.y = this._translations[index3B + 1];
		transformData._translation.z = this._translations[index3B + 2];

		transformData._scale.x = this._scales[index3B + 0];
		transformData._scale.y = this._scales[index3B + 1];
		transformData._scale.z = this._scales[index3B + 2];
		return;
	}

	// Apply (s)lerp and set in transform
	transformData._rotation.x = this._rotations[index4A + 0];
	transformData._rotation.y = this._rotations[index4A + 1];
	transformData._rotation.z = this._rotations[index4A + 2];
	transformData._rotation.w = this._rotations[index4A + 3];

	tmpQuat.x = this._rotations[index4B + 0];
	tmpQuat.y = this._rotations[index4B + 1];
	tmpQuat.z = this._rotations[index4B + 2];
	tmpQuat.w = this._rotations[index4B + 3];

	if (!transformData._rotation.equals(tmpQuat)) {
		Quaternion.slerp(transformData._rotation, tmpQuat, fraction, tmpQuat2);
		transformData._rotation.set(tmpQuat2);
	}

	transformData._translation.setDirect(
		(1 - fraction) * this._translations[index3A + 0] + fraction * this._translations[index3B + 0],
		(1 - fraction) * this._translations[index3A + 1] + fraction * this._translations[index3B + 1],
		(1 - fraction) * this._translations[index3A + 2] + fraction * this._translations[index3B + 2]
	);

	transformData._scale.setDirect(
		(1 - fraction) * this._scales[index3A + 0] + fraction * this._scales[index3B + 0],
		(1 - fraction) * this._scales[index3A + 1] + fraction * this._scales[index3B + 1],
		(1 - fraction) * this._scales[index3A + 2] + fraction * this._scales[index3B + 2]
	);
};

/**
 * Apply a specific index of this channel to a {@link TransformData} object.
 * @param {number} index the index to grab.
 * @param {TransformData} [store] the TransformData to store in. If null, a new one is created.
 * @returns {TransformData} our resulting TransformData.
 */
TransformChannel.prototype.getData = function (index, store) {
	var rVal = store ? store : new TransformData();
	this.setCurrentSample(index, 0.0, rVal);
	return rVal;
};

module.exports = TransformChannel;