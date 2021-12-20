// initial data setup
const fs = require("fs")

const fileContents = fs.readFileSync("./2021/Day 10/10.txt", "utf8")
let dataSeparatedByLine = fileContents.split("\r\n")

let lines = []
for (let i = 0; i < dataSeparatedByLine.length; i++) {
	let line = dataSeparatedByLine[i].split("")
	lines.push(line)
}

// console.log(lines)

let isOpener = (character) => {
	if (
		character === "(" ||
		character === "[" ||
		character === "{" ||
		character === "<"
	) {
		return true
	}
	return false
}

// let getPenalty = (character) => {
// 	if (character === ")") {
// 		return 3
// 	} else if (character === "]") {
// 		return 57
// 	} else if (character === "}") {
// 		return 1197
// 	} else if (character === ">") {
// 		return 25137
// 	}
// }

let stackScores = []
for (let i = 0; i < lines.length; i++) {
	let line = lines[i]
	let stack = []
	for (let j = 0; j < line.length; j++) {
		let character = line[j]

		if (isOpener(character)) {
			stack.push(character)
		} else {
			if (character === ")") {
				if (stack[stack.length - 1] !== "(") {
					stack = []
					break
				}
			} else if (character === "]") {
				if (stack[stack.length - 1] !== "[") {
					stack = []
					break
				}
			} else if (character === "}") {
				if (stack[stack.length - 1] !== "{") {
					stack = []
					break
				}
			} else if (character === ">") {
				if (stack[stack.length - 1] !== "<") {
					stack = []
					break
				}
			}
			stack.pop()
		}
	}

	// console.log(stack)

	// get completion score
	let score = 0
	for (let i = stack.length - 1; i >= 0; i--) {
		let character = stack[i]
		// console.log(character)
		if (character === "(") {
			score = score * 5 + 1
		} else if (character === "[") {
			score = score * 5 + 2
		} else if (character === "{") {
			score = score * 5 + 3
		} else if (character === "<") {
			score = score * 5 + 4
		}
	}

	if (stack.length > 0) {
		stackScores.push(score)
	}
}

stackScores.sort((a, b) => {
	return b - a
})

let middleIndex = Math.floor(stackScores.length / 2)

console.log(stackScores[middleIndex])
