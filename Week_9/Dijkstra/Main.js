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
            const dijkstra = new Dijkstra(graph, index+1);
            const shortPath = dijkstra.getLengths().join(" ").replace(/\Infinity/g, "--");
            const result = output[index] === shortPath;

            return result;
       }));

      //  console.log(new Dijkstra(graph, 100562, 1070345)[1070345])
    }
}

module.exports = Main;