onmessage = function(e) {
    let _arr = e.data;
    let _hashTable = {};

    const _countResult = function(fromNum, toNum) {
        let results = {};
        const uniqueKeys = Object.keys(_hashTable);

        for(let i=fromNum; i<=toNum; i++){
            uniqueKeys.forEach((el, index) => {
               const addition = i - Number(el);

                console.log("something is going")
               if (_searchHash(_hashTable, addition)) {
                   results[i] = i;
               }
            });
        }

        return Object.keys(results).length;
    }

    const _createHashTable = function(arr) {
        arr.forEach((el, index) => {
           _hashTable[el] = Number(el);
        });
    }

    const _searchHash = function(hash, elem) {
        return hash[elem];
    }

    _createHashTable(_arr);
    postMessage(_countResult(-1000, 1000));
}
