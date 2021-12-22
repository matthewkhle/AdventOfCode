// initial data setup
const fs = require("fs")

const fileContents = fs.readFileSync("Day 11/11.txt", "utf8")
let dataSeparatedByLine = fileContents.split("\r\n")

let energyLevel = []
for (let i = 0; i < dataSeparatedByLine.length; i++) {
	let line = dataSeparatedByLine[i].split("")
	energyLevel.push(line)
}

let octopi = new Array(energyLevel[0].length)
for (let i = 0; i < energyLevel.length; i++) {
	octopi[i] = new Array(energyLevel[0].length)
}

for (let i = 0; i < octopi.length; i++) {
	for (let j = 0; j < octopi[i].length; j++) {
		octopi[i][j] = {
			energyLevel: parseInt(energyLevel[i][j]),
			flashed: false,
		}
	}
}

// console.log(octopi)

let flashCount = 0

let isValidNeighbor = (neighbor) => {
	if (
		neighbor.x >= 0 &&
		neighbor.y >= 0 &&
		neighbor.x < octopi[0].length &&
		neighbor.y < octopi.length
	) {
		return true
	}
	return false
}

let flash = (y, x) => {
	let topLeft = {
		x: x - 1,
		y: y - 1,
	}
	let topMiddle = {
		x: x,
		y: y - 1,
	}
	let topRight = {
		x: x + 1,
		y: y - 1,
	}
	let middleLeft = {
		x: x - 1,
		y: y,
	}
	let middleRight = {
		x: x + 1,
		y: y,
	}
	let bottomLeft = {
		x: x - 1,
		y: y + 1,
	}
	let bottomMiddle = {
		x: x,
		y: y + 1,
	}
	let bottomRight = {
		x: x + 1,
		y: y + 1,
	}

	let neighbors = [
		topLeft,
		topMiddle,
		topRight,
		middleLeft,
		middleRight,
		bottomLeft,
		bottomMiddle,
		bottomRight,
	]

	for (let i = 0; i < neighbors.length; i++) {
		let neighbor = neighbors[i]
		if (isValidNeighbor(neighbor)) {
			let x = neighbor.x
			let y = neighbor.y
			octopi[y][x].energyLevel++
		}
	}

	octopi[y][x].flashed = true
	flashCount++
}

let performStep = () => {
	// increment
	for (let y = 0; y < octopi.length; y++) {
		for (let x = 0; x < octopi[y].length; x++) {
			octopi[y][x].energyLevel++
		}
	}

	let flashesComplete = () => {
		for (let y = 0; y < octopi.length; y++) {
			for (let x = 0; x < octopi[y].length; x++) {
				if (octopi[y][x].energyLevel >= 10 && !octopi[y][x].flashed) {
					return false
				}
			}
		}

		return true
	}

	// keep checking for possible flashes until all octopi that
	// have energy level of 10 or more have flashed
	while (!flashesComplete()) {
		for (let y = 0; y < octopi.length; y++) {
			for (let x = 0; x < octopi[y].length; x++) {
				let octopus = octopi[y][x]
				if (octopus.energyLevel >= 10 && !octopus.flashed) {
					flash(y, x)
				}
			}
		}
	}

	// reset all flashed octopi to zeroCount
	for (let y = 0; y < octopi.length; y++) {
		for (let x = 0; x < octopi[y].length; x++) {
			if (octopi[y][x].energyLevel >= 10) {
				octopi[y][x].energyLevel = 0
				octopi[y][x].flashed = false
			}
		}
	}
}

// // go through x amount of steps
// let targetStep = 100
// for (let step = 0; step < targetStep; step++) {
// 	performStep()
// }

let steps = 0

let allSimulatneouslyFlashed = () => {
	for (let y = 0; y < octopi.length; y++) {
		for (let x = 0; x < octopi[y].length; x++) {
			if (octopi[y][x].energyLevel != 0) {
				return false
			}
		}
	}
	return true
}
while (!allSimulatneouslyFlashed()) {
	performStep()
	steps++
}

// console.log(flashCount)

console.log(steps)
