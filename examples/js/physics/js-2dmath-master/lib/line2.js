/*
 * Stability: 1 (Only additions & fixes)
 *
 * Point-Slope Equation of a Line: y - y1 = m(x - x1)
 */
var dx,
    dy,
    r,
    sqrt = Math.sqrt,
    tan = Math.tan,
    atan = Math.atan,
    sin = Math.sin,
    cos = Math.cos,
    near = Math.near;

/**
 * @param {Number} x
 * @param {Number} y
 * @param {Number} m
 * @return {Line2}
 */
function create(x, y, m) {
    return [[x, y], m];
}
/**
 * @return {Line2}
 */
function zero() {
    return [[0, 0], 0];
}
/**
 * @param {Vec2} v1
 * @param {Vec2} v2
 * @return {Line2}
 */
function fromVec2(v1, v2) {
    return [[v1[0], v1[1]], (v1[0] - v2[0]) / (v1[0] - v2[1])];
}
/**
 * @param {Number} x1
 * @param {Number} y1
 * @param {Number} x2
 * @param {Number} y2
 * @return {Line2}
 */
function from2Points(x1, y1, x2, y2) {
    return [[x1, y1], (x1 - x2) / (y1 - y2)];
}
/**
 * @param {Segment2} seg2
 * @return {Line2}
 */
function fromSegment2(seg2) {
    return [[seg2[0], seg2[1]], (seg2[0] - seg2[2]) / (seg2[1] - seg2[3])];
}
/**
 * @param {Line2} out
 * @param {Line2} line2
 * @return {Line2}
 */
function copy(out, line2) {
    out[0][0] = line2[0][0];
    out[0][1] = line2[0][1];
    out[1] = line2[1];

    return out;
}
/**
 * @param {Line2} line2
 * @return {Line2}
 */
function clone(line2) {
    return [[line2[0][0], line2[0][1]], line2[1]];
}
/**
 * @param {Line2} out
 * @param {Line2} line2
 * @param {Vec2} v1
 * @return {Line2}
 */
function add(out, line2, v1) {
    out[0][0] = line2[0][0] + v1[0];
    out[0][1] = line2[0][1] + v1[1];
    out[1] = line2[1];

    return out;
}
/**
 * @param {Line2} out
 * @param {Line2} line2
 * @param {Vec2} v1
 * @return {Line2}
 */
function subtract(out, line2, v1) {
    out[0][0] = line2[0][0] - v1[0];
    out[0][1] = line2[0][1] - v1[1];
    out[1] = line2[1];

    return out;
}

/**
 * @param {Line2} out
 * @param {Line2} line2
 * @param {Vec2} offset
 * @return {Line2}
 */
function offset(out, line2, offset) {
    out[0][0] = line2[0][0] + offset;
    out[0][1] = line2[0][1];
    out[1] = line2[1];

    return out;
}

/**
 * @param {Line2} out
 * @param {Line2} line2
 * @param {Number} radians
 * @return {Line2}
 */
function rotate(out, line2, radians) {
    out[0][0] = line2[0][0];
    out[0][1] = line2[0][1];

    out[1] = tan(atan(line2[1]) + radians);

    return out;
}

/**
 * @todo
 * @source http://mathcentral.uregina.ca/QQ/database/QQ.09.04/carly1.html
 * @param {Vec2} out_vec2
 * @param {Line2} line2
 * @param {Vec2} vec2
 * @return {Vec2}
 */
function closetPoint(out_vec2, line2, vec2) {
    var m = line2[1];
        mp = 1 / m; // optimization: do not negate

    // y = m*x + y1
    // (y - y2) = m' (x - x2)

    // m*x =  m' * x - m' * x2 + y2 - y1
    // (m - m') * x =  m' * x2 + y2 - y1
    // x =  (m' * x2 + y2 - y1) / (m - m')


    out_vec2[1] = (mp * vec2[0] + vec2[1] - line2[0][1]) / (m + mp);
    out_vec2[0] = m * out_vec2[1] + line2[0][1];

    return out_vec2;
}
/**
 * Over the line, has near check to avoid floating point errors.
 * @param {Line2} line2
 * @param {Vec2} vec2
 * @return {Boolean}
 */
function isVec2Inside(line2, vec2) {
    var p = line2[0];
    return near(line2[1], (vec2[1] - p[1]) / (vec2[0] - p[0]));
}


/**
 * @class Line2
 */
var Line2 = {
    create: create,
    zero: zero,
    fromVec2: fromVec2,
    from2Points: from2Points,
    fromSegment2: fromSegment2,
    copy: copy,
    clone: clone,
    add: add,
    subtract: subtract,
    offset: offset,
    rotate: rotate,
    closetPoint: closetPoint,
    isVec2Inside: isVec2Inside,

    // alias
    translate: add,
    sub: subtract
};


module.exports = Line2;