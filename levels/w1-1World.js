class W1_1World {
    constructor () {
        this.tiles = []
        this.chars = []
        // this.bgColor = '#5c94fc' 
        this.bgColor = '#191919' 
        this.transport = true
        this.hasTransported = false
    }

    init () {
        this.tiles = [
            new Tile({x: 0, y: 476, width: 3675, height: 100, type: [tileType.GROUND]}),
            new Tile({x: 3800, y: 476, width: 874, height: 100, type: [tileType.GROUND]}),
            new Tile({x: 4864, y: 476, width: 3620, height: 100, type: [tileType.GROUND]}),
            new Tile({x: 8684, y: 476, width: 4365, height: 100, type: [tileType.GROUND], index: 3}),
        
            new Tile({x: 1650, y: 380, width: 90, height: 96, type: [tileType.PIPEHEAD, tileType.PIPEBODY]}),
            new Tile({x: 2150, y: 332, width: 90, height: 144, type: [tileType.PIPEHEAD, tileType.PIPEBODY]}),
            new Tile({x: 2650, y: 284, width: 90, height: 192, type: [tileType.PIPEHEAD, tileType.PIPEBODY]}),
            new Tile({x: 3150, y: 284, width: 90, height: 192, type: [tileType.PIPEHEAD, tileType.PIPEBODY]}),
        
            new Tile({x: 9100, y: 380, width: 90, height: 96, type: [tileType.PIPEHEAD, tileType.PIPEBODY]}),
            new Tile({x: 9973, y: 380, width: 90, height: 96, type: [tileType.PIPEHEAD, tileType.PIPEBODY]}),
        
            new Tile({x: 1028, y: 300, width: 15, height: 15, type: [tileType.COIN2], isPlatform: false, index: 10}),
            new Tile({x: 1024, y: 300, width: 45, height: 40, type: [tileType.MYSTERY], index: 11}),
            // new Tile({x: 924, y: 430, width: 45, height: 40, type: [tileType.BRICK]}),
        
            new Tile({x: 1254, y: 300, width: 45, height: 40, type: [tileType.BRICK]}),
            new Tile({x: 1299, y: 300, width: 45, height: 40, type: [tileType.MYSTERY], index: 14}),
            new Tile({x: 1344, y: 300, width: 45, height: 40, type: [tileType.BRICK]}),
            new Tile({x: 1393, y: 300, width: 15, height: 15, type: [tileType.COIN2], isPlatform: false, index: 16}),
            new Tile({x: 1389, y: 300, width: 45, height: 40, type: [tileType.MYSTERY], index: 17}),
            new Tile({x: 1434, y: 300, width: 45, height: 40, type: [tileType.BRICK]}),
        
            new Tile({x: 1348, y: 100, width: 15, height: 15, type: [tileType.COIN2], isPlatform: false, index: 19}),
            new Tile({x: 1344, y: 100, width: 45, height: 40, type: [tileType.MYSTERY], index: 20}),
        
            new Tile({x: 4160, y: 300, width: 45, height: 40, type: [tileType.BRICK], isBreakable: true, particles: tileType.BRICKPARTICLE}),
            new Tile({x: 4205, y: 300, width: 45, height: 40, type: [tileType.MYSTERY], index: 22}),
            new Tile({x: 4250, y: 300, width: 45, height: 40, type: [tileType.BRICK], isBreakable: true, particles: tileType.BRICKPARTICLE}),
        
            new Tile({x: 4295, y: 100, width: 540, height: 40, type: [tileType.BRICK]}),
            new Tile({x: 5040, y: 100, width: 135, height: 40, type: [tileType.BRICK]}),
            new Tile({x: 5175, y: 100, width: 45, height: 40, type: [tileType.MYSTERY]}),
        
            new Tile({x: 5175, y: 300, width: 45, height: 40, type: [tileType.BRICK]}),
            new Tile({x: 5575, y: 300, width: 90, height: 40, type: [tileType.BRICK]}),
        
            new Tile({x: 5975, y: 300, width: 45, height: 40, type: [tileType.MYSTERY]}),
            new Tile({x: 6155, y: 300, width: 45, height: 40, type: [tileType.MYSTERY]}),
            new Tile({x: 6335, y: 300, width: 45, height: 40, type: [tileType.MYSTERY]}),
        
            new Tile({x: 6155, y: 120, width: 45, height: 40, type: [tileType.MYSTERY], index: 32}),
        
        
            new Tile({x: 6635, y: 300, width: 45, height: 40, type: [tileType.BRICK]}),
            new Tile({x: 6835, y: 120, width: 135, height: 40, type: [tileType.BRICK]}),
        
            new Tile({x: 7210, y: 120, width: 45, height: 40, type: [tileType.BRICK]}),
            new Tile({x: 7255, y: 120, width: 45, height: 40, type: [tileType.MYSTERY]}),
            new Tile({x: 7300, y: 120, width: 45, height: 40, type: [tileType.MYSTERY]}),
            new Tile({x: 7345, y: 120, width: 45, height: 40, type: [tileType.BRICK]}),
        
            new Tile({x: 7255, y: 300, width: 45, height: 40, type: [tileType.BRICK]}),
            new Tile({x: 7300, y: 300, width: 45, height: 40, type: [tileType.BRICK]}),
        
            ...this.rS(7600, 431, 45, 4, false), // automate rendering stairs
        
            ...this.rS(7900, 296, 180, 4, true),
        
            ...this.rS(8284, 431, 45, 4, false),
        
            new Tile({x: 8464, y: 296, width: 45, height: 180, type: [tileType.BOX]}),
            
            ...this.rS(8683, 296, 180, 5, true),
            
            new Tile({x: 9338, y: 280, width: 90, height: 40, type: [tileType.BRICK]}),
            new Tile({x: 9428, y: 280, width: 45, height: 40, type: [tileType.MYSTERY]}),
            new Tile({x: 9473, y: 280, width: 45, height: 40, type: [tileType.BRICK]}),
        
            ...this.rS(10063, 431, 45, 8, false),
        
            new Tile({x: 10830, y: 431, width: 45, height: 40, type: [tileType.BOX]}),
            
            new Tile({x: 10830, y: 26, width: 45, height: 390, type: [tileType.FLAGPOLEHEAD, tileType.FLAGPOLEBODY], isPlatform: false}),
            new Tile({x: 10805, y: 53, width: 45, height: 40, type: [tileType.FLAG], isPlatform: false}),
            new Tile({x: 11085, y: 252, width: 225, height: 225, type: [tileType.CASTLE], isPlatform: false}),

            new Tile({x: 11785, y: 332, width: 90, height: 144, type: [tileType.PIPEHEAD, tileType.PIPEBODY]}),
            new Tile({x: 11714, y: 388, width: 90, height: 85, type: [tileType.PIPERIGHT], isPlatform: false}),
        ]

        this.chars = [          
            new Character({x: 1152, y: 0, width: 41, height: 40, type: charType.GOOMBA}),

            new Character({x: 2600, y: 0, width: 41, height: 40, type: charType.GOOMBA}),

            new Character({x: 2900, y: 0, width: 41, height: 40, type: charType.GOOMBA}),
            new Character({x: 2950, y: 0, width: 41, height: 40, type: charType.GOOMBA}),

            new Character({x: 4610, y: 0, width: 41, height: 40, type: charType.GOOMBA}),
            new Character({x: 4700, y: 0, width: 41, height: 40, type: charType.GOOMBA}),

            new Character({x: 5050, y: 300, width: 41, height: 40, type: charType.GOOMBA}),
            new Character({x: 5100, y: 300, width: 41, height: 40, type: charType.GOOMBA}),

            new Character({x: 6435, y: 300, width: 41, height: 40, type: charType.GOOMBA}),
            new Character({x: 6535, y: 300, width: 41, height: 40, type: charType.GOOMBA}),

            new Character({x: 7300, y: 300, width: 41, height: 40, type: charType.GOOMBA}),
            new Character({x: 7400, y: 300, width: 41, height: 40, type: charType.GOOMBA}),

            new Character({x: 9700, y: 300, width: 41, height: 40, type: charType.GOOMBA}),  
            new Character({x: 9800, y: 300, width: 41, height: 40, type: charType.GOOMBA}),  

            new Character({x: 6335, y: 300, width: 45, height: 70, type: charType.KOOPALEFT}), 
        ]
    }

    rS(sX, sY, h, l, rev) {
        const r = []
        if(rev === false) {
            for(let i = 0; i < l; i++) {   
                r.push(new Tile({x: sX + (i * 45), y: sY - (i * 45), width: 45, height: h + (i * 45), type: [tileType.BOX]}))
            }
        } else {
            for(let i = 0; i < l; i++) {   
                r.push(new Tile({x: sX + (i * 45), y: sY + (i * 45), width: 45, height: h - (i * 45), type: [tileType.BOX]}))
            }
        }
        return r;
    }
}

w1_1World = new W1_1World()
w1_1World.init()