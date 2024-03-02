class Player {
    constructor() {
        this.init()
    }

    init() {
        this.pos = {
            x: 150,
            y: -46
        }
        this.vel = {
            x: 0,
            y: 0
        }
        this.speed = 6
        this.width = 38
        this.height = 46
        this.defaultHeight = 46
        this.physics = true
        this.gravity = true

        this.camera = {
            pos: {
                x: this.pos.x,
                y: this.pos.y
            },
            width: 200,
            height: 40
        }

        this.sprites = {
            idleRight: cs.marioIdleRight,
            idleLeft: cs.marioIdleLeft,
            runRight: cs.marioRunRight,
            runLeft: cs.marioRunLeft,
            jumpRight: cs.marioJumpRight,
            jumpLeft: cs.marioJumpLeft
        }

        this.powerUp = { 
            big: false,
            fire: false
        }
        this.disable = false

        this.mState = {
            isIdle: true,
            isMoving: false,
            isJumping: false,
            isRight: true,
            isLeft: false,
            isDead: false
        }

        this.state = cs.marioIdleRight
        this.deadJump = false
    }

    defaultState() {
        this.mState = {
            isIdle: true,
            isMoving: false,
            isJumping: false,
            isRight: true,
            isLeft: false,
            isDead: false
        }
    }

    changeSprites(iR, iL, rR, rL, jR, jL) {
        this.sprites = {
            idleRight: iR,
            idleLeft: iL,
            runRight: rR,
            runLeft: rL,
            jumpRight: jR,
            jumpLeft: jL
        }
    }

    updateCamera() {
        this.camera = {
            pos: {
                x: this.pos.x - (this.camera.width / 2 - (this.width / 2)),
                y: this.pos.y - 200
            },
            width: 1000,
            height: 500
        }
    }

    isCamLeft() {
        const cameraRight = this.camera.pos.x + this.camera.width
        return (cameraRight >= cvs.width)
    }

    isCamRight() {
        const cameraLeft = this.camera.pos.x
        return (cameraLeft <= 0)
    }

    drawSprite() {
        const offsetX = this.state.animate ? this.state.animation.frameCut * this.state.animation.frameX : 0;

        ctx.drawImage(cs.sheet,
            this.state.sX + offsetX,
            this.state.sY,
            this.state.cropWidth,
            this.state.cropHeight,
            this.pos.x,
            this.pos.y,
            this.width,
            this.height
        );
    }

    #updateState() {
        if (this.mState.isDead === false) {
            if (this.mState.isJumping) {
                this.state = this.mState.isRight ? this.sprites.jumpRight : this.sprites.jumpLeft;
            } else if (this.mState.isIdle) {
                this.state = this.mState.isRight ? this.sprites.idleRight : this.sprites.idleLeft
            } else if (this.mState.isMoving) {
                this.state = this.mState.isRight ? this.sprites.runRight : this.sprites.runLeft;
            }
        } else {
            this.state = cs.marioDead
        }
    }

    shootFire() {
        let fire = new Character({x: this.pos.x + 4, y: this.pos.y + 15, width: 25, height: 25, type: charType.MARIOFIRE})
        if (this.mState.isRight) fire.vel.x = 10
        else fire.vel.x = -10
        genLogic.world.chars.push(fire)
    }

    checkDeath() {
        if (this.mState.isDead) {
            if (this.deadJump === false) {
                this.vel.y = -15
                this.deadJump = true
            }
            this.vel.x = 0
            cam.vel.x = 0
            this.physics = false
        }
    }

    update() {
        this.#updateState()

        ctx.save()
        this.drawSprite()
        ctx.restore()

        if (this.state.animate) {
            cs.animate(this.state)
        }

        this.updateCamera()
        this.checkDeath()

        this.pos.y += this.vel.y
        this.pos.x += this.vel.x


        if(this.gravity) this.vel.y += gravity

        if (this.vel.y == 1.5 || this.vel.y == 0) {
            this.mState.isJumping = false
        }

        // ctx.strokeStyle = 'red'
        // ctx.strokeRect(this.pos.x, this.pos.y, this.width, this.height)
    }
}