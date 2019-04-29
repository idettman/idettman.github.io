module.exports = {
	BoxCollider: require('./colliders/BoxCollider'),
	Collider: require('./colliders/Collider'),
	CylinderCollider: require('./colliders/CylinderCollider'),
	MeshCollider: require('./colliders/MeshCollider'),
	PlaneCollider: require('./colliders/PlaneCollider'),
	SphereCollider: require('./colliders/SphereCollider'),
	AbstractColliderComponent: require('./components/AbstractColliderComponent'),
	AbstractRigidBodyComponent: require('./components/AbstractRigidBodyComponent'),
	ColliderComponent: require('./components/ColliderComponent'),
	RigidBodyComponent: require('./components/RigidBodyComponent'),
	ColliderComponentHandler: require('./handlers/ColliderComponentHandler'),
	RigidBodyComponentHandler: require('./handlers/RigidBodyComponentHandler'),
	BallJoint: require('./joints/BallJoint'),
	HingeJoint: require('./joints/HingeJoint'),
	PhysicsJoint: require('./joints/PhysicsJoint'),
	PhysicsMaterial: require('./PhysicsMaterial'),
	RaycastResult: require('./RaycastResult'),
	PhysicsBoxDebugShape: require('./shapes/PhysicsBoxDebugShape'),
	PhysicsCylinderDebugShape: require('./shapes/PhysicsCylinderDebugShape'),
	PhysicsPlaneDebugShape: require('./shapes/PhysicsPlaneDebugShape'),
	PhysicsSphereDebugShape: require('./shapes/PhysicsSphereDebugShape'),
	AbstractPhysicsSystem: require('./systems/AbstractPhysicsSystem'),
	ColliderSystem: require('./systems/ColliderSystem'),
	PhysicsDebugRenderSystem: require('./systems/PhysicsDebugRenderSystem'),
	PhysicsSystem: require('./systems/PhysicsSystem'),
	Pool: require('./util/Pool')
};

if (typeof(window) !== 'undefined') {
	for (var key in module.exports) {
		window.goo[key] = module.exports[key];
	}
}