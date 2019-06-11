class Sort {
    constructor(arr) {
        return this.heapMedian(arr);
    }

    heapMedian(arr) {
        let maxHeap = [arr[0]];
        let minHeap = [];

        for (let i = 1; i < arr.length; i++) {
            const minEl = this.getRootElem(minHeap);
            const elem = Number(arr[i]);

            if( elem > minEl) {
                this.addElemToHeap(maxHeap, elem, false);
            } else {
                this.addElemToHeap(minHeap, elem, true);
            }

            this.balanceHeaps(maxHeap, minHeap);

            console.log(maxHeap, minHeap, this.getMedian(maxHeap, minHeap));
        }

        return this.getMedian(maxHeap, minHeap);
    }

    getRootElem(heap) {
        return heap[0] ? heap[0] : null;
    }

    getHeapLength(heap) {
        return heap.length;
    }

    getMedian(maxHeap, minHeap) {
        const maxLen = maxHeap.length;
        const minLen = minHeap.length;
        const diff = Math.abs(maxLen - minLen);
        let median;

        switch (diff) {
            case 1:
                median = this.getRootElem(maxHeap);
                break;
            case -1:
                median = this.getRootElem(minHeap);
                break;
            default:
                median = [this.getRootElem(maxHeap), this.getRootElem(minHeap)];
        }

        return median;
    }

    addElemToHeap(heap, elem, isMax){
        heap.push(elem);

        for(let i=this.heapSize(heap) - 1; i>=0; i--) {
            this.rootHeapify(heap, i, isMax);
        }

        return heap;
    }

    rootHeapify(heap, index, isMax = true) {
       let lIndex = this.leftChild(index);
       let rIndex = this.rightChild(index);
       let size = this.heapSize(heap);

       let diffLeft = isMax ? (heap[lIndex] >= heap[index]) : (heap[lIndex] <= heap[index]);

       let rootIndex;

       if(lIndex < size && diffLeft) {
           rootIndex = lIndex;
       } else {
           rootIndex = index;
       }

       let diffRight = isMax ? (heap[rIndex] >= heap[rootIndex]) : (heap[rIndex] <= heap[rootIndex]);

       if(rIndex < size && diffRight) {
           rootIndex = rIndex;
       }

       if(index!= rootIndex) {
           let temp = heap[index];

           heap[index] = heap[rootIndex];
           heap[rootIndex] = temp;

           this.rootHeapify(heap, rootIndex, isMax);
       }

       return heap;
    }

    leftChild(index) {
        return 2*index + 2;
    }

    rightChild(index) {
        return 2*index + 1;
    }

    heapSize(heap) {
       return heap.length;
    }

    balanceHeaps(maxHeap, minHeap) {
        const maxLen = maxHeap.length;
        const minLen = minHeap.length;

        switch (maxLen - minLen) {
            case 2:
                this.addElemToHeap(minHeap, this.extractRootElem(maxHeap), true);
                break;
            case -2:
                this.addElemToHeap(maxHeap, this.extractRootElem(minHeap), false);
                break;
            default:
        }
    }

    extractRootElem(heap) {
        return heap.shift();
    }
}