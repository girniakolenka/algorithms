class Main {
    constructor(file, pathSum) {
        const tree =  new SearchBinaryTree(file);
        const leaves = new PrintLeaves(tree);
        const paths = new MonotonePaths(tree, pathSum);

        console.log(tree);
        console.log(leaves);
    }
 }
