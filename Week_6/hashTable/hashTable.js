class Sort {
    constructor(arr) {
        this.callWorker(arr);
    }

    callWorker (arr) {
        if (window.Worker) {
            const myWorker = new Worker("worker.js");

            myWorker.postMessage(arr);

            myWorker.onmessage = function(e) {
                console.log(e.data);
            }
        } else {
            console.log('Your browser doesn\'t support web workers.')
        }

    }
}