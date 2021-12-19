const fs = require("fs")

const fileContents = fs.readFileSync("./2021/Day 6/6.txt", "utf8")

let ages = fileContents.split(",")
for (let i = 0; i < ages.length; i++) {
	ages[i] = parseInt(ages[i])
}

// console.log(ages)
let ages2 = []

for (let day = 0; day < 80; day++) {
	let originalLength = ages.length
	for (let i = 0; i < originalLength; i++) {
		if (ages[i] == 0) {
			ages[i] = 6
			ages.push(8)
		} else {
			ages[i]--
		}
	}
}

console.log(ages.length + ages2.length)

// console.log(ages)
