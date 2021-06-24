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
            });
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
        //alternativlösung-> alle 110 div generieren und container div 
        //zuweisen -> container div :> disp: flex, wrap

        for(let y=0; y< this.tilesVertical;y++){
            for(let x=0; x< this.tilesHorizontal;x++){
                const tile = document.createElement('div')
                tile.setAttribute('class', 'grid_item')
                tile.style.width = this.tileWidth + "px"
                tile.style.height = this.tileHeight + "px"
                tile.style.left = this.tileWidth*x + "px"
                tile.style.top = this.tileHeight*y  + "px"
                tiles.push(tile)
            }
        }
        tiles.shift()
        tiles.forEach(tile => {
            grid.appendChild(tile)
        })
    }
    appendTrees(){

    }
}



const myGrid = new Grid()
myGrid.createTiles()




