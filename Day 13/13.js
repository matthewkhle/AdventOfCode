// initial data setup
const fs = require("fs")

const fileContents = fs.readFileSync("Day 13/dots.txt", "utf8")
let dataSeparatedByLine = fileContents.split("\r\n")

let dots = []
for (let i = 0; i < dataSeparatedByLine.length; i++) {
	let dot = dataSeparatedByLine[i].split(",")
	dots.push(dot)
}
console.log(dots)