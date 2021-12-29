// initial data setup
const fs = require("fs")

// dots
let fileContents = fs.readFileSync("Day 13/dots.txt", "utf8")
let dataSeparatedByLine = fileContents.split("\r\n")

let dots = []
let maxX = 0
let maxY = 0
for (let i = 0; i < dataSeparatedByLine.length; i++) {
	let dot = dataSeparatedByLine[i].split(",")
	dot = dot.map((x) => {
		return parseInt(x)
	})

	let x = dot[0]
	let y = dot[1]
	if (x > maxX) {
		maxX = x
	}
	if (y > maxY) {
		maxY = y
	}

	dots.push(dot)
}

maxX++
maxY++

// folds
fileContents = fs.readFileSync("Day 13/folds.txt", "utf8")
dataSeparatedByLine = fileContents.split("\r\n")

let folds = []
for (let i = 0; i < dataSeparatedByLine.length; i++) {
	let fold = dataSeparatedByLine[i].substring(11)
	if (fold[0] == "x") {
		fold = {
			axis: "x",
			value: parseInt(fold.substring(2)),
		}
	} else if (fold[0] == "y") {
		fold = {
			axis: "y",
			value: parseInt(fold.substring(2)),
		}
	}
	folds.push(fold)
}

// prepare transparent paper
let createPaper = (xSize, ySize) => {
	let createdPaper = new Array(ySize)

	for (let i = 0; i < createdPaper.length; i++) {
		createdPaper[i] = new Array(xSize).fill(".")
	}

	return createdPaper
}

let paper = createPaper(maxX, maxY)

// fill paper with initial dots
for (let i = 0; i < dots.length; i++) {
	let dot = dots[i]
	let x = dot[0]
	let y = dot[1]
	paper[y][x] = "#"
}

let foldPaper = (fold) => {
	// folding on x axis
	// move right side to left side
	// create new paper of half x and same y
	let xSize = null
	let ySize = null
	if (fold.axis === "x") {
		xSize = fold.value
		ySize = paper.length
	} else if (fold.axis === "y") {
		xSize = paper[0].length
		ySize = fold.value
	}

	let newPaper = createPaper(xSize, ySize)

	for (let y = 0; y < newPaper.length; y++) {
		for (let x = 0; x < newPaper[y].length; x++) {
			newPaper[y][x] = paper[y][x]
		}
	}

	// console.table(newPaper)

	if (fold.axis === "x") {
		for (let y = 0; y < newPaper.length; y++) {
			for (let x = 0; x < newPaper[y].length; x++) {
				let mirrorX = paper[y].length - 1 - x
				if (paper[y][mirrorX] == "#") {
					newPaper[y][x] = paper[y][mirrorX]
				}
			}
		}
	} else if (fold.axis === "y") {
		for (let y = 0; y < newPaper.length; y++) {
			for (let x = 0; x < newPaper[y].length; x++) {
				let mirrorY = paper.length - 1 - y
				if (paper[mirrorY][x] == "#") {
					newPaper[y][x] = paper[mirrorY][x]
				}
			}
		}
	}

	paper = newPaper
}

folds.forEach((fold) => {
	foldPaper(fold)
})

let dotsCount = 0
// for (let y = 0; y < paper.length; y++) {
// 	for (let x = 0; x < paper[y].length; x++) {
// 		if (paper[y][x] == "#") {
// 			dotsCount++
// 		}
// 	}
// }

paper.forEach((row) => {
	row.forEach((element) => {
		if (element == "#") {
			dotsCount++
		}
	})
})

console.table(paper)
console.log(dotsCount)
