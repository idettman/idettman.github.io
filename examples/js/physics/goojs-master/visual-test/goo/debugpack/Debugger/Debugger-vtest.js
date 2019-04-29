goo.V.attachToGlobal();

	function createMesh(meshData, material, x, y, z) {
		var entity = world.createEntity(meshData, material);
		entity.transformComponent.transform.translation.setDirect(x, y, z);
		entity.addToWorld();
	}

	function createShapes() {
		var material = new Material(ShaderLib.textured);
		var colorInfo = new Uint8Array([255, 255, 255, 255, 0, 0, 0, 255, 0, 0, 0, 255, 255, 255, 255, 255]);
		var texture = new Texture(colorInfo, null, 2, 2);
		texture.minFilter = 'NearestNeighborNoMipMaps';
		texture.magFilter = 'NearestNeighbor';
		material.setTexture('DIFFUSE_MAP', texture);

		createMesh(new Sphere(16, 16, 2), material, -10, 0, -30);
		createMesh(new Box(3, 3, 3), material, -10, 10, -30);
		createMesh(new Quad(3, 3), material, 0, -7, -20);
		createMesh(new Torus(16, 16, 1, 3), material, 0, 0, -30);
	}

	var gooRunner = V.initGoo();
	var world = gooRunner.world;

	createShapes();

	// Add camera
	var camera = new Camera();
	world.createEntity(camera, [0, 0, 10])
		.lookAt([0, 0, 0])
		.addToWorld();

	new Debugger(true, true).inject(gooRunner);

	V.process();