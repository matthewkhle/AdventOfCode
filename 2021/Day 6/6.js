const fs = require("fs")

const fileContents = fs.readFileSync("./2021/Day 6/6.txt", "utf8")

let ages = fileContents.split(",")
for (let i = 0; i < ages.length; i++) {
	ages[i] = parseInt(ages[i])
}

// console.log(ages)
let ages2 = []

for (let day = 0; day < 256; day++) {
	let originalLength = ages.length
	for (let i = 0; i < originalLength; i++) {
		if (ages.length < 150) {
			if (ages[i] == 0) {
				ages[i] = 6
				ages.push(8)
			} else {
				ages[i]--
			}
		} else {
			if (ages[i] == 0) {
				ages[i] = 6
				ages2.push(8)
			} else {
				ages[i]--
			}
		}
	}

	originalLength = ages2.length
	for (let i = 0; i < originalLength; i++) {
		if (ages2[i] == 0) {
			ages2[i] = 6
			ages2.push(8)
		} else {
			ages2[i]--
		}
	}

	console.log(day)
}

console.log(ages.length + ages2.length)

// console.log(ages)
