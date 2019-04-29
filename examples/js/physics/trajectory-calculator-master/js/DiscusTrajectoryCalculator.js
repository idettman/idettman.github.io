class DiscusTrajectoryCalculator {

	constructor() {

		var self = this

		// Model version
		this.version = [0, 1, 0]


		// Default values to use for calculations

		// Object to hold default values
		this.defVal = {}
		// Average gravity (m/s^2)
		this.defVal.g = 9.81
		// Average air density (kg/m^3)
		this.defVal.rho = 1.225
		// Average release speed (m/s)
		this.defVal.v0 = 23.6
		// Standard release angle (deg)
		this.defVal.thetaRelease0 = 35
		this.defVal.thetaMotion0 = 35
		// Standard attack angle (deg)
		this.defVal.thetaAttack0 = 0
		this.defVal.thetaInclination = this.defVal.thetaRelease0 + this.defVal.thetaAttack0
		
		// Standard stalling angle (deg)
		this.defVal.thetaStall = 30
		this.defVal.vx0 = this.defVal.v0 * Math.cos(rad(this.defVal.thetaRelease0))
		this.defVal.vy0 = this.defVal.v0 * Math.sin(rad(this.defVal.thetaRelease0))
		// Standard mass (kg)
		this.defVal.m = 2
		// Standard discus diameter
		this.defVal.discusD = 0.22
		// Standard discus height
		this.defVal.discusH = 0.045
		// Standard minimum drag coefficient (dimensionless)
		this.defVal.cDMin = 0.04
		// Standard maximum drag coefficient (dimensionless)
		this.defVal.cDMax = 1.1
		// Average release height (m)
		this.defVal.y0 = 1.492
		// Default x starting distance 
		this.defVal.x0 = 0
		// Standard delta time interval (s)
		this.defVal.deltaT = 0.01
		// Default wind speed
		this.defVal.vWind = 0

		// Objects to store calculated trajectories

		// Object to store vacuum trajectories
		this.vacuumTrajectories = []
		// Object to store air resistance trajectories
		this.airResistanceTrajectories = []

		// Simulation limits

		// The maximum simulation time in seconds
		this.tMax = 30


		// Event handlers

		// Event handler for vacuum trajectory model calculations
		$('#vacuum-calculate').on('click tap', function(){

			return self.vacuum()

		})

		// Event handler for air resistance model calculations
		$('#air-resistance-calculate').on('click tap', function(){

			return self.airResistance()

		})

		$('#air-resistance-thetaRelease0-range').on('input', function(e) {

			// console.log($(this).val())
			$('#air-resistance-thetaRelease0').val($(this).val())
			self.airResistanceTrajectories = []
			self.airResistance()

		})

		$('#air-resistance-thetaAttack0-range').on('input', function(e) {

			// console.log($(this).val())
			$('#air-resistance-thetaAttack0').val($(this).val())
			self.airResistanceTrajectories = []
			self.airResistance()

		})

	}

	vacuum(variables) {

		variables = variables || copyObj(this.defVal)

		//Initial speed
		var v0 = parseFloat($('#vacuum-v0').val()) || variables.v0
		variables.v0 = v0

		// Initial x distance = 0
		var x0 = parseFloat($('#vacuum-x0').val()) || variables.x0
		variables.x0 = x0
		var x = x0
		// Initial y height is the release height
		var y0 = parseFloat($('#vacuum-y0').val()) || variables.y0
		variables.y0 = y0
		var y = y0
		// Value to store the maximum heigh
		var yMax = 0

		// Initial release angle
		var thetaRelease0 = parseFloat($('#vacuum-thetaRelease0').val()) || variables.thetaRelease0
		variables.thetaRelease0 = thetaRelease0

		// Initial x speed
		var vx0 = v0 * Math.cos(rad(thetaRelease0))
		variables.vx0 = vx0
		// Initial y speed
		var vy0 = v0 * Math.sin(rad(thetaRelease0))
		variables.vy0 = vy0

		// Gravity
		var g = parseFloat($('#vacuum-g').val()) || variables.g
		variables.g = g

		// X speed at time t
		var vx = vx0
		// Y speed at time t
		var vy = vy0

		// X acceleration
		var ax = 0
		// Y acceleration
		var ay = -g

		// Time starts at 0s
		var t = 0
		var deltaT = parseFloat($('#vacuum-deltaT').val()) || variables.deltaT
		variables.deltaT = deltaT

		// Variable to store the total path length
		var pathLength = 0;

		// Array to hold the data in [ [t0, x, y], [t1, x, y]... ] format
		var data = []

		// console.log(v0, thetaRelease0, g, y0, deltaT, vx0, vy0)

		var id = 'vacuum-' + this.vacuumTrajectories.length

		var trajectory = new Trajectory(id, 'vacuum', data, 0, 0, 0, variables, this.version)

		while (y > 0 && t < this.tMax) {

			// console.log(t, x, y)

			var thetaMotion = deg(Math.atan(vy / vx))

			var prevX = x
			var prevY = y

			vx = vx0
			vy = vy0 - (g * t)

			x = vx0 * t + x0
			y = vy0 * t - (0.5 * g * Math.pow(t, 2) ) + y0

			// console.log(x, y)

			var coords = {
				't' : t, 
				'x' : x, 
				'y' : y,
				'vx' : vx, 
				'vy' : vy, 
				'ax' : ax, 
				'ay' : ay,
				'thetaMotion': thetaMotion
			}

			pathLength += Math.sqrt(Math.pow(x - prevX, 2) + Math.pow(y - prevY, 2) )

			data.push(coords)

			if (y > yMax) { yMax = y }

			if (data.length > 1 && x > data[data.length - 2].x) {

				trajectory.xMax = x

			}

			if (data.length > 1 && y > data[data.length - 2].y) {

				trajectory.yMax = y

			}

			t += deltaT

		}

		trajectory.data = data
		trajectory.pathLength = pathLength
		trajectory.flightTime = t

		this.vacuumTrajectories.push(trajectory)

		console.log("Total time: " + t)
		// console.log(data)
		var el = $('#vacuum-model-svg')

		this.graph = new Graph(this.vacuumTrajectories, 'vacuum-model-svg')
		this.graph.draw('vacuum-model-svg')

	}

	massTest(variable, min, max, steps) {

		var variables = copyObj(this.defVal)

		if (!variables[variable]) {

			throw variable + " is not a member of variables"

		}

		// Reset list
		this.airResistanceTrajectories = []

		var results = []
		var resultString = ''

		variables[variable] = min
		var diff = max - min
		var stepSize = 1 / (steps - 1)

		for (var i = 0; i < steps; i++) {

			this.airResistance(variables)

			resultString += variables[variable].toLocaleString('de-DE', {minimumFractionDigits: 13}) + '	' + this.airResistanceTrajectories[i].xMax.toLocaleString('de-DE', {minimumFractionDigits: 13}) + '\n'
			// results.push(resultString)

			variables[variable] = min + (diff * (stepSize * (i + 1)) )

		}

		console.log(results)
		console.log(resultString)

	}

	airResistance(variables, draw = true) {

		// copyObj is necessary to make a copy of the defVal object without referencing it
		variables = variables || copyObj(this.defVal)

		//Initial speed
		var v0 = parseFloat($('#air-resistance-v0').val()) || variables.v0
		variables.v0 = v0
		var v = v0

		// Initial x distance = 0
		var x0 = parseFloat($('#air-resistance-x0').val()) || variables.x0
		variables.x0 = x0
		var x = x0
		// Initial y height is the release height
		var y0 = parseFloat($('#air-resistance-y0').val()) || variables.y0
		// console.log(y0, variables.y0)
		variables.y0 = y0
		var y = y0


		// Initial release angle
		var thetaRelease0 = parseFloat($('#air-resistance-thetaRelease0').val()) || variables.thetaRelease0
		variables.thetaRelease0 = thetaRelease0

		// Initial x speed
		var vx0 = v0 * Math.cos(rad(thetaRelease0))
		variables.vx0 = vx0
		// X speed at time t
		var vx = vx0

		// Initial y speed
		var vy0 = v0 * Math.sin(rad(thetaRelease0))
		variables.vy0 = vy0
		// Y speed at time t
		var vy = vy0

		// The wind speed (solely in x-direction), negative values represent a headwind
		var vWind = parseFloat($('#air-resistance-vWind').val()) || variables.vWind
		variables.vWind = vWind
		var vRelX0 = vx0 - vWind
		var vRelX = vRelX0
		var vRel = Math.sqrt(Math.pow(vRelX, 2) + Math.pow(vy, 2))

		// Gravity
		var g = parseFloat($('#air-resistance-g').val()) || variables.g
		variables.g = g

		// air density
		var rho = parseFloat($('#air-resistance-rho').val()) || variables.rho
		variables.rho = rho

		// Discus mass
		var m = parseFloat($('#air-resistance-m').val()) || variables.m
		variables.m = m

		var thetaAttack0 = parseFloat($('#air-resistance-thetaAttack0').val()) || variables.thetaAttack0
		variables.thetaAttack0 = thetaAttack0
		var thetaAttack = thetaAttack0

		var thetaMotion0 = parseFloat($('#air-resistance-thetaRelease0').val()) || variables.thetaRelease0
		variables.thetaMotion0 = thetaMotion0
		var thetaMotion = thetaMotion0

		var thetaInclination = thetaRelease0 + thetaAttack0
		variables.thetaInclination = thetaInclination

		// The relative velocity also changes the relative angle of motion and thus the surface area exposed to air drag
		var thetaMotionRel = deg(Math.atan(vy / vRelX))

		var thetaAttackRel = thetaInclination - thetaMotionRel

		var cD = this.cDrag(thetaAttackRel, this.defVal.cDMin, this.defVal.cDMax)
		var cL = this.cLift(thetaAttackRel)

		var discusD = parseFloat($('#air-resistance-discusD').val()) || variables.discusD
		var discusH = parseFloat($('#air-resistance-discusH').val()) || variables.discusH

		var liftToDragCoefficient = cL / cD
		var a = this.surfaceArea(thetaAttackRel, this.defVal.discusD, this.defVal.discusH)

		// Initial x acceleration
		var fAerodynamicsX = this.fAeroX(rho, vRel, cD, cL, a, thetaMotionRel)
		var aAerodynamicsX = this.aAeroX(rho, vRel, cD, cL, a, thetaMotionRel, m)
		var ax0 = aAerodynamicsX
		var ax = ax0

		// Initial y acceleration
		var fAerodynamicsY = this.fAeroY(rho, vRel, cD, cL, a, thetaMotionRel)
		var aAerodynamicsY = this.aAeroY(rho, vRel, cD, cL, a, thetaMotionRel, m)
		var ay0 = -g + aAerodynamicsY
		var ay = ay0

		// Time starts at 0s
		var t = 0
		var deltaT = parseFloat($('#air-resistance-deltaT').val()) || variables.deltaT
		variables.deltaT = deltaT
		var pathLength = 0;

		// Array to hold the data in [ [t0, x, y], [t1, x, y]... ] format
		var data = []

		var id = 'air-resistance-' + this.vacuumTrajectories.length

		// Create new trajectory object to hold the data being generated
		var trajectory = new Trajectory(id, 'air-resistance', data, 0, 0, 0, variables, this.version)

		// While the projectile is in positive y-space, calculate the trajectory
		// When t > 10 seconds, stop, even if y > 0, to prevent infinite loops

		// var coords0 = {
		// 	't' : t, 
		// 	'x' : x, 
		// 	'y' : y,
		// 	'v' : v,
		// 	'vRel': vRel,
		// 	'vx' : vx, 
		// 	'vRelX': vRelX,
		// 	'vy' : vy,
		// 	'ax' : ax, 
		// 	'ay' : ay,
		// 	'fAeroX': fAerodynamicsX,
		// 	'fAeroY': fAerodynamicsY,
		// 	'aAeroX': aAerodynamicsX,
		// 	'aAeroY': aAerodynamicsY,
		// 	'thetaMotion' : thetaMotion,
		// 	'thetaAttack' : thetaAttack,
		// 	'thetaMotionRel' : thetaMotionRel,
		// 	'thetaAttackRel' : thetaAttackRel,
		// 	'cD' : cD,
		// 	'cL' : cL,
		// 	'liftToDragCoefficient': liftToDragCoefficient
		// }

		// data.push(coords0)

		while (y > 0 && t < this.tMax) {

			var coords = {
				't' : t, 
				'x' : x, 
				'y' : y,
				'v' : v,
				'vRel': vRel,
				'vx' : vx, 
				'vRelX': vRelX,
				'vy' : vy,
				'ax' : ax, 
				'ay' : ay,
				'fAeroX': fAerodynamicsX,
				'fAeroY': fAerodynamicsY,
				'aAeroX': aAerodynamicsX,
				'aAeroY': aAerodynamicsY,
				'thetaMotion' : thetaMotion,
				'thetaAttack' : thetaAttack,
				'thetaMotionRel' : thetaMotionRel,
				'thetaAttackRel' : thetaAttackRel,
				'cD' : cD,
				'cL' : cL,
				'A': a,
				'liftToDragCoefficient': liftToDragCoefficient
			}

			t += deltaT

			// Save the previous x and y coordinates for path length calculation
			var prevX = x
			var prevY = y
			// calculate x and y coordinates based on the previously determined speed
			x += vx * deltaT
			y += vy * deltaT

			// Calculate the path length between the previous and current x y location
			pathLength += Math.sqrt(Math.pow(x - prevX, 2) + Math.pow(y - prevY, 2) )

			thetaMotion = deg(Math.atan(vy / vx))

			thetaAttack = thetaInclination - thetaMotion

			v = Math.sqrt(Math.pow(vx, 2) + Math.pow(vy, 2))

			vRelX = vx - vWind
			vRel = Math.sqrt(Math.pow(vRelX, 2) + Math.pow(vy, 2))

			// The relative velocity also changes the relative angle of motion and thus the surface area exposed to air drag
			thetaMotionRel = deg(Math.atan(vy / vRelX))

			thetaAttackRel = thetaInclination - thetaMotionRel

			cD = this.cDrag(thetaAttackRel, this.defVal.cDMin, this.defVal.cDMax)
			cL = this.cLift(thetaAttackRel)
			a = this.surfaceArea(thetaAttackRel, discusD, discusH)

			// console.log(cL)

			fAerodynamicsX = this.fAeroX(rho, vRel, cD, cL, a, thetaMotionRel)
			fAerodynamicsY = this.fAeroY(rho, vRel, cD, cL, a, thetaMotionRel)

			// console.log(rho, vRel, cD, cL, a, thetaMotionRel)

			aAerodynamicsX = this.aAeroX(rho, vRel, cD, cL, a, thetaMotionRel, m)
			aAerodynamicsY = this.aAeroY(rho, vRel, cD, cL, a, thetaMotionRel, m)

			liftToDragCoefficient = cL / cD
			// console.log(liftToDragCoefficient)
			// console.log(aAerodynamicsX)

			ax = aAerodynamicsX
			ay = -g + aAerodynamicsY
			// console.log(aAerodynamicsX, aAerodynamicsY, thetaMotion)
			// console.log('aAeroY', this.aAeroY(rho, v, cD, cL, a, thetaMotion, m), 'vy', vy, 'cL', cL, 'cD', cD, 'thetaAttack', thetaAttack)

			vx += ax * deltaT
			vy += ay * deltaT

			data.push(coords)

			if (data.length > 1 && x > data[data.length - 2].x) {

				trajectory.xMax = x

			}

			if (data.length > 1 && y > data[data.length - 2].y) {

				trajectory.yMax = y

			}

		}

		trajectory.data = data
		trajectory.pathLength = pathLength
		trajectory.flightTime = t
		this.airResistanceTrajectories.push(trajectory)

		if (draw){
			this.graph = new Graph(this.airResistanceTrajectories, 'air-resistance-model-svg')
			this.graph.draw('air-resistance-model-svg')
		}
		

		// console.log(trajectory)

		// this.drawGraph(data, 'air-resistance-model-svg')

		// console.log(data)

	}

	cDrag(thetaAttack, cDMin, cDMax) {

		if (thetaAttack > 90) {

			// A positive angle of attack greater than 90 is the equivalent of a negative angle of attack
			thetaAttack -= 180

		}

		if (thetaAttack <= -90) {

			// A negative angle of attack smaller than -90 is the equivalent of a positive angle of attack
			thetaAttack += 180

		}

		var cD = (thetaAttack / 90) * (cDMax - cDMin) + cDMin

		// console.log(cD)

		return Math.abs(cD)

	}

	cLift(thetaAttack) {

		// var cL = 2 * Math.PI * rad(thetaAttack)

		var direction = thetaAttack > 0? 1 : -1

		if (thetaAttack > 90) {

			// A positive angle of attack greater than 90 is the equivalent of a negative angle of attack
			thetaAttack -= 180
			direction = -1

		}

		if (thetaAttack <= -90) {

			// A negative angle of attack smaller than -90 is the equivalent of a positive angle of attack
			thetaAttack += 180
			direction = 1

		}

		if (thetaAttack === 0) {

			direction = 0

		}

		if (Math.abs(thetaAttack) == 90) {

			direction = 0

		}

		thetaAttack = Math.abs(thetaAttack)

		var cL

		if (thetaAttack < this.defVal.thetaStall) {

			cL = (thetaAttack / 30) * 0.9
			// cL = 2 * Math.PI * rad(thetaAttack)

		} else if (thetaAttack < 35) {

			cL = 0.9 - (((thetaAttack - 30) / 5) * 0.3)

		} else if (thetaAttack < 70) {

			cL = 0.6 - (((thetaAttack - 35) / 35) * 0.2)

		} else {

			cL = 0.4 - (((thetaAttack - 70) / 20) * 0.4)

		}

		// console.log(cL)

		return cL * direction

	}

	surfaceArea(thetaAttack, diameter, height) {

		if (thetaAttack > 90) {

			// A positive angle of attack greater than 90 is the equivalent of a negative angle of attack
			thetaAttack -= 180

		}

		if (thetaAttack <= -90) {

			// A negative angle of attack smaller than -90 is the equivalent of a positive angle of attack
			thetaAttack += 180

		}

		// Max surface area is simply the surface area of a circle with radius 0.5 * diameter
		var aMax = Math.PI * Math.pow((diameter / 2), 2)

		// Polynomial components (obtained through Excel)
		var polynomial5 = -0.000000000734490808986996000000 * Math.pow(thetaAttack, 5)
		var polynomial4 = 0.000000196292760925362000000000 * Math.pow(thetaAttack, 4)
		var polynomial3 = -0.000020085728567986700000000000 * Math.pow(thetaAttack, 3)
		var polynomial2 = 0.000865257696037958000000000000 * Math.pow(thetaAttack, 2)
		var polynomial1 = -0.001000632147082570000000000000 * thetaAttack
		var polynomial0 = 0.181257282109542000000000000000

		// Calculate Area Coefficient with polynomial function
		var Ca = polynomial5 + polynomial4 + polynomial3 + polynomial2 + polynomial1 + polynomial0

		// Calculate area based on max surface area 
		var a = aMax * Ca

		// Surface area cannot be negative. Return the absolute value
		return Math.abs(a)

	}

	fAeroX(rho, v, cD, cL, a, thetaMotion) {

		// Since lift is perpendicular to the angle of motion, we add 90° to thetaMotion

		// thetaMotion = Math.abs(thetaMotion)

		// var F = 0.5 * rho * Math.pow(v, 2) * (Math.cos(rad(thetaMotion)) * cD + Math.sin(rad(thetaMotion)) * cL) * a
		var F = 0.5 * rho * Math.pow(v, 2) * (-Math.cos(rad(thetaMotion)) * cD - Math.cos(rad(90 - thetaMotion)) * cL) * a

		return F

	}

	fAeroY(rho, v, cD, cL, a, thetaMotion) {

		// Since lift is perpendicular to the angle of motion, we add 90° to thetaMotion

		// thetaMotion = Math.abs(thetaMotion)

		// var F = 0.5 * rho * Math.pow(v, 2) * (Math.cos(rad(thetaMotion)) * cL - Math.sin(rad(thetaMotion)) * cD) * a
		var F = 0.5 * rho * Math.pow(v, 2) * (Math.sin(rad(90 - thetaMotion)) * cL - Math.sin(rad(thetaMotion)) * cD) * a

		return F
		
	}

	aAeroX(rho, v, cD, cL, a, thetaMotion, m) {

		// console.log(rho, v, cD, cL, a, thetaMotion, m)

		return this.fAeroX(rho, v, cD, cL, a, thetaMotion) / m

	}

	aAeroY(rho, v, cD, cL, a, thetaMotion, m) {

		return this.fAeroY(rho, v, cD, cL, a, thetaMotion) / m

	}

}

window.discusTrajectoryCalculator = new DiscusTrajectoryCalculator()