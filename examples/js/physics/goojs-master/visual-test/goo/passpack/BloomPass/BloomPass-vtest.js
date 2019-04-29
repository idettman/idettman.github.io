
	goo.V.attachToGlobal();

	V.describe('Bloom is used as a posteffect');

	var gooRunner = V.initGoo();
	V.addLights();
	V.addOrbitCamera(new Vector3(15, Math.PI / 2, 0.3));
	V.addBoxes();

	var composer = new Composer();

	var bloomPass = new BloomPass();
	bloomPass.copyMaterial.uniforms.opacity = 0.5;
	bloomPass.convolutionMaterial.uniforms.size = 2;
	bloomPass.bcMaterial.uniforms.brightness = -0.2;
	bloomPass.bcMaterial.uniforms.contrast = 0.1;
	bloomPass.enabled = true;

	var renderPass = new RenderPass(gooRunner.world.getSystem('RenderSystem').renderList);
	renderPass.clearColor = new Vector4(0, 0, 0, 0);

	var outPass = new FullscreenPass(ObjectUtils.clone(ShaderLib.copy));
	outPass.renderToScreen = true;

	composer.addPass(renderPass);
	composer.addPass(bloomPass);
	composer.addPass(outPass);

	gooRunner.renderSystem.composers.push(composer);

	V.process();