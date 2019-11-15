class StrongConnected {
    constructor (file) {
        this._index = 0;
        this._time = {};

        console.log(this.find(file).splice(0, 10));
    }

    find(file) {
        const graph = this.createGraph(file);
        const graphTransported = this.createTransposedGraph(file);
        const investigated = {};
        const investigatedTransported = {};

        console.log("Start find");

        Object.keys(graph).forEach(vertex => {
            if(!investigated[vertex]) {
                this.search(graph, vertex, investigated, {});
            }
        });
        console.log("Create time array");

        const vertexes = this.reorderVertexesByTime(this._time);
        const strongConnected = [];

        console.log("Find strong components");

        vertexes.forEach(vertex => {
            if(!investigatedTransported[vertex]) {
                strongConnected.push(this.search(graphTransported, vertex, investigatedTransported, {}).length);
            }
        });

        return strongConnected.sort((a, b) => b-a);
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

    search(graph, vertex, investigated, currentCircle) {
/*        const vertexes = graph[vertex] ? graph[vertex] : [];

        investigated[vertex] = vertex;
        currentCircle[vertex] = vertex;

        vertexes.forEach(item => {
            if(!investigated[item]) {
               this.search(graph, item, investigated, currentCircle);
            }
        });

        this._time[vertex] = this._index;
        this._index++;

        return Object.keys(currentCircle);*/


        const vertexes = graph[vertex] ? graph[vertex] : [];
        let stack = [vertex];

        investigated[vertex] = vertex;
        currentCircle[vertex] = vertex;


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
                this._time[node] = this._index;
                this._index++;
                stack.splice(stack.indexOf(node), 1);
            }
        }

        return Object.keys(currentCircle);
    }

    reorderVertexesByTime(vertexes) {
        const sortable = [];

        for (let i in vertexes) {
            sortable.push([vertexes[i], i])
        }

        sortable.sort((a, b) => b[0]-a[0]);

        return sortable.map((item) => item[1]);
    }
}
module.exports = StrongConnected;