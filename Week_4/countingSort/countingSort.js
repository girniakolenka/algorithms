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

        arr.forEach((item) => {
            result[summarizedAmountArr[item] - 1] = item;
            summarizedAmountArr[item]--;
        });

        return result;
    }
}