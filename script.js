class Tree {
    constructor() {
        this.state = "default"
        this.growthSpeed = 40
        this.age
        this.tree
        this.isBlooming = true
    }
    createTree(xCoordinate, yCoordinate){
        const tree = document.createElement('div')
        const grid = document.querySelector('.grid')
        tree.setAttribute('class', 'containerTree')
        tree.innerHTML = `
        <div class="tree">
            <div class="crown growing">
                <div class="head"></div>
                <div class="sidepanel top"></div>
                <div class="repeat"></div>
                <div class="sidepanel bottom"></div>
            </div>
            <div class="stem"></div>
            <div class="base default"></div>
        </div>`
        tree.style.left = xCoordinate + "px"
        tree.style.top = yCoordinate + "px"
        grid.appendChild(tree)
        this.setStem(tree, 120)
        this.growthSpeed = Math.floor(Math.random() * 40)
        this.tree = tree
    }
    setStem(tree, factor){
        const stem_height = Math.floor(Math.random() * factor)
        tree.querySelector('.stem').style.height = stem_height + "px"
    }
    setBase(mode,status){
        let base = this.tree.querySelector('.base')
        if(mode == 'regular'){
            base.classList.remove(`${base.classList[1]}`)
            switch(status){
            case "dead":
                base.classList.add('dead')
            break
            case "bloom":
                base.classList.add('bloom')
            break
            }
        }else if(mode == 'inverted'){
            switch(status){
                case "dead":
                    base.classList.add('dead')
                break
                case "bloom":
                    base.classList.add('bloom')
                break
            }
        }
        


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
}


class Grid{
    constructor(){
        this.tileWidth = 41
        this.tilesTotal = 8
    }
    drawScene(){
        const grid = document.querySelector('.grid')
        const tiles = [this.tilesTotal*this.tilesTotal]
        const tileWidth = 75.25
        const tileHeight = 48.5
        const tileOffset = {x: tileWidth/2, y:tileHeight}
        const isoPoints = []
        const offsetX = document.body.clientWidth/2
        const offsetY = document.body.clientHeight/2 - 60

        for(let y = 0; y < this.tilesTotal; y++){
            for(let x = 0; x < this.tilesTotal; x++){
                const pt = new Point()
                pt.x = x * 38
                pt.y = y * 38
                let isoPoint = this.cartesianToIsometric(pt)
                isoPoint.x += offsetX
                isoPoint.y += offsetY
                isoPoints.push(isoPoint)
            }
        }
        isoPoints.forEach(isoPoint => {
            let tree = new Tree()
            tree.createTree(isoPoint.x-tileOffset.x, isoPoint.y-tileOffset.y)
            //tree.grow()
        }) 
    }
    cartesianToIsometric(cartPt){
        const tempPt = new Point()
        tempPt.x = cartPt.x - cartPt.y
        tempPt.y = (cartPt.x + cartPt.y) / 1.75
        return (tempPt)
    }
}

const grid = new Grid()
grid.drawScene()

const tree = new Tree()
tree.createTree()
tree.setBase('regular','dead')












