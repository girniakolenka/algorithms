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
        let investigated = {
            [start]: start
        };
        let stack = [start];

        while(stack.length !== 0) {
            const [vertex] = stack;
            const nextVertex = graph[vertex].find(
                item => !investigated[item] && !stack.includes(item)
            );

            if(nextVertex) {
                investigated[nextVertex] = nextVertex;
                stack.unshift(nextVertex);
            }

            stack.splice(stack.indexOf(vertex), 1);
        }

        return Object.keys(investigated);
    }
}