class Tree {
    constructor() {
        this.state = "default"
        this.growthSpeed = 40
        this.age
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
        this.setStem(tree, 120)
        this.tree = tree
    }
    setStem(tree, factor){
        const stem_height = Math.floor(Math.random() * factor)
        tree.querySelector('.stem').style.height = stem_height + "px"
    }
    bloom(){
        const crown = this.tree.querySelector(".crown")
        //Create apples
        const apple = document.createElement('div')
        apple.setAttribute('class','apple')
        crown.appendChild(apple)

        //place apples
        const height = crown.clientHeight
        const widht = crown.clientWidth
    }
    grow(){
        let age = 0
        const crown = this.tree.querySelector('.crown')
        const repeat = this.tree.querySelector('.repeat')
        const base = this.tree.querySelector('.base')
        let obj = this
        setInterval(function(){
            age+=obj.growthSpeed
            if(age <= obj.growthSpeed*4){
                repeat.style.height = 20 + age + "px"
                obj.state = "growing"
            }else if(age > obj.growthSpeed*4 && age <= obj.growthSpeed*8){
                crown.classList.remove("growing")
                crown.classList.add("dead")
                base.classList.remove("growing")
                base.classList.add("dead")
                obj.state = "dead"
            }else if(age > obj.growthSpeed*8){
                this.state = "rebirth"
                crown.classList.add("growing")
                crown.classList.remove("dead")
                base.classList.add("growing")
                base.classList.remove("dead")
                repeat.style.height = 20 + "px"
                age = 0
            }
            obj.age = age
        }, 3000)
    }
  }

const myTree = new Tree()
myTree.createTree()
//myTree.grow()
myTree.bloom()

//setInterval(function(){console.log(myTree.age, myTree.state)},3000)


