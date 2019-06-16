class Sort {
    constructor(arr, fileName) {
        this.result = [];
        let median = this.heapMedian(arr);

        new ReadFile(`data_examples/ext_output_${fileName}`)
           .then(file => {
              // Just to test data
              this.result.push("");
              console.log(JSON.stringify(file) === JSON.stringify(this.result))
           })
           .catch(() => {
              console.log("Something goes wrong");
           });

        return median;
    }

    heapMedian(arr) {
        let maxHeap = [];
        let minHeap = [];

        for (let i = 0; i < arr.length; i++) {
            const minEl = this.getRootElem(minHeap);
            const elem = Number(arr[i]);

            if( elem > minEl) {
                this.addElemToHeap(maxHeap, elem, false);
            } else {
                this.addElemToHeap(minHeap, elem, true);
            }

            this.balanceHeaps(maxHeap, minHeap);

            this.displayResults(minHeap, maxHeap);
        }

        return this.getMedian(maxHeap, minHeap);
    }

    // Just to test data
    displayResults(minHeap, maxHeap) {
        this.result.push(`Medians: ${this.getMedian(maxHeap, minHeap)}`);
        this.result.push(`H_low: [${minHeap.join(', ')}]`);
        this.result.push(`H_high: [${maxHeap.join(', ')}]`);
        this.result.push("");
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
        const diff = maxLen - minLen;
        let median;

        switch (diff) {
            case 1:
                median = this.getRootElem(maxHeap);
                break;
            case -1:
                median = this.getRootElem(minHeap);
                break;
            default:
                median = `${this.getRootElem(minHeap)} ${this.getRootElem(maxHeap)}`;
        }

        return median;
    }

    addElemToHeap(heap, elem, isMax){
        heap.push(elem);

        for(let i=this.heapSize(heap); i>=0; i--) {
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
                this.addElemToHeap(minHeap, this.extractRootElem(maxHeap, false), true);
                break;
            case -2:
                this.addElemToHeap(maxHeap, this.extractRootElem(minHeap, true), false);
                break;
            default:
        }
    }

    extractRootElem(heap, isMax) {
        const root = this.getRootElem(heap);

        heap[0] = heap[heap.length - 1];
        heap.pop();

        this.rootHeapify(heap, 0, isMax);

        return root;
    }
}