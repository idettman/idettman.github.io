var Vector3 = require('../../../../src/goo/math/Vector3');
var DirectionalLight = require('../../../../src/goo/renderer/light/DirectionalLight');
var CustomMatchers = require('../../../../test/unit/CustomMatchers');

describe('DirectionalLight', function () {
	beforeEach(function () {
		jasmine.addMatchers(CustomMatchers);
	});

	it('gets the color from the first parameter passed to the constructor', function () {
		var color = new Vector3(0.2, 0.3, 0.5);
		var light = new DirectionalLight(color);

		expect(light.color).toBeCloseToVector(color);
		expect(light.color).not.toBe(color);
	});

	describe('copy', function () {
		it('can copy everything from another point light', function () {
			var original = new DirectionalLight(new Vector3(11, 22, 33));
			var copy = new DirectionalLight(new Vector3(44, 55, 66));
			copy.copy(original);

			expect(copy).toBeCloned(original);
		});
	});

	describe('clone', function () {
		it('can clone a point light', function () {
			var original = new DirectionalLight(new Vector3(11, 22, 33));
			var clone = original.clone();

			expect(clone).toBeCloned(original);
		});
	});
});
