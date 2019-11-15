const fs = require('fs');
const StrongConnected = require("./StrongConnected.js");

class Main {
    constructor () {
        fs.readFile('data_examples/input_08.txt', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            new StrongConnected(data.toString().split("\n"));
        });
       // new ReadFile("data_examples/test_08_4.txt").then(file => new StrongConnected(file));
       // new ReadFile("data_examples/input_08.txt").then(file => new StrongConnected(file));
    }
}

module.exports = Main;