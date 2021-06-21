class Tree {
    constructor() {
        this.state = "birth"
        this.age = 0
        this.tree
    }
    createTree(){
        var tree = document.createElement('div')
        tree.setAttribute('class', 'tree')
        tree.innerHTML = `
        <div class="tree">
            <div class="crown growing">
                <div class="head"></div>
                <div class="sidepanel top"></div>
                <div class="repeat"></div>
                <div class="sidepanel bottom"></div>
            </div>
            <div class="stem"></div>
            <div class="base growing"></div>
        </div>`
        document.body.appendChild(tree);
        this.tree = tree
    }
    setStem(){
        const stem_height = Math.floor(Math.random() * 80)
        this.tree.querySelector('.stem').style.height = stem_height + "px"
    }
  }

const myTree = new Tree()
myTree.createTree()
myTree.setStem()
