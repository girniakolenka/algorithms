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

        console.log(BreadthFirstSearch.breadthFirstSearch(graph, "s"));
    }


}