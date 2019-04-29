module.exports = {
	LogicInterface: require('./logic/LogicInterface'),
	LogicLayer: require('./logic/LogicLayer'),
	LogicNode: require('./logic/LogicNode'),
	LogicNodeAdd: require('./logic/LogicNodeAdd'),
	LogicNodeApplyMatrix: require('./logic/LogicNodeApplyMatrix'),
	LogicNodeConstVec3: require('./logic/LogicNodeConstVec3'),
	LogicNodeDebug: require('./logic/LogicNodeDebug'),
	LogicNodeEntityProxy: require('./logic/LogicNodeEntityProxy'),
	LogicNodeFloat: require('./logic/LogicNodeFloat'),
	LogicNodeInput: require('./logic/LogicNodeInput'),
	LogicNodeInt: require('./logic/LogicNodeInt'),
	LogicNodeLightComponent: require('./logic/LogicNodeLightComponent'),
	LogicNodeMax: require('./logic/LogicNodeMax'),
	LogicNodeMeshRendererComponent: require('./logic/LogicNodeMeshRendererComponent'),
	LogicNodeMouse: require('./logic/LogicNodeMouse'),
	LogicNodeMultiply: require('./logic/LogicNodeMultiply'),
	LogicNodeMultiplyFloat: require('./logic/LogicNodeMultiplyFloat'),
	LogicNodeOutput: require('./logic/LogicNodeOutput'),
	LogicNodeRandom: require('./logic/LogicNodeRandom'),
	LogicNodeRotationMatrix: require('./logic/LogicNodeRotationMatrix'),
	LogicNodes: require('./logic/LogicNodes'),
	LogicNodeSine: require('./logic/LogicNodeSine'),
	LogicNodeSub: require('./logic/LogicNodeSub'),
	LogicNodeTime: require('./logic/LogicNodeTime'),
	LogicNodeTransformComponent: require('./logic/LogicNodeTransformComponent'),
	LogicNodeVec3: require('./logic/LogicNodeVec3'),
	LogicNodeVec3Add: require('./logic/LogicNodeVec3Add'),
	LogicNodeWASD: require('./logic/LogicNodeWASD'),
	LogicNodeWASD2: require('./logic/LogicNodeWASD2'),
	LogicComponent: require('./LogicComponent'),
	LogicComponentHandler: require('./LogicComponentHandler'),
	LogicSystem: require('./LogicSystem')
};
if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}