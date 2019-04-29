var Torus = require('../../../src/goo/shapes/Torus');

describe('Torus', function () {
	var a = new Torus(8, 4);

	it('Number of vertices and indices', function () {
		expect(a.vertexCount).toEqual(45);
		expect(a.indexCount).toEqual(192);
	});
});
