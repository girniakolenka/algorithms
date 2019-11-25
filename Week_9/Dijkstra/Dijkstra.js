class Dijkstra {
    constructor(file) {
        this._graph = new Graph(file);
        this._paths = this.getInitValues(null);
        this._lengths = this.getInitValues(Infinity);

        this._investigated = {};

        this._lengths[1] = 0;
        this.find(1);

        console.log(this._lengths);
        console.log(this.buildPath());
    }

    getInitValues(value) {
        const size = this._graph.getSize() + 1;

        return Array(size).fill(value);
    }

    find(start) {
        this._graph.getEdgesForVertex(start).forEach(item => {
            const [vertexTo, weight] = item;

            if(!this._investigated[vertexTo]) {
                const currentLength = this._lengths[vertexTo];
                const length = this._lengths[start] + weight;

                if(length < currentLength) {
                    this._lengths[vertexTo] = length;
                    this._paths[vertexTo] = start;
                }
            }
        });

        this._investigated[start] = true;

        const newVertex = this.findLowestLength();


        if(newVertex) {
            this.find(newVertex);
        } else {
            return;
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

    buildPath() {
        let result = {};

        this._paths.forEach((path, index) => {
            this.addPath(result, index, this._paths[index]);
        });

        return result;
    }

    addPath(result, index, path) {
        if(path !== null) {
            if(result[index]) {
                result[index].push(path);
            } else {
                 result[index] = [path];
            }
            this.addPath(result, index, this._paths[path]);

        }
    }
}
