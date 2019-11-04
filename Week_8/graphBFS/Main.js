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
 */



class Main {
    constructor () {
        const graph = {
            "s": ["a", "b"],
            "a": ["s", "c", "d"],
            "b": ["s", "d"],
            "c": ["a", "e"],
            "d": ["b", "a", "e"],
            "e": ["c", "d"]
        }

        console.log(this.breadthFirstSearch(graph, "s"));
    }

    breadthFirstSearch(graph, start) {
        let investigatedArr = [start];
        let queue = [start];

        while(queue.length !== 0) {
            const [vertex] = queue;

            graph[vertex].forEach(item => {
                if(investigatedArr.indexOf(item) === -1) {
                   investigatedArr.push(item);
                   queue.push(item);
                }
            });


            queue.shift();
        }

        return investigatedArr.join(",");
    }
}