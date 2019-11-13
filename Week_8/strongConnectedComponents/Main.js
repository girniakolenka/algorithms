class Main {
    constructor () {
        new ReadFile("data_examples/test_08_4.txt").then(file => new StrongConnected(file));
    }
}