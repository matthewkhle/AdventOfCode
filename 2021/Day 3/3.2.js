const fs = require("fs")

const fileContents = fs.readFileSync("./2021/Day 3/3.txt", "utf8")

let data = fileContents.split("\r\n")

filterData = (data, isZero, position) => {
	let filtered = []
	if (!isZero) {
		for (let i = 0; i < data.length; i++) {
			numbers = data[i].split("")
			let number = parseInt(numbers[position])
			if (number == 1) {
				filtered.push(data[i])
			}
		}
		return filtered
	} else {
		for (let i = 0; i < data.length; i++) {
			numbers = data[i].split("")
			let number = parseInt(numbers[position])
			if (number == 0) {
				filtered.push(data[i])
			}
		}
		return filtered
	}
}

for (let i = 0; i < 12; i++) {
	let zeroCount = 0
	let oneCount = 0
	let filtered = []

    if (data.length == 1) {
        break
    }

	for (let j = 0; j < data.length; j++) {
		numbers = data[j].split("")
		let number = parseInt(numbers[i])
		if (number == 1) {
			oneCount++
		} else if (number == 0) {
			zeroCount++
		}
	}

	if (zeroCount < oneCount || oneCount == zeroCount) {
		data = filterData(data, true, i)
	} else if (oneCount < zeroCount) {
		data = filterData(data, false, i)
	}
}

console.log(data)


// 3921
// 836
console.log(3921 * 836)