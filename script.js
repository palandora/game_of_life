class Tree {
    constructor() {
        this.state = "default"
        this.growthSpeed = 40
        this.age
        this.tree
        this.isBlooming = true
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
    bloom(blooming){
        const appleAmount = 20
        const crown = this.tree.querySelector(".crown")
        const height = crown.clientHeight
        const width = crown.clientWidth
        const apples = []

        if(blooming){
            for(let i=0; i<appleAmount; i++){
                const y = Math.floor(Math.random() * (height-30) +15)
                const x = Math.floor(Math.random() * width)
    
                const apple = document.createElement('div')
                apple.setAttribute('class','apple')
                apples.push(apple)
    
                apple.style.left = x+"px"
                apple.style.top = y+"px"
            }
            apples.forEach(apple => {
                crown.appendChild(apple)
            });
        }else{
            const apples = crown.querySelectorAll('.apple')
            apples.forEach(apple => {
                crown.removeChild(apple)
            })
        }
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
                
                if(obj.isBlooming){
                    obj.bloom(true)
                    obj.isBlooming = false
                }
            }else if(age > obj.growthSpeed*8 && age < obj.growthSpeed*12){
                crown.classList.remove("growing")
                crown.classList.add("dead")
                base.classList.remove("growing")
                base.classList.add("dead")
                obj.state = "dead"
                obj.bloom(false)
                obj.isBlooming = true 
            }else{
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

class Point{
    constructor(x,y){
        this.x = x
        this.y = y
    }
    drawPt(parentNode,x,y){
        const pt = document.createElement('div')
        pt.setAttribute('class', 'reference_pt')
        pt.style.left = x + "px"
        pt.style.top = y + "px"
        parentNode.appendChild(pt)
    }
}


// const myTree = new Tree()
// myTree.createTree()
// myTree.grow()

class Grid{
    constructor(){
        this.width = document.body.clientWidth
        this.height = document.body.clientHeight
        this.tileWidth = 72.25
        this.tileHeight = 48.5
        this.tilesHorizontal = Math.floor(this.width / 72.25)
        this.tilesVertical = Math.floor(this.height / 48.5)
        
    }
    createTiles(){
        const grid = document.querySelector('.grid')
        const tiles = [this.tilesHorizontal*this.tilesVertical]
        const isoPoints = []

        for(let y = 0; y < this.tilesHorizontal; y++){
            for(let x = 0; x < this.tilesVertical; x++){
                const pt = new Point()
                pt.x = x * this.tileWidth
                pt.y = y * this.tileWidth
                let isoPoint = this.cartesianToIsometric(pt)
                isoPoints.push(isoPoint)
            }
        }
        isoPoints.forEach(isoPoint => {
            console.log(isoPoint)
            isoPoint.drawPt(grid,isoPoint.x,isoPoint.y)
        })
        
        
    }
    cartesianToIsometric(cartPt){
        const tempPt = new Point()
        tempPt.x = cartPt.x - cartPt.y
        tempPt.y = (cartPt.x + cartPt.y) / 2
        return (tempPt)
    }
    appendTrees(){

        //instantiate tree objects here and append to reference points

    }
}

const grid = new Grid()
grid.createTiles()










