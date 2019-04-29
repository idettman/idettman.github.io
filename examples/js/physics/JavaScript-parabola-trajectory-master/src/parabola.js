/*!
 * parabola trajectory v1.0
 *
 * Contact: https://github.com/xiaolin3303
 * 2016-09-30
 *
 * Designed and built with all the love of Web
 */
;(function (window, Math) {
    /*
     * @params Object opts
     */
    function Parabola (opts) {
        opts = opts || {};
        // required `startPos`, `endPos` params in opts
        if (!opts.startPos) {
            throw new Error('`startPos` is required in init options');
        }

        if (!opts.endPos) {
            throw new Error('`endPos` is required in init options');
        }

        opts.duration = opts.duration || 2000;
        opts.timingFunction = opts.timingFunction || '';
        opts.timingFunction = this.timingFunction[opts.timingFunction]

        if (!opts.timingFunction) {
            opts.timingFunction = this.timingFunction['linear'];
        }

        this.opts = opts;

        this.calCurvature();
    }

    Parabola.prototype.timingFunction = {
        easeIn: function(pos){
            return Math.pow(pos, 3);
        },

        easeOut: function(pos){
            return (Math.pow((pos - 1), 3) +1);
        },

        easeInOut: function(pos){
            if ( (pos /= 0.5) < 1 ) {
                return 0.5 * Math.pow(pos, 3);
            } else {     
                return 0.5 * (Math.pow((pos - 2), 3) + 2);
            }
        },

        linear: function(pos) {
            return pos;
        },
    }

    Parabola.prototype.calCurvature = function () {

        this.opts.driftX = this.opts.endPos.left - this.opts.startPos.left;
        this.opts.driftY = this.opts.endPos.top - this.opts.startPos.top;

        // 在不超出屏幕范围的前提下，尽量抛得更高，计算合适的曲率 (a)
        var yMin = -1 * this.opts.startPos.top;

        var a = Math.pow(this.opts.driftX, 4);
        var b = (4 * yMin - 2 * this.opts.driftY) * Math.pow(this.opts.driftX, 2);
        var c = Math.pow(this.opts.driftY, 2);

        this.opts.curvature = (-1 * b + Math.sqrt((Math.pow(b, 2) - 4 * a * c))) / (2 * a);

        this.opts.b = (this.opts.driftY - this.opts.curvature * this.opts.driftX * this.opts.driftX) / this.opts.driftX;
    }

    Parabola.prototype.calPosition = function (progress) {
        // 当前进度下的X轴的位置
        x = this.opts.driftX * this.opts.timingFunction(progress);
        // 当前进度下的Y轴的位置
        // y = a*x*x + b*x + c,  c = 0

        y = this.opts.curvature * x * x + this.opts.b * x;

        return {
            left: Math.round(x + this.opts.startPos.left),
            top: Math.round(y + this.opts.startPos.top)
        }
    }

    Parabola.prototype.start = function () {
        var opts = this.opts;
        var me = this;
        var startTimeStamp = +new Date();
        var animationFrame = window.requestAnimationFrame  ||
            window.webkitRequestAnimationFrame  ||
            window.mozRequestAnimationFrame     ||
            window.oRequestAnimationFrame       ||
            window.msRequestAnimationFrame      ||
            function (callback) { window.setTimeout(callback, 1000 / 60); };

        function step () {
            var currentTimeStamp = +new Date();

            var progress = Math.min((currentTimeStamp - startTimeStamp) / opts.duration, 1);
            if (progress === 1) {
                // 动画结束
                return false;
            } else {
                var position = me.calPosition(progress);
                opts.onStep && opts.onStep(position);

                return true;
            }
        }

        function progress () {
            if (step()) {
                animationFrame(progress);
            } else {
                if (typeof opts.onFinish === 'function') {
                    opts.onFinish(opts.endPos);
                }
            }
        }

        animationFrame(progress);
    }

    if ( typeof module !== 'undefined' && module.exports ) {
        module.exports = Parabola;
    } else if ( typeof define === 'function' && define.amd ) {
        define( function () { return Parabola; } );
    } else {
        window.Parabola = Parabola;
    }

})(window, Math)
