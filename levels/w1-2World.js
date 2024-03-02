class W1_2World {
    constructor () {
        this.tiles = []
        this.chars = []
        this.bgColor = '#000'
        this.transport = true
        this.hasTransported = false
    }   

    
    #topBricks(x, y, width) {
        let r = []
        let sc = 45
        let amm = width/sc

        for(let i = 0; i < amm; i++) {
            r.push(new Tile({x: x + (i * sc), y: y, width: 45, height: 45, type: [tileType.BRICK_BLUE], isBreakable: true, particles: tileType.BRICKPARTICLE_BLUE}))
        }

        return r;
    }

    init () {
        this.tiles = [
            new Tile({x: 0, y: -19, width: 45, height: 460, type: [tileType.BRICK_BLUE]}),

            ...this.#topBricks(200, 60, 6400),

            new Tile({x: 0, y: 476, width: 3780, height: 100, type: [tileType.GROUND_BLUE]}),
            new Tile({x: 3900, y: 476, width: 1850, height: 100, type: [tileType.GROUND_BLUE]}),
            new Tile({x: 5900, y: 476, width: 90, height: 100, type: [tileType.GROUND_BLUE]}),
            new Tile({x: 6100, y: 476, width: 540, height: 100, type: [tileType.GROUND_BLUE]}),
            new Tile({x: 6900, y: 476, width: 400, height: 100, type: [tileType.GROUND_BLUE]}),
            new Tile({x: 7600, y: 476, width: 1400, height: 100, type: [tileType.GROUND_BLUE], index: 7}),

            new Tile({x: 550, y: 300, width: 45, height: 45, type: [tileType.MYSTERY_BLUE], index: 8}),
            new Tile({x: 600, y: 300, width: 15, height: 15, type: [tileType.COIN2], isPlatform: false, index: 9}),
            new Tile({x: 595, y: 300, width: 45, height: 45, type: [tileType.MYSTERY_BLUE], index: 10}),
            new Tile({x: 650, y: 300, width: 15, height: 15, type: [tileType.COIN2], isPlatform: false, index: 11}),
            new Tile({x: 640, y: 300, width: 45, height: 45, type: [tileType.MYSTERY_BLUE], index: 12}),
            new Tile({x: 695, y: 300, width: 15, height: 15, type: [tileType.COIN2], isPlatform: false, index: 13}),
            new Tile({x: 685, y: 300, width: 45, height: 45, type: [tileType.MYSTERY_BLUE], index: 14}),
            new Tile({x: 740, y: 300, width: 15, height: 15, type: [tileType.COIN2], isPlatform: false, index: 15}),
            new Tile({x: 730, y: 300, width: 45, height: 45, type: [tileType.MYSTERY_BLUE], index: 16}),

            new Tile({x: 950, y: 431, width: 45, height: 45, type: [tileType.BOX_BLUE]}),
            new Tile({x: 1040, y: 386, width: 45, height: 90, type: [tileType.BOX_BLUE]}),
            new Tile({x: 1130, y: 341, width: 45, height: 135, type: [tileType.BOX_BLUE]}),
            new Tile({x: 1220, y: 296, width: 45, height: 180, type: [tileType.BOX_BLUE]}),
            new Tile({x: 1300, y: 296, width: 45, height: 180, type: [tileType.BOX_BLUE]}),
            new Tile({x: 1390, y: 341, width: 45, height: 135, type: [tileType.BOX_BLUE]}),
            
            new Tile({x: 1480, y: 250, width: 45, height: 45, type: [tileType.BRICK_BLUE]}),

            new Tile({x: 1570, y: 341, width: 45, height: 135, type: [tileType.BOX_BLUE]}),
            new Tile({x: 1660, y: 386, width: 45, height: 90, type: [tileType.BOX_BLUE]}),

            new Tile({x: 2045, y: 260, width: 45, height: 45, type: [tileType.COIN_BLUE], isPlatform: false}),

            new Tile({x: 2090, y: 150, width: 45, height: 45, type: [tileType.COIN_BLUE], isPlatform: false}),
            new Tile({x: 2135, y: 150, width: 45, height: 45, type: [tileType.COIN_BLUE], isPlatform: false}),
            new Tile({x: 2180, y: 150, width: 45, height: 45, type: [tileType.COIN_BLUE], isPlatform: false}),

            new Tile({x: 2225, y: 260, width: 45, height: 45, type: [tileType.COIN_BLUE], isPlatform: false}),

            new Tile({x: 2000, y: 305, width: 45, height: 45, type: [tileType.BRICK_BLUE], isBreakable: true, particles: tileType.BRICKPARTICLE_BLUE}),
            new Tile({x: 2045, y: 305, width: 45, height: 45, type: [tileType.BRICK_BLUE], isBreakable: true, particles: tileType.BRICKPARTICLE_BLUE}),
            new Tile({x: 2090, y: 305, width: 45, height: 45, type: [tileType.BRICK_BLUE], isBreakable: true, particles: tileType.BRICKPARTICLE_BLUE}),
            new Tile({x: 2090, y: 260, width: 45, height: 45, type: [tileType.BRICK_BLUE], isBreakable: true, particles: tileType.BRICKPARTICLE_BLUE}),
            new Tile({x: 2090, y: 215, width: 45, height: 45, type: [tileType.BRICK_BLUE], isBreakable: true, particles: tileType.BRICKPARTICLE_BLUE}),
            new Tile({x: 2135, y: 215, width: 45, height: 45, type: [tileType.BRICK_BLUE], isBreakable: true, particles: tileType.BRICKPARTICLE_BLUE}),
            new Tile({x: 2180, y: 215, width: 45, height: 45, type: [tileType.BRICK_BLUE], isBreakable: true, particles: tileType.BRICKPARTICLE_BLUE}),
            new Tile({x: 2180, y: 260, width: 45, height: 45, type: [tileType.BRICK_BLUE], isBreakable: true, particles: tileType.BRICKPARTICLE_BLUE}),
            new Tile({x: 2180, y: 305, width: 45, height: 45, type: [tileType.BRICK_BLUE], isBreakable: true, particles: tileType.BRICKPARTICLE_BLUE}),
            new Tile({x: 2225, y: 305, width: 45, height: 45, type: [tileType.BRICK_BLUE], isBreakable: true, particles: tileType.BRICKPARTICLE_BLUE}),
            new Tile({x: 2270, y: 305, width: 45, height: 45, type: [tileType.BRICK_BLUE], isBreakable: true, particles: tileType.BRICKPARTICLE_BLUE}),
            new Tile({x: 2270, y: 260, width: 45, height: 45, type: [tileType.BRICK_BLUE], isBreakable: true, particles: tileType.BRICKPARTICLE_BLUE}),
            new Tile({x: 2270, y: 215, width: 45, height: 45, type: [tileType.BRICK_BLUE], isBreakable: true, particles: tileType.BRICKPARTICLE_BLUE}),
            new Tile({x: 2000, y: 260, width: 45, height: 45, type: [tileType.BRICK_BLUE], isBreakable: true, particles: tileType.BRICKPARTICLE_BLUE}),
            new Tile({x: 2000, y: 215, width: 45, height: 45, type: [tileType.BRICK_BLUE], isBreakable: true, particles: tileType.BRICKPARTICLE_BLUE}),

            new Tile({x: 2650, y: 105, width: 90, height: 90, type: [tileType.BRICK_BLUE], isBreakable: true, particles: tileType.BRICKPARTICLE_BLUE}),
            new Tile({x: 2560, y: 195, width: 90, height: 180, type: [tileType.BRICK_BLUE], isBreakable: true, particles: tileType.BRICKPARTICLE_BLUE}),
            new Tile({x: 2650, y: 330, width: 90, height: 90, type: [tileType.BRICK_BLUE], isBreakable: true, particles: tileType.BRICKPARTICLE_BLUE}),

            new Tile({x: 2820, y: 105, width: 270, height: 90, type: [tileType.BRICK_BLUE]}),
            new Tile({x: 3000, y: 195, width: 90, height: 135, type: [tileType.BRICK_BLUE]}),
            new Tile({x: 2820, y: 330, width: 270, height: 45, type: [tileType.BRICK_BLUE]}),

            new Tile({x: 2820, y: 285, width: 45, height: 45, type: [tileType.COIN_BLUE], isPlatform: false}),
            new Tile({x: 2865, y: 285, width: 45, height: 45, type: [tileType.COIN_BLUE], isPlatform: false}),
            new Tile({x: 2910, y: 285, width: 45, height: 45, type: [tileType.COIN_BLUE], isPlatform: false}),
            new Tile({x: 2955, y: 285, width: 45, height: 45, type: [tileType.COIN_BLUE], isPlatform: false}),
            new Tile({x: 3300, y: 285, width: 45, height: 45, type: [tileType.COIN_BLUE], isPlatform: false}),

            new Tile({x: 3200, y: 105, width: 180, height: 90, type: [tileType.BRICK_BLUE]}),
            new Tile({x: 3245, y: 195, width: 45, height: 180, type: [tileType.BRICK_BLUE]}),
            new Tile({x: 3245, y: 330, width: 135, height: 45, type: [tileType.BRICK_BLUE]}),

            new Tile({x: 3470, y: 195, width: 90, height: 180, type: [tileType.BRICK_BLUE]}),
            new Tile({x: 3640, y: 330, width: 135, height: 45, type: [tileType.BRICK_BLUE]}),

            new Tile({x: 3640, y: 105, width: 135, height: 90, type: [tileType.BRICK_BLUE]}),

            new Tile({x: 3960, y: 160, width: 45, height: 45, type: [tileType.COIN_BLUE], isPlatform: false}),
            new Tile({x: 4005, y: 160, width: 45, height: 45, type: [tileType.COIN_BLUE], isPlatform: false}),
            new Tile({x: 4050, y: 160, width: 45, height: 45, type: [tileType.COIN_BLUE], isPlatform: false}),
            new Tile({x: 4095, y: 160, width: 45, height: 45, type: [tileType.COIN_BLUE], isPlatform: false}),
            new Tile({x: 4140, y: 160, width: 45, height: 45, type: [tileType.COIN_BLUE], isPlatform: false}),
            new Tile({x: 4185, y: 160, width: 45, height: 45, type: [tileType.COIN_BLUE], isPlatform: false}),

            new Tile({x: 3960, y: 230, width: 270, height: 90, type: [tileType.BRICK_BLUE]}),

            new Tile({x: 4900, y: 332, width: 90, height: 144, type: [tileType.PIPEHEAD_BLUE, tileType.PIPEBODY_BLUE]}),
            new Tile({x: 5200, y: 284, width: 90, height: 192, type: [tileType.PIPEHEAD_BLUE, tileType.PIPEBODY_BLUE]}),
            new Tile({x: 5500, y: 380, width: 90, height: 96, type: [tileType.PIPEHEAD_BLUE, tileType.PIPEBODY_BLUE]}),

            new Tile({x: 5900, y: 340, width: 90, height: 135, type: [tileType.BRICK_BLUE]}),

            new Tile({x: 6415, y: 430, width: 45, height: 45, type: [tileType.BOX_BLUE]}),
            new Tile({x: 6460, y: 385, width: 45, height: 90, type: [tileType.BOX_BLUE]}),
            new Tile({x: 6505, y: 340, width: 45, height: 135, type: [tileType.BOX_BLUE]}),
            new Tile({x: 6550, y: 295, width: 90, height: 180, type: [tileType.BOX_BLUE]}),
        
            new Tile({x: 6690, y: 175, width: 135, height: 22, type: [tileType.FLOATINGPLATFORM], bouncy: false}),
            new Tile({x: 6690, y: 475, width: 135, height: 22, type: [tileType.FLOATINGPLATFORM], bouncy: false}),

            new Tile({x: 6900, y: 250, width: 270, height: 45, type: [tileType.BRICK_BLUE]}),

            new Tile({x: 7370, y: 175, width: 135, height: 22, type: [tileType.FLOATINGPLATFORM], bouncy: false}),
            new Tile({x: 7370, y: 475, width: 135, height: 22, type: [tileType.FLOATINGPLATFORM], bouncy: false}),

            new Tile({x: 7600, y: 385, width: 635, height: 90, type: [tileType.BRICK_BLUE], index: 30}),
            new Tile({x: 8235, y: -20, width: 235, height: 490, type: [tileType.BRICK_BLUE]}),

            new Tile({x: 8145, y: -95, width: 90, height: 445, type: [tileType.PIPEHEAD_BLUE, tileType.PIPEBODY_BLUE]}),
            new Tile({x: 8074, y: 297, width: 90, height: 85, type: [tileType.PIPERIGHT_BLUE], isPlatform: false}),
        ] 

        this.chars = [
            new Character({x: 1480, y: 300, width: 41, height: 40, type: charType.GOOMBA_BLUE}),

            new Character({x: 3170, y: 400, width: 45, height: 70, type: charType.KOOPALEFT}),
            new Character({x: 3510, y: 400, width: 41, height: 40, type: charType.GOOMBA_BLUE}),
            new Character({x: 3600, y: 400, width: 41, height: 40, type: charType.GOOMBA_BLUE}),
            
            new Character({x: 3500, y: 150, width: 41, height: 40, type: charType.GOOMBA_BLUE}),
            new Character({x: 3650, y: 250, width: 41, height: 40, type: charType.GOOMBA_BLUE}),
            new Character({x: 3750, y: 250, width: 41, height: 40, type: charType.GOOMBA_BLUE}),

            new Character({x: 4800, y: 150, width: 41, height: 40, type: charType.GOOMBA_BLUE}),
            new Character({x: 4700, y: 250, width: 41, height: 40, type: charType.GOOMBA_BLUE}),
            new Character({x: 4600, y: 250, width: 41, height: 40, type: charType.GOOMBA_BLUE}),

            new Character({x: 4922, y: 267, width: 45, height: 65, type: charType.PIRANHAPLANT_BLUE, appeared: false}),
            new Character({x: 5222, y: 219, width: 45, height: 65, type: charType.PIRANHAPLANT_BLUE, appeared: false}),
            new Character({x: 5522, y: 315, width: 45, height: 65, type: charType.PIRANHAPLANT_BLUE, appeared: false}),

            new Character({x: 6550, y: 150, width: 41, height: 40, type: charType.GOOMBA_BLUE}),
            new Character({x: 6450, y: 250, width: 41, height: 40, type: charType.GOOMBA_BLUE}),

            new Character({x: 7100, y: 400, width: 45, height: 70, type: charType.KOOPALEFT}),

            new Character({x: 7800, y: 0, width: 90, height: 90, type: charType.BOWSEROPENLEFT, isBoss: true})
        ]
    }

}

w1_2World = new W1_2World()
w1_2World.init()