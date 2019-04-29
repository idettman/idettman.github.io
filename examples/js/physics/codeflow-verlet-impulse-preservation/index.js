/**
 * @param {number} x
 * @param {number} y
 * @param {number} radius
 * @constructor
 */
function Body (x, y, radius) {
  this.x = x;
  this.y = y;
  this.px = x;
  this.py = y;
  this.ax = 0;
  this.ay = 0;
  this.radius = radius;
}

Body.prototype = {
  /**
   * @param {number} delta
   * @memberOf Body
   */
  accelerate (delta) {
    this.x += this.ax * delta * delta;
    this.y += this.ay * delta * delta;
    this.ax = 0;
    this.ay = 0;
  }, /**
   * @param {number} delta
   * @memberOf Body
   */
  inertia (delta) {
    const x = this.x * 2 - this.px;
    const y = this.y * 2 - this.py;
    this.px = this.x;
    this.py = this.y;
    this.x = x;
    this.y = y;
  }
}

function Simulation (ctx) {
  /**
   * @type {Body[]}
   */
  const bodies = this.bodies = [];
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  const damping = 0.99;

  while (bodies.length < 220) {
    const body = new Body(Math.random() * (ctx.canvas.width - 50) + 25, Math.random() * (ctx.canvas.height - 50) + 25, Math.random() * 20 + 5);
    let collides = false;
    for (let i = 0, l = bodies.length; i < l; i++) {
      const other = bodies[i];
      const x = other.x - body.x;
      const y = other.y - body.y;
      const length = Math.sqrt(x * x + y * y);
      if (length < other.radius + body.radius) {
        collides = true;
        break;
      }
    }
    if (!collides) {
      bodies.push(body);
    }
  }

  /**
   * @param {boolean} preserve_impulse
   * @param {Body[]} bodies
   */
  function collide (preserve_impulse, bodies) {
    for (let i = 0, l = bodies.length; i < l; i++) {
      const body1 = bodies[i];
      for (let j = i + 1; j < l; j++) {
        const body2 = bodies[j];
        const x = body1.x - body2.x;
        const y = body1.y - body2.y;
        const slength = x * x + y * y;
        const length = Math.sqrt(slength);
        const target = body1.radius + body2.radius;

        if (length < target) {
          let v1x = body1.x - body1.px;
          let v1y = body1.y - body1.py;
          let v2x = body2.x - body2.px;
          let v2y = body2.y - body2.py;

          const factor = (length - target) / length;
          body1.x -= x * factor * 0.5;
          body1.y -= y * factor * 0.5;
          body2.x += x * factor * 0.5;
          body2.y += y * factor * 0.5;

          if (preserve_impulse) {
            const f1 = (damping * (x * v1x + y * v1y)) / slength;
            const f2 = (damping * (x * v2x + y * v2y)) / slength;

            v1x += f2 * x - f1 * x;
            v2x += f1 * x - f2 * x;
            v1y += f2 * y - f1 * y;
            v2y += f1 * y - f2 * y;

            body1.px = body1.x - v1x;
            body1.py = body1.y - v1y;
            body2.px = body2.x - v2x;
            body2.py = body2.y - v2y;
          }
        }
      }
    }
  }

  function border_collide_preserve_impulse (bodies) {
    for (let i = 0, l = bodies.length; i < l; i++) {
      const body = bodies[i];
      const radius = body.radius;
      const x = body.x;
      const y = body.y;

      if (x - radius < 0) {
        const vx = (body.px - body.x) * damping;
        body.x = radius;
        body.px = body.x - vx;
      } else {
        if (x + radius > width) {
          const vx = (body.px - body.x) * damping;
          body.x = width - radius;
          body.px = body.x - vx;
        }
      }
      if (y - radius < 0) {
        const vy = (body.py - body.y) * damping;
        body.y = radius;
        body.py = body.y - vy;
      } else {
        if (y + radius > height) {
          const vy = (body.py - body.y) * damping;
          body.y = height - radius;
          body.py = body.y - vy;
        }
      }
    }
  }

  function border_collide (bodies) {
    for (let i = 0, l = bodies.length; i < l; i++) {
      const body = bodies[i];
      const radius = body.radius;
      const x = body.x;
      const y = body.y;

      if (x - radius < 0) {
        body.x = radius;
      } else {
        if (x + radius > width) {
          body.x = width - radius;
        }
      }
      if (y - radius < 0) {
        body.y = radius;
      } else {
        if (y + radius > height) {
          body.y = height - radius;
        }
      }
    }
  }

  function draw (ctx, bodies) {
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
    for (let i = 0, l = bodies.length; i < l; i++) {
      ctx.beginPath();
      ctx.arc(bodies[i].x, bodies[i].y, bodies[i].radius, 0, Math.PI * 2, false);
      ctx.stroke();
    }
  }

  function gravity (bodies) {
    for (let i = 0, l = bodies.length; i < l; i++) {
      bodies[i].ay += 0.5;
    }
  }

  function accelerate (delta, bodies) {
    for (let i = 0, l = bodies.length; i < l; i++) {
      bodies[i].accelerate(delta);
    }
  }

  function inertia (delta, bodies) {
    for (let i = 0, l = bodies.length; i < l; i++) {
      bodies[i].inertia(delta);
    }
  }

  this.step = function step (d) {
    const steps = 2;
    // const delta = 1 / steps;
    const delta = 0.7 / steps;
    for (let i = 0; i < steps; i++) {
      gravity(bodies);
      accelerate(delta, bodies);
      collide(false, bodies);
      border_collide(bodies);
      inertia(delta, bodies);
      collide(true, bodies);
      border_collide_preserve_impulse(bodies);
    }
    draw(ctx, bodies);
  }
}

function animLoop (render) {
  let running, lastFrame = +new Date;
  
  function loop (now) {
    // stop the loop if render returned false
    if (running !== false) {
      requestAnimationFrame(loop);
      const deltaT = now - lastFrame;
      // do not render frame when deltaT is too high
      if (deltaT < 160) {
        running = render(deltaT);
      }
      lastFrame = now;
    }
  }

  loop(lastFrame);
}

/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.getElementById('final');

/**
 * @param {MouseEvent} event
 */
function clickHandler (event) {
  const x = event.clientX - canvas.offsetLeft;
  const y = event.clientY - canvas.offsetTop;
  simulation.bodies.push(new Body(x, y, Math.random() * 20 + 5));
}

canvas.addEventListener('click', clickHandler);

/**
 * @type {CanvasRenderingContext2D | WebGLRenderingContext}
 */
const ctx = canvas.getContext('2d');
const simulation = new Simulation(ctx);

animLoop(function( deltaT ) {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  simulation.step(deltaT);
});