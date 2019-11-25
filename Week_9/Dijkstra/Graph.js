class Graph {
    constructor(file) {
        this.graph = this.createGraph(file);
    }

    createGraph(file) {
        const graph = {};

        file.shift(); // remove first line from file, technical one with amount of vertexes and edges
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

    getSize() {
        return this.getVertexes().length;
    }

    getEdgesForVertex(vertex) {
        return this.graph[vertex];
    }

    getVertexes() {
        return Object.keys(this.graph);
    }
}
