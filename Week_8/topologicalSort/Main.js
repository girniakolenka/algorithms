class Main {
    constructor () {
        const graph = {
            "a": ["b", "c", "d"],
            "b": ["e"],
            "c": ["e"],
            "d": ["f"],
            "e": [],
            "f": []
        }

        console.log(new TopologicalSort(graph));
    }
}