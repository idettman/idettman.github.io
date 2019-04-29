goo.V.attachToGlobal();

	function getFSMComponent(entity) {
		var fsmComponent = new StateMachineComponent();
		var machine = new Machine('switch');

		var stateOn = new State('on');
		stateOn.addAction(new MouseDownAction(null, { transitions: { mouseLeftDown: 'toOff' } }));
		stateOn.addAction(new SetLightRangeAction(null, { entity: entity, range: 1, everyFrame: false }));
		stateOn.setTransition('toOff', 'off');

		var stateOff = new State('off');
		stateOff.addAction(new MouseDownAction(null, { transitions: { mouseLeftDown: 'toOn' } }));
		stateOff.addAction(new SetLightRangeAction(null, { entity: entity, range: 10, everyFrame: false }));
		stateOff.setTransition('toOn', 'on');

		machine.addState(stateOn);
		machine.addState(stateOff);

		fsmComponent.addMachine(machine);

		return fsmComponent;
	}

	function addBox(x, y, z, lightEntity) {
		var boxEntity = world.createEntity(new Box(), new Material(ShaderLib.simpleLit), [x, y, z]);
		boxEntity.setComponent(getFSMComponent(lightEntity));
		boxEntity.addToWorld();
	}

	function addBoxes(lightEntity) {
		var nBoxes = 1;
		for (var i = 0; i < nBoxes; i++) {
			addBox((i - ((nBoxes - 1) / 2)) * 4, 0, 0, lightEntity);
		}
	}

	function getColor(x, y, z) {
		var step = 1.9;
		return [
			Math.cos(x + y + z) / 2 + 0.5,
			Math.cos(x + y + z + step) / 2 + 0.5,
			Math.cos(x + y + z + step * 2) / 2 + 0.5];
	}

	function addLamp(x, y, z) {
		var color = getColor(x, y, z);

		var lampMeshData = new Sphere(32, 32);
		var lampMaterial = new Material(ShaderLib.simpleColored);
		lampMaterial.uniforms.color = color;

		var light = new PointLight(Vector3.fromArray(color));
		light.range = 10;

		var lampEntity = world.createEntity(lampMeshData, lampMaterial, light, 'lamp1', [x, y, z]).addToWorld();

		return lampEntity;
	}

	function addLamps() {
		var nLamps = 1;
		var lampEntities = [];
		for (var i = 0; i < nLamps; i++) {
			lampEntities.push(addLamp((i - ((nLamps - 1) / 2)) * 4, 5, 0));
		}
		return lampEntities;
	}

	var gooRunner = V.initGoo();
	var world = gooRunner.world;

	world.setSystem(new StateMachineSystem(gooRunner));

	V.addOrbitCamera();
	var lampEntities = addLamps();

	addBoxes(lampEntities[0]);

	V.process();