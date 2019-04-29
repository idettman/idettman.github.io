(function() {
    /*
     * Algorithm could be 'linear', 'cubic' or 'bezier'.
     * Able to be expanded.
     *
     * The parameters are actual values of axis X(horizontal) and Y(vertical)
     *  x0: starting X value
     *  y0: starting Y value
     *  xf: final X value
     *  yf: final Y value
     */
    window.Pather = window.Pather || function(x0, y0, xf, yf, algorithm) {
        this.x0 = x0;
        this.y0 = y0;
        this.xf = xf;
        this.yf = yf;
        this.algorithm = algorithm;

        switch(this.algorithm) {
            case 'linear':
                this.poly = getLinearPoly(this.x0, this.y0, this.xf, this.yf);
                break;
            default:
            case 'cubic':
                this.poly = getCubicPoly(this.x0, this.y0, this.xf, this.yf);
                break;
            case 'bezier':
                this.bezier = getBezierParameters(this.x0, this.y0, this.xf, this.yf);
                break;
        }
    };

    /*
     * Gets the value from a given X position
     */
    window.Pather.prototype.getValue = function(x) {
        if (typeof(x) !== 'number' || x < this.x0 || x > this.xf) {
            return NaN;
        }

        switch(this.algorithm) {
            default:
            case 'linear':
            case 'cubic':
                return getPolyValue(this.poly, x);
                break;
            case 'bezier':
                return getBezierYValue(this.bezier, (x - this.x0) / (this.xf - this.x0));
                break;
        }
    };

    /*
     * Returns the coefficients of a cubic polynomial representing the path between [t0, q0] and [tf, qf]
     * t0 = initial time (X-axis)
     * tf = final time (X-axis)
     * q0 = initial value (Y-axis)
     * qf = final value (Y-axis)
     *
     * The result array is ordered in such way that the:
     *  - first element is the constant (X to power 0)
     *  - second element is the coefficient of X (to power 1)
     *  - third element is the coefficient of X squared (power 2)
     *  - fourth element is the coefficient of X cubed (power 3)
     *
     *  Example:
     *  [ 3, 4, 5, 6 ]  =  3 + 4*X + 5*Xˆ2 + 6*Xˆ3
     */
    function getCubicPoly(t0, q0, tf, qf) {
        var t02 = t0*t0;  // t0 ^2
        var t03 = t02*t0; // t0 ^3
        var tf2 = tf*tf;  // tf ^2
        var tf3 = tf2*tf; // tf ^3

        // Assemble first matrix
        A = $M( [ [1, t0, t02,  t03],
                  [1, tf, tf2,  tf3],
                  [0, 1,  2*t0, 3*t02],
                  [0, 1,  2*tf, 3*tf2] ] );
        // Assemble the value matrix
        B = $M( [ [q0],
                  [qf],
                  [0],
                  [0] ] );

        // Now calculate the result
        var resultMatrix = A.inverse().multiply(B);
        // And convert to a single array
        var resultArray = [];
        resultArray[0] = resultMatrix.elements[0][0];
        resultArray[1] = resultMatrix.elements[1][0];
        resultArray[2] = resultMatrix.elements[2][0];
        resultArray[3] = resultMatrix.elements[3][0];

        return resultArray;
    }

    /*
     * Get coefficients of a linear polynomial
     */
    function getLinearPoly(t0, q0, tf, qf) {
        var dqdt = (qf-q0)/(tf-t0);
        var resultArray = [];
        resultArray.push(q0-t0*dqdt);
        resultArray.push(dqdt);
        return resultArray;
    }

    /*
     * This function calculates the specific point, given the polynomial coefficients.
     * Works with any degree polynomial.
     */
    function getPolyValue(poly, time) {
        var result = 0,
            variable = 1; // Starts with Xˆ0 = 1
        for (var coef in poly) {
            result += poly[coef] * variable; // Adds the value to the result
            variable *= time; // Increase the power of the variable
        }

        return result;
    };

    /*
     * Get bezier default parameters
     *
     * The result is an array of 4 points. Each point is an array of 2 values: [x, y]
     * Default values for p1 and p2 are the same Y as y0 and yf, respectively, and half-way between x0 and xf
     *
     *            p2         p3
     *            o----------o
     *                   .
     *                .
     *              .
     *            .
     *           .
     *          .
     *        .
     *     .
     * o----------o
     * p0        p1
     */
    function getBezierParameters(x0, y0, xf, yf) {
        var p0 = [ x0, y0 ];
        var p1 = [ x0 + (xf - x0) / 2, y0 ];
        var p2 = [ p1[0], yf ];
        var p3 = [ xf, yf ];

        return [ p0, p1, p2, p3 ];
    }

    /*
     * Returns the intermediate point of the bezier curve
     */
    function getBezierValue(bezierPoints, percent) {
        var p01 = getPercentValue(bezierPoints[0], bezierPoints[1], percent);
        var p12 = getPercentValue(bezierPoints[1], bezierPoints[2], percent);
        var p23 = getPercentValue(bezierPoints[2], bezierPoints[3], percent);

        var p01_12 = getPercentValue(p01, p12, percent);
        var p12_23 = getPercentValue(p12, p23, percent);

        return getPercentValue(p01_12, p12_23, percent);
    }


    /*
     * Returns the intermediate Y value of the bezier curve
     */
    function getBezierYValue(bezierPoints, percent) {
        var y01 = getPercentValue(bezierPoints[0][1], bezierPoints[1][1], percent);
        var y12 = getPercentValue(bezierPoints[1][1], bezierPoints[2][1], percent);
        var y23 = getPercentValue(bezierPoints[2][1], bezierPoints[3][1], percent);

        var y01_12 = getPercentValue(y01, y12, percent);
        var y12_23 = getPercentValue(y12, y23, percent);

        return getPercentValue(y01_12, y12_23, percent);
    }

    /*
     * Get the point in a percentage between 2 points
     */
    function getPercentPoint(p1, p2, percent) {
        return [ p1[0] + percent * (p2[0] - p1[0]),
                 p1[1] + percent * (p2[1] - p1[1]) ];
    }

    /*
     * Get the point in a percentage between 2 values
     */
    function getPercentValue(v1, v2, percent) {
        return v1 + percent * (v2 - v1);
    }
}());

