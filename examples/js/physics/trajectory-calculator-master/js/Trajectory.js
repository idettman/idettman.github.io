class Trajectory {

	constructor(id, model, data, xMax, yMax, flightTime, variables, version) {

		var self = this

		// The id of the trajectory
		this.id = id

		// The model used to create the trajectory
		this.model = model

		// The datapoints of the trajectory (non-scaled)
		this.data = []

		// The maximum x-value in the data
		this.xMax = xMax

		// The maximum y-value in the data
		this.yMax = yMax

		// The time of flight until touchdown
		this.flightTime = flightTime

		// The delta time value used in the simulation
		this.variables = variables

		//The version used to calculate the model
		this.version = version

	}

}