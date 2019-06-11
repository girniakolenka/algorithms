class ReadFile {
    constructor(url) {
        return new Promise((resolve, reject) => {
           this.readTextFile(url, resolve, reject);
        });
    }

     readTextFile(url, resolve, reject) {
        const rawFile = new XMLHttpRequest();

        rawFile.open("GET", url);
        rawFile.onload = function () {
            const allText = rawFile.responseText;
            const lines = allText.split("\n");

            lines.shift();

            resolve(lines);
        }
        rawFile.send(null);
    }
}