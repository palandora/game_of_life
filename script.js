class Tree {
    constructor() {
        this.state = "birth"
        this.age = 0
        this.stem_height
        this.tree
    }
    createTree(){
        const tree = document.createElement('div')
        tree.setAttribute('class', 'tree')
        tree.innerHTML = `
            <div class="crown growing">
                <div class="head"></div>
                <div class="sidepanel top"></div>
                <div class="repeat"></div>
                <div class="sidepanel bottom"></div>
            </div>
            <div class="stem"></div>
            <div class="base growing"></div>`
        //tbd where to add div element later on  
        document.body.appendChild(tree)
        const stem_height = Math.floor(Math.random() * 120)
        tree.querySelector('.stem').style.height = stem_height + "px"
        this.tree = tree
    }
    grow(){
        let age = 0
        const crown = this.tree.querySelector('.crown')
        const repeat = this.tree.querySelector('.repeat')
        console.log(repeat)
        const base = this.tree.querySelector('.base')
        setInterval(function(){
            age+=8
            console.log(age)
            if(age < 32){
                repeat.style.height = 60 + age + "px";
            }else if(age > 32 && age < 64){
                crown.classList.remove("growing")
                crown.classList.add("dead")
                base.classList.remove("growing")
                base.classList.add("dead")
            }else if(age > 64){
                crown.classList.add("growing")
                crown.classList.remove("dead")
                base.classList.add("growing")
                base.classList.remove("dead")
                repeat.style.height = 60 + "px"
                age = 0
            }
        }, 3000)
    }
  }

const myTree = new Tree()
myTree.createTree()
myTree.grow()

