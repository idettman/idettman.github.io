goo.V.attachToGlobal();

	var cameraState = {
		spin: true,
		angle: 0,
		mainCameraId: 1
	};

	function setMainCamera(id, cameraEntities) {
		var mainCamera = cameraEntities[id].getComponent('CameraComponent').camera;
		SystemBus.emit('goo.setCurrentCamera', {
			camera: mainCamera,
			entity: cameraEntities[id]
		});
	}

	V.describe('Keys 1, 2 switch main camera\nkey 3 starts/stops the spinning of camera 1');

	var gooRunner = V.initGoo();
	var world = gooRunner.world;

	var debugRenderSystem = new DebugRenderSystem();
	debugRenderSystem.doRender.CameraComponent = true;
	gooRunner.renderSystems.push(debugRenderSystem);
	world.setSystem(debugRenderSystem);

	// add spheres to have the cameras view them
	V.addColoredSpheres();

	// add light
	V.addLights();

	document.body.addEventListener('keypress', function(e) {
		switch (e.keyCode) {
			case 49:
				if (cameraState.mainCameraId === 1) {
					setMainCamera(0, [camera1Entity, camera2Entity]);
					cameraState.mainCameraId = 0;
				}
				break;
			case 50:
				if (cameraState.mainCameraId === 0) {
					setMainCamera(1, [camera1Entity, camera2Entity]);
					cameraState.mainCameraId = 1;
				}
				break;
			case 51:
				cameraState.spin = !cameraState.spin;
				break;
		}
	});

	// camera 1 - spinning
	var camera1Entity = world.createEntity(new Camera(), [0, 0, 3]).lookAt(new Vector3(0, 0, 0)).addToWorld();

	camera1Entity.set(new ScriptComponent({
		run: function(entity) {
			if (cameraState.spin) {
				cameraState.angle = Math.sin(gooRunner.world.time);
				entity.setRotation(cameraState.angle, 0, 0);
				entity.setTranslation(Math.sin(gooRunner.world.time), Math.cos(gooRunner.world.time), 3);
			}
		}
	}));

	var camera2Entity = V.addOrbitCamera(new Vector3(25, Math.PI / 3, 0));
	setMainCamera(1, [camera1Entity, camera2Entity]);
	cameraState.mainCameraId = 1;

	gooRunner.renderSystem.partitioningCamera = camera1Entity.cameraComponent.camera;

	V.process();