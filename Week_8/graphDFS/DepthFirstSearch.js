/*
 * Example of graph:
 *
 *      a - c
 *    /  \   \
 *  s     \   e
 *    \    \ /
 *      b - d
 *
 *  List of graph:
 *  g = {
 *      s: [a, b],
 *      a: [s, c, d],
 *      b: [s, d],
 *      c: [a, e],
 *      d: [b,a,e],
 *      e: [c, d]
 *   }

 * Result of search:
 *    [s, a, c, e, d, b]
 */

class DepthFirstSearch {
    static search(graph, start) {
        let investigated = {};

        return this.getNext(graph, start, investigated);
    }

    static getNext(graph, vertex, investigated) {
        investigated[vertex] = vertex;

        graph[vertex].forEach(item => {
            if(!investigated[item]) {
               this.getNext(graph, item, investigated);
            }
        });


        return Object.keys(investigated);
    }
}