define([
  'Vector',
  'Particle',
  'Spring',
  'Attraction',
  'Integrator',
  'common'
], function(Vector, Particle, Spring, Attraction, Integrator, _) {

  /**
   * traer.js
   * A particle-based physics engine ported from Jeff Traer's Processing
   * library to JavaScript. This version is intended for use with the
   * HTML5 canvas element. It is dependent on Three.js' Vector2 class,
   * but can be overridden with any Vector2 class with the methods included.
   *
   * @author Jeffrey Traer Bernstein <jeff TA traer TOD cc> (original Java library)
   * @author Adam Saponara <saponara TA gmail TOD com> (JavaScript port)
   * @author Jono Brandel <http://jonobr1.com/> (requirified/optimization port)
   * 
   * @version 0.3
   * @date March 25, 2012
   */

  /**
   * The whole kit and kaboodle.
   *
   * @class
   */
  var ParticleSystem = function() {

    this.__equilibriumCriteria = { particles: true, springs: true, attractions: true };
    this.__equilibrium = false; // are we at equilibrium?
    this.__optimized = false;

    this.particles = [];
    this.springs = [];
    this.attractions = [];
    this.forces = [];
    this.integrator = new Integrator(this);
    this.hasDeadParticles = false;

    var args = arguments.length;

    if (args === 1) {
      this.gravity = new Vector(0, arguments[0]);
      this.drag = ParticleSystem.DEFAULT_DRAG;
    } else if (args === 2) {
      this.gravity = new Vector(0, arguments[0]);
      this.drag = arguments[1];
    } else if (args === 3) {
      this.gravity = new Vector(arguments[0], arguments[1]);
      this.drag = arguments[3];
    } else {
      this.gravity = new Vector(0, ParticleSystem.DEFAULT_GRAVITY);
      this.drag = ParticleSystem.DEFAULT_DRAG;
    }

  };

  _.extend(ParticleSystem, {

    DEFAULT_GRAVITY: 0,

    DEFAULT_DRAG: 0.001,

    Attraction: Attraction,

    Integrator: Integrator,

    Particle: Particle,

    Spring: Spring,

    Vector: Vector

  });

  _.extend(ParticleSystem.prototype, {

    /**
     * Set whether to optimize the simulation. This enables the check of whether
     * particles are moving. 
     */
    optimize: function(b) {
      this.__optimized = !!b;
      return this;
    },

    /**
     * Set the gravity of the ParticleSystem.
     */
    setGravity: function(x, y) {
      this.gravity.set(x, y);
      return this;
    },

    /**
    * Sets the criteria for equilibrium
    */
    setEquilibriumCriteria: function(particles, springs, attractions) {
      this.__equilibriumCriteria.particles = !!particles;
      this.__equilibriumCriteria.springs = !!springs;
      this.__equilibriumCriteria.attractions = !!attractions;
    },

    /**
     * Update the integrator
     */
    tick: function() {
      this.integrator.step(arguments.length === 0 ? 1 : arguments[0]);
      if (this.__optimized) {
        this.__equilibrium = !this.needsUpdate();
      }
      return this;
    },

    /**
     * Checks all springs and attractions to see if the contained particles are
     * inert / resting and returns a boolean.
     */
    needsUpdate: function() {

      var i = 0;

      if (this.__equilibriumCriteria.particles) {
        for (i = 0, l = this.particles.length; i < l; i++) {
          if (!this.particles[i].resting()) {
            return true;
          }
        }
      }

      if (this.__equilibriumCriteria.springs) {
        for (i = 0, l = this.springs.length; i < l; i++) {
          if (!this.springs[i].resting()) {
            return true;
          }
        }
      }

      if (this.__equilibriumCriteria.attractions) {
        for (i = 0, l = this.attractions.length; i < l; i++) {
          if (!this.attractions[i].resting()) {
            return true;
          }
        }
      }

      return false;

    },

    /**
     * Add a particle to the ParticleSystem.
     */
    addParticle: function(p) {

      this.particles.push(p);
      return this;

    },

    /**
     * Add a spring to the ParticleSystem.
     */
    addSpring: function(s) {

      this.springs.push(s);
      return this;

    },

    /**
     * Add an attraction to the ParticleSystem.
     */
    addAttraction: function(a) {

      this.attractions.push(a);
      return this;

    },

    /**
     * Makes and then adds Particle to ParticleSystem.
     */
    makeParticle: function(m, x, y) {

      var mass = _.isNumber(m) ? m : 1.0;
      var x = x || 0;
      var y = y || 0;

      var p = new Particle(mass);
      p.position.set(x, y);
      this.addParticle(p);
      return p;

    },

    /**
     * Makes and then adds Spring to ParticleSystem.
     */
    makeSpring: function(a, b, k, d, l) {

      var spring = new Spring(a, b, k, d, l);
      this.addSpring(spring);
      return spring;

    },

    /**
     * Makes and then adds Attraction to ParticleSystem.
     */
    makeAttraction: function(a, b, k, d) {

      var attraction = new Attraction(a, b, k, d);
      this.addAttraction(attraction);
      return attraction;

    },

    /**
     * Wipe the ParticleSystem clean.
     */
    clear: function() {

      this.particles.length = 0;
      this.springs.length = 0;
      this.attractions.length = 0;

    },

    /**
     * Calculate and apply forces.
     */
    applyForces: function() {

      var i, p;

      if (!this.gravity.isZero()) {

        for (i = 0; i < this.particles.length; i++) {
          this.particles[i].force.addSelf(this.gravity);
        }

      }

      var t = new Vector();

      for (i = 0; i < this.particles.length; i++) {

        p = this.particles[i];
        t.set(p.velocity.x * -1 * this.drag, p.velocity.y * -1 * this.drag);
        p.force.addSelf(t);

      }

      for (i = 0; i < this.springs.length; i++) {
        this.springs[i].update();
      }

      for (i = 0; i < this.attractions.length; i++) {
        this.attractions[i].update();
      }

      for (i = 0; i < this.forces.length; i++) {
        this.forces[i].update();
      }

      return this;

    },

    /**
     * Clear all particles in the system.
     */
    clearForces: function() {
      for (var i = 0; i < this.particles.length; i++) {
        this.particles[i].clear();
      }
      return this;
    }

  });

  return ParticleSystem;

});
