class PrintLeaves {
    constructor(tree) {
        let leaves = [];

        this.printLeaves(tree,leaves);

        return leaves;
    }

    printLeaves (node, arr) {
        if(node && node.data !== 0) {
            this.printLeaves(node.left, arr);
            if(node.left.data === 0 && node.right.data === 0) {
                arr.push(node.data);
            }
            this.printLeaves(node.right, arr);
        }
    }
 }