class Sort {
    constructor () {
        const arr = [9, 1, 4, 8, 4, 5, 10, 4];
        const len = arr.length;

        this.quickSort(arr, 0, len - 1);

        console.log(arr);
    }

    quickSort(arr, start, end) {
        if (start < end) {
            const partition = this.getPartition(arr, start, end);

            this.quickSort(arr, start, partition - 1);
            this.quickSort(arr, partition + 1, end);

            return partition;
        }
    }

    getPartition (arr, start, end) {
        const x = arr[end];
        let i = start - 1;

        for (let j = start; j < end; j++) {
            if (arr[j] <= x) {
                i++;

                const y = arr[i];
                arr[i] = arr[j];
                arr[j] = y;
            }
        }

        const partition = i + 1;
        arr[end] = arr[partition];
        arr[partition] = x;

        return partition;
    }
}