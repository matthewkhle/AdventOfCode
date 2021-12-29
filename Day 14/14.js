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

let start = "NNCB"
let polymerTemplate = null

let steps = 40

for (let step = 0; step < steps; step++) {
    polymerTemplate = start.substring(0, 1)
	for (let i = 0; i < start.length - 1; i++) {
		let pair = start.substring(i, i + 2)

		let insertion = rules[pair] + pair.substring(1)
		polymerTemplate += insertion
	}
    start = polymerTemplate.slice()
}

// console.log(polymerTemplate)


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
