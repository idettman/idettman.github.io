var Curve = require('../../../../../src/goo/addons/particlepack/curves/Curve');

describe('Curve', function () {
	it('.getValueAt', function () {
		var curve = new Curve();
		expect(curve.getValueAt(0)).toBe(0);
	});

	it('.toGLSL', function () {
		var curve = new Curve();
		expect(curve.toGLSL('t')).toBe('0.0');
	});
});