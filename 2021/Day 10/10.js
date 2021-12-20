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

let score = 0
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
					score += 3
					break
				}
			} else if (character === "]") {
				if (stack[stack.length - 1] !== "[") {
					score += 57
					break
				}
			} else if (character === "}") {
				if (stack[stack.length - 1] !== "{") {
					score += 1197
					break
				}
			} else if (character === ">") {
				if (stack[stack.length - 1] !== "<") {
					score += 25137
					break
				}
			}
			stack.pop()
		}
	}
	// console.log(stack)
	// console.log()
}

console.log(score)
