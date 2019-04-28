var Body = function(x, y, radius){
  this.x = x;
  this.y = y;
  this.px = x;
  this.py = y;
  this.ax = 0;
  this.ay = 0;
  this.radius = radius;
}

Body.prototype = {
  accelerate: function(delta){
    this.x += this.ax * delta * delta;
    this.y += this.ay * delta * delta;
    this.ax = 0;
    this.ay = 0;
  },
  inertia: function(delta){
    var x = this.x*2 - this.px;
    var y = this.y*2 - this.py;
    this.px = this.x;
    this.py = this.y;
    this.x = x;
    this.y = y;
  },
  draw: function(ctx){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
    ctx.stroke();
  },
}

var Simulation = function(ctx){
  var bodies = this.bodies = [];
  var width = ctx.canvas.width;
  var height = ctx.canvas.height;
  var damping = 0.99;

  while(bodies.length < 70){
    var body = new Body(
      Math.random() * (ctx.canvas.width-50) + 25,
      Math.random() * (ctx.canvas.height-50) + 25,
      Math.random() * 20 + 5
    );
    var collides = false;
    for(var i=0, l=bodies.length; i<l; i++){
      var other = bodies[i];
      var x = other.x - body.x;
      var y = other.y - body.y;
      var length = Math.sqrt(x*x+y*y);
      if(length < other.radius + body.radius){
        collides = true;
        break;
      }
    }
    if(!collides){
      bodies.push(body);
    }
  }

  var collide = function(preserve_impulse){
    for(var i=0, l=bodies.length; i<l; i++){
      var body1 = bodies[i];
      for(var j=i+1; j<l; j++){
        var body2 = bodies[j];
        var x = body1.x - body2.x;
        var y = body1.y - body2.y;
        var slength = x*x+y*y;
        var length = Math.sqrt(slength);
        var target = body1.radius + body2.radius;

        if(length < target){
          var v1x = body1.x - body1.px;
          var v1y = body1.y - body1.py;
          var v2x = body2.x - body2.px;
          var v2y = body2.y - body2.py;

          var factor = (length-target)/length;
          body1.x -= x*factor*0.5;
          body1.y -= y*factor*0.5;
          body2.x += x*factor*0.5;
          body2.y += y*factor*0.5;

          if(preserve_impulse){
            var f1 = (damping*(x*v1x+y*v1y))/slength;
            var f2 = (damping*(x*v2x+y*v2y))/slength;

            v1x += f2*x-f1*x;
            v2x += f1*x-f2*x;
            v1y += f2*y-f1*y;
            v2y += f1*y-f2*y;

            body1.px = body1.x - v1x;
            body1.py = body1.y - v1y;
            body2.px = body2.x - v2x;
            body2.py = body2.y - v2y;
          }
        }
      }
    }
  }

  var border_collide_preserve_impulse = function(){
    for(var i=0, l=bodies.length; i<l; i++){
      var body = bodies[i];
      var radius = body.radius;
      var x = body.x;
      var y = body.y;

      if(x-radius < 0){
        var vx = (body.px - body.x)*damping;
        body.x = radius;
        body.px = body.x - vx;
      }
      else if(x + radius > width){
        var vx = (body.px - body.x)*damping;
        body.x = width-radius;
        body.px = body.x - vx;
      }
      if(y-radius < 0){
        var vy = (body.py - body.y)*damping;
        body.y = radius;
        body.py = body.y - vy;
      }
      else if(y + radius > height){
        var vy = (body.py - body.y)*damping;
        body.y = height-radius;
        body.py = body.y - vy;
      }
    }
  }

  var border_collide = function(){
    for(var i=0, l=bodies.length; i<l; i++){
      var body = bodies[i];
      var radius = body.radius;
      var x = body.x;
      var y = body.y;

      if(x-radius < 0){
        body.x = radius;
      }
      else if(x + radius > width){
        body.x = width-radius;
      }
      if(y-radius < 0){
        body.y = radius;
      }
      else if(y + radius > height){
        body.y = height-radius;
      }
    }
  }

  var draw = function(){
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
    for(var i=0, l=bodies.length; i<l; i++){
      bodies[i].draw(ctx);
    }
  }

  var gravity = function(){
    for(var i=0, l=bodies.length; i<l; i++){
      bodies[i].ay += 0.5;
    }
  }

  var accelerate = function(delta){
    for(var i=0, l=bodies.length; i<l; i++){
      bodies[i].accelerate(delta);
    }
  }

  var inertia = function(delta){
    for(var i=0, l=bodies.length; i<l; i++){
      bodies[i].inertia(delta);
    }
  }

  this.step = function(){
    var steps = 2;
    var delta = 1/steps;
    for(var i=0; i<steps; i++){
      gravity();
      accelerate(delta);
      collide(false);
      border_collide();
      inertia(delta);
      collide(true);
      border_collide_preserve_impulse();
    }
    draw();
  }
}

$(function(){
  var canvas = $('#final')
  .click(function(event){
    var offset = $(this).offset();
    var x = event.clientX - offset.left;
    var y = event.clientY - offset.top;
    simulation.bodies.push(new Body(
      x,
      y,
      Math.random() * 20 + 5
    ));
  })[0];
  var ctx = canvas.getContext('2d');
  var simulation = new Simulation(ctx);
  setInterval(function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    simulation.step();
  }, 30);
});