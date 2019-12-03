const fs = require('fs');
const fsPromises = fs.promises;

const Dijkstra = require("./Dijkstra.js");
const Graph = require("./Graph.js");

class Main {
    constructor () {
        Promise.all([
            fsPromises.readFile("data_examples/input_4_1000.txt"),
            fsPromises.readFile("data_examples/output_4.txt")
        ])
        .then(data => this.formatResult(data))
        .catch((err) => {
             console.log(err);
        });
    }

    formatResult (data) {
        const [inputData, outputData] = data;
        const input = inputData.toString().split("\n");
        const output = outputData.toString().split("\n");
        const graph = new Graph(input);
        const size = graph.getSize();

        console.log([...Array(size).keys()].every(index => {
            const start = index + 1;
            const dijkstra = new Dijkstra(graph, start);
            const shortPath = dijkstra.getLengths().join(" ").replace(/\Infinity/g, "--");
            const result = output[start - 1] === shortPath;

/*            console.log(shortPath)
            console.log(output[start - 1])*/
            return result;
       }));
    }
}

module.exports = Main;