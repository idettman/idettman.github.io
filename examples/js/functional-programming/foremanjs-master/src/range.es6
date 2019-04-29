/**
 * The base representation of a range of discrete elements.
 *
 * This constructor creates a new `BaseRange` instance which will obtain the
 * iterator object by invoking the provided `makeIter` callable.
 */
const BaseRange = function(makeIter) {
  this.makeIter = makeIter;
};
BaseRange.prototype = {
  /**
   * Make every `BaseRange` object iterable by implementing the iterator symbol.
   */
  [Symbol.iterator]() {
    return this.makeIter();
  },

  /**
   * Make the `BaseRange` a functor.
   *
   * Given a function `fn` as an argument, it returns a new range that will
   * apply the function to every element in the original range and yield the
   * result in turn.
   */
  fmap(fn) {
    return BaseRange.fromIterable([
        for (elem of this)
        fn(elem)
    ]);
  },
};

/**
 * A static function that creates a new `BaseRange` instance from any iterable
 * object (i.e. one that has the `iterator` symbol).
 */
BaseRange.fromIterable = function(iterable) {
  return new BaseRange(() => iterable[Symbol.iterator]());
};
/**
 * A static function that creates a new `BaseRange` instance from three parameters,
 * similar to ones that a C-like for-loop requires:
 *
 * # Parameters
 *
 * - `start` - the first object that will be yielded by the range
 * - `increment` - a callable that takes a single argument, representing the previous
 *   value yielded by the range, and is to return the next one.
 * - `halt` - a callable that takes a single argument, representing the previous value
 *   yielded by the range, and should return a `bool` indicating whether the range
 *   has any more elements. The `increment` function is not called if the return value
 *   is `false` and the range iterator is exhausted.
 */
BaseRange.fromForLike = function(start, increment, halt) {
  const makeIter = () => {
    return (function*() {
      let current = start;
      if (start instanceof Function) {
        current = start();
      }
      while (!halt(current)) {
        yield current;
        current = increment(current);
      }
    })();
  };
  return new BaseRange(makeIter);
};
export default BaseRange;

/**
 * A convenience range over a segment of real numbers with the (inclusive) endpoints of
 * `start` and `end`, including all numbers in between with the step of `step`.
 */
export function RealRange(start, end, step) {
  return BaseRange.fromForLike(start, x => x + step, x => x > end);
}
