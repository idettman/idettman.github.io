const engine = {
	minDelta: 0.1,
	minSpeed: 0.1,
	maxStates: 100,

	calculateSimulation: function(env, dt) {
		if (dt <= 0) {
			return;
		}
		var i = 1;
		while(this.canContinueCalculation(env)) {
			var state = $.extend(true, {}, env.states[i - 1]);
			this.recalculateState(env, state, dt);
			i = env.states.push(state);
		}
		return env.states;
	},

	createEnvironment: function(gCoef, initialState) {
		return {
			gCoefficient: gCoef,
			states: [initialState]
		};
	},

	createState: function(x, y, vx, vy, mass) {
		return {
			objects: [{
				x: x,
				y: y,
				v: {
					x: vx,
					y: vy
				},
				mass: mass
			}]
		};
	},

	canContinueCalculation: function(env) {
		return env.states.length < this.maxStates;
	},

	recalculateState: function(env, state, dt) {
		this.applyForces(env, state, dt);
		this.moveAllObjects(env, state, dt);
	},

	moveAllObjects: function(env, state, dt) {
		const minSpeed = this.minSpeed;
		const minDelta = this.minDelta;
		state.objects.forEach(function(o) {
			if (Math.abs(o.v.x) > minSpeed) {
				o.x += o.v.x;
			} else {
				o.v.x = 0;
			}
			if (Math.abs(o.v.y) > minSpeed) {
				o.y = Math.abs(o.y + o.v.y);
			} else if (Math.abs(o.y) < minDelta) {
				o.y = 0;
				o.v.y = 0;
			}
		});
	},

	applyForces: function(env, state, dt) {
		state.objects.forEach(function(o) {
			$.each(forces, function(name, force) {
				force.applyTo(env, o, dt);
			});
		});
	},
};

const forces = {
	// Сила сопротивления воздуха
	airResistanceForce: {
		coef: 0.05, // Сила сопротивления воздуха
		applyTo: function(env, o, dt) {
			const v = o.v;
			v.x -= Math.sign(v.x) * (Math.pow(v.x, 2) * this.coef) * dt;
			v.y -= Math.sign(v.y) * (Math.pow(v.y, 2) * this.coef) * dt;
		}
	},

	// Сила гравитации
	gravityForce: {
		applyTo: function(env, o, dt) {
			if (o.y > 0) {
				o.v.y -= env.gCoefficient * dt;
			}
		}
	},

	// Сила реакции опоры
	supportReactionForce: {
		applyTo: function(env, o, dt) {
			if (o.y <= 0) {
				o.v.y += env.gCoefficient * dt;
			}
		}
	}
};
