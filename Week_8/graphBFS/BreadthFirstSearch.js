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
 *    [s, a, b, c, d, e]
 */

class BreadthFirstSearch {
    static search(graph, start) {
        let investigated = {
            [start] : start
        };
        let queue = [start];

        while(queue.length !== 0) {
            const [vertex] = queue;

            graph[vertex].forEach(item => {
                if(!investigated[item]) {
                   investigated[item] = item;
                   queue.push(item);
                }
            });


            queue.shift();
        }

        return Object.keys(investigated);
    }
}