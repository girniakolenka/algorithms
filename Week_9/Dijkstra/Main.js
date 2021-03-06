const fs = require('fs');
const fsPromises = fs.promises;

const Dijkstra = require("./Dijkstra.js");
const Graph = require("./Graph.js");

class Main {
    constructor () {
        Promise.all([
            fsPromises.readFile('data_examples/input_5_10.txt'),
            fsPromises.readFile('data_examples/output_5.txt')
        ]).then(data => this.formatResult(data));
    }

    formatResult (data) {
        const [inputData, outputData] = data;
        const input = inputData.toString().split("\n");
        const output = outputData.toString().split("\n");
        const graph = new Graph(input);
        const size = graph.getSize();
        const timeNow = Date.now();

        console.log([...Array(size).keys()].every(index => {
            const dijkstra = new Dijkstra(graph, index + 1);
            const shortPath = dijkstra.join(" ").replace(/\Infinity/g, "--");
            const result = output[index] === shortPath;

            console.log(shortPath);
            console.log(output[index]);

            return result;
       }));

        console.log(Date.now() - timeNow);
    }
}

module.exports = Main;