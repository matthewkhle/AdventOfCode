const fs = require("fs")

const fileContents = fs.readFileSync("Day 4/4.txt", "utf8")

let dataSeparatedByLine = fileContents.split("\r\n")

let numbersDrawn = dataSeparatedByLine[0].split(",")
for (let i = 0; i < numbersDrawn.length; i++) {
	numbersDrawn[i] = parseInt(numbersDrawn[i])
}

let boards = []

for (let i = 2; i < dataSeparatedByLine.length; i += 6) {
	let board = []
	for (let j = 0; j < 5; j++) {
		let row = dataSeparatedByLine[i + j].split(" ")
		row = row.filter((element) => element !== "")

		// create a dictionary, number(int) and drawn(bool)
		for (let k = 0; k < row.length; k++) {
			row[k] = {
				number: parseInt(row[k]),
				drawn: false,
			}
		}
		board.push(row)
	}
	boards.push(board)
}

let numberDrawn = -1
let drawNumber = () => {
	numberDrawn = numbersDrawn[0]
	numbersDrawn.splice(0, 1)

	// Go through all the boards
	for (let i = 0; i < boards.length; i++) {
		// Go through each spot on a given board
		let board = boards[i]
		for (let j = 0; j < board.length; j++) {
			let row = board[j]

			// Check each spot to see if the number drawn == number
			for (let k = 0; k < row.length; k++) {
				let spot = row[k]
				if (spot.number == numberDrawn) {
					spot.drawn = true
				}
			}
		}
	}
}

let winnerFound = () => {
	// Go through all the boards
	for (let i = 0; i < boards.length; i++) {
		let board = boards[i]
		if (isWinner(board)) {
			return true
		}
	}
	return false
}

let winningBoard = null
let isWinner = (board) => {
	// Check each row to see if all numbers have been drawn
	for (let i = 0; i < board.length; i++) {
		let allDrawn = true
		let row = board[i]
		for (let j = 0; j < row.length; j++) {
			let spot = row[j]
			if (!spot.drawn) {
				allDrawn = false
				j = row.length
			}
		}

		if (allDrawn) {
			winningBoard = board
			return true
		}
	}

	// Check each column to see if all numbers have been drawn
	for (let i = 0; i < board[0].length; i++) {
		let allDrawn = true
		for (let j = 0; j < board.length; j++) {
			let spot = board[j][i]
			if (!spot.drawn) {
				allDrawn = false
				j = board.length
			}
		}

		if (allDrawn) {
			winningBoard = board
			return true
		}
	}

	return false
}

while (!winnerFound() && numbersDrawn.length > 0) {
	drawNumber()
}

let boardSum = (board) => {
	let total = 0
	for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            let spot = board[i][j]
            if (!spot.drawn) {
                total += spot.number
            }
        }
    }
    return total
}

// console.log(numbersDrawn.length)
// console.log(winningBoard)
console.log(boardSum(winningBoard))
console.log(numberDrawn)
console.log(boardSum(winningBoard) * numberDrawn)

// boards.forEach((element) => {
// 	element.forEach((board) => console.log(board))
// 	console.log()
// })
