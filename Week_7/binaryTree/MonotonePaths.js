class MonotonePaths {
    constructor(tree, sum) {
        this.paths = [];
        this._currentPath = {
            path: []
        };
        this.createPaths(tree, sum);

        console.log(this.paths);
    }

    reducer (accumulator, currentValue) {
        return accumulator + currentValue;
    }

    addPath (node, sum) {
        const { data } = node;
        const { path } = this._currentPath;

        path.push(data);

        this.checkSum(sum, path);
    }

    checkSum(sum, path) {
        const currentSum = path.reduce(this.reducer, 0);
        const pathCopy = path.slice();
        const diff = Math.sign(currentSum - sum);

        switch(diff) {
            case 1:
                pathCopy.shift();
                this.checkSum(sum, pathCopy);
                break;
            case -1:
                break;
            default:
                this.paths.push(pathCopy);
        }
    }

    createPaths(node, sum){
        const { left, right } = node;

        this.addPath(node, sum);

        if(left.data !== 0) {
            this.createPaths(left, sum);
        }

        this._currentPath.path = this._currentPath.path.filter(value => value != node.left.data);

        if(right.data !== 0) {
            this.createPaths(right, sum);
        }

        this._currentPath.path = this._currentPath.path.filter(value => value != node.right.data);
    }
}