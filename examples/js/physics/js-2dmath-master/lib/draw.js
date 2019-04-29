/**
 * Utilities for rendering in CanvasElement
 */

/**
 * @param {CanvasRenderingContext2D} context2d
 * @param {Rectangle} rect
 * @param {String} style strokeStyle
 */
function rectangle(context2d, rect, style) {
    if (style !== undefined) {
        context2d.strokeStyle = style;
    }

    context2d.strokeRect(rect[0][0], rect[0][1], rect[1][0] - rect[0][0], rect[1][1] - rect[0][1]);
}

if ("undefined" !== typeof CanvasRenderingContext2D) {
    var fillText = CanvasRenderingContext2D.prototype.fillText;
    function invertFillText(a, b, c) {
        this.save();
        //ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.transform(1, 0, 0, -1, 0, 0);
        fillText.call(this, a, b, -c);
        this.restore();
    }

    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();
}



/**
 * calling this override fillText so you didn"t see inverted text
 * You must not modify the transformation matrix without the proper save/restore.
 * @param {CanvasElement} canvas
 * @param {CanvasRenderingContext2D} context2d
 */
function invertAxis(canvas, context2d) {
    context2d.setTransform(1, 0, 0, -1, 0, canvas.height);
    context2d.fillText = invertFillText;
}
/**
 * @param {CanvasRenderingContext2D} context2d
 * @param {Number=} coords
 * @param {Number=} count
 */
function cartesianAxis(context2d, coords, count) {
    context2d.save();

    context2d.strokeStyle = "rgba(0,0,0, 0.25)";
    //context2d.strokeStyle = "red";

    context2d.font = "6pt Consolas";


    coords = coords || 320;
    count = count || 16;

    context2d.beginPath();
    context2d.moveTo(-coords, 0);
    context2d.lineTo(coords, 0);
    context2d.stroke();

    context2d.beginPath();
    context2d.moveTo(0, -coords);
    context2d.lineTo(0, coords);
    context2d.stroke();


    if (context2d.setLineDash) {
        context2d.setLineDash([1, 2]);
    } else {
        context2d.strokeStyle = "rgba(0,0,0, 0.125)";
    }

    context2d.beginPath();
    context2d.moveTo(-coords, coords * 0.5);
    context2d.lineTo(coords, coords * 0.5);
    context2d.stroke();

    context2d.beginPath();
    context2d.moveTo(-coords, -coords * 0.5);
    context2d.lineTo(coords, -coords * 0.5);
    context2d.stroke();

    context2d.beginPath();
    context2d.moveTo(coords * 0.5, -coords);
    context2d.lineTo(coords * 0.5, coords);
    context2d.stroke();

    context2d.beginPath();
    context2d.moveTo(-coords * 0.5, -coords);
    context2d.lineTo(-coords * 0.5, coords);
    context2d.stroke();


    context2d.setLineDash([]);


    context2d.strokeStyle = "rgba(0,0,0, 0.25)";

    var i,
        inc = coords * 2 / count,
        max = count,
        x,
        y;

    context2d.textAlign = "center";
    for (i = 0; i <= max; ++i) {
        x = -coords + i * inc;
        context2d.beginPath();
        context2d.moveTo(x, 4);
        context2d.lineTo(x, -4);
        context2d.stroke();

        if (x !== 0) {
            context2d.fillText(x, x, -12);
        }
    }

    context2d.fillText("(0,0)", 0, -12);

    context2d.textAlign = "left";
    for (i = 0; i <= max; ++i) {
        y = -coords + i * inc;
        context2d.beginPath();
        context2d.moveTo(4, y);
        context2d.lineTo(-4, y);
        context2d.stroke();

        if (y !== 0) {
            context2d.fillText(y, +12, y - 4);
        }
    }

    context2d.restore();
}
/**
 * @param {CanvasRenderingContext2D} context2d
 * @param {Circle} circle
 * @param {String} style strokeStyle/fillStyle
 * @param {Boolean=} fill
 */
function circle(context2d, circle, style, fill) {
    context2d.save();

    if (style !== undefined) {
        fill ? context2d.fillStyle = style : context2d.strokeStyle = style;
    }

    context2d.beginPath();
    context2d.arc(circle[0][0], circle[0][1], circle[1], 0, 2 * Math.PI, false);
    context2d.stroke();

    context2d.beginPath();
    context2d.arc(circle[0][0], circle[0][1], 1, 0, 2 * Math.PI, false);
    fill ? context2d.fill() : context2d.stroke();

    context2d.restore();
}
/**
 * @param {CanvasRenderingContext2D} context2d
 * @param {Line2} line2
 * @param {String} style strokeStyle
 * @param {Number=} length
 */
function line2(context2d, line2, style, length) {
    context2d.save();

    if (style !== undefined) {
        context2d.strokeStyle = style;
    }

    context2d.beginPath();
    var m = line2[1];
    length = length || 100;

    context2d.moveTo(line2[0][0] - (length * m), line2[0][1] - length);
    context2d.lineTo(line2[0][0] + (length * m), line2[0][1] + length);
    context2d.stroke();

    context2d.restore();
}
/**
 * @param {CanvasRenderingContext2D} context2d
 * @param {Vec2} vec2
 * @param {String} style strokeStyle
 * @param {Number=} length
 */
function vec2(context2d, vec2, style, length) {
    context2d.save();

    length = length || 2;

    if (style !== undefined) {
        context2d.strokeStyle = style;
    }

    context2d.beginPath();
    context2d.moveTo(vec2[0] + length, vec2[1] + length);
    context2d.lineTo(vec2[0] - length, vec2[1] - length);
    context2d.stroke();

    context2d.beginPath();
    context2d.moveTo(vec2[0] - length, vec2[1] + length);
    context2d.lineTo(vec2[0] + length, vec2[1] - length);
    context2d.stroke();

    context2d.restore();
}
/**
 * @param {CanvasRenderingContext2D} context2d
 * @param {Vec2} origin
 * @param {Vec2} vec2
 * @param {Number=} length
 * @param {String} style strokeStyle
 */
function vec2dir(context2d, origin, vec2, length, style) {
    context2d.save();

    length = length || 2;

    if (style !== undefined) {
        context2d.strokeStyle = style;
    }

    context2d.beginPath();
    context2d.moveTo(origin[0], origin[1]);
    context2d.lineTo(origin[0] + vec2[0] * length, origin[1] + vec2[1] * length);
    context2d.stroke();

    context2d.restore();
}
/**
 * @param {CanvasRenderingContext2D} context2d
 * @param {Vec2} vec2
 * @param {Number} angle
 * @param {String} style strokeStyle
 * @param {Number=} length
 */
function angle(context2d, vec2, angle, style, length) {
    context2d.save();

    length = length || 10;

    if (style !== undefined) {
        context2d.strokeStyle = style;
    }

    context2d.beginPath();
    context2d.moveTo(vec2[0] + 2, vec2[1] + 2);
    context2d.lineTo(vec2[0] - 2, vec2[1] - 2);
    context2d.stroke();

    context2d.beginPath();
    context2d.moveTo(vec2[0], vec2[1]);
    context2d.lineTo(vec2[0] + Math.cos(angle) * length, vec2[1] + Math.sin(angle) * length);
    context2d.stroke();

    context2d.restore();
}
/**
 * @param {CanvasRenderingContext2D} context2d
 * @param {Segment2} seg2
 * @param {String} style strokeStyle
 */
function segment2(context2d, seg2, style) {
    context2d.save();

    if (style !== undefined) {
        context2d.strokeStyle = style;
    }

    context2d.beginPath();
    context2d.moveTo(seg2[0], seg2[1]);
    context2d.lineTo(seg2[2], seg2[3]);
    context2d.stroke();


    context2d.beginPath();
    context2d.arc(seg2[0], seg2[1], 1, 0, 2 * Math.PI, false);
    context2d.stroke();

    context2d.beginPath();
    context2d.arc(seg2[2], seg2[3], 1, 0, 2 * Math.PI, false);
    context2d.stroke();

    context2d.restore();

}
/**
 * @param {CanvasRenderingContext2D} context2d
 * @param {Triangle} tri
 * @param {String} style strokeStyle/fillStyle
 * @param {Boolean=} fill
 */
function triangle(context2d, tri, style, fill) {
    context2d.save();

    if (style !== undefined) {
        fill ? context2d.fillStyle = style : context2d.strokeStyle = style;
    }

    context2d.beginPath();
    context2d.lineTo(tri[1][0], tri[1][1]);
    context2d.lineTo(tri[2][0], tri[2][1]);
    context2d.lineTo(tri[0][0], tri[0][1]);
    context2d.lineTo(tri[1][0], tri[1][1]);
    fill ? context2d.fill() : context2d.stroke();

    context2d.restore();
}
/**
 * @param {CanvasRenderingContext2D} context2d
 * @param {AABB2} aabb2
 * @param {String} style strokeStyle/fillStyle
 * @param {Boolean=} fill
 */
function aabb2(context2d, aabb2, style, fill) {
    context2d.save();


    if (style !== undefined) {
        fill ? context2d.fillStyle = style : context2d.strokeStyle = style;
    }

    context2d.strokeRect(aabb2[0], aabb2[1], aabb2[2] - aabb2[0], aabb2[3] - aabb2[1]);

    context2d.restore();
}
/**
 * @param {CanvasRenderingContext2D} context2d
 * @param {Polygon} poly
 * @param {String} style strokeStyle/fillStyle
 * @param {Boolean=} fill
 */
function polygon(context2d, poly, style, fill) {
    context2d.save();

    if (poly.length < 3) {
        fill = false;
    }

    if (style !== undefined) {
        fill ? context2d.fillStyle = style : context2d.strokeStyle = style;
    }

    context2d.beginPath();
    context2d.moveTo(poly[0][0], poly[0][1]);
    var i,
        max;

    for (i = 1, max = poly.length; i < max; ++i) {
        context2d.lineTo(poly[i][0], poly[i][1]);
    }

    context2d.lineTo(poly[0][0], poly[0][1]);
    fill ? context2d.fill() : context2d.stroke();

    context2d.restore();
}
/**
 * @param {CanvasRenderingContext2D} context2d
 * @param {String} text
 * @param {Vec2} vec2 position
 * @param {String=} font
 */
function text(context2d, text, vec2, font) {
    font = font || "10pt Consolas";
    context2d.font = font;

    context2d.fillText(text, vec2[0], vec2[1]);
}
/**
 * @param {CanvasRenderingContext2D} context2d
 * @param {Matrix23} m2d
 */
function applyMatrix23(context2d, m2d) {
    context2d.setTransform(m2d[0], m2d[1], m2d[2], m2d[3], m2d[4], m2d[5]);
}


var Draw = {
    invertAxis: invertAxis,
    cartesianAxis: cartesianAxis,

    vec2: vec2,
    vec2dir: vec2dir,
    rectangle: rectangle,
    circle: circle,
    line2: line2,
    triangle: triangle,
    angle: angle,
    segment2: segment2,
    aabb2: aabb2,
    polygon: polygon,

    applyMatrix23: applyMatrix23,

    text: text
};

module.exports = Draw;
