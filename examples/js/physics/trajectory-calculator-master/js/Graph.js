class Graph {
	
	constructor(trajectories, id) {

		var self = this

		// Array of trajectory objects
		this.trajectories = trajectories

		this.id = id

		// Array to hold the polylines
		this.polylines = []

		// The horizontal and vertical space for the axes
		this.axesPadding = 30

		// Default graph scale
		this.graphScale = 1
		// The height of the tickmarks
		this.tickHeight = 4
		// The default stroke width
		this.strokeWidth = 0.5
		// Default text size
		this.textSize = 8
		// The total width of the image
		if (globalVariables.fullWidthGraph) {

			this.svgWidth = 900

		} else {

			this.svgWidth = 448
		}
		
		// The width of the legend on the right side
		this.legendWidth = 100
		// Default graph width (lg graphic)
		this.graphWidth = this.svgWidth - this.legendWidth
		// Default graph height
		this.graphHeight = 150

		// All colours in sequence
		this.colors = [
		'rgb(241, 94, 34)',
		'rgb(70, 175, 160)',
		'rgb(4, 128, 144)',
		'rgb(5, 102, 142)',
		'rgb(66, 83, 101)',
		'rgb(105, 133, 157)',
		'rgb(134, 152, 171)',
		'rgb(165, 176, 192)',
		'rgb(197, 203, 213)',
		'rgb(234, 236, 240)'
		]

		this.lineColors = []

		var maxLines = 100;

		for (var i = 0; i < maxLines; i++) {

			var r = Math.round( 241 + ( (255 - 241) * (i / maxLines) ))
			var g = Math.round( 94 + ( (255 - 94) * (i / maxLines) ))
			var b = Math.round( 34 + ( (255 - 34) * (i / maxLines) ))
			this.lineColors[i] = 'rgb(' + r + ', ' + g + ', ' + b + ')'
		}

		this.textAttrs = {
			'font-family': 'FF Mark Pro',
			'font-size': this.textSize + 'pt',
			'fill': this.colors[5],
			'font-weight': 300,
			'text-anchor': 'middle'
		}

		this.lineAttrs = {
			'stroke-width': this.strokeWidth,
			'fill-opacity': 0,
			'fill': 'none',
			'stroke-linecap': 'round'
		}

		this.legendExclusions = {
			"vx0": true,
			"vy0": true,
			"thetaMotion0": true,
			"thetaInclination": true
		}

		this.translationTable = {
			'v0': 'v₀',
			'rho': 'ρ',
			'thetaRelease0': 'θrelease',
			'thetaAttack0': 'θattack0',
			'deltaT': 'Δt',
			'vWind': 'vwind'

		}

		document.addEventListener('changeGraphWidth', function(e) {

			if (e.detail){

				self.svgWidth = 900
				self.graphWidth = self.svgWidth - self.legendWidth

				self.draw(self.id)

			} else 	{

				self.svgWidth = 448
				self.graphWidth = self.svgWidth - self.legendWidth

				self.draw(self.id)

			}

		})

	}

	addTrajectory(trajectory) {

		this.trajectory.push(trajectory)

	}

	draw(id) {

		// Get the graph DOM object
		var graphEl = $('#' + id)

		// Clear the graph of all its previous contents
		graphEl.empty()

		// Create variables to store the max x and y values
		var xMax = 0
		var yMax = 0

		// Determine the largest x and y dimensions
		for (let trajectory of this.trajectories) {

			if (trajectory.xMax > xMax) { xMax = trajectory.xMax }
			if (trajectory.yMax > yMax) { yMax = trajectory.yMax }

		}

		// Determine the graph scaling factor and graph height
		var plotWidth = this.graphWidth - this.axesPadding

		this.graphScale = plotWidth / xMax
		this.graphHeight = (this.graphScale * yMax) + this.axesPadding

		// Set the height of the graph DOM object
		graphEl.height(this.graphHeight)

		// Create a snapSvg object using the DOM id
		var snap = Snap('#' + id)
		snap.attr({ version: '1.1' , xmlns:"http://www.w3.org/2000/svg"})

		var i = 0

		for (let trajectory of this.trajectories) {

			// For each trajectory, create a polyline array
			var polyline = []

			for (let dataPoint of trajectory.data) {

				polyline.push((dataPoint.x * this.graphScale) + this.axesPadding )
				// polyline puts y0 at the top, so we have to subtract the value from the graph height
				polyline.push(this.graphHeight - (dataPoint.y * this.graphScale) - this.axesPadding)

			}

			// Add the polyline to the array
			this.polylines.push(polyline)

			var polylineEl = snap.polyline(polyline)
			// polylineEl.addClass(this.colorSequence[i] + ' line')
			polylineEl.attr('id', trajectory.id);

			polylineEl.attr(this.lineAttrs)

			// Save the line color in the trajectory object
			trajectory.color = this.colors[i]

			var dashLen

			if (globalVariables.animate) {

				dashLen = trajectory.pathLength * this.graphScale

			} else {

				dashLen = 0

			}

			polylineEl.attr({
				'stroke': this.lineColors[i],
				'stroke-dasharray': dashLen,
				'stroke-dashoffset': dashLen
			})

			polylineEl.animate({

				'stroke-dashoffset': 0

			}, trajectory.flightTime * 1000, () => {

				this.save(id)

			});

			var finalDistance = snap.text((trajectory.xMax * this.graphScale) + this.axesPadding, this.graphHeight - this.axesPadding + (this.textSize * 3), trajectory.xMax.toFixed(2))
			finalDistance.attr(this.textAttrs)
			finalDistance.attr({
				'text-anchor': 'middle',
				'fill': trajectory.color
			})

			i++

		}

		// At the very end, draw the axes and legend to ensure the highest z-value
		this.drawAxes(id, xMax, yMax)
		this.drawLegend(id)

		this.save(id)

	}

	drawAxes(id, xMax, yMax) {

		// Get the graph DOM object
		var graphEl = $('#' + id)

		var snap = Snap('#' + id)

		var polyline = []

		polyline[0] = this.axesPadding
		polyline[1] = 0

		polyline[2] = this.axesPadding
		polyline[3] = this.graphHeight - this.axesPadding

		polyline[4] = this.graphWidth
		polyline[5] = this.graphHeight - this.axesPadding

		var polylineEl = snap.polyline(polyline)

		polylineEl.attr({
			'stroke-width': this.strokeWidth,
			'stroke': this.colors[5],
			'fill-opacity': 0,
			'fill': 'none'
		})

		// We use ceil because the amount of ticks is n+1
		var xMarks = Math.ceil(xMax / 5)
		var yMarks = Math.ceil(yMax / 5)
		var pxPerMark = (this.graphWidth - this.axesPadding) / (xMax / 5)

		for (var i = 0; i < xMarks; i++) {

			var xPos = (i * pxPerMark) + this.axesPadding
			var yPos = this.graphHeight - this.axesPadding

			var line = snap.line(xPos, yPos, xPos, yPos + this.tickHeight)
			var text = snap.text(xPos, yPos + this.textSize + this.tickHeight, String(i * 5))

			line.attr({
				'stroke-width': this.strokeWidth,
				'stroke': this.colors[5],
				'fill-opacity': 0,
				'fill': 'none',
				'stroke-linecap': 'round'
			})

			text.attr(this.textAttrs)

		}

		for (var i = 0; i < yMarks; i++) {

			var xPos = this.axesPadding
			var yPos = (this.graphHeight - this.axesPadding) - (i * pxPerMark)

			var line = snap.line(xPos, yPos, xPos - this.tickHeight, yPos)
			var text = snap.text(xPos - 1.5 * this.tickHeight, yPos + (this.textSize / 2) - 1, String(i * 5))

			line.attr({
				'stroke-width': this.strokeWidth,
				'stroke': this.colors[5],
				'fill-opacity': 0,
				'fill': 'none',
				'stroke-linecap': 'round'
			})

			text.attr(this.textAttrs)
			text.attr({
				'text-anchor': 'end'
			})

		}

	}

	drawLegend(id) {

		var defVal = copyObj(window.discusTrajectoryCalculator.defVal)

		var snap = Snap('#' + id)

		var xPos = this.graphWidth + 20
		var yPos = 10
		var yStart = yPos

		var maj = this.trajectories[0].version[0]
		var min = this.trajectories[0].version[1]
		var patch = this.trajectories[0].version[2]
		var versionStr = "Model version: " + maj + "." + min + "." + patch
		var versionNr = snap.text(this.axesPadding + 5, this.graphHeight - this.axesPadding - 5, versionStr)

		versionNr.attr(this.textAttrs)
		versionNr.attr({
			'text-anchor': 'start',
			'font-size': '5pt'
		})

		for (let trajectory of this.trajectories) {

			var hasDifferentKey = false

			for (var key in trajectory.variables) {

				// console.log(trajectory.variables[key], defVal[key])

				if (trajectory.variables[key] != defVal[key] && !this.legendExclusions[key]) {

					hasDifferentKey = true

					var unit = this.translationTable[key] || key

					var text = snap.text(xPos + 13, yPos + (this.textSize / 2) - 1, unit + ": " + trajectory.variables[key].toFixed(2))

					text.attr(this.textAttrs)
					text.attr({
						'text-anchor': 'start'
					})

					yPos += (this.textSize + 5)

				}

			}

			if (!hasDifferentKey) {

				var text = snap.text(xPos + 13, yPos + (this.textSize / 2) - 1, 'Default values')

				text.attr(this.textAttrs)
				text.attr({
					'text-anchor': 'start'
				})

				yPos += (this.textSize + 5)

			}

			var line = snap.line(xPos, yStart, xPos + 10, yStart)

			line.attr({
				'stroke-width': this.strokeWidth,
				'stroke': trajectory.color,
				'fill-opacity': 0,
				'fill': 'none',
				'stroke-linecap': 'round'
			})

			yPos += 2

			yStart = yPos		

		}

	}

	save(id) {

		var svg = document.getElementById(id)
		var model = $(svg).attr('model')
		var saveBtn = model + '-save'
		var saveBtnEl = document.getElementById(saveBtn)

		var fileName = 'Graph.svg'
		$(saveBtnEl).attr('download', fileName)

		var serializer = new XMLSerializer()
		var source = serializer.serializeToString(svg)

		var url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);

		saveBtnEl.href = url

	}

}