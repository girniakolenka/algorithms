class StrongConnected {
    constructor (file) {
        this._index = 0;
        this._time = {};

        console.log(this.find(file));
    }

    find(file) {
        const graph = this.createGraph(file);
        const graphTransported = this.createTransposedGraph(file);
        const investigated = {};
        const investigatedTransported = {};

        Object.keys(graph).forEach(vertex => {
            if(!investigated[vertex]) {
                this.search(graph, vertex, investigated, {});
            }
        });

        const vertexes = this.reorderVertexesByTime(this._time);
        const strongConnected = [];

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
        const vertexes = graph[vertex] ? graph[vertex] : [];

        investigated[vertex] = vertex;
        currentCircle[vertex] = vertex;

        vertexes.forEach(item => {
            if(!investigated[item]) {
               this.search(graph, item, investigated, currentCircle);
            }
        });

        this._time[vertex] = this._index;
        this._index++;

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