class Character {
    constructor({ x, y, width, height, type, isPhysics = true, appeared = true, index, plantDelay = 0, isBoss = false}) {
        this.pos = {
            x: x,
            y: y
        }
        this.vel = {
            x: 0,
            y: 0
        }

        this.width = width
        this.height = height
        this.type = type
        this.isPhysics = isPhysics
        this.left = true
        this.appeared = appeared
        this.index = index
        this.initPos = {
            x: x,
            y: y
        }
        this.goombaWeak = true
        this.koopaWeak = true
        this.kJumpCounter = 0
        this.mmBoolStoreMarioY = true
        this.ffBoolStoreMarioY = true
        this.mmJump = true 
        this.ffJump = true
        this.gJump = true
        this.plantDelay = plantDelay

        // Bowser properties
        this.isBoss = isBoss
        this.open = true
        this.bRight = false
        this.bLeft = true
        this.bFire = false
        this.bHp = 100
    }

    drawSprite() {
        const offsetX = cs[this.type].animate ? cs[this.type].animation.frameCut * cs[this.type].animation.frameX : 0;

        ctx.drawImage(cs.sheet,
            cs[this.type].sX + offsetX,
            cs[this.type].sY,
            cs[this.type].cropWidth,
            cs[this.type].cropHeight,
            this.pos.x,
            this.pos.y,
            this.width,
            this.height
        )
    }

    update() {
        this.drawSprite()

        if (cs[this.type].animate) {
            cs.animate(cs[this.type])
        }

        this.pos.x += arena.pos.x
        this.pos.y += arena.pos.y
        
        this.pos.y += this.vel.y
        if(this.type !== charType.GOOMBA && this.type !== charType.GOOMBA_BLUE && this.type !== charType.KOOPALEFT && this.type !== charType.KOOPARIGHT) {
            this.pos.x += this.vel.x
        } else {
            if(this.pos.x <= player.pos.x + 500) { // range of enemies view on Mario
                this.pos.x += this.vel.x
            }
        }

        if (this.appeared) this.vel.y += gravity
    }
}