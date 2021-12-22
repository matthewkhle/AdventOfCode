const fs = require("fs")

const fileContents = fs.readFileSync("Day 6/6.txt", "utf8")

let startingFish = fileContents.split(",")
for (let i = 0; i < startingFish.length; i++) {
	startingFish[i] = parseInt(startingFish[i])
}


let fish = new Array(9).fill(0)

for (let i = 0; i < startingFish.length; i++) {
    fish[startingFish[i]] += 1
}

for (let day = 0; day < 256; day++) {
	// shift all to the left, 0 goes to 6

	let reproducingFish = fish.shift()

	fish[6] += reproducingFish

	// reproduce
	fish.push(reproducingFish)
}

let count = 0
for (let i = 0; i < fish.length; i++) {
    count += fish[i]
}

console.log(count)
// console.log(fish)