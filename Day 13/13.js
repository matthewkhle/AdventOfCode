// initial data setup
const fs = require("fs")

// dots
let fileContents = fs.readFileSync("Day 13/dots.txt", "utf8")
let dataSeparatedByLine = fileContents.split("\r\n")

let dots = []
for (let i = 0; i < dataSeparatedByLine.length; i++) {
	let dot = dataSeparatedByLine[i].split(",")
	dots.push(dot)
}

dots.forEach((element, index) => {
	dots[index] = dots[index].map((x) => {
		return parseInt(x)
	})
})

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
let paper = new Array(1500)
for (let i = 0; i < paper.length; i++) {
	paper[i] = new Array(1500).fill(".")
}

// fill paper with initial dots
for (let i = 0; i < dots.length; i++) {
	let dot = dots[i]
	let x = dot[0]
	let y = dot[1]
	paper[y][x] = "#"
}

console.table(paper)
