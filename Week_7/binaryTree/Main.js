class Main {
    constructor(file) {
        const tree =  new SearchBinaryTree(file);
        const leaves = new PrintLeaves(tree);
        const paths = new MonotonePaths(tree, 9);

        console.log(tree);
        console.log(leaves);
    }
 }