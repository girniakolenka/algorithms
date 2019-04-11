class Sort {
    constructor () {
        const arr = [3, 1, 2, 3, 1, 2, 5, 2, 0, 3, 3];

        console.log(this.countingSort(arr, 6));
    }

    countingSort(arr, count) {
        const amountArr = Array(count).fill(0);
        const result = [];

        arr.forEach((item) => {
            amountArr[item]++;
        });

        const summarizedAmountArr = amountArr.map(
            (value, index) =>
                amountArr.slice(0, index + 1).reduce((sum, value) => sum + value)
        );

        for(let i=arr.length-1; i>=0; i--) {
            const item = arr[i];

            result[summarizedAmountArr[item] - 1] = item;
            summarizedAmountArr[item]--;
        }

        return result;
    }
}