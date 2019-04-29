import _regeneratorRuntime from 'babel-runtime/regenerator';
import _Promise from 'babel-runtime/core-js/promise';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';

var _this = this;

var loadImage = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(input) {
    var img;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(typeof input === 'string')) {
              _context.next = 8;
              break;
            }

            img = new global.Image();

            img.crossOrigin = 'anonymous';

            _context.next = 5;
            return new _Promise(function (resolve, reject) {
              img.onload = resolve;
              img.onerror = img.onabort = function () {
                return reject(new Error('image failed to load'));
              };
              img.src = input;
            });

          case 5:
            return _context.abrupt('return', loadImage(img));

          case 8:
            if (!(input instanceof global.Image)) {
              _context.next = 12;
              break;
            }

            return _context.abrupt('return', {
              width: input.naturalWidth,
              height: input.naturalHeight
            });

          case 12:
            throw new Error('invalid input image');

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  }));

  return function loadImage(_x) {
    return _ref.apply(this, arguments);
  };
}();

export default loadImage;