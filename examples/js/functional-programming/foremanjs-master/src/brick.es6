/* jshint proto:true */
import itertools from './itertools';
import BaseRange from './range';

/**
 * A private Symbol for including the type information of Brick arguments/dependencies
 */
const typesSymbol = Symbol("types");

/**
 * A helper function that simply checks whether the object satisfies the
 * "thenable" pseudo-interface (i.e. whether it has a `then` method).
 */
function isThenable(obj) {
  return obj instanceof Object && ('then' in obj);
}
/**
 * A helper function that checks whether the object satisifies the Functor
 * pseudo-interface (i.e. whether it has an `fmap` method).
 */
function isFunctor(obj) {
  return obj instanceof Object && ('fmap' in obj);
}

export function isHigherOrderType(type) {
  return type instanceof Object && ('isHigherOrder' in type) && type.isHigherOrder;
}

/**
 * Assembles all dependencies of a brick into a type.
 */
function buildCompositeType(brick) {
  const res = {};
  for (const arg of brick.args) {
    res[arg] = brick.getArgumentType(arg);
  }

  return res;
}

/**
 * The function stitches together the values provided by every functor in the list of
 * functors into an object which is finally passed into the given function `fn`, along
 * with the properties already found in the `initialArgs`.
 *
 * For example, given a list of functors with types [Option, Eventual]. The function will
 * return an object that is the result of applying the computation `fn` to both the value
 * boxed in the Option and the one in the Eventual. If the Option is None or the Eventual
 * fails to compute a value, the result will be None or a failed eventual...
 */
function perform(fn, functorList, initialArgs) {
  let callback = null;
  const { name, functor } = functorList.shift();
  if (functorList.length === 0) {
    callback = function(val) {
      const args = Object.assign({}, initialArgs);
      args[name] = val;
      return fn(args);
    };
  } else {
    callback = function(val) {
      const args = Object.assign({}, initialArgs);
      args[name] = val;
      return perform(fn, functorList, args);
    };
  }

  return functor.fmap(liftFn(callback));
}

/**
 * Helper function that lifts the given function to work over any number of
 * nested functors.
 */
function liftFn(originalFn) {
  function fn(args) {
    if (isFunctor(args)) {
      return args.fmap(x => fn.call(this, x));
    } else {
      return originalFn.call(this, args);
    }
  }

  return fn;
}

/**
 * Given an object representing a specification of Brick arguments (dependencies) in terms of
 * their names and/or types, returns a pair `(argNames, argTypes)`. The `argNames` is a list
 * of argument names (in the canonical order) and the `argTypes` is a `Map` mapping argument
 * names to argument types. If some argument did not have a type provided by the given `args`
 * specification, a new type is created on the fly.
 */
function prepareArguments(args) {
  const argNames = [];
  const argTypes = new Map();
  for (const arg of args) {
    if (arg instanceof Object) {
      let { name, type } = arg;
      if (type === undefined) { type = name; }
      argNames.push(name);
      argTypes.set(name, type);
    } else {
      argNames.push(arg);
      // We create a default type for each argument matching its name -- for now.
      // Perhaps we'd want to create an anonymous type here...
      argTypes.set(arg, arg);
    }
  }
  return [argNames, argTypes];
}

/**
 * The base prototype for all Bricks.
 *
 * Provides the implementation of methods that are shared by every Brick. Most importantly:
 * `invoke`, `bind`, and `compose`.
 */
const BrickTemplate = {
  /**
   * Create a new Foreman-JS Brick.
   *
   * The `obj` hash needs to contain at least two properties: `args` and `fn`.
   *
   * The `obj` hash could override any `BrickTemplate` operations or provide other
   * properties that will be accessible on the `this` within the `fn`.
   */
  create(obj) {
    if (!('args' in obj && 'fn' in obj && typeof obj['fn'] === 'function')) {
      throw "Foreman-JS: Invalid Brick properties provided.";
    }

    const [argNames, argTypes] = prepareArguments(obj.args);
    delete obj.args;

    // The `BrickTemplate` is the prototype...
    let brick = Object.create(BrickTemplate);
    // ...into which we inject other properties and possibly override some existing ones.
    for (let key in obj) {
      brick[key] = obj[key];
    }
    brick[typesSymbol] = argTypes;
    brick.args = argNames;
    brick.fn = liftFn(brick.fn);

    return brick;
  },

  /**
   * Returns a new Brick inheriting from the original one, with the `fn` modified to take a
   * number of bound arguments.
   */
  bind(boundArgs) {
    let newBrick = Object.create(this);
    if ('helpers' in this) {
      // This is so that we can override some helpers locally in the new brick, without
      // trampling over the prototype's helpers. (This is because `helpers` itself is an
      // object so assignments such as `this.helpers.prop = x` would change the `helpers`
      // object in the prototype!)
      newBrick.helpers = Object.create(this.helpers);
    }

    // We remove the arguments that got bound...
    newBrick.args = [
      for (argName of this.args)
      if (!(argName in boundArgs))
      argName
    ];
    // ...and wrap the original `fn` such that the bound arguments are passed into it.
    const parentFn = this.fn;
    newBrick.fn = liftFn(function(args) {
      const prepareArgs = (args) => {
        let fullArgs = Object.create(boundArgs);
        for (let key in args) {
          fullArgs[key] = args[key];
        }
        return fullArgs;
      };
      return parentFn.call(this, prepareArgs(args));
    });

    if (newBrick.args.length === 0) {
      // All arguments are bound => we can cache the first return value and avoid
      // recalculation on future invocations.
      let memoize = {
        called: false,
        res: null,
      };
      const inner = newBrick.fn;
      newBrick.fn = function(args) {
        if (!memoize.called) {
          memoize.called = true;
          memoize.res = inner.apply(this, args);
        }
        return memoize.res;
      };
      newBrick.valueOf = function() { return this.fn(); }
    }

    // Trigger the events that let the individual bricks intercept that a particular
    // argument got bound (for pre-calculating/caching something or other preparatory
    // actions).
    if ('onBind' in newBrick) {
      const onBind = newBrick.onBind;
      for (let arg in boundArgs) {
        if (arg in onBind) {
          onBind[arg].call(newBrick, boundArgs[arg]);
        }
      }
    }
    if ('helpers' in newBrick) {
      for (let helperName in newBrick.helpers) {
        const old = newBrick.helpers[helperName];
        newBrick.helpers[helperName] = old.bind(boundArgs);
      }
    }

    return newBrick;
  },

  /**
   * Creates a new Brick where some of the original Brick's dependencies will be provided
   * by another Brick every time this new Brick's functionality is invoked.
   * The given `providers` argument is a hash mapping original dependency names to a Brick
   * that is to provide that dependency.
   * The dependencies of the newly created Brick will include all dependencies that the
   * provider Bricks have, but not the original dependencies, which will be computed
   * by invoking the providers.
   */
  compose(providers) {
    /**
     * Evaluates the dependency (`dep`) by finding all its arguments in the given
     * `args` hash.
     */
    function evalDependency(dep, args) {
      // First, collect all arguments of the dependency into a new hash from
      // the existing one. Although the dependency should not touch any other
      // elements apart from the ones that it needs, we prefer to hand it its
      // own hash with only those keys so that it cannot accidentaly mutate
      // something that another brick needs.
      const depArgs = {};
      for (const arg of dep.args) {
        if (!(arg in args)) {
          // Problem...
          console.error(`Argument ${arg} not in given arguments list`);
          return null;
        } else {
          depArgs[arg] = args[arg];
        }
      }
      // Now simply evaluate it!
      return dep.fn(depArgs);
    }

    function evalHigherOrder(dep, arg) {
      const lifted = liftFn(dep.fn.bind(dep));
      return lifted(arg);
    }

    // The arguments that the new Brick produced by the `compose` operation still
    // requires to be provided by the caller (as in, they're not gonna be computed
    // by any of the dependency-providers).
    const requiredArgs = new Set(this.args);
    for (const argName in providers) {
      requiredArgs.delete(argName);
    }

    const parentFn = this.fn;
    const parentBrick = this;
    function fn(args) {
      const fullArgs = {};

      // First, prepare the results of the dependency-providing bricks...
      const functors = [];
      for (const argName in providers) {
        const providerBrick = providers[argName];
        let depValue;
        if (isHigherOrderType(parentBrick.getArgumentType(argName))) {
          // In this case, we pass on the argument as-is to the provider brick.
          depValue = evalHigherOrder(providerBrick, args[argName]);
          fullArgs[argName] = depValue;
        } else {
          // Otherwise, we need to assemble the dependencies of the provider
          // brick first and then evaluate it.
          depValue = evalDependency(providerBrick, args);
          if (isFunctor(depValue)) {
            // Functors go to a special array that will be fmapped over...
            functors.push({ name: argName, functor: depValue });
          } else {
            // Values are immediately saved...
            fullArgs[argName] = depValue;
          }
        }
      }

      // Now, figure out which arguments that were provided need to be removed
      // before proxying up to the actual brick implementation. Some arguments
      // were there only to be provided to the actual dependency-providers and
      // therefore are not required by the parent.
      for (const requiredArg of requiredArgs) {
        fullArgs[requiredArg] = args[requiredArg];
      }

      if (functors.length === 0) {
        return parentFn.call(this, fullArgs);
      } else {
        const fn = parentFn.bind(this);
        return perform(fn, functors, fullArgs);
      }
    }

    // Put all the provider's arguments into the new arguments list instead.
    // (Unless that argument has already been put into the list)
    function appendArgs(dest, provider) {
      for (const arg of provider.args) {
        if (dest.findIndex(existing => existing.name == arg) === -1) {
          dest.push({ name: arg, type: provider.getArgumentType(arg) });
        }
      }
    }
    // Construct the list of all arguments that should be passed to the new brick,
    // including the ones that will automatically just be passed to dependency-providers
    // by the compose glue.
    const fullArguments = [];
    for (let i = 0; i < this.args.length; ++i) {
      const arg = this.args[i];
      if (arg in providers) {
        const provider = providers[arg];
        if (isHigherOrderType(this.getArgumentType(arg))) {
          const newType = Object.create(this.getArgumentType(arg));
          newType.innerType = buildCompositeType(provider);
          newType.isHigherOrderType = true;
          fullArguments.push({
            name: arg,
            type: newType,
          });
        } else {
          // Put all the provider's arguments into the new arguments list instead.
          appendArgs(fullArguments, providers[arg]);
        }
      } else {
        // Keep this argument!
        fullArguments.push({ name: arg, type: this.getArgumentType(arg) });
      }
    }
    const [argNames, argTypes] = prepareArguments(fullArguments);

    const newBrick = Object.create(this);
    newBrick.fn = liftFn(fn);
    newBrick.args = argNames;
    newBrick[typesSymbol] = argTypes;

    return newBrick;
  },

  /**
   * Invokes the functionality of the Brick, by providing it all the missing dependencies.
   *
   * The `args` object is a hash that maps dependency names to objects that should satisfy
   * the dependency.
   *
   * The method will automatically wrap every return value into a thin wrapper object with
   * a `then` method. The `then` method expects a function as an argument. This function
   * should also have a single argument: the result of the Brick's computation. Once the
   * result becomes available, this function is invoked automatically one or more times,
   * depending on the number of results.
   */
  invoke(args) {
    const res = this.fn(args);
    if (isThenable(res)) {
      return res;
    } else if (isFunctor(res)) {
      return {
        then(fn, done) {
          if (done === undefined) { done = () => {}; }
          let once = false;
          return res.fmap(fn).fmap(() => {
            if (!once) { once = true; done(); }
          });
        },
      };
    } else {
      return {
        then(fn) { return fn(res); done(); },
      };
    }
  },

  /**
   * Returns the type corresponding to the given argument name.
   */
  getArgumentType(argName) {
    return this[typesSymbol].get(argName);
  },

  /**
   * @deprecated
   * Creates a new Brick. Works the same as the `create` method.
   */
  extend(obj) {
    console.warn("`Brick.extend` method is deprecated. Use `Brick.create` instead.");
    return BrickTemplate.create(obj);
  },

  /**
   * @deprecated
   * Works the same as `invoke`.
   */
  invokeFn(args) {
    return this.invoke(args);
  },
};
export default BrickTemplate;
