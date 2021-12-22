const fs = require("fs")

const fileContents = fs.readFileSync("./2021/Day 2/2.txt", "utf8")


let dataSeparatedByLine = fileContents.split("\n")

let horizontal = 0
let depth = 0
let aim = 0

for (let i = 0; i < dataSeparatedByLine.length; i++) {
	let split = dataSeparatedByLine[i].split(" ")

	let direction = split[0]
	let value = parseInt(split[1])

    if (direction === "forward") {
        horizontal += value
        depth = depth + (value * aim)
    } else if (direction === "down") {
        aim += value
    } else if (direction === "up") {
        aim -= value
    }
}

console.log(horizontal * depth)
