/*
 * Example of graph:
 *
 *    -> b ->
 *             e
 * a  -> c ->
 *
 *    -> d -> f
 *
 *  List of graph:
 *  g = {
 *      a: [b, c, d],
 *      b: [e],
 *      c: [e],
 *      d: [f],
 *      e: [],
 *      f: []
 *   }

 * Result of sort:
 *    [a, d, f, c, b, e]
 */


class TopologicalSort {
    constructor (graph) {
        this.index = Object.keys(graph).length;
        this.sorted = {};

        this.sort(graph);

        return this.sorted;
    }

    sort (graph) {
        Object.keys(graph).forEach(vertex => this.search(graph, vertex));
    }

    search(graph, start) {
        if(this.index !== 0) {
            graph[start].forEach(item => {
                if(!Number.isInteger(this.sorted[item])) {
                   this.search(graph, item);
                }
            });

            this.sorted[start] = this.index;
            this.index--;
        }
    }
}