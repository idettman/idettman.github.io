import Injector from './injector';
import BrickTemplate from './brick';

const higherOrderSymbol = Symbol('higherOrder');

/**
 * A private helper function that creates a suitable factory method that can be
 * given to an Injector. The factory methods will create a new brick from the
 * original brick provided to it, as well as the dependencies injected by the
 * Injector. If a dependency is a Brick, it will use the `compose` method on the
 * original Brick. In any other case, the dependency is bound to the original
 * brick by way of the `bind` method.
 */
function brickFactory(brick) {
  return function(deps) {
    // Split the provided dependencies into those that are themselves Bricks
    // and those that aren't.

    const brickDeps = {};
    const valueDeps = {};
    for (const depName in deps) {
      const dep = deps[depName];
      if (BrickTemplate.isPrototypeOf(dep) && !dep[higherOrderSymbol]) {
        brickDeps[depName] = dep;
      } else {
        valueDeps[depName] = dep;
      }
    }

    // Brick dependencies are `compose`d, whereas the values are bound.
    const bound = brick.bind(valueDeps);
    return bound.compose(brickDeps);
  }
}

/**
 * A helper function that makes it possible for a Brick to be provided a different
 * Brick as a *bound* argument (instead of a composed one). This is rarely used,
 * but when it is required (i.e. some bricks are inherently "higher-order" and need
 * to operate on other bricks) the framework needs to be able to support it.
 */
export function intoBrickParam(orig) {
  const brick = Object.create(orig);
  brick[higherOrderSymbol] = true;
  return brick;
}

/**
 * The class creates compositions of Bricks according to a specification of dependencies.
 */
export default class Composer {
  constructor() {
    this._injector = new Injector();
  }

  register(name, dependencies, component) {
    if (BrickTemplate.isPrototypeOf(component)) {
      return this._injector.register(name, dependencies, brickFactory(component));
    } else {
      return this._injector.register(name, dependencies, component);
    }
  }

  addDependency(component, dep) {
    return this._injector.addDependency(component, dep);
  }
  
  registerAll(comps) {
    comps.forEach(component => {
      const { name, dependencies, ctor } = component;
      this.register(name, dependencies, ctor);
    });
  }

  get(name) {
    return this._injector.getComponent(name);
  }

  getComponent(name) {
    return this.get(name);
  }

  getAllComponents() {
    return this._injector.getAllComponents();
  }

  clone() {
    const cloned = new Composer();
    cloned._injector = this._injector.clone();

    return cloned;
  }
}

export default Composer;
