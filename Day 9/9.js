const fs = require("fs")

const fileContents = fs.readFileSync("Day 9/9.txt", "utf8")

let dataSeparatedByLine = fileContents.split("\r\n")

let locations = []
for (let i = 0; i < dataSeparatedByLine.length; i++) {
	locations.push(dataSeparatedByLine[i].split(""))
}

for (let i = 0; i < locations.length; i++) {
	for (let j = 0; j < locations[i].length; j++) {
		locations[i][j] = parseInt(locations[i][j])
	}
}

let isLowPoint = (height, y, x) => {
	// all around
	let left = null
	let down = null
	let right = null
	let up = null
	try {
		left = locations[y][x - 1]
	} catch (e) {
		left = 10
	}
	try {
		down = locations[y + 1][x]
	} catch (e) {
		down = 10
	}
	try {
		right = locations[y][x + 1]
	} catch (e) {
		right = 10
	}
	try {
		up = locations[y - 1][x]
	} catch (e) {
		up = 10
	}

	if (left == undefined) {
		left = 10
	}
	if (right == undefined) {
		right = 10
	}
	if (up == undefined) {
		up = 10
	}
	if (down == undefined) {
		down = 10
	}

	if (left > height && down > height && right > height && up > height) {
		return true
	}
}

let basinSize = (y, x) => {
	let visited = new Set()

	let searchPosition = (y, x) => {
		if (!visited.has(`${y},${x}`)) {
			// add to visited
			visited.add(`${y},${x}`)

			let left = null
			let down = null
			let right = null
			let up = null
			try {
				left = locations[y][x - 1]
			} catch (e) {}
			try {
				down = locations[y + 1][x]
			} catch (e) {}
			try {
				right = locations[y][x + 1]
			} catch (e) {}
			try {
				up = locations[y - 1][x]
			} catch (e) {}

			// console.log(left, right, up, down)

			if (left != 9 && left != null && left != undefined) {
				searchPosition(y, x - 1)
			}
			if (right != 9 && right != null && right != undefined) {
				searchPosition(y, x + 1)
			}
			if (down != 9 && down != null && down != undefined) {
				searchPosition(y + 1, x)
			}
			if (up != 9 && up != null && up != undefined) {
				searchPosition(y - 1, x)
			}

			// console.log(visited)
		}
	}

	searchPosition(y, x)

	return visited.size
}

let basinSizes = []
for (let y = 0; y < locations.length; y++) {
	for (let x = 0; x < locations[y].length; x++) {
		let height = locations[y][x]
		if (isLowPoint(height, y, x)) {
			basinSizes.push(basinSize(y, x))
		}
	}
}

console.log(basinSizes)
basinSizes.sort((a, b) => {
	return b - a
})

console.log(basinSizes)
