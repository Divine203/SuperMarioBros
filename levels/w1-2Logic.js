class W1_2Logic {
    constructor() {
        this.world = w1_2World
    }


    end() {
        this.world.tiles.filter(t => t.index == 30).forEach(lastGround => {
            genLogic.endPipe(this.world, lastGround, tileType.PIPERIGHT_BLUE, w1_2End, 200, 434)   
            if(this.world.hasTransported) {
                if(this.world.transport) {
                    player.vel.y -= 20
                    genLogic.spawn(-100)
                    this.world.transport = false
                }
            }        
        })
    }

    update() {
        genLogic.coinLoot(tileType.COIN_BLUE)
        genLogic.coinCollection(10)
        genLogic.coinCollection(12)
        genLogic.coinCollection(14)
        genLogic.coinCollection(16)
        genLogic.blankMystery(tileType.MYSTERY_BLUE, tileType.BLANK_BLUE)
        genLogic.goomba(charType.GOOMBA_BLUE)
        genLogic.goombaWeakness(charType.GOOMBA_BLUE, charType.GOOMBADEAD_BLUE)
        genLogic.ffAppear(8, tileType.BLANK_BLUE)
        genLogic.marioFire(charType.GOOMBA_BLUE, charType.GOOMBAFLIP_BLUE)
        genLogic.piranhaPlant(charType.PIRANHAPLANT_BLUE)
        genLogic.floatingPlatform()
        genLogic.bowser()
        
        this.end()
    }
}

w1_2Logic = new W1_2Logic()