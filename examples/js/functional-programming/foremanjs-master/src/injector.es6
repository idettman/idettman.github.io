import itertools from './itertools';

/**
 * The default export of the module is a function that creates a new instance of an `Injector`.
 *
 * An `Injector` is an IoC container that resolves the dependencies of the components that it
 * contains and injects them to the component at construct time (constructor dependency injection).
 */
const Injector = function() {
  return {
    /**
     * The registered components.
     */
    components: {},
    /**
     * The fully built component instances.
     */
    built: {},
    /**
     * Registers a new component to the IoC container.
     *
     * The name, dependencies, and the constructor of the component need to be
     * provided.
     *
     * The constructor needs to be a callable that takes the dependencies as its
     * arguments (in the same order that they are provided in the list of
     * dependencies).
     */
    register(name, dependencies, ctor) {
      if (dependencies instanceof Array) {
        let depsHash = {};
        for (let depName of dependencies) { depsHash[depName] = depName; }
        dependencies = depsHash;
      }
      this.components[name] = {
        deps: dependencies,
        ctor: ctor
      };
    },

    /**
     * Adds a new dependency for the component with the given name.
     *
     * Invalidates any previously constructed component instances.
     *
     * The dependency should be an object with at least two keys: `depName` and `compName`.
     * These represent the name of the dependency of the component to which a component with
     * the `compName` should be bound.
     */
    addDependency(component, dependency) {
      this.built = {};
      this.components[component].deps[dependency.depName] = dependency.compName;
    },
    /**
     * Registers a number of components found in the given array.
     *
     * Each member of the array is expected to be an object with the `name`, `dependencies` and
     * `ctor` properties set according to what the `register` method requires.
     */
    registerAll(newComponents) {
      newComponents.forEach(component => {
        let {name, dependencies, ctor} = component;
        this.register(name, dependencies, ctor);
      });
    },
    /**
     * Returns the component with the given name from the IoC container.
     *
     * If the component has not been constructed yet, it will be in response to
     * this call. This means that all of its dependencies will also be
     * constructed (necessarily before the component itself).
     *
     * If the component has already been constructed, the existing one is returned.
     */
    getComponent(name) {
      if (!(name in this.built)) {
        this.built[name] = this.buildComponent(name);
      }

      return this.built[name];
    },

    getAllComponents() {
      return [
        for (comp of itertools.objectKeys(this.components))
        { name: comp, component: this.getComponent(comp), deps: this.components[comp].deps }
      ];
    },
    /**
     * An alias for the `getComponent` method.
     */
    get(name) {
      return this.getComponent(name);
    },
    /**
     * Returns a new component of the given name. If always constructs the component
     * anew, but not necessarily its dependencies.
     */
    buildComponent(name) {
      if (!(name in this.components)) {
        console.debug("Unknown component name");
        return null;
      }
      // Assemble the dependencies -- recursively if required. This follows the
      // DAG of dependencies in a DFS-like manner, effectively performing a top-sort.
      let component = this.components[name];
      let deps = {};
      // `argName` is the name that the component's ctor expects and the `depName` is the
      // name of the component within the IoC container that is bound to this argument.
      for (let argName in component.deps) {
        let depName = component.deps[argName];
        deps[argName] = this.getComponent(depName);
      }

      // The dependencies are now ready to be passed to the components ctor.
      let instance = component.ctor.call(this, deps);
      return instance;
    },
    /**
     * Clones the `Injector` returning a new instance, which shares all registered components
     * with the original. The new instance, however, is free to diverge from the original if
     * other components are registered onto it.
     */
    clone() {
      let cloned = new Injector();
      // Deep-copy the internal structure of the original injector...
      for (let key in this.built) {
        cloned.built[key] = this.built[key];
      }
      for (let key in this.components) {
        cloned.components[key] = this.components[key];
      }

      return cloned;
    },
  };
};
export default Injector;
