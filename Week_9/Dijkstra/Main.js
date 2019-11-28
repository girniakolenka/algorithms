const fs = require('fs');
const fsPromises = fs.promises;

const Dijkstra = require("./Dijkstra.js");
const Graph = require("./Graph.js");

class Main {
    constructor () {
        Promise.all([
            fsPromises.readFile('data_examples/input_4_1000.txt'),
            fsPromises.readFile('data_examples/output_4.txt')
        ]).then(data => this.formatResult(data));
    }

    formatResult (data) {
        const [inputData, outputData] = data;
        const input = inputData.toString().split("\n");
        const output = outputData.toString().split("\n");
        const graph = new Graph(input);
        const size = graph.getSize();

        console.log([...Array(size).keys()].every(index => {
            const shortPath = new Dijkstra(graph, index + 1).join(" ").replace(/\Infinity/g, "--");
            const result = output[index] === shortPath;

            return result;
        }));
    }
}

module.exports = Main;