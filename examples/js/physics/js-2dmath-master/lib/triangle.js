/**
 * Stability: 2 (fixes / performance improvements)
 *
 * Triangle is represented as a three coordinates array
 * [A:Vec2, B:Vec2, C:Vec2]
 */


var Vec2 = require("./vec2.js"),
    vec2_midpoint = Vec2.midPoint,
    vec2_distance = Vec2.distance,
    vec2_pow = Vec2.pow,
    vec2_dot = Vec2.dot,
    DIV3 = 1 / 3,
    ah = [0, 0],
    bh = [0, 0],
    ch = [0, 0],
    dab = [0, 0],
    dbc = [0, 0],
    dca = [0, 0],
    det = 0,
    a = 0,
    b = 0,
    c = 0;
/**
 * A(x1, y1), B(x2, y2), C(x3, y3)
 * @param {Number} x1
 * @param {Number} y1
 * @param {Number} x2
 * @param {Number} y2
 * @param {Number} x3
 * @param {Number} y3
 * @return {Triangle}
 */
function create(x1, y1, x2, y2, x3, y3) {
    var out = [[x1, y1], [x2, y2], [x3, y3], false];

    //normalize(out, out);
    return out;
}
/**
 * @return {Triangle}
 */
function zero() {
    return [[0, 0], [0, 0], [0, 0], true];
}
/**
 * @param {Triangle} tri
 * @return {Triangle}
 */
function clone(tri) {
    return [[tri[0][0], tri[0][1]], [tri[1][0], tri[1][1]], [tri[2][0], tri[2][1]], tri[3]];
}
/**
 * @param {Triangle} out_tri
 * @param {Triangle} tri
 * @return {Triangle}
 */
function copy(out_tri, tri) {
    out_tri[0][0] = tri[0][0];
    out_tri[0][1] = tri[0][1];

    out_tri[1][0] = tri[1][0];
    out_tri[1][1] = tri[1][1];

    out_tri[2][0] = tri[2][0];
    out_tri[2][1] = tri[2][1];

    out_tri[3] = tri[3];

    return out_tri;
}

/**
 * @param {Vec2} out_vec2
 * @param {Triangle} tri
 * @return {Vec2}
 */
function abMidPoint(out_vec2, tri) {
    return vec2_midpoint(out_vec2, tri[0], tri[1]);
}
/**
 * @param {Vec2} out_vec2
 * @param {Triangle} tri
 * @return {Vec2}
 */
function bcMidPoint(out_vec2, tri) {
    return vec2_midpoint(out_vec2, tri[1], tri[2]);
}
/**
 * @param {Vec2} out_vec2
 * @param {Triangle} tri
 * @return {Vec2}
 */
function caMidPoint(out_vec2, tri) {
    return vec2_midpoint(out_vec2, tri[2], tri[0]);
}
/**
 * @param {Triangle} out
 * @param {Triangle} tri
 * @return {Triangle}
 */
function midTriangle(out, tri) {
    abMidPoint(out[0], tri);
    bcMidPoint(out[1], tri);
    caMidPoint(out[2], tri);

    return out;

}
/**
 * @param {Triangle} tri
 * @return {Number}
 */
function perimeter(tri) {
    return vec2_distance(tri[0], tri[1]) +
        vec2_distance(tri[1], tri[2]) +
        vec2_distance(tri[2], tri[0]);
}

/**
 * @param {Vec2} out_vec2
 * @param {Triangle} tri
 * @return {Vec2}
 */
function centroid(out_vec2, tri) {
    out_vec2[0] = (tri[0][0] + tri[1][0] + tri[2][0]) * DIV3;
    out_vec2[1] = (tri[0][1] + tri[1][1] + tri[2][1]) * DIV3;

    return out_vec2;
}
/**
 * @param {Vec2} out_vec2
 * @param {Triangle} tri
 * @return {Vec2}
 */
function incenter(out_vec2, tri) {
    a = Vec2.distance(tri[1], tri[2]);
    b = Vec2.distance(tri[2], tri[0]);
    c = Vec2.distance(tri[0], tri[1]);

    out_vec2[0] = (a * tri[0][0] + b * tri[1][0] + c * tri[2][0]) * DIV3;
    out_vec2[1] = (a * tri[0][1] + b * tri[1][1] + c * tri[2][1]) * DIV3;

    return out_vec2;
}
/**
 * @param {Vec2} out_vec2
 * @param {Triangle} tri
 * @return {Vec2}
 */
function circumcenter(out_vec2, tri) {
    var bx = tri[1][0] - tri[0][0],
        by = tri[1][1] - tri[0][1],
        bl = bx * bx + by * by,
        cx = tri[2][0] - tri[0][0],
        cy = tri[2][1] - tri[0][1],
        cl = cx * cx + cy * cy,
        d = 2 * (bx * cy - by * cx),
        x = cy * bl - by * cl,
        y = bx * cl - cx * bl;

    out_vec2[0] = x / d + tri[0][0];
    out_vec2[1] = y / d + tri[0][1];

    return out_vec2;
}
/**
 * @param {Triangle} tri
 * @return {Number}
 */
function area(tri) {
    dab = Vec2.min(dbc, tri[1], tri[0]);
    dbc = Vec2.min(dbc, tri[2], tri[0]);

    return (dbc[1] * dab[0] - dbc[0] * dab[1]) * 0.5;
}

/**
 * @param {Triangle} out
 * @param {Triangle} tri
 * @param {Vec2} vec2
 * @return {Triangle}
 */
function translate(out, tri, vec2) {
    out[0][0] = tri[0][0] + vec2[0];
    out[0][1] = tri[0][1] + vec2[1];

    out[1][0] = tri[1][0] + vec2[0];
    out[1][1] = tri[1][1] + vec2[1];

    out[2][0] = tri[2][0] + vec2[0];
    out[2][1] = tri[2][1] + vec2[1];

    return out;
}

var ac = [0, 0],
    ab = [0, 0],
    av = [0, 0],
    dot00,
    dot01,
    dot02,
    dot11,
    dot12,
    invDenom,
    u,
    v;

/**
 * @param {Triangle} tri
 * @param {Vec2} vec2
 * @return {Boolean}
 */
function isVec2Inside(tri, vec2) {

    // Compute vectors
    // ac = C - A
    Vec2.sub(ac, tri[2], tri[0]);
    // ab = B - A
    Vec2.sub(ab, tri[1], tri[0]);
    // av = P - A
    Vec2.sub(av, vec2, tri[0]);

    // Compute dot products
    dot00 = vec2_dot(ac, ac)
    dot01 = vec2_dot(ac, ab)
    dot02 = vec2_dot(ac, av)
    dot11 = vec2_dot(ab, ab)
    dot12 = vec2_dot(ab, av)

    // Compute barycentric coordinates
    invDenom = 1 / (dot00 * dot11 - dot01 * dot01)
    u = (dot11 * dot02 - dot01 * dot12) * invDenom
    v = (dot00 * dot12 - dot01 * dot02) * invDenom

    // Check if point is in triangle
    return (u >= 0) && (v >= 0) && (u + v < 1);
}

/**
 * @class Triangle
 */
var Triangle = {
    create: create,
    zero: zero,
    clone: clone,
    copy: copy,

    abMidPoint: abMidPoint,
    bcMidPoint: bcMidPoint,
    caMidPoint: caMidPoint,
    midTriangle: midTriangle,

    perimeter: perimeter,

    centroid: centroid,
    incenter: incenter,
    circumcenter: circumcenter,
    area: area,
    translate: translate,
    isVec2Inside: isVec2Inside,

    // alias
    center: centroid,
};

module.exports = Triangle;