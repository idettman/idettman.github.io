goo.V.attachToGlobal();

	V.describe('Cloning lights');

	var gooRunner = V.initGoo();
	var world = gooRunner.world;

	var debugRenderSystem = new DebugRenderSystem();
	debugRenderSystem.doRender.LightComponent = true;
	gooRunner.renderSystems.push(debugRenderSystem);
	world.setSystem(debugRenderSystem);

	V.addOrbitCamera(new Vector3(20, Math.PI / 2, 0));


	world.createEntity(new Box(), new Material(ShaderLib.simpleLit), [-2, 0, 0]).addToWorld();
	world.createEntity(new Box(), new Material(ShaderLib.simpleLit), [ 0, 0, 0]).addToWorld();
	world.createEntity(new Box(), new Material(ShaderLib.simpleLit), [ 2, 0, 0]).addToWorld();


	var originalLight = new SpotLight(new Vector3(1, 0, 0));
	originalLight.range = 10;
	world.createEntity(originalLight, [0, 0, 5]).addToWorld();

	var clonedLight1 = originalLight.clone();
	clonedLight1.range = 5;
	clonedLight1.color.set(0, 1, 0);
	world.createEntity(clonedLight1, [-2, 0, 5]).addToWorld();

	var clonedLight2 = originalLight.clone();
	clonedLight2.angle = 10;
	clonedLight2.color.set(0, 0, 1);
	world.createEntity(clonedLight2, [ 2, 0, 5]).addToWorld();

	V.process();