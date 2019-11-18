const fs = require('fs');
const StrongConnected = require("./StrongConnected.js");

class Main {
    constructor () {
        fs.readFile('data_examples/test_08_4.txt', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(new StrongConnected(data.toString().split("\n")));
        });
    }
}

module.exports = Main;