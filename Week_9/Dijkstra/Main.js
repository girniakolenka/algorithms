class Main {
    constructor() {
        new ReadFile("data_examples/input_5_10.txt").then(file => new Dijkstra(file));
    }
}