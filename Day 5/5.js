const fs = require("fs")

const fileContents = fs.readFileSync("Day 5/5.txt", "utf8")

let dataSeparatedByLine = fileContents.split("\r\n")

// set up points
let points = new Array(1000)
for (let i = 0; i < points.length; i++) {
	points[i] = new Array(1000)
	for (let j = 0; j < points[i].length; j++) {
		points[i][j] = 0
	}
}

let createVerticalLine = (x, yLow, yHigh) => {
	for (let i = yLow; i <= yHigh; i++) {
		points[i][x]++
	}
}

let createHorizontalLine = (y, xLow, xHigh) => {
	for (let j = xLow; j <= xHigh; j++) {
		points[y][j]++
	}
}

let isDiagonalLine = (x1, y1, x2, y2) => {
	let slope = (x1 - x2) / (y1 - y2)
	if (Math.abs(slope) === 1) {
		return true
	}
	return false
}

let createDiagonalLine = (x1, x2, y1, y2, x1IsGreater, y1IsGreater) => {
	if (!x1IsGreater && !y1IsGreater) {
		for (let i = y1; i <= y2; i++) {
			for (let j = x1; j <= x2; i++, j++) {
				points[i][j]++
			}
		}
	} else if (x1IsGreater && !y1IsGreater) {
		for (let i = y1; i <= y2; i++) {
			for (let j = x1; j >= x2; i++, j--) {
				points[i][j]++
			}
		}
	} else if (!x1IsGreater && y1IsGreater) {
		for (let i = y1; i >= y2; i--) {
			for (let j = x1; j <= x2; i--, j++) {
				points[i][j]++
			}
		}
	} else if (x1IsGreater && y1IsGreater) {
		for (let i = y1; i >= y2; i--) {
			for (let j = x1; j >= x2; i--, j--) {
				points[i][j]++
			}
		}
	}
}

for (let i = 0; i < dataSeparatedByLine.length; i++) {
	let line = dataSeparatedByLine[i].split(" -> ")
	let coordinates = []
	for (let j = 0; j < line.length; j++) {
		let coordinate = line[j].split(",")
		for (let k = 0; k < coordinate.length; k++) {
			coordinate[k] = parseInt(coordinate[k])
		}
		coordinates.push(coordinate)
	}

	let x1 = coordinates[0][0]
	let x2 = coordinates[1][0]
	let y1 = coordinates[0][1]
	let y2 = coordinates[1][1]

	// Vertical lines
	if (x1 === x2) {
		// add lines
		if (y1 < y2) {
			createVerticalLine(x1, y1, y2)
		} else if (y2 < y1) {
			createVerticalLine(x1, y2, y1)
		}
	}
	// Horizontal lines
	else if (y1 === y2) {
		// add lines
		if (x1 < x2) {
			createHorizontalLine(y1, x1, x2)
		} else if (x2 < x1) {
			createHorizontalLine(y1, x2, x1)
		}
	}
	// diagonal lines
	else if (isDiagonalLine(x1, y1, x2, y2)) {
		// console.log("diagonal: " + coordinates)
		if (x1 < x2 && y1 < y2) {
			createDiagonalLine(x1, x2, y1, y2, false, false)
		} else if (x1 < x2 && y2 < y1) {
			createDiagonalLine(x1, x2, y1, y2, false, true)
		} else if (x2 < x1 && y1 < y2) {
			createDiagonalLine(x1, x2, y1, y2, true, false)
		} else if (x2 < x1 && y2 < y1) {
			createDiagonalLine(x1, x2, y1, y2, true, true)
		}
	}
}

// count points
let count = 0
for (let i = 0; i < points.length; i++) {
	for (let j = 0; j < points[i].length; j++) {
		if (points[i][j] >= 2) {
			count++
		}
	}
}

// console.table(points)
console.log(count)
