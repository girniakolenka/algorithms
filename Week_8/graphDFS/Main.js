class Main {
    constructor () {
        const graph = {
            "s" : ["a", "b"],
            "a" : ["s", "c", "d"],
            "b" : ["s", "d"],
            "c" : ["a", "e"],
            "d" : ["b", "a", "e"],
            "e" : ["c", "d"]
        }

        console.log(DepthFirstSearch.search(graph, "s"));
    }
}