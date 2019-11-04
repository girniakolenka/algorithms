/*
 * Example of graph:
 *
 *     b
 *   /  \
 *  a -  c
 *
 *  d - f
 *
 *    k
 *
 *  List of graph:
 *  g = {
 *      a: [b, c],
 *      b: [a, c],
 *      c: [a, b],
 *      d: [f],
 *      f: [d],
 *      k: []
 *   }
 *
 * Result of count:
 *    [[a,b,c], [d, f], [k]]
 */


class Main {
    constructor () {
        const graph = {
            "a": ["b", "c"],
            "b": ["a", "c"],
            "c": ["a", "b"],
            "d": ["f"],
            "f": ["d"],
            "k": []
        }

        console.log(this.countConnectedness(graph));
    }


    countConnectedness (graph) {
        let connectednessArr = [];
        const vertexes = Object.keys(graph);

        vertexes.forEach(item => {
            if (!this.isConnected(connectednessArr, item)) {
                connectednessArr.push(BreadthFirstSearch.search(graph, item));
            }
        });

        return JSON.stringify(connectednessArr);
    }

    isConnected(connectednessArr, vertex) {
        return connectednessArr.flat().includes(vertex);
    }
}