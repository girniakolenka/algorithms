class Graph {
    constructor(file) {
        this.size = null;
        this.graph = this.createGraph(file);
    }

    createGraph(file) {
        const graph = {};

        this.defineSize(file);

        file.forEach(row => {
            const [vertexFromStr, vertexToStr, weightStr] = row.split(" ");
            const vertexFrom = Number(vertexFromStr);
            const vertexTo = Number(vertexToStr);
            const weight = Number(weightStr);

            if(graph[vertexFrom]) {
                graph[vertexFrom].push([vertexTo, weight]);
            } else {
                graph[vertexFrom] = [[vertexTo, weight]];
            }
        });

        return graph;
    }

    // remove first line from file, technical one with amount of vertexes and edges
    defineSize(file) {
        const dimensions = file.shift().split(" ");
        const [size] = dimensions;

        this.size = Number(size);
    }

    getSize() {
        return this.size;
    }

    getEdgesForVertex(vertex) {
        return this.graph[vertex];
    }
}

module.exports = Graph;