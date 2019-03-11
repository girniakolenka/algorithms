class Sort {
    constructor() {
        const arr = [5, 2, 4, 3, 1];

        this.inversionCount = 0;


        console.log(this.mergeSort(arr));
        console.log(this.inversionCount);
    }

    mergeSort(arr) {
        const n = arr.length;
        const n2 = Math.ceil(n/2);

        if (n === 1) {
            return  arr;
        }

        const leftArr = arr.slice(0, n2);
        const rightArr = arr.slice(n2);

        return this.mergeSortedArrays(this.mergeSort(leftArr), this.mergeSort(rightArr));
    }

    mergeSortedArrays(leftArr, rightArr) {
        const result = [];
        const n = leftArr.length;
        const m = rightArr.length;
        let i = 0;
        let j = 0;

       // this.countInversion(leftArr);
      //  this.countInversion(rightArr);

        for (let k = 0; k< n+m; k++) {
            const leftValue = leftArr[i];
            const rightValue = rightArr[j];

            if (typeof rightValue === "undefined" || leftValue <= rightValue) {
                result[k] = leftValue;
                i++;
            }

            if (typeof leftValue === "undefined" || leftValue > rightValue) {
                result[k] = rightValue;
                j++;
                this.inversionCount = this.inversionCount + n - i;
            }
        }

        return result;
    }


    countInversion (arr) {
        this.inversionCount++;
    }
}
