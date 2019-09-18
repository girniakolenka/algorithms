class BinaryTree {
    constructor(arr) {
        const data = arr[0].split(" ");
        this._tree = {};
        this._printInOrder = [];
        this._count = 0;

        this.createTreeFromPreOrder(data, 0, null);
        this.createBinaryTree(this._tree);
    }

    createTreeFromPreOrder(arr, index, previousNode) {
        const value = Number(arr[index]);
        const node = new Node(value, previousNode);

        if(index === arr.length) {
            return;
        }

        if(Object.keys(this._tree).length === 0) {
            this._tree = node;
            return this.createTreeFromPreOrder(arr, ++index, node);
        }

        if(previousNode.left === null) {
            previousNode.left = node;
            return this.createTreeFromPreOrder(arr, ++index, node.data === 0 ? node.parent : node);
        }

        if(previousNode.left !== null && previousNode.right === null) {
            previousNode.right = node;

            return this.createTreeFromPreOrder(arr, ++index, node.data === 0 ? node.parent : node);
        }

        if(previousNode.left !== null && previousNode.right !== null) {
            return this.createTreeFromPreOrder(arr, index, previousNode.parent);
        }
    }

    printInOrder(node) {
        if(node !== null) {
            this.printInOrder(node.left);
            if(node.data !== 0) {
                this._printInOrder.push(node.data);
            }
            this.printInOrder(node.right);
        }
    }

    createBinaryTree(data) {
       this.printInOrder(data);

       const sortedInOrder = new Sort(this._printInOrder);

       this.setInOrder(sortedInOrder, this._tree);

       console.log(this._tree);

    }

    setInOrder(arr, node) {
        if( this._count !== arr.length && node !== null && node.data !== 0) {
            this.setInOrder(arr, node.left);

            node.data = arr[this._count];
            this._count++;

            this.setInOrder(arr, node.right);
        }
    }
 }