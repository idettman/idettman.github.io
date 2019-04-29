var MathUtils = require('./MathUtils');
var Matrix = require('./Matrix');
var Vector3 = require('./Vector3');
var ObjectUtils = require('../util/ObjectUtils');

/**
 * Matrix with 4x4 components.
 * @extends Matrix
 * @param {(Matrix4|Array<number>)} arguments Initial values for the components.
 */
function Matrix4() {
	Matrix.call(this, 4, 4);

	if (arguments.length === 0) {
		this.data[0] = 1;
		this.data[5] = 1;
		this.data[10] = 1;
		this.data[15] = 1;
	} else if (arguments.length === 1 && typeof arguments[0] === 'object') {
		if (arguments[0] instanceof Matrix4) {
			this.copy(arguments[0]);
		} else {
			this.setArray(arguments[0]);
		}
	} else {
		for (var i = 0; i < arguments.length; i++) {
			this.data[i] = arguments[i];
		}
	}

	// @ifdef DEBUG
	Object.seal(this);
	// @endif
}

Matrix4.prototype = Object.create(Matrix.prototype);
Matrix4.prototype.constructor = Matrix4;

Matrix.setupAliases(Matrix4.prototype, [['e00'], ['e10'], ['e20'], ['e30'], ['e01'], ['e11'], ['e21'], ['e31'], ['e02'], ['e12'], ['e22'], ['e32'], ['e03'], ['e13'], ['e23'], ['e33']]);

Matrix4.IDENTITY = new Matrix4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);

/**
 * Performs a component-wise addition.
 * @param {Matrix4} rhs Matrix or scalar on the right-hand side.
 * @returns {Matrix4} Self to allow chaining.
 */
Matrix4.prototype.add = function (rhs) {
	var thisData = this.data;
	var rhsData = rhs.data;

	thisData[0] += rhsData[0];
	thisData[1] += rhsData[1];
	thisData[2] += rhsData[2];
	thisData[3] += rhsData[3];
	thisData[4] += rhsData[4];
	thisData[5] += rhsData[5];
	thisData[6] += rhsData[6];
	thisData[7] += rhsData[7];
	thisData[8] += rhsData[8];
	thisData[9] += rhsData[9];
	thisData[10] += rhsData[10];
	thisData[11] += rhsData[11];
	thisData[12] += rhsData[12];
	thisData[13] += rhsData[13];
	thisData[14] += rhsData[14];
	thisData[15] += rhsData[15];

	return this;
};

/**
 * Performs a component-wise subtraction.
 * @param {Matrix4} rhs Matrix or scalar on the right-hand side.
 * @returns {Matrix4} Self to allow chaining
 */
Matrix4.prototype.sub = function (rhs) {
	var thisData = this.data;
	var rhsData = rhs.data;

	thisData[0] -= rhsData[0];
	thisData[1] -= rhsData[1];
	thisData[2] -= rhsData[2];
	thisData[3] -= rhsData[3];
	thisData[4] -= rhsData[4];
	thisData[5] -= rhsData[5];
	thisData[6] -= rhsData[6];
	thisData[7] -= rhsData[7];
	thisData[8] -= rhsData[8];
	thisData[9] -= rhsData[9];
	thisData[10] -= rhsData[10];
	thisData[11] -= rhsData[11];
	thisData[12] -= rhsData[12];
	thisData[13] -= rhsData[13];
	thisData[14] -= rhsData[14];
	thisData[15] -= rhsData[15];

	return this;
};

/**
 * Multiplies this matrix with a scalar
 * @param {number} scalar
 * @returns {Matrix4} Self to allow chaining
 */
Matrix4.prototype.scale = function (scalar) {
	var data = this.data;

	data[0] *= scalar;
	data[1] *= scalar;
	data[2] *= scalar;
	data[3] *= scalar;
	data[4] *= scalar;
	data[5] *= scalar;
	data[6] *= scalar;
	data[7] *= scalar;
	data[8] *= scalar;
	data[9] *= scalar;
	data[10] *= scalar;
	data[11] *= scalar;
	data[12] *= scalar;
	data[13] *= scalar;
	data[14] *= scalar;
	data[15] *= scalar;

	return this;
};

/**
 * Multiplies this matrix with another matrix
 * @param {Matrix4} rhs Matrix on the left-hand side
 * @returns {Matrix4} Self to allow chaining
 */
Matrix4.prototype.mul = function (rhs) {
	var s1d = this.data;
	var m00 = s1d[0], m01 = s1d[4], m02 = s1d[8], m03 = s1d[12],
		m10 = s1d[1], m11 = s1d[5], m12 = s1d[9], m13 = s1d[13],
		m20 = s1d[2], m21 = s1d[6], m22 = s1d[10], m23 = s1d[14],
		m30 = s1d[3], m31 = s1d[7], m32 = s1d[11], m33 = s1d[15];
	var s2d = rhs.data;
	var n00 = s2d[0], n01 = s2d[4], n02 = s2d[8], n03 = s2d[12],
		n10 = s2d[1], n11 = s2d[5], n12 = s2d[9], n13 = s2d[13],
		n20 = s2d[2], n21 = s2d[6], n22 = s2d[10], n23 = s2d[14],
		n30 = s2d[3], n31 = s2d[7], n32 = s2d[11], n33 = s2d[15];

	var rd = this.data;
	rd[0] = m00 * n00 + m01 * n10 + m02 * n20 + m03 * n30;
	rd[4] = m00 * n01 + m01 * n11 + m02 * n21 + m03 * n31;
	rd[8] = m00 * n02 + m01 * n12 + m02 * n22 + m03 * n32;
	rd[12] = m00 * n03 + m01 * n13 + m02 * n23 + m03 * n33;

	rd[1] = m10 * n00 + m11 * n10 + m12 * n20 + m13 * n30;
	rd[5] = m10 * n01 + m11 * n11 + m12 * n21 + m13 * n31;
	rd[9] = m10 * n02 + m11 * n12 + m12 * n22 + m13 * n32;
	rd[13] = m10 * n03 + m11 * n13 + m12 * n23 + m13 * n33;

	rd[2] = m20 * n00 + m21 * n10 + m22 * n20 + m23 * n30;
	rd[6] = m20 * n01 + m21 * n11 + m22 * n21 + m23 * n31;
	rd[10] = m20 * n02 + m21 * n12 + m22 * n22 + m23 * n32;
	rd[14] = m20 * n03 + m21 * n13 + m22 * n23 + m23 * n33;

	rd[3] = m30 * n00 + m31 * n10 + m32 * n20 + m33 * n30;
	rd[7] = m30 * n01 + m31 * n11 + m32 * n21 + m33 * n31;
	rd[11] = m30 * n02 + m31 * n12 + m32 * n22 + m33 * n32;
	rd[15] = m30 * n03 + m31 * n13 + m32 * n23 + m33 * n33;

	return this;
};

/**
 * Multiplies two matrices and stores the result in this matrix
 * @param {Matrix4} lhs Matrix on the left-hand side
 * @param {Matrix4} rhs Matrix on the right-hand side
 * @returns {Matrix4} Self to allow chaining
 */
Matrix4.prototype.mul2 = function (lhs, rhs) {
	var s1d = lhs.data;
	var m00 = s1d[0], m01 = s1d[4], m02 = s1d[8], m03 = s1d[12],
		m10 = s1d[1], m11 = s1d[5], m12 = s1d[9], m13 = s1d[13],
		m20 = s1d[2], m21 = s1d[6], m22 = s1d[10], m23 = s1d[14],
		m30 = s1d[3], m31 = s1d[7], m32 = s1d[11], m33 = s1d[15];
	var s2d = rhs.data;
	var n00 = s2d[0], n01 = s2d[4], n02 = s2d[8], n03 = s2d[12],
		n10 = s2d[1], n11 = s2d[5], n12 = s2d[9], n13 = s2d[13],
		n20 = s2d[2], n21 = s2d[6], n22 = s2d[10], n23 = s2d[14],
		n30 = s2d[3], n31 = s2d[7], n32 = s2d[11], n33 = s2d[15];

	var rd = this.data;
	rd[0] = m00 * n00 + m01 * n10 + m02 * n20 + m03 * n30;
	rd[4] = m00 * n01 + m01 * n11 + m02 * n21 + m03 * n31;
	rd[8] = m00 * n02 + m01 * n12 + m02 * n22 + m03 * n32;
	rd[12] = m00 * n03 + m01 * n13 + m02 * n23 + m03 * n33;

	rd[1] = m10 * n00 + m11 * n10 + m12 * n20 + m13 * n30;
	rd[5] = m10 * n01 + m11 * n11 + m12 * n21 + m13 * n31;
	rd[9] = m10 * n02 + m11 * n12 + m12 * n22 + m13 * n32;
	rd[13] = m10 * n03 + m11 * n13 + m12 * n23 + m13 * n33;

	rd[2] = m20 * n00 + m21 * n10 + m22 * n20 + m23 * n30;
	rd[6] = m20 * n01 + m21 * n11 + m22 * n21 + m23 * n31;
	rd[10] = m20 * n02 + m21 * n12 + m22 * n22 + m23 * n32;
	rd[14] = m20 * n03 + m21 * n13 + m22 * n23 + m23 * n33;

	rd[3] = m30 * n00 + m31 * n10 + m32 * n20 + m33 * n30;
	rd[7] = m30 * n01 + m31 * n11 + m32 * n21 + m33 * n31;
	rd[11] = m30 * n02 + m31 * n12 + m32 * n22 + m33 * n32;
	rd[15] = m30 * n03 + m31 * n13 + m32 * n23 + m33 * n33;

	return this;
};

/**
 * Transposes a matrix (exchanges rows and columns)
 * @returns {Matrix4} Self to allow chaining
 */
Matrix4.prototype.transpose = function () {
	var data = this.data;

	var e01 = data[4];
	var e02 = data[8];
	var e03 = data[12];
	var e12 = data[9];
	var e13 = data[13];
	var e23 = data[14];

	data[4] = data[1];
	data[8] = data[2];
	data[12] = data[3];
	data[9] = data[6];
	data[13] = data[7];
	data[14] = data[11];

	data[1] = e01;
	data[2] = e02;
	data[3] = e03;
	data[6] = e12;
	data[7] = e13;
	data[11] = e23;

	return this;
};

/**
 * Computes the analytical inverse and stores the result in a separate matrix.
 * @param {Matrix4} source Source matrix.
 * @param {Matrix4} [target] Target matrix.
 * @returns {Matrix4} A new matrix if the target matrix is omitted, else the target matrix.
 */
Matrix4.invert = function (source, target) {
	if (!target) {
		target = new Matrix4();
	}

	if (target === source) {
		return target.copy(Matrix4.invert(source));
	}

	var det = source.determinant();

	if (!det) { //! AT: why not Math.abs(det) < MathUtils.EPSILON ? (I don't dare change it)
		return target;
	}

	var s = source.data;
	var t = target.data;

	det = 1.0 / det;

	t[0] = (s[5] * (s[10] * s[15] - s[14] * s[11]) - s[9] * (s[6] * s[15] - s[14] * s[7]) + s[13] * (s[6] * s[11] - s[10] * s[7])) * det;
	t[1] = (s[1] * (s[14] * s[11] - s[10] * s[15]) - s[9] * (s[14] * s[3] - s[2] * s[15]) + s[13] * (s[10] * s[3] - s[2] * s[11])) * det;
	t[2] = (s[1] * (s[6] * s[15] - s[14] * s[7]) - s[5] * (s[2] * s[15] - s[14] * s[3]) + s[13] * (s[2] * s[7] - s[6] * s[3])) * det;
	t[3] = (s[1] * (s[10] * s[7] - s[6] * s[11]) - s[5] * (s[10] * s[3] - s[2] * s[11]) + s[9] * (s[6] * s[3] - s[2] * s[7])) * det;
	t[4] = (s[4] * (s[14] * s[11] - s[10] * s[15]) - s[8] * (s[14] * s[7] - s[6] * s[15]) + s[12] * (s[10] * s[7] - s[6] * s[11])) * det;
	t[5] = (s[0] * (s[10] * s[15] - s[14] * s[11]) - s[8] * (s[2] * s[15] - s[14] * s[3]) + s[12] * (s[2] * s[11] - s[10] * s[3])) * det;
	t[6] = (s[0] * (s[14] * s[7] - s[6] * s[15]) - s[4] * (s[14] * s[3] - s[2] * s[15]) + s[12] * (s[6] * s[3] - s[2] * s[7])) * det;
	t[7] = (s[0] * (s[6] * s[11] - s[10] * s[7]) - s[4] * (s[2] * s[11] - s[10] * s[3]) + s[8] * (s[2] * s[7] - s[6] * s[3])) * det;
	t[8] = (s[4] * (s[9] * s[15] - s[13] * s[11]) - s[8] * (s[5] * s[15] - s[13] * s[7]) + s[12] * (s[5] * s[11] - s[9] * s[7])) * det;
	t[9] = (s[0] * (s[13] * s[11] - s[9] * s[15]) - s[8] * (s[13] * s[3] - s[1] * s[15]) + s[12] * (s[9] * s[3] - s[1] * s[11])) * det;
	t[10] = (s[0] * (s[5] * s[15] - s[13] * s[7]) - s[4] * (s[1] * s[15] - s[13] * s[3]) + s[12] * (s[1] * s[7] - s[5] * s[3])) * det;
	t[11] = (s[0] * (s[9] * s[7] - s[5] * s[11]) - s[4] * (s[9] * s[3] - s[1] * s[11]) + s[8] * (s[5] * s[3] - s[1] * s[7])) * det;
	t[12] = (s[4] * (s[13] * s[10] - s[9] * s[14]) - s[8] * (s[13] * s[6] - s[5] * s[14]) + s[12] * (s[9] * s[6] - s[5] * s[10])) * det;
	t[13] = (s[0] * (s[9] * s[14] - s[13] * s[10]) - s[8] * (s[1] * s[14] - s[13] * s[2]) + s[12] * (s[1] * s[10] - s[9] * s[2])) * det;
	t[14] = (s[0] * (s[13] * s[6] - s[5] * s[14]) - s[4] * (s[13] * s[2] - s[1] * s[14]) + s[12] * (s[5] * s[2] - s[1] * s[6])) * det;
	t[15] = (s[0] * (s[5] * s[10] - s[9] * s[6]) - s[4] * (s[1] * s[10] - s[9] * s[2]) + s[8] * (s[1] * s[6] - s[5] * s[2])) * det;

	return target;
};

/**
 * Computes the analytical inverse and stores the result locally.
 * @returns {Matrix4} Self for chaining.
 */
Matrix4.prototype.invert = function () {
	return Matrix4.invert(this, this);
};

/**
 * Tests if the matrix is orthogonal.
 * @returns {Boolean} True if orthogonal.
 */
Matrix4.prototype.isOrthogonal = function () {
	var dot;

	dot = this.e00 * this.e01 + this.e10 * this.e11 + this.e20 * this.e21 + this.e30 * this.e31;

	if (Math.abs(dot) > MathUtils.EPSILON) {
		return false;
	}

	dot = this.e00 * this.e02 + this.e10 * this.e12 + this.e20 * this.e22 + this.e30 * this.e32;

	if (Math.abs(dot) > MathUtils.EPSILON) {
		return false;
	}

	dot = this.e00 * this.e03 + this.e10 * this.e13 + this.e20 * this.e23 + this.e30 * this.e33;

	if (Math.abs(dot) > MathUtils.EPSILON) {
		return false;
	}

	dot = this.e01 * this.e02 + this.e11 * this.e12 + this.e21 * this.e22 + this.e31 * this.e32;

	if (Math.abs(dot) > MathUtils.EPSILON) {
		return false;
	}

	dot = this.e01 * this.e03 + this.e11 * this.e13 + this.e21 * this.e23 + this.e31 * this.e33;

	if (Math.abs(dot) > MathUtils.EPSILON) {
		return false;
	}

	dot = this.e02 * this.e03 + this.e12 * this.e13 + this.e22 * this.e23 + this.e32 * this.e33;

	//! AT: why wrap in an if?!?!
	if (Math.abs(dot) > MathUtils.EPSILON) {
		return false;
	}

	return true;
};

/**
 * Tests if the matrix is normal.
 * @returns {Boolean} True if normal.
 */
Matrix4.prototype.isNormal = function () {
	var l;

	l = this.e00 * this.e00 + this.e10 * this.e10 + this.e20 * this.e20 + this.e30 * this.e30;

	if (Math.abs(l - 1.0) > MathUtils.EPSILON) {
		return false;
	}

	l = this.e01 * this.e01 + this.e11 * this.e11 + this.e21 * this.e21 + this.e31 * this.e31;

	if (Math.abs(l - 1.0) > MathUtils.EPSILON) {
		return false;
	}

	l = this.e02 * this.e02 + this.e12 * this.e12 + this.e22 * this.e22 + this.e32 * this.e32;

	if (Math.abs(l - 1.0) > MathUtils.EPSILON) {
		return false;
	}

	l = this.e03 * this.e03 + this.e13 * this.e13 + this.e23 * this.e23 + this.e33 * this.e33;

	//! AT: why wrap in an if?!?!
	if (Math.abs(l - 1.0) > MathUtils.EPSILON) {
		return false;
	}

	return true;
};

/**
 * Tests if the matrix is orthonormal.
 * @returns {Boolean} True if orthonormal.
 */
Matrix4.prototype.isOrthonormal = function () {
	return this.isOrthogonal() && this.isNormal();
};

/**
 * Computes the determinant of the matrix.
 * @returns {Float} Determinant of matrix.
 */
Matrix4.prototype.determinant = function () {
	var d = this.data;

	var val1 = d[5] * d[10] * d[15] +
		d[9] * d[14] * d[7] +
		d[13] * d[6] * d[11] -
		d[13] * d[10] * d[7] -
		d[9] * d[6] * d[15] -
		d[5] * d[14] * d[11];
	var val2 = d[1] * d[10] * d[15] +
		d[9] * d[14] * d[3] +
		d[13] * d[2] * d[11] -
		d[13] * d[10] * d[3] -
		d[9] * d[2] * d[15] -
		d[1] * d[14] * d[11];
	var val3 = d[1] * d[6] * d[15] +
		d[5] * d[14] * d[3] +
		d[13] * d[2] * d[7] -
		d[13] * d[6] * d[3] -
		d[5] * d[2] * d[15] -
		d[1] * d[14] * d[7];
	var val4 = d[1] * d[6] * d[11] +
		d[5] * d[10] * d[3] +
		d[9] * d[2] * d[7] -
		d[9] * d[6] * d[3] -
		d[5] * d[2] * d[11] -
		d[1] * d[10] * d[7];

	return d[0] * val1 -
		d[4] * val2 +
		d[8] * val3 -
		d[12] * val4;
};

//! AT: matrix.set(Matrix3.IDENTITY);
/**
 * Sets the matrix to identity.
 * @returns {Matrix4} Self for chaining.
 */
Matrix4.prototype.setIdentity = function () {
	var d = this.data;

	d[0] = 1;
	d[1] = 0;
	d[2] = 0;
	d[3] = 0;
	d[4] = 0;
	d[5] = 1;
	d[6] = 0;
	d[7] = 0;
	d[8] = 0;
	d[9] = 0;
	d[10] = 1;
	d[11] = 0;
	d[12] = 0;
	d[13] = 0;
	d[14] = 0;
	d[15] = 1;

	return this;
};

/**
 * Sets the rotational part of the matrix from a vector of angles. Order convention is x followed by y followed by z.
 * @param {Vector3} angles Rotational angles in radians.
 * @returns {Matrix4} Self for chaining.
 */
Matrix4.prototype.setRotationFromVector = function (angles) {
	var sx = Math.sin(angles.x);
	var cx = Math.cos(angles.x);
	var sy = Math.sin(angles.y);
	var cy = Math.cos(angles.y);
	var sz = Math.sin(angles.z);
	var cz = Math.cos(angles.z);

	var d = this.data;
	d[0] = cz * cy;
	d[1] = sz * cy;
	d[2] = 0.0 - sy;
	d[4] = cz * sy * sx - sz * cx;
	d[5] = sz * sy * sx + cz * cx;
	d[6] = cy * sx;
	d[8] = cz * sy * cx + sz * sx;
	d[9] = sz * sy * cx - cz * sx;
	d[10] = cy * cx;

	return this;
};

/**
 * Sets the rotational part of the matrix from a quaternion.
 * @param {Vector4} quaternion Rotational quaternion.
 * @returns {Matrix4} Self for chaining.
 */
Matrix4.prototype.setRotationFromQuaternion = function (quaternion) {
	var l = quaternion.lengthSquared();

	l = (l > 0.0) ? 2.0 / l : 0.0; //! AT: epsilon?

	var a = quaternion.x * l;
	var b = quaternion.y * l;
	var c = quaternion.z * l;

	var wa = quaternion.w * a;
	var wb = quaternion.w * b;
	var wc = quaternion.w * c;
	var xa = quaternion.x * a;
	var xb = quaternion.x * b;
	var xc = quaternion.x * c;
	var yb = quaternion.y * b;
	var yc = quaternion.y * c;
	var zc = quaternion.z * c;

	var d = this.data;
	d[0] = 1.0 - yb - zc;
	d[1] = xb + wc;
	d[2] = xc - wb;
	d[4] = xb - wc;
	d[5] = 1.0 - xa - zc;
	d[6] = yc + wa;
	d[8] = xc + wb;
	d[9] = yc - wa;
	d[10] = 1.0 - xa - yb;

	return this;
};

/**
 * Sets the translational part of the matrix.
 * @param {Vector3} translation Translation vector.
 * @returns {Matrix4} Self for chaining.
 */
Matrix4.prototype.setTranslation = function (translation) {
	this.data[12] = translation.x;
	this.data[13] = translation.y;
	this.data[14] = translation.z;

	return this;
};

/**
 * Gets the translational part of the matrix.
 * @param {Vector3} store Translation vector to store result in.
 * @returns {Matrix4} Self for chaining.
 */
Matrix4.prototype.getTranslation = function (store) {
	store.x = this.data[12];
	store.y = this.data[13];
	store.z = this.data[14];

	return this;
};

/**
 * Gets the rotational part of the matrix (the upper left 3x3 matrix).
 * @param {Matrix3} store Rotation matrix to store in.
 * @returns {Matrix4} Self for chaining.
 */
Matrix4.prototype.getRotation = function (store) {
	var d = this.data;
	var sd = store.data;

	sd[0] = d[0];
	sd[1] = d[1];
	sd[2] = d[2];
	sd[3] = d[4];
	sd[4] = d[5];
	sd[5] = d[6];
	sd[6] = d[8];
	sd[7] = d[9];
	sd[8] = d[10];

	return this;
};

/**
 * Gets the scaling part of the matrix.
 * @param {Vector3} store Scaling vector to store result in.
 * @returns {Matrix4} Self for chaining.
 */
Matrix4.prototype.getScale = function (store) {
	//! AT: length?
	var sx = Math.sqrt(store.setDirect(this.data[0], this.data[4], this.data[8]).lengthSquared());
	var sy = Math.sqrt(store.setDirect(this.data[1], this.data[5], this.data[9]).lengthSquared());
	var sz = Math.sqrt(store.setDirect(this.data[2], this.data[6], this.data[10]).lengthSquared());

	store.x = sx;
	store.y = sy;
	store.z = sz;

	return this;
};

/**
 * Sets the scale of the matrix.
 * @param {Vector3} scale Scale vector.
 * @returns {Matrix4} Self for chaining.
 */
Matrix4.prototype.setScale = function (scale) {
	var td = this.data;
	var x = scale.x, y = scale.y, z = scale.z;

	td[0] = x;
	td[5] = y;
	td[10] = z;

	return this;
};

/**
 * Scales the matrix.
 * @param {Vector3} scale Scale vector.
 * @returns {Matrix4} Self for chaining.
 */
Matrix4.prototype.scale = function (scale) {
	var td = this.data;
	var x = scale.x, y = scale.y, z = scale.z;

	td[0] *= x;
	td[1] *= y;
	td[2] *= z;

	td[4] *= x;
	td[5] *= y;
	td[6] *= z;

	td[8] *= x;
	td[9] *= y;
	td[10] *= z;

	return this;
};

Matrix4.prototype.decompose = function (position, rotation, scale) {
	var te = this.data;
	var sx = position.set(te[0], te[1], te[2]).length();
	var sy = position.set(te[4], te[5], te[6]).length();
	var sz = position.set(te[8], te[9], te[10]).length();

	// if determine is negative, we need to invert one scale
	var det = this.determinant();
	if ( det < 0 ) {
		sx = - sx;
	}

	position.x = te[12];
	position.y = te[13];
	position.z = te[14];

	// scale the rotation part
	rotation.copyMatrix4(this);

	var invSX = 1 / sx;
	var invSY = 1 / sy;
	var invSZ = 1 / sz;

	var rt = rotation.data;
	rt[ 0 ] *= invSX;
	rt[ 1 ] *= invSX;
	rt[ 2 ] *= invSX;
	rt[ 3 ] *= invSY;
	rt[ 4 ] *= invSY;
	rt[ 5 ] *= invSY;
	rt[ 6 ] *= invSZ;
	rt[ 7 ] *= invSZ;
	rt[ 8 ] *= invSZ;

	scale.x = sx;
	scale.y = sy;
	scale.z = sz;

	return this;
};

/**
 * Compares two matrices for approximate equality
 * @param {Matrix4} rhs The matrix to compare against
 * @param {number} [epsilon] Maximum tolerance
 * @returns {boolean}
 */
Matrix4.prototype.equals = function (rhs, epsilon) {
	var thisData = this.data;
	var rhsData = rhs.data;
	var eps = epsilon === undefined ? MathUtils.EPSILON : epsilon;

	if (eps === 0) {
		return (
			thisData[0] === rhsData[0] &&
			thisData[1] === rhsData[1] &&
			thisData[2] === rhsData[2] &&
			thisData[3] === rhsData[3] &&
			thisData[4] === rhsData[4] &&
			thisData[5] === rhsData[5] &&
			thisData[6] === rhsData[6] &&
			thisData[7] === rhsData[7] &&
			thisData[8] === rhsData[8] &&
			thisData[9] === rhsData[9] &&
			thisData[10] === rhsData[10] &&
			thisData[11] === rhsData[11] &&
			thisData[12] === rhsData[12] &&
			thisData[13] === rhsData[13] &&
			thisData[14] === rhsData[14] &&
			thisData[15] === rhsData[15]
		);
	} else {
		return (Math.abs(thisData[0] - rhsData[0]) <= eps) &&
			(Math.abs(thisData[1] - rhsData[1]) <= eps) &&
			(Math.abs(thisData[2] - rhsData[2]) <= eps) &&
			(Math.abs(thisData[3] - rhsData[3]) <= eps) &&
			(Math.abs(thisData[4] - rhsData[4]) <= eps) &&
			(Math.abs(thisData[5] - rhsData[5]) <= eps) &&
			(Math.abs(thisData[6] - rhsData[6]) <= eps) &&
			(Math.abs(thisData[7] - rhsData[7]) <= eps) &&
			(Math.abs(thisData[8] - rhsData[8]) <= eps) &&
			(Math.abs(thisData[9] - rhsData[9]) <= eps) &&
			(Math.abs(thisData[10] - rhsData[10]) <= eps) &&
			(Math.abs(thisData[11] - rhsData[11]) <= eps) &&
			(Math.abs(thisData[12] - rhsData[12]) <= eps) &&
			(Math.abs(thisData[13] - rhsData[13]) <= eps) &&
			(Math.abs(thisData[14] - rhsData[14]) <= eps) &&
			(Math.abs(thisData[15] - rhsData[15]) <= eps);
	}
};

/**
 * Copies component values and stores them locally.
 * @param {Matrix4} rhs Source matrix.
 * @returns {Matrix4} Self for chaining.
 */
Matrix4.prototype.copy = function (rhs) {
	var thisData = this.data;
	var rhsData = rhs.data;

	thisData[0] = rhsData[0];
	thisData[1] = rhsData[1];
	thisData[2] = rhsData[2];
	thisData[3] = rhsData[3];
	thisData[4] = rhsData[4];
	thisData[5] = rhsData[5];
	thisData[6] = rhsData[6];
	thisData[7] = rhsData[7];
	thisData[8] = rhsData[8];
	thisData[9] = rhsData[9];
	thisData[10] = rhsData[10];
	thisData[11] = rhsData[11];
	thisData[12] = rhsData[12];
	thisData[13] = rhsData[13];
	thisData[14] = rhsData[14];
	thisData[15] = rhsData[15];

	return this;
};

/**
 * Sets matrix values from an array.
 * @param {Array<number>} rhsData Array source
 * @returns {Matrix4} Self for chaining.
 */
Matrix4.prototype.setArray = function (rhsData) {
	var thisData = this.data;

	thisData[0] = rhsData[0];
	thisData[1] = rhsData[1];
	thisData[2] = rhsData[2];
	thisData[3] = rhsData[3];
	thisData[4] = rhsData[4];
	thisData[5] = rhsData[5];
	thisData[6] = rhsData[6];
	thisData[7] = rhsData[7];
	thisData[8] = rhsData[8];
	thisData[9] = rhsData[9];
	thisData[10] = rhsData[10];
	thisData[11] = rhsData[11];
	thisData[12] = rhsData[12];
	thisData[13] = rhsData[13];
	thisData[14] = rhsData[14];
	thisData[15] = rhsData[15];

	return this;
};

/**
 * Sets the matrix's values from another matrix's values; an alias for .copy
 * @param {Matrix4} source Source matrix
 * @returns {Matrix4} Self to allow chaining
 */
Matrix4.prototype.set = Matrix4.prototype.copy;

/**
 * Returns a new matrix with the same values as the existing one.
 * @returns {Matrix4} The new matrix.
 */
Matrix4.prototype.clone = function () {
	return new Matrix4().copy(this);
};

// SHIMS START

/**
 * @hidden
 * @deprecated
 */
Matrix4.add = ObjectUtils.warnOnce(
	'Matrix4.add is deprecated, use Matrix4.prototype.add instead',
	function (lhs, rhs, target) {
		if (!target) {
			target = new Matrix4();
		}

		if (rhs instanceof Matrix4) {
			target.e00 = lhs.e00 + rhs.e00;
			target.e10 = lhs.e10 + rhs.e10;
			target.e20 = lhs.e20 + rhs.e20;
			target.e30 = lhs.e30 + rhs.e30;
			target.e01 = lhs.e01 + rhs.e01;
			target.e11 = lhs.e11 + rhs.e11;
			target.e21 = lhs.e21 + rhs.e21;
			target.e31 = lhs.e31 + rhs.e31;
			target.e02 = lhs.e02 + rhs.e02;
			target.e12 = lhs.e12 + rhs.e12;
			target.e22 = lhs.e22 + rhs.e22;
			target.e32 = lhs.e32 + rhs.e32;
			target.e03 = lhs.e03 + rhs.e03;
			target.e13 = lhs.e13 + rhs.e13;
			target.e23 = lhs.e23 + rhs.e23;
			target.e33 = lhs.e33 + rhs.e33;
		} else {
			target.e00 = lhs.e00 + rhs;
			target.e10 = lhs.e10 + rhs;
			target.e20 = lhs.e20 + rhs;
			target.e30 = lhs.e30 + rhs;
			target.e01 = lhs.e01 + rhs;
			target.e11 = lhs.e11 + rhs;
			target.e21 = lhs.e21 + rhs;
			target.e31 = lhs.e31 + rhs;
			target.e02 = lhs.e02 + rhs;
			target.e12 = lhs.e12 + rhs;
			target.e22 = lhs.e22 + rhs;
			target.e32 = lhs.e32 + rhs;
			target.e03 = lhs.e03 + rhs;
			target.e13 = lhs.e13 + rhs;
			target.e23 = lhs.e23 + rhs;
			target.e33 = lhs.e33 + rhs;
		}

		return target;
	}
);

/**
 * @hidden
 * @deprecated
 */
Matrix4.sub = ObjectUtils.warnOnce(
	'Matrix4.sub is deprecated',
	function (lhs, rhs, target) {
		if (!target) {
			target = new Matrix4();
		}

		if (rhs instanceof Matrix4) {
			target.e00 = lhs.e00 - rhs.e00;
			target.e10 = lhs.e10 - rhs.e10;
			target.e20 = lhs.e20 - rhs.e20;
			target.e30 = lhs.e30 - rhs.e30;
			target.e01 = lhs.e01 - rhs.e01;
			target.e11 = lhs.e11 - rhs.e11;
			target.e21 = lhs.e21 - rhs.e21;
			target.e31 = lhs.e31 - rhs.e31;
			target.e02 = lhs.e02 - rhs.e02;
			target.e12 = lhs.e12 - rhs.e12;
			target.e22 = lhs.e22 - rhs.e22;
			target.e32 = lhs.e32 - rhs.e32;
			target.e03 = lhs.e03 - rhs.e03;
			target.e13 = lhs.e13 - rhs.e13;
			target.e23 = lhs.e23 - rhs.e23;
			target.e33 = lhs.e33 - rhs.e33;
		} else {
			target.e00 = lhs.e00 - rhs;
			target.e10 = lhs.e10 - rhs;
			target.e20 = lhs.e20 - rhs;
			target.e30 = lhs.e30 - rhs;
			target.e01 = lhs.e01 - rhs;
			target.e11 = lhs.e11 - rhs;
			target.e21 = lhs.e21 - rhs;
			target.e31 = lhs.e31 - rhs;
			target.e02 = lhs.e02 - rhs;
			target.e12 = lhs.e12 - rhs;
			target.e22 = lhs.e22 - rhs;
			target.e32 = lhs.e32 - rhs;
			target.e03 = lhs.e03 - rhs;
			target.e13 = lhs.e13 - rhs;
			target.e23 = lhs.e23 - rhs;
			target.e33 = lhs.e33 - rhs;
		}

		return target;
	}
);

/**
 * @hidden
 * @deprecated
 */
Matrix4.mul = ObjectUtils.warnOnce(
	'Matrix4.mul is deprecated, use Matrix4.prototype.mul instead',
	function (lhs, rhs, target) {
		if (!target) {
			target = new Matrix4();
		}

		if (rhs instanceof Matrix4) {
			target.e00 = lhs.e00 * rhs.e00;
			target.e10 = lhs.e10 * rhs.e10;
			target.e20 = lhs.e20 * rhs.e20;
			target.e30 = lhs.e30 * rhs.e30;
			target.e01 = lhs.e01 * rhs.e01;
			target.e11 = lhs.e11 * rhs.e11;
			target.e21 = lhs.e21 * rhs.e21;
			target.e31 = lhs.e31 * rhs.e31;
			target.e02 = lhs.e02 * rhs.e02;
			target.e12 = lhs.e12 * rhs.e12;
			target.e22 = lhs.e22 * rhs.e22;
			target.e32 = lhs.e32 * rhs.e32;
			target.e03 = lhs.e03 * rhs.e03;
			target.e13 = lhs.e13 * rhs.e13;
			target.e23 = lhs.e23 * rhs.e23;
			target.e33 = lhs.e33 * rhs.e33;
		} else {
			target.e00 = lhs.e00 * rhs;
			target.e10 = lhs.e10 * rhs;
			target.e20 = lhs.e20 * rhs;
			target.e30 = lhs.e30 * rhs;
			target.e01 = lhs.e01 * rhs;
			target.e11 = lhs.e11 * rhs;
			target.e21 = lhs.e21 * rhs;
			target.e31 = lhs.e31 * rhs;
			target.e02 = lhs.e02 * rhs;
			target.e12 = lhs.e12 * rhs;
			target.e22 = lhs.e22 * rhs;
			target.e32 = lhs.e32 * rhs;
			target.e03 = lhs.e03 * rhs;
			target.e13 = lhs.e13 * rhs;
			target.e23 = lhs.e23 * rhs;
			target.e33 = lhs.e33 * rhs;
		}

		return target;
	}
);

/**
 * @hidden
 * @deprecated
 */
Matrix4.div = ObjectUtils.warnOnce(
	'Matrix4.div is deprecated',
	function (lhs, rhs, target) {
		if (!target) {
			target = new Matrix4();
		}

		if (rhs instanceof Matrix4) {
			target.e00 = lhs.e00 / rhs.e00;
			target.e10 = lhs.e10 / rhs.e10;
			target.e20 = lhs.e20 / rhs.e20;
			target.e30 = lhs.e30 / rhs.e30;
			target.e01 = lhs.e01 / rhs.e01;
			target.e11 = lhs.e11 / rhs.e11;
			target.e21 = lhs.e21 / rhs.e21;
			target.e31 = lhs.e31 / rhs.e31;
			target.e02 = lhs.e02 / rhs.e02;
			target.e12 = lhs.e12 / rhs.e12;
			target.e22 = lhs.e22 / rhs.e22;
			target.e32 = lhs.e32 / rhs.e32;
			target.e03 = lhs.e03 / rhs.e03;
			target.e13 = lhs.e13 / rhs.e13;
			target.e23 = lhs.e23 / rhs.e23;
			target.e33 = lhs.e33 / rhs.e33;
		} else {
			rhs = 1.0 / rhs;

			target.e00 = lhs.e00 * rhs;
			target.e10 = lhs.e10 * rhs;
			target.e20 = lhs.e20 * rhs;
			target.e30 = lhs.e30 * rhs;
			target.e01 = lhs.e01 * rhs;
			target.e11 = lhs.e11 * rhs;
			target.e21 = lhs.e21 * rhs;
			target.e31 = lhs.e31 * rhs;
			target.e02 = lhs.e02 * rhs;
			target.e12 = lhs.e12 * rhs;
			target.e22 = lhs.e22 * rhs;
			target.e32 = lhs.e32 * rhs;
			target.e03 = lhs.e03 * rhs;
			target.e13 = lhs.e13 * rhs;
			target.e23 = lhs.e23 * rhs;
			target.e33 = lhs.e33 * rhs;
		}

		return target;
	}
);

/**
 * @hidden
 * @deprecated
 */
Matrix4.prototype.div = ObjectUtils.warnOnce(
	'Matrix4.prototype.div is deprecated',
	function (rhs) {
		return Matrix4.div(this, rhs, this);
	}
);

/**
 * @hidden
 * @deprecated
 */
Matrix4.combine = ObjectUtils.warnOnce(
	'Matrix4.combine is deprecated, use Matrix4.prototype.mul instead',
	function (lhs, rhs, target) {
		if (!target) {
			target = new Matrix4();
		}

		var s1d = lhs.data;
		var m00 = s1d[0], m01 = s1d[4], m02 = s1d[8], m03 = s1d[12],
			m10 = s1d[1], m11 = s1d[5], m12 = s1d[9], m13 = s1d[13],
			m20 = s1d[2], m21 = s1d[6], m22 = s1d[10], m23 = s1d[14],
			m30 = s1d[3], m31 = s1d[7], m32 = s1d[11], m33 = s1d[15];
		var s2d = rhs.data;
		var n00 = s2d[0], n01 = s2d[4], n02 = s2d[8], n03 = s2d[12],
			n10 = s2d[1], n11 = s2d[5], n12 = s2d[9], n13 = s2d[13],
			n20 = s2d[2], n21 = s2d[6], n22 = s2d[10], n23 = s2d[14],
			n30 = s2d[3], n31 = s2d[7], n32 = s2d[11], n33 = s2d[15];

		var rd = target.data;
		rd[0] = m00 * n00 + m01 * n10 + m02 * n20 + m03 * n30;
		rd[4] = m00 * n01 + m01 * n11 + m02 * n21 + m03 * n31;
		rd[8] = m00 * n02 + m01 * n12 + m02 * n22 + m03 * n32;
		rd[12] = m00 * n03 + m01 * n13 + m02 * n23 + m03 * n33;

		rd[1] = m10 * n00 + m11 * n10 + m12 * n20 + m13 * n30;
		rd[5] = m10 * n01 + m11 * n11 + m12 * n21 + m13 * n31;
		rd[9] = m10 * n02 + m11 * n12 + m12 * n22 + m13 * n32;
		rd[13] = m10 * n03 + m11 * n13 + m12 * n23 + m13 * n33;

		rd[2] = m20 * n00 + m21 * n10 + m22 * n20 + m23 * n30;
		rd[6] = m20 * n01 + m21 * n11 + m22 * n21 + m23 * n31;
		rd[10] = m20 * n02 + m21 * n12 + m22 * n22 + m23 * n32;
		rd[14] = m20 * n03 + m21 * n13 + m22 * n23 + m23 * n33;

		rd[3] = m30 * n00 + m31 * n10 + m32 * n20 + m33 * n30;
		rd[7] = m30 * n01 + m31 * n11 + m32 * n21 + m33 * n31;
		rd[11] = m30 * n02 + m31 * n12 + m32 * n22 + m33 * n32;
		rd[15] = m30 * n03 + m31 * n13 + m32 * n23 + m33 * n33;

		return target;
	}
);

/**
 * @hidden
 * @deprecated
 */
Matrix4.prototype.combine = ObjectUtils.warnOnce(
	'Matrix4.prototype.combine is deprecated, use Matrix4.prototype.mul instead',
	function (rhs) {
		return Matrix4.combine(this, rhs, this);
	}
);

/**
 * @hidden
 * @deprecated
 */
Matrix4.transpose = ObjectUtils.warnOnce(
	'Matrix4.transpose is deprecated, use Matrix4.prototype.transpose instead',
	function (source, target) {
		if (!target) {
			target = new Matrix4();
		}

		var s = source.data;
		var t = target.data;

		if (target === source) {
			var e01 = s[4];
			var e02 = s[8];
			var e03 = s[12];
			var e12 = s[9];
			var e13 = s[13];
			var e23 = s[14];

			t[4] = s[1];
			t[8] = s[2];
			t[12] = s[3];
			t[9] = s[6];
			t[13] = s[7];
			t[14] = s[11];

			t[1] = e01;
			t[2] = e02;
			t[3] = e03;
			t[6] = e12;
			t[7] = e13;
			t[11] = e23;

			return target;
		}

		t[0] = s[0];
		t[1] = s[4];
		t[2] = s[8];
		t[3] = s[12];
		t[4] = s[1];
		t[5] = s[5];
		t[6] = s[9];
		t[7] = s[13];
		t[8] = s[2];
		t[9] = s[6];
		t[10] = s[10];
		t[11] = s[14];
		t[12] = s[3];
		t[13] = s[7];
		t[14] = s[11];
		t[15] = s[15];

		return target;
	}
);

/**
 * @hidden
 * @deprecated
 */
Matrix4.prototype.applyPre = ObjectUtils.warnOnce(
	'Matrix4.prototype.applyPre is deprecated, use Vector4.prototype.applyPre instead',
	function (rhs) {
		var x = rhs.x;
		var y = rhs.y;
		var z = rhs.z;
		var w = rhs.w;

		var s = this.data;
		rhs.x = s[0] * x + s[1] * y + s[2] * z + s[3] * w;
		rhs.y = s[4] * x + s[5] * y + s[6] * z + s[7] * w;
		rhs.z = s[8] * x + s[9] * y + s[10] * z + s[11] * w;
		rhs.w = s[12] * x + s[13] * y + s[14] * z + s[15] * w;

		return rhs;
	}
);

/**
 * @hidden
 * @deprecated
 */
Matrix4.prototype.applyPost = ObjectUtils.warnOnce(
	'Matrix4.prototype.applyPost is deprecated, use Vector4.prototype.applyPost instead',
	function (rhs) {
		var x = rhs.x;
		var y = rhs.y;
		var z = rhs.z;
		var w = rhs.w;

		var s = this.data;
		rhs.x = s[0] * x + s[4] * y + s[8] * z + s[12] * w;
		rhs.y = s[1] * x + s[5] * y + s[9] * z + s[13] * w;
		rhs.z = s[2] * x + s[6] * y + s[10] * z + s[14] * w;
		rhs.w = s[3] * x + s[7] * y + s[11] * z + s[15] * w;

		return rhs;
	}
);

/**
 * @hidden
 * @deprecated
 */
Matrix4.prototype.applyPostPoint = ObjectUtils.warnOnce(
	'Matrix4.prototype.applyPostPoint is deprecated, use Vector4.prototype.applyPostPoint instead',
	function (rhs) {
		return rhs.applyPostPoint(this);
	}
);

/**
 * @hidden
 * @deprecated
 */
Matrix4.prototype.applyPostVector = ObjectUtils.warnOnce(
	'Matrix4.prototype.applyPostVector is deprecated, use Vector4.prototype.applyPostVector instead',
	function (rhs) {
		var x = rhs.x;
		var y = rhs.y;
		var z = rhs.z;

		var d = this.data;
		rhs.x = d[0] * x + d[4] * y + d[8] * z;
		rhs.y = d[1] * x + d[5] * y + d[9] * z;
		rhs.z = d[2] * x + d[6] * y + d[10] * z;

		return rhs;
	}
);

// SHIMS END

// @ifdef DEBUG
Matrix.addPostChecks(Matrix4.prototype, [
	'add', 'sub', 'scale', 'transpose', 'invert',
	'isOrthogonal', 'determinant',
	'copy'
]);
// @endif

module.exports = Matrix4;
