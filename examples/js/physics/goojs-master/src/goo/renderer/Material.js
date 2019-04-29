var Shader = require('../renderer/Shader');
var ObjectUtils = require('../util/ObjectUtils');

/**
 * A Material defines the look of an object
 * @param {string} [name='Default Material'] Material name
 * @param {{ vshader, fshader }} [shaderDefinition] Optional shader to associate with the material
 */
function Material(name, shaderDefinition) {
	this.id = null;

	/** Material name
	 * @type {string}
	 */
	this.name = 'Default Material';

	/** [Shader]{@link Shader} to use when rendering
	 * @type {Shader}
	 */
	this.shader = null;

	//! AT: horrendous type checking follows
	// function has 2 signatures because the deprecated .createMaterial had parameters in inverse order
	if (typeof name === 'string') {
		this.name = name;
	} else if (name && name.vshader && name.fshader) {
		this.shader = Material.createShader(name);
	}

	if (shaderDefinition && shaderDefinition.vshader && shaderDefinition.fshader) {
		this.shader = Material.createShader(shaderDefinition);
	} else if (typeof shaderDefinition === 'string') {
		this.name = shaderDefinition;
	}

	/** Possible overrides for shader uniforms
	 * @type {Object}
	 * @default
	 */
	this.uniforms = {};

	// Texture storage
	this._textureMaps = {};
	/* REVIEW
	 * There was an idea to specify and jsdoc uniforms.materialDiffuse etc instead,
	 * since those are the ones we use now
	 */

	/* Specification of colors for this Material
	 * @type {Object}
	 * @property {Array<number>} ambient The ambient color, [r, g, b, a]
	 * @property {Array<number>} diffuse The diffuse color, [r, g, b, a]
	 * @property {Array<number>} emissive The emissive color, [r, g, b, a]
	 * @property {Array<number>} specular The specular color, [r, g, b, a]
	 * @property {number} shininess The shininess exponent.
	 */
	/*
	this.materialState = {
		ambient: Shader.DEFAULT_AMBIENT,
		diffuse: Shader.DEFAULT_DIFFUSE,
		emissive: Shader.DEFAULT_EMISSIVE,
		specular: Shader.DEFAULT_SPECULAR,
		shininess: Shader.DEFAULT_SHININESS
	};
	*/

	/** Specification of culling for this Material
	 * @type {Object}
	 * @property {boolean} enabled
	 * @property {string} cullFace possible values: 'Front', 'Back', 'FrontAndBack', default 'Back'
	 * @property {string} frontFace possible values: 'CW' (clockwise) and 'CCW' (counterclockwise - default)
	 */
	this.cullState = {
		enabled: true,
		cullFace: 'Back', // Front, Back, FrontAndBack
		frontFace: 'CCW' // CW, CCW
	};

	/** Specification of blending for this Material
	 * @type {Object}
	 * @property {string} blending possible values: <strong>'NoBlending'</strong>, 'TransparencyBlending', 'AdditiveBlending', 'SubtractiveBlending', 'MultiplyBlending', 'CustomBlending'
	 * @property {string} blendEquation possible values: <strong>'AddEquation'</strong>, 'SubtractEquation', 'ReverseSubtractEquation'
	 * @property {string} blendSrc possible values: <strong>'SrcAlphaFactor'</strong>, 'ZeroFactor', 'OneFactor', 'SrcColorFactor', 'OneMinusSrcColorFactor', 'OneMinusSrcAlphaFactor', 'OneMinusDstAlphaFactor''DstColorFactor', 'OneMinusDstColorFactor', 'SrcAlphaSaturateFactor', 'DstAlphaFactor'
	 * @property {string} blendDst possible values: 'SrcAlphaFactor', 'ZeroFactor', 'OneFactor', 'SrcColorFactor', 'OneMinusSrcColorFactor', <strong>'OneMinusSrcAlphaFactor'</strong>, 'OneMinusDstAlphaFactor''DstColorFactor', 'OneMinusDstColorFactor', 'DstAlphaFactor'
	 */
	this.blendState = {
		blending: 'NoBlending',
		blendEquation: 'AddEquation',
		blendSrc: 'SrcAlphaFactor',
		blendDst: 'OneMinusSrcAlphaFactor'
	};

	/** Specification of depth handling for this Material
	 * @type {Object}
	 * @property {boolean} enabled default: true
	 * @property {boolean} write default: true
	 * @property {string} depthFunc possible values: 'Never', 'Always', 'Less', 'LessEqual', 'Equal', 'GreaterEqual', 'Greater', 'NotEqual'
	 */
	this.depthState = {
		enabled: true,
		write: true,
		depthFunc: 'LessEqual'
	};

	/** Specification of the polygon offset for this Material
	 * @type {Object}
	 * @property {boolean} enabled
	 * @property {number} factor default: 1
	 * @property {number} units default: 1
	 */
	this.offsetState = {
		enabled: false,
		factor: 1,
		units: 1
	};

	/** Render the mesh twice with front/back-facing for double transparency rendering. Default is false.
	 * @type {boolean}
	 * @default false
	 */
	this.dualTransparency = false;

	/** Show wireframe on this material. Default is false.
	 * @type {boolean}
	 * @default false
	 */
	this.wireframe = false;

	/** Use flat rendering mode for this material. Default is false.
	 * @type {boolean}
	 * @default false
	 */
	this.flat = false;

	/** Width of lines, if line rendering / wireframe is enabled. Default is 1.
	 * @type {number}
	 * @default 1
	 */
	this.lineWidth = 1;

	/** Determines the order in which an object is drawn. There are four pre-defined render queues:
	 *		<ul>
	 *			<li>RenderQueue.BACKGROUND = Rendered before any other objects. Commonly used for skyboxes and the likes (0-999)
	 *			<li>RenderQueue.OPAQUE = Used for most objects, typically opaque geometry. Rendered front to back (1000-1999)
	 *			<li>RenderQueue.TRANSPARENT = For all alpha-blended objects. Rendered back to front (2000-2999)
	 *			<li>RenderQueue.OVERLAY = For overlay effects like lens-flares etc (3000+)
	 *		</ul>
	 * By default materials use the render queue of the shader. See {@link Shader} or {@link RenderQueue} for more info
	 * @type {number}
	 */
	this.renderQueue = null;

	this.fullOverride = false;
	this.errorOnce = false;

	// @ifdef DEBUG
	Object.seal(this);
	// @endif
}

/**
 * Sets a texture in a specific slot
 *
 * @param {string} name Name of texture slot
 * @param {Texture} texture Texture to set
 */
Material.prototype.setTexture = function (name, texture) {
	this._textureMaps[name] = texture;
};

/**
 * Gets a texture in a specific slot
 *
 * @param {string} name Name of texture slot to retrieve texture from
 * @returns {Texture} Texture if found, or undefined if not in slot
 */
Material.prototype.getTexture = function (name) {
	return this._textureMaps[name];
};

/**
 * Removes a texture in a specific slot
 *
 * @param {string} name Name of texture slot to remove
 */
Material.prototype.removeTexture = function (name) {
	delete this._textureMaps[name];
};

/**
 * Get all textures as an array
 *
 * @returns {Array<Texture>} Array containing all set textures
 */
Material.prototype.getTextures = function () {
	var textures = [];
	for (var key in this._textureMaps) {
		textures.push(this._textureMaps[key]);
	}
	return textures;
};

/**
 * Get the map of [slot_name]: [Texture]
 *
 * @returns {Object} Mapping of slot - textures
 */
Material.prototype.getTextureEntries = function () {
	return this._textureMaps;
};

/**
 * Returns the render queue of this material
 * @returns {number}
 */
Material.prototype.getRenderQueue = function () {
	if (this.renderQueue !== null) {
		return this.renderQueue;
	} else if (this.shader !== null) {
		return this.shader.renderQueue;
	}
	return 1000;
};

/**
 * Sets the render queue of this material
 * @param {number} queue See {@link RenderQueue} for options
 */
Material.prototype.setRenderQueue = function (queue) {
	this.renderQueue = queue;
};

/**
 * Returns a clone of this material
 * @param {Object} [options]
 * @param {boolean} [options.shareUniforms=false] Cloning this material clones the uniforms by default
 * @param {boolean} [options.shareTextures=false] Cloning this material clones the textures by default
 * @returns {Material}
 */
Material.prototype.clone = function (options) {
	options = options || {};

	var clone = new Material(this.name);

	clone.id = this.id;
	clone.name = this.name;
	clone.shader = this.shader.clone();

	if (options.shareUniforms) {
		clone.uniforms = this.uniforms;
	} else {
		clone.uniforms = ObjectUtils.deepClone(this.uniforms);
	}

	if (options.shareTextures) {
		var textureKeys = Object.keys(this._textureMaps);
		for (var i = 0; i < textureKeys.length; i++) {
			var textureKey = textureKeys[i];
			clone._textureMaps[textureKey] = this._textureMaps[textureKey];
		}
	} else {
		var textureKeys = Object.keys(this._textureMaps);
		for (var i = 0; i < textureKeys.length; i++) {
			var textureKey = textureKeys[i];
			clone._textureMaps[textureKey] = this._textureMaps[textureKey].clone();
		}
	}

	clone.cullState.enabled = this.cullState.enabled;
	clone.cullState.cullFace = this.cullState.cullFace;
	clone.cullState.frontFace = this.cullState.frontFace;

	clone.blendState.blending = this.blendState.blending;
	clone.blendState.blendEquation = this.blendState.blendEquation;
	clone.blendState.blendSrc = this.blendState.blendSrc;
	clone.blendState.blendDst = this.blendState.blendDst;

	clone.depthState.enabled = this.depthState.enabled;
	clone.depthState.write = this.depthState.write;

	clone.offsetState.enabled = this.offsetState.enabled;
	clone.offsetState.factor = this.offsetState.factor;
	clone.offsetState.units = this.offsetState.units;

	clone.dualTransparency = this.dualTransparency;

	clone.wireframe = this.wireframe;
	clone.flat = this.flat;

	clone.renderQueue = this.renderQueue;

	clone.fullOverride = this.fullOverride;
	clone.errorOnce = this.errorOnce;

	return clone;
};

/**
 * Creates a new or finds an existing, cached Shader object
 *
 * @param {ShaderDefinition} shaderDefinition see {@link Shader}
 * @param {string} [name=DefaultShader]
 * @returns {Shader}
 */
Material.createShader = function (shaderDefinition, name) {
	//! AT: function has parameters in reverse order than the constructor
	var shader = new Shader(name || null, shaderDefinition);
	if (shader.name === null) {
		shader.name = 'DefaultShader' + shader._id;
	}
	return shader;
};

/**
 * Clears the shader cache.
 * @deprecated Deprecated since 0.12.0 and scheduled for removal in 0.14.0
 */
Material.clearShaderCache = function () {
};

/**
 * Creates an 'empty' material
 * @private
 * @param shaderDefinition see {@link Shader}
 * @param name [name='Empty Material'] The name of the newly created material
 * @returns {Material}
 */
Material.createEmptyMaterial = function (shaderDefinition, name) {
	var material = new Material(name || 'Empty Material');
	material.empty();
	if (shaderDefinition) {
		material.shader = Material.createShader(shaderDefinition);
	} else {
		material.shader = undefined;
	}
	return material;
};

//! AT: how about a immutable material named EMPTY and a clone method for materials instead of this mutable madness?
/**
 * Removed the material's properties
 * @private
 */
Material.prototype.empty = function () {
	this.cullState = {};
	this.blendState = {};
	this.depthState = {};
	this.offsetState = {};
	this.wireframe = undefined;
	this.renderQueue = undefined;
	this.flat = undefined;
	this._textureMaps = {};
	this.shader = undefined;
	this.uniforms = {};
};

module.exports = Material;
