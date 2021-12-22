const fs = require("fs")

const fileContents = fs.readFileSync("Day 3/3.txt", "utf8")

let dataSeparatedByLine = fileContents.split("\r\n")

// console.log(dataSeparatedByLine)

zeroCount = []
oneCount = []

for (let i = 0; i < 12; i++) {
	zeroCount.push(0)
	oneCount.push(0)
}

// console.log(zeroCount)
// console.log(oneCount)

for (let i = 0; i < dataSeparatedByLine.length; i++) {
	numbers = dataSeparatedByLine[i].split("")

	for (let j = 0; j < numbers.length; j++) {
		let number = parseInt(numbers[j])
		if (number == 1) {
			oneCount[j]++
		} else if (number == 0) {
			zeroCount[j]++
		}
	}
}

// console.log(zeroCount)
// console.log(oneCount)

let gamma = ""
let epsilon = ""

for (let i = 0; i < zeroCount.length; i++) {
	if (zeroCount[i] > oneCount[i]) {
		gamma += 1
		epsilon += 0
	} else {
		gamma += 0
		epsilon += 1
	}
}

console.log(gamma) // 746
console.log(epsilon) // 3349
