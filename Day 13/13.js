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
			value: fold.substring(2),
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
let paper = new Array(maxY)
for (let i = 0; i < paper.length; i++) {
	paper[i] = new Array(maxX).fill(".")
}

// fill paper with initial dots
for (let i = 0; i < dots.length; i++) {
	let dot = dots[i]
	let x = dot[0]
	let y = dot[1]
	paper[y][x] = "#"
}

console.table(paper)
