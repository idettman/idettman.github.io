var EntitySelection = require('../EntitySelection');

/**
 * Base class/module for all components. Should not be used directly.
 */
function Component() {
	/**
	 * If the component should be processed for containing entities.
	 * @type {boolean}
	 */
	this.enabled = true;

	/**
	 * The entity the component is added to.
	 * @type {Entity|null}
	 */
	this.entity = null;

	this.installedAPI = new Set();

	/**
	 * Debug level for the component. Can be 'none', 'normal' or 'full'.
	 * None will prevent the rendering of any debug meshes for the component.
	 * @type {string}
	 */
	this.debugLevel = 'normal';
}

/**
 * Should be implemented in the same way in subclasses. Will be called by the World for each argument to world.createEntity(arg0, arg1, ...). If this function returns true, it indicates that the passed argument was used and should not be passed to other components. See World.prototype.createEntity.
 * @param argument
 * @param {Entity} entity
 * @returns {boolean} True if the data was used.
 */
Component.applyOnEntity = function (/*argument, entity*/) {
	return false;
};

/**
 * Called when the component was added to an entity
 * @param {Entity} entity
 */
Component.prototype.attached = function (/*entity*/) {};

/**
 * Called when the component was removed from an entity
 * @param {Entity} entity
 */
Component.prototype.detached = function (/*entity*/) {};

/**
 * Injects public methods of this component into the host entity.
 * @param {Entity} entity
 * @private
 */
Component.prototype.applyAPI = function (entity) {
	var api = this.api;
	if (!api) {
		return;
	}
	var keys = Object.keys(api);
	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		if (typeof entity[key] === 'undefined') {
			entity[key] = api[key];
			this.installedAPI.add(key);
		} else {
			throw new Error('Could not install method ' + key + ' of ' + this.type + ' as it is already taken');
		}
	}
};

/**
 * Removed any methods attached to the host entity that belong to this component's API.
 * @param entity
 * @private
 */
Component.prototype.removeAPI = function (entity) {
	this.installedAPI.forEach(function (key) {
		delete entity[key];
	});
};

Component.applyEntitySelectionAPI = function (entitySelectionAPI, componentType) {
	if (!entitySelectionAPI) { return; }

	var keys = Object.keys(entitySelectionAPI);
	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		if (typeof EntitySelection[key] === 'undefined') {
			EntitySelection.installMethod(entitySelectionAPI[key], key, componentType);
		} else {
			throw new Error('Could not install method ' + key + ' on EntitySelection as it is already taken');
		}
	}
};

module.exports = Component;