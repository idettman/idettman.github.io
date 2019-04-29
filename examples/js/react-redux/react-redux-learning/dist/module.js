import _regeneratorRuntime from 'babel-runtime/regenerator';
import _asyncToGenerator from 'babel-runtime/helpers/asyncToGenerator';

var _this = this;

import ow from 'ow';
import loadImage from './lib/load-image';

/**
 * Computes the dimensions of an input image.
 *
 * @name getImageDimensions
 * @function
 *
 * @param {string} input - Input image to process (can be a local path, http url, or data url)
 * @return {Promise}
 */
export default (function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(input) {
    var image;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            ow(input, ow.string.nonEmpty.label('input'));

            _context.next = 3;
            return loadImage(input);

          case 3:
            image = _context.sent;
            return _context.abrupt('return', {
              width: image.shape[0],
              height: image.shape[1]
            });

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})();