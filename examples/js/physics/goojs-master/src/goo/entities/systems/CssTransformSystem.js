var System = require('../../entities/systems/System');
var Renderer = require('../../renderer/Renderer');
var Matrix4 = require('../../math/Matrix4');
var MathUtils = require('../../math/MathUtils');
var Vector3 = require('../../math/Vector3');

/**
 * @extends System
 */
function CssTransformSystem(renderer) {
	System.call(this, 'CssTransformSystem', ['TransformComponent', 'CssTransformComponent']);

	this.renderer = renderer;

	if (document.querySelector) {
		this.viewDom = document.querySelector('#view');
		this.containerDom = document.querySelector('#cam1');
		this.containerDom2 = document.querySelector('#cam2');
	}
}

var tmpMatrix = new Matrix4();
var tmpMatrix2 = new Matrix4();
var tmpVector = new Vector3();

CssTransformSystem.prototype = Object.create(System.prototype);
CssTransformSystem.prototype.constructor = CssTransformSystem;

var epsilon = function (value) {
	return Math.abs(value) < 0.000001 ? 0 : value;
};

var prefixes = ['', '-webkit-', '-moz-', '-ms-', '-o-'];
var setStyle = function (element, property, style) {
	for (var j = 0; j < prefixes.length; j++) {
		element.style[prefixes[j] + property] = style;
	}
};

var getCSSMatrix = function (matrix) {
	var elements = matrix.data;


	return 'matrix3d(' + epsilon(elements[0]) + ',' + epsilon(-elements[1]) + ',' + epsilon(elements[2]) + ',' + epsilon(elements[3]) + ','
		+ epsilon(elements[4]) + ',' + epsilon(-elements[5]) + ',' + epsilon(elements[6]) + ',' + epsilon(elements[7]) + ','
		+ epsilon(elements[8]) + ',' + epsilon(-elements[9]) + ',' + epsilon(elements[10]) + ',' + epsilon(elements[11]) + ','
		+ epsilon(elements[12]) + ',' + epsilon(-elements[13]) + ',' + epsilon(elements[14]) + ',' + epsilon(elements[15]) + ')';
};

CssTransformSystem.prototype.process = function (entities) {
	if (entities.length === 0) {
		return;
	}

	var camera = Renderer.mainCamera;

	if (!camera) {
		return;
	}

	var fov = 0.5 / Math.tan(MathUtils.DEG_TO_RAD * camera.fov * 0.5) * this.renderer.domElement.offsetHeight;
	setStyle(this.viewDom, 'perspective', fov + 'px');

	tmpMatrix.copy(camera.getViewInverseMatrix());
	tmpMatrix2.copy(tmpMatrix);
	tmpMatrix.invert();

	tmpMatrix.setTranslation(new Vector3(0, 0, fov));
	var style = getCSSMatrix(tmpMatrix);
	setStyle(this.containerDom, 'transform', style);

	tmpMatrix2.e03 = -tmpMatrix2.e03;
	// tmpMatrix2.e13 = -tmpMatrix2.e13;
	tmpMatrix2.e23 = -tmpMatrix2.e23;

	// Needed?
	tmpMatrix2.data[0] = 1;
	tmpMatrix2.data[1] = 0;
	tmpMatrix2.data[2] = 0;

	tmpMatrix2.data[4] = 0;
	tmpMatrix2.data[5] = 1;
	tmpMatrix2.data[6] = 0;

	tmpMatrix2.data[8] = 0;
	tmpMatrix2.data[9] = 0;
	tmpMatrix2.data[10] = 1;

	style = getCSSMatrix(tmpMatrix2);
	setStyle(this.containerDom2, 'transform', style);

	for (var i = 0; i < entities.length; i++) {
		var entity = entities[i];
		var component = entity.getComponent('CssTransformComponent');
		var domElement = component.domElement;
		var scale = component.scale;
		scale = [scale, -scale, scale].join(',');

		if (component.faceCamera) {
			entity.transformComponent.sync().worldTransform.matrix.getTranslation(tmpVector);
			tmpMatrix.copy(camera.getViewInverseMatrix());
			tmpMatrix.setTranslation(tmpVector);
		} else {
			tmpMatrix.copy(entity.transformComponent.sync().worldTransform.matrix);
		}

		style = 'translate3d(-50%,-50%,0) ' + getCSSMatrix(tmpMatrix) + 'scale3d(' + scale + ')';
		setStyle(domElement, 'transform', style);

		if (domElement.parentNode !== this.containerDom2) {
			this.containerDom2.appendChild(domElement);
		}
	}
};

module.exports = CssTransformSystem;
