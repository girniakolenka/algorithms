class Sort {
    constructor () {
        const arr = [
            "ama",
            "abj",
            "att",
            "agu",
            "anp",
            "awx",
            "acf",
            "akm",
            "axd",
            "aax"
        ];

        this._amountOfCharacters = 26;
        this._alphabet = this.getAlphabet();
        this._maxAmount = this.createEmptyCountArr(this._amountOfCharacters);

        const result = this.radixSort(arr, 3);
        const maxElem = this._alphabet[this.findMaxIndex(this._maxAmount)];

        console.log(result);
        console.log(`${result[0]}${maxElem}${result[result.length-1]}`);
    }

    radixSort(baseArr, radix) {
        let arr = baseArr;

        for(let i = radix-1; i>=0; i--) {
            const result = [];

            for(let j=0; j<arr.length; j++) {
                const elem = arr[j][i];

                this.createMaxAmount(elem);
                result.push(elem);

            }

            arr = this.countingSort(arr, result, i);
        }

        return arr;
    }

    countingSort(arr, compareArr, radix) {
        const amountArr = this.createEmptyCountArr(this._amountOfCharacters);
        const result = [];

        compareArr.forEach((item) => {
            const elem = this.findCharInAlphabet(item);

            amountArr[elem]++;
        });

        const summarizedAmountArr = this.getSummarizedAmount(amountArr);

        for(let i=arr.length-1; i>=0; i--){
            const item = arr[i];
            const character = item[radix];
            const index = this.findCharInAlphabet(character);

            result[summarizedAmountArr[index] - 1] = item;
            summarizedAmountArr[index]--;
        }

        return result;
    }

    findCharInAlphabet(character) {
        return this._alphabet.findIndex(el => character === el);
    }

    getSummarizedAmount(arr) {
        return arr.map(
            (value, index) =>
                arr.slice(0, index + 1).reduce((sum, value) => sum + value)
        );
    }

    getAlphabet() {
        return [...Array(this._amountOfCharacters).keys()].map(i => String.fromCharCode(i + 97));
    }

    createMaxAmount(elem){
        this._maxAmount[this.findCharInAlphabet(elem)]++;
    }

    createEmptyCountArr(len){
        return Array(len).fill(0);
    }

    findMaxIndex(arr) {
        let maxIndex = 0;
        let max = arr[maxIndex];

        arr.forEach((item, index) => {
            if (max < item) {
                maxIndex = index;
                max = item;
            }
        });

        return maxIndex;
    }
}
