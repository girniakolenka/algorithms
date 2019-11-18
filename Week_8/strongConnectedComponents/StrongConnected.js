class StrongConnected {
    constructor (file) {
        this._index = 0;
        this._indexes = {};

        return this.find(file);
    }

    find(file) {
        const graph = this.createGraph(file);

        this.createIndexes(graph);

        const vertexes = this.reorderVertexesByIndex();

        return this.getStrongConnectedComponents(file, vertexes);
    }

    getStrongConnectedComponents(file, vertexes) {
        const graphTransported = this.createTransposedGraph(file);
        const investigatedTransported = {};
        const strongConnectedAmount = [];

        vertexes.forEach(vertex => {
            if(!investigatedTransported[vertex]) {
                const components = this.searchAndEnumerateIndex(graphTransported, vertex, investigatedTransported);
                const componentsAmount = components.length;

                strongConnectedAmount.push(componentsAmount);
            }
        });

        return strongConnectedAmount.sort((a, b) => b-a);
    }

    createIndexes(graph) {
        const investigated = {};

        Object.keys(graph).forEach(vertex => {
            if(!investigated[vertex]) {
                this.searchAndEnumerateIndex(graph, vertex, investigated);
            }
        });
    }

    createGraph(file) {
        const graph = {};

        file.forEach(item => {
            const [vertexFrom, vertexTo] = item.trim().split(" ");

            this.createVertex(graph, vertexFrom, vertexTo);
        });

        return graph;
    }

    createTransposedGraph(file) {
        const graph = {};

        file.forEach(item => {
            const [vertexTo, vertexFrom] = item.trim().split(" ");

            this.createVertex(graph, vertexFrom, vertexTo);
        });

        return graph;
    }

    createVertex(graph, vertexFrom, vertexTo) {
        if (graph[vertexFrom]) {
            graph[vertexFrom].push(vertexTo);
        } else {
            graph[vertexFrom] = [vertexTo];
        }
    }

    searchAndEnumerateIndex(graph, vertex, investigated) {
        const vertexes = graph[vertex] ? graph[vertex] : [];
        const currentCircle = {
            [vertex] : vertex
        };
        let stack = [vertex];

        investigated[vertex] = vertex;

        while(stack.length !== 0) {
            const [node] = stack;
            const nextVertex = graph[node] ? graph[node].find(
                item => !investigated[item]
            ) : null;

            if(nextVertex) {
                investigated[nextVertex] = nextVertex;
                currentCircle[nextVertex] = nextVertex;
                stack.unshift(nextVertex);
            } else {
                this._indexes[node] = this._index;
                this._index++;
                stack.splice(stack.indexOf(node), 1);
            }
        }

        return Object.keys(currentCircle);
    }

    /*
     * Object this._indexes
     * {
     *     [vertex] : [index]
     * }
     * Reorder by indexes from bigger to smaller
     */
    reorderVertexesByIndex() {
        const sortable = [];

        for (let i in this._indexes) {
            sortable.push([this._indexes[i], i]);
        }

        sortable.sort((a, b) => b[0]-a[0]);

        return sortable.map(item => item[1]);
    }
}

module.exports = StrongConnected;