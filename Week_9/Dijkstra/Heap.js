class Heap {
    constructor(size, start, weights) {
        this._weights = weights;
        this.heap = this.createHeap(size, start);
    }

    createHeap (size, start) {
        const keys = Array(size + 1).keys();
        const arr = [...keys];

        arr.shift(); // remove 0

        arr.splice(start - 1, 1);

        return [start, ...arr];
    }

    getSize() {
        return this.heap.length;
    }

    extractMin() {
        const size = this.getSize();
        const [min] = this.heap;

       // delete this._weights[min];

        if(size === 1) {
            this.heap.shift();
        } else {
            this.heap[0] = this.heap[size - 1];
            this.heap.pop();

            this.heapify(0);
        }

        return min;
    }


    updateElement(element) {
        const weight = this._weights[element];
        let index = this.heap.indexOf(element);

        if(index === -1) {
            this.heap.push(element);

            index = this.getSize() - 1;
        }

        while(index > 0) {
            const parent = this.getParent(index);
            const parentValue = this.heap[parent];
            const parentWeight = this._weights[parentValue];

            if(weight < parentWeight) {
                this.heap[parent] = element;
                this.heap[index] = parentValue;

                index = parent;
            } else {
                break;
            }
        }
    }

    getParent(index) {
        return Math.floor(index/2);
    }

    getLeft(index) {
        return 2 * index;
    }

    getRight(index) {
        return 2 * index + 1;
    }

    heapify(index) {
        const element = this.heap[index];
        const weight = this._weights[index];


        const leftIndex = this.getLeft(index);
        const rightIndex = this.getRight(index);

        const leftEl = this.heap[leftIndex];
        const leftWeight = this._weights[leftIndex];

        const rightEl = this.heap[rightIndex];
        const rightWeight = this._weights[rightIndex];

        const size = this.getSize();
        let minIndex = index;

        if(leftWeight < weight && leftIndex < size) {
            minIndex = leftIndex;
        }

        if(rightWeight < weight && rightIndex < size) {
            minIndex = rightIndex;
        }

        if(minIndex !== index) {
            this.heap[index] = this.heap[minIndex];
            this.heap[minIndex] = element;

            this.heapify(minIndex);
        }
    }
}

module.exports = Heap;