goo.V.attachToGlobal();

	V.describe('Rendering one non-rotated box, one rotated box, one crosses, and 3 colored lines.');

	var gooRunner = V.initGoo({showStats: true});
	var world = gooRunner.world;
	var lineRenderSystem = new LineRenderSystem(world);

	gooRunner.setRenderSystem(lineRenderSystem);

	V.addOrbitCamera(new Vector3(Math.PI * 5, Math.PI / 2.3, 0.4));
	V.addLights();


	var nonRotatedBoxMin = new Vector3(-4, -1, -1);
	var nonRotatedBoxMax = new Vector3(-2, 1, 1);

	var rotatedBoxMin = new Vector3(-1, -1, -1);
	var rotatedBoxMax = new Vector3(1, 1, 1);
	var rotationMatrix = new Matrix4();

	var crossPosition = new Vector3(2.5, 0, 0);

	var coloredLinesStart = new Vector3(4, -1, 0);
	//will be set in update
	var coloredLinesEnd = new Vector3();

	var update = function () {

		//draw the non rotated box
		lineRenderSystem.drawAABox(nonRotatedBoxMin, nonRotatedBoxMax, lineRenderSystem.GREEN);

		//slowly rotate the box then draw it
		var rotationVector = new Vector3(0, Math.sin(world.time), Math.cos(world.time));
		rotationMatrix.setRotationFromVector(rotationVector);

		lineRenderSystem.drawAABox(rotatedBoxMin, rotatedBoxMax, lineRenderSystem.RED, rotationMatrix);


		lineRenderSystem.drawCross(crossPosition, lineRenderSystem.AQUA);

		//draw 3 colored lines!
		for (var i = 0; i < 3; i++) {
			var color = lineRenderSystem.BLUE;

			if (i === 1) {
				color = lineRenderSystem.YELLOW;
			}
			else if (i === 2) {
				color = lineRenderSystem.MAGENTA;
			}

			coloredLinesStart.setDirect(4 + i, 1, 0);
			coloredLinesEnd.set(coloredLinesStart).addDirect(0, -2, 0);

			lineRenderSystem.drawLine(coloredLinesStart, coloredLinesEnd, color);
		}

	};

	gooRunner.callbacks.push(update);

	V.process();