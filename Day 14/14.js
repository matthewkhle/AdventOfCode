// initial data setup
const fs = require("fs")

let fileContents = fs.readFileSync("Day 14/14.txt", "utf8")
let dataSeparatedByLine = fileContents.split("\r\n")

// console.log(dataSeparatedByLine)

let rules = {}

for (let i = 0; i < dataSeparatedByLine.length; i++) {
	let line = dataSeparatedByLine[i]
	let rule = line.split(" -> ")
	rules[rule[0]] = rule[1]
}

// console.log(rules)

let polymerTemplate = "NNCB"

let steps = 40

for (let step = 0; step < steps; step++) {
	console.log(step)

	for (let i = 0; i < polymerTemplate.length - 1; i += 2) {
		// console.log(i)
		let pair = polymerTemplate.slice(i, i + 2)

		let insertion = rules[pair]
		polymerTemplate =
			polymerTemplate.slice(0, i + 1) +
			insertion +
			polymerTemplate.slice(i + 1)
	}
}

console.log(polymerTemplate)

let elementCount = {}
for (let i = 0; i < polymerTemplate.length; i++) {
	let element = polymerTemplate[i]
	if (!elementCount[element]) {
		elementCount[element] = 1
	} else {
		elementCount[element]++
	}
}

console.log(elementCount)
