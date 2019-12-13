class Path {
    constructor(paths) {
        this._paths = paths;

        return this.buildPath(paths);
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

module.exports = Path;