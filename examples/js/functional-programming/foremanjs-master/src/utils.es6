/**
 * The class implements an optional type. It is an algebraic sum type that can contain either
 * an object (of any type) or no object at all, i.e.:
 *
 *     Option = None | Some t
 *
 * The only way to access the underlying object within the container is to go through the
 * `fmap` method. If there was no object within the container the function is not invoked.
 * Otherwise, a new Option is returned wrapping the result of the function.
 *
 * This is a simple equivalent of Haskell's `Maybe` type.
 */
export class Option {
  /**
   * Creates a new `Option` that wraps the given object.
   *
   * If `obj` is `null`, the Option will be considered `None`.
   */
  constructor(obj) {
    this.obj = obj;
  }

  /**
   * Implementation of the Functor interface for Option.
   * Applies the given function on the underlying wrapped object if there is one
   * and returns a new Option wrapping the returned result. If there was no object
   * wrapped, returns the same (`None`) Option.
   */
  fmap(fn) {
    if (this.isSome()) {
      return new Option(fn(this.obj));
    } else {
      return this;
    }
  }

  /**
   * The monadic flatMap (aka bind) function.
   */
  flatMap(fn) {
    if (this.isSome()) {
      return fn(this.obj);
    } else {
      return this;
    }
  }

  /**
   * The monadic return
   */
  static ret(val) {
    return new Option(val);
  }

  /**
   * Checks whether the Option is `Some`.
   */
  isSome() {
    return this.obj !== null;
  }

  /**
   * Checks whether the option is `None`.
   */
  isNone() {
    return !this.isSome()
  }

  /**
   * Returns the underlying object. If the Option was `None`, returns `null`.
   */
  unwrap() {
    return this.obj;
  }

  /**
   * A static property of the class that returns a "canonical" None representation.
   */
  static get None() {
    return new Option(null);
  }
}

/**
 * Implements a Functor API over ES6 Promises.
 */
export class Eventual {
  /**
   * Given an ES6 Promise as an argument, construct a new `Eventual`.
   * (The `promise` could be any "thenable".)
   */
  constructor(promise) {
    this.promise = promise;
  }

  /**
   * Implements the functor interface for the `Eventual`.
   *
   * Returns a new Eventual with a result that becomes available once the original one
   * resolves and is equivalent to invoking the given function `fn` to that result.
   */
  fmap(fn) {
    return new Eventual(this.promise.then(x => fn(x)));
  }

  /**
   * Monadic flatMap/bind
   */
  flatMap(fn) {
    const promise = new Promise((resolve, reject) => {
      this.promise.then(x => {
        const newEventual = fn(x);
        newEventual.then(res => {
          // Resolve the flattened Eventual
          // (Not the most efficient implementation, but correct!)
          resolve(res);
        })
      });
    });
    // When the promise resolves, it will resolve with the inner result of
    // the Eventual returned by the `fn`.
    return new Eventual(promise);
  }

  then(fn) {
    return this.promise.then(fn);
  }

  /**
   * The monadic `return` function.
   */
  static ret(val) {
    return new Eventual(new Promise((resolve) => resolve(val)));
  }
}
