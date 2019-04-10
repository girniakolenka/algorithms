class Sort {
    constructor () {
        const arr = [
            "hzt",
            "sng",
            "ena",
            "sdt",
            "qds",
            "yif",
            "slt",
            "lpz",
            "cqc",
            "hpo"
        ];
        this._amountOfCharacters = 26;
        this._alphabet = this.getAlphabet();


        console.log(this.radixSort(arr, 3));
    }

    radixSort(baseArr, radix) {
        let arr = baseArr;

        for(let i = radix-1; i>=0; i--) {
            const result = [];

            for(let j=0; j<arr.length; j++) {
                result.push(arr[j][i]);
            }

            arr = this.countingSort(baseArr, result, i);
        }

        return arr;
    }

    countingSort(arr, compareArr, radix) {
        const amountArr = Array(this._amountOfCharacters).fill(0);
        const result = [];

        compareArr.forEach((item) => {
            const elem = this.findCharInAlphabet(item);

            amountArr[elem]++;
        });

        const summarizedAmountArr = this.getSummarizedAmount(amountArr);

        arr.forEach((item) => {
            const character = item[radix];
            const index = this.findCharInAlphabet(character);

            result[summarizedAmountArr[index] - 1] = item;
            summarizedAmountArr[index]--;
        });

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
}