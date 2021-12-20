// initial data setup
const fs = require("fs")

const fileContents = fs.readFileSync("./2021/Day 12/12.txt", "utf8")
let dataSeparatedByLine = fileContents.split("\r\n")

let connections = []
for (let i = 0; i < dataSeparatedByLine.length; i++) {
	let connection = dataSeparatedByLine[i].split("-")
	connections.push(connection)
    
    let connection2 = [...connection]
    connections.push(connection2.reverse())
}
// console.log(connections)

let paths = []

// add intial paths with start
for (let i = 0; i < connections.length; i++) {
	let connection = connections[i]
	if (connection[0] == "start") {
		paths.push(connection)
	}
}

let isVisitedSmallCave = (destination, path) => {
    // if large cave, return false
    if (destination.toUpperCase() == destination) return false

    // check if small cave is in path
    return path.includes(destination)
}

let getDestinations = (from, path) => {
	let destinations = []
	for (let i = 0; i < connections.length; i++) {
		let connection = connections[i]

        // if the connection is to an unvisited small cave && not start
        let destination = connection[1]
		if (connection[0] == from && !isVisitedSmallCave(destination, path) && destination != "start") {
			destinations.push(destination)
		}
	}
	return destinations
}

// go through all paths
for (let i = 0; i < paths.length; i++) {
	let path = paths[i]

	// if it is incomplete
	let last = path[path.length - 1]
	if (last != "end") {
		// explore all valid neighbors
		let validDestinations = getDestinations(last, path)

        // for each valid neighbor, push a new path
        for (let i = 0; i < validDestinations.length; i++) {
            let newPath = [...path]
            newPath.push(validDestinations[i])
            paths.push(newPath)
        }
        // remove this path
        paths.splice(i, 1)
        // start from first path in array
        i = -1
	}
    // break
}

console.log(paths.length)

