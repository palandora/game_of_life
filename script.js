class Tree {
    constructor(stem_height) {
        this.state = "birth";
        this.age = 0;
        this.stem_height = stem_height;
    }
  }

const myTree = new Tree(40);
console.log(myTree.stem_height);