const Path = require("./Path.js");

class Dijkstra {
    constructor(graph, start, end) {
        this._graph = graph;
        this._paths = this.getInitValues(null);
        this._lengths = this.getInitValues(Infinity);

        this._investigated = {};

        this.init(start, end);

        return this._lengths;
    }

    init (start, end) {
        this._lengths[start] = 0;
        this.find(start, end);

//TODO
        this._lengths.shift();

     //   console.log(new Path(this._paths));
    }

    getInitValues(value) {
        const size = this._graph.getSize() + 1;

        return Array(size).fill(value);
    }

    find(start, end) {
        let stack = [start];

        while(stack.length !== 0 ){
            const [vertex] = stack;
            const edges = this._graph.getEdgesForVertex(vertex) || [];

            edges.forEach(item => {
                this.definePathAndLength(vertex, item);
            });

            this._investigated[vertex] = true;

            stack.splice(stack.indexOf(vertex), 1);

            const newVertex = this.findLowestLength();


            if(newVertex && newVertex !== end) {
                stack.push(newVertex);
            }
        }
    }

    definePathAndLength (start, item) {
        const [vertexTo, weight] = item;

        if(!this._investigated[vertexTo]) {
        console.log("new path added" + vertexTo);

            const currentLength = this._lengths[vertexTo];
            const length = this._lengths[start] + weight;

            if(length < currentLength) {
                this._lengths[vertexTo] = length;
                this._paths[vertexTo] = start;
            }
        }
    }

    findLowestLength() {
        let lowest = Infinity;
        let lowestIndex;

        this._lengths.forEach((length, index) => {
            if(length < lowest && !this._investigated[index]) {
                lowest = length;
                lowestIndex = index;
            }
        });

        return lowestIndex;
    }
}

module.exports = Dijkstra;
