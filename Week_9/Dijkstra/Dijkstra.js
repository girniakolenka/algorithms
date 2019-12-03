const Path = require("./Path.js");
const Heap = require("./Heap.js");

class Dijkstra {
    constructor(graph, start, end) {
        this._graph = graph;
        this._paths = this.getInitValues(null);
        this._lengths = this.getInitValues(Infinity);


        this.init(start, end);
    }

    getLengths() {
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
        const size = this._graph.getSize();
        const heap = new Heap(size, start, this._lengths);

        while(heap.getSize() !== 0 ){
            const vertex = heap.extractMin();
            const edges = this._graph.getEdgesForVertex(vertex) || [];

            edges.forEach(item => {
                const [vertexTo, weight] = item;

                this.definePathAndLength(vertex, vertexTo, weight, heap);
            });
        }
    }

    definePathAndLength (start, vertexTo, weight, heap) {
        const currentLength = this._lengths[vertexTo];
        const length = this._lengths[start] + weight;

        if(length < currentLength) {
            this._lengths[vertexTo] = length;
            this._paths[vertexTo] = start;

            heap.updateElement(vertexTo);
        }
    }
}

module.exports = Dijkstra;
