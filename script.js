class Tree {
    constructor() {
        this.state = "default"
        this.growthSpeed = Math.floor(Math.random() * 32)
        this.age
        this.tree
        this.isBlooming = true
        this.growthPeriod = Math.floor(Math.random() * (8 - 4 + 1) + 4) * this.growthSpeed
        this.bloomingPeriod = Math.floor(Math.random() * (20 - 10 + 1) + 10) * this.growthSpeed
        this.deadPeriod = Math.floor(Math.random() * (30 - 22 + 1) + 22) * this.growthSpeed
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
            <div class="base"></div>
        </div>`
        tree.style.left = xCoordinate + "px"
        tree.style.top = yCoordinate + "px"
        grid.appendChild(tree)
        this.tree = tree
        this.setStem(120)
    }
    setStem(factor){
        const stem_height = Math.floor(Math.random() * factor)
        this.tree.querySelector('.stem').style.height = stem_height + "px"
    }
    setBase(mode,status){
        let base = this.tree.querySelector('.base')
        if(mode == 'regular'){
            switch(status){
            case "default":
                base.classList.add('default')
            break
            case "dead":
                base.classList.add('dead')
            break
            case "bloom":
                base.classList.add('bloom')
            break
            }
        }else if(mode == 'inverted'){
            base.classList.add('inverted')
            switch(status){
                case "default":
                    base.classList.add('default')
                break
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
            if(age <= obj.growthPeriod){
                repeat.style.height = 20 + age + "px"
                obj.state = "growing"
            }else if(age > obj.growthPeriod && age <= obj.bloomingPeriod){
                
                if(obj.isBlooming){
                    obj.bloom(true)
                    obj.isBlooming = false
                }
            }else if(age > obj.bloomingPeriod && age < obj.deadPeriod){
                crown.classList.remove("growing")
                crown.classList.add("dead")
                base.classList.remove("default")
                base.classList.add("dead")
                obj.state = "dead"
                obj.bloom(false)
                obj.isBlooming = true 
            }else{
                this.state = "rebirth"
                crown.classList.add("growing")
                crown.classList.remove("dead")
                base.classList.add("default")
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
        let inverted = false
        let counter = 0
        isoPoints.forEach(isoPoint => {
            let tree = new Tree()
            tree.createTree(isoPoint.x-tileOffset.x, isoPoint.y-tileOffset.y)
            if(inverted){
                tree.setBase('inverted','default')
                counter++
                inverted=!inverted
            }else{
                tree.setBase('regular','default')
                counter++
                inverted=!inverted
            }
            if(counter==8){
                inverted=!inverted
                counter = 0
            }
            tree.grow()
        }) 
    }
    cartesianToIsometric(cartPt){
        const tempPt = new Point()
        tempPt.x = cartPt.x - cartPt.y
        tempPt.y = (cartPt.x + cartPt.y) / 1.75
        return tempPt
    }
}

const grid = new Grid()
grid.drawScene()













