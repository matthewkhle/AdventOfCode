const fs = require("fs")

const fileContents = fs.readFileSync("./2021/Day 7/7.txt", "utf8")
let positions = fileContents.split(",")
positions = positions.map((x) => {
	return parseInt(x)
})

// ranges to check
let min = Math.min(...positions)
let max = Math.max(...positions)
let best = null

let getCost = (newPosition) => {
	let cost = 0
	positions.forEach((position) => (cost += Math.abs(position - newPosition)))
    return cost
}

for (let newPosition = min; newPosition < max; newPosition++) {
    let cost = getCost(newPosition)
    if (cost < best || best == null) {
        best = cost
    }
}

console.log(best)
