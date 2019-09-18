class BinaryTree {
    constructor(arr) {
        const data = arr[0].split(" ");

        console.log(this.createBinaryTree(data));
    }

    createTreeFromPreOrder(arr, tree, index, previousNode) {
        const value = Number(arr[index]);
        const node = new Node(value, previousNode);

        if(index === arr.length) {
            return tree;
        }

        if(Object.keys(tree).length === 0) {
            tree = node;
            return this.createTreeFromPreOrder(arr, tree, ++index, node);
        }

        if(previousNode.left === null) {
            previousNode.left = node;
            return this.createTreeFromPreOrder(arr, tree, ++index, node.data === 0 ? node.parent : node);
        }

        if(previousNode.left !== null && previousNode.right === null) {
            previousNode.right = node;

            return this.createTreeFromPreOrder(arr, tree, ++index, node.data === 0 ? node.parent : node);
        }

        if(previousNode.left !== null && previousNode.right !== null) {
            return this.createTreeFromPreOrder(arr, tree, index, previousNode.parent);
        }
    }

    createInOrderArr(node, inOrderArr) {
        if(node !== null) {
            this.createInOrderArr(node.left, inOrderArr);
            if(node.data !== 0) {
                inOrderArr.push(node.data);
            }
            this.createInOrderArr(node.right, inOrderArr);
        }
    }

    createBinaryTree(data) {
       const binaryTree = this.createTreeFromPreOrder(data, {}, 0, null);
       let inOrderArr = [];
       let index = {
           current: 0
       };

       this.createInOrderArr(binaryTree, inOrderArr);
       this.setInOrder(new Sort(inOrderArr), binaryTree, index);

       return binaryTree;

    }

    setInOrder(arr, node, index) {
        if(index.current !== arr.length && node !== null && node.data !== 0) {
            this.setInOrder(arr, node.left, index);

            node.data = arr[index.current];
            index.current++;

            this.setInOrder(arr, node.right, index);
        }
    }
 }