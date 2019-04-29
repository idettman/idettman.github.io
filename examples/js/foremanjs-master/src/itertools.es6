/**
 * The module contains a number of helper functions for working with iterators and iterables.
 */
export default {
  /**
   * A helper function that zips together a number of iterables.
   */
  zip(...iterables) {
    let iterators = iterables.map(i => i[Symbol.iterator]());
    let done = false;
    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        if (!done) {
          let items = iterators.map(i => i.next());
          done = items.some(item => item.done);
          if (!done) {
            return { value: items.map(i => i.value) };
          }
          // TODO
          // We should close the inner iterators once done, but Babel doesn't seem to create
          // the `return` method on iterators in all cases.
        }
        // We are done
        return { done: true };
      }
    };
  },

  /**
   * Given an instance that might not be iterable (e.g. a pure value), lifts it into an iterable
   * of a single element.
   */
  intoIterable(maybeIterable) {
    if (!this.isIterable(maybeIterable)) {
      return [maybeIterable];
    } else {
      return maybeIterable;
    }
  },

  /**
   * Checks whether the given object is iterable.
   */
  isIterable(maybeIterable) {
    if (!(maybeIterable instanceof Object)) {
      return false;
    }
    if (!(Symbol.iterator in maybeIterable)) {
      return false;
    }

    return true;
  },

  enumerate(iterable) {
    return (function*() {
      let idx = 0;
      for (let item of iterable) {
        yield [idx, item];
        ++idx;
      }
    })();
  },

  /**
   * Flattens all the given iterables into a single iterable.
   */
  flatten(...iterables) {
    return (function*() {
      for (let iter of iterables) {
        for (let item of iter) { yield item; }
      }
    })();
  },

  /**
   * Forces the evaluation of the iterable and returns an array containing all the items
   * found in the original iterable.
   */
  collect(iterable) {
    return [
      for (item of iterable)
      item
    ];
  },

  /**
   * Returns a generator mapping all elements of the iterable by applying a given function.
   */
  map(fn, iterable) {
    return (function*() {
      for (let val of iterable) {
        yield fn(val);
      }
    })();
  },

  any(iterable, fn) {
    for (let val of iterable) {
      if (fn(val)) { return true; }
    }
    return false;
  },

  all(iterable, fn) {
    for (let val of iterable) {
      if (!fn(val)) { return false; }
    }
    return true;
  },

  /**
   * Returns an iterator over values associated to each enumerable property of the given
   * object.
   */
  objectValues(obj) {
    if (obj instanceof Object) {
      return (function*() {
        for (let key in obj) {
          yield obj[key];
        }
      })();
    } else {
      return [];
    }
  },

  /**
   * Returns an iterator over enumerable property names of the given object.
   */
  objectKeys(obj) {
    if (obj instanceof Object) {
      return (function*() {
        for (let key in obj) {
          yield key;
        }
      })();
    } else {
      return [];
    }
  },

  /**
   * Returns an iterator over 2-tuples representing the object's enumerable key, value pairs.
   */
  objectItems(obj) {
    if (obj instanceof Object) {
      return (function*() {
        for (let key in obj) { yield [key, obj[key]]; }
      })();
    } else {
      return [];
    }
  },
};

