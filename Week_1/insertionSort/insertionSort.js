function insertionSort (a) {
   const n = a.length;

   for (let j=1; j<n;j++) {
        let key = a[j];
        let i = j-1;

        while (i>=0 && a[i] > key) {
             a[i+1] = a[i];
             i--;
        }

        a[i+1] = key;
   }

   return a;
}