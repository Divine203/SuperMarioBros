class W1_1Logic {
    constructor() {
        this.world = w1_1World
    }

    flag() {
        this.world.tiles.filter(t => t.type[0] == tileType.FLAGPOLEHEAD).forEach(flag => {
            if (flag.flagActive) {
                if (['left', 'right', 'bottom', 'top'].some(side => collision[side](player, flag))) {
                    if(flag.audio) {
                        audio.playAudio(audio.sound.flag)
                        flag.audio = false
                    }
                    if (player.powerUp.big === false && player.powerUp.fire === false) {
                        player.changeSprites(...Array(6).fill(cs.marioClimb))
                    } else {
                        if (player.powerUp.big) player.changeSprites(...Array(6).fill(cs.marioClimb__big))
                        else if (player.powerUp.fire) player.changeSprites(...Array(6).fill(cs.marioClimb__fire))
                    }

                    player.pos.x = flag.pos.x
                    player.vel.y = 2
                    player.vel.x = 0
                    player.disable = true
                    player.gravity = false
                    player.physics = false
                    keys.right.pressed = false
                    keys.left.pressed = false

                    if (player.pos.y >= flag.pos.y + (flag.height - 45)) {
                        if (player.powerUp.big === false && player.powerUp.fire === false) {
                            player.height = player.defaultHeight
                            player.changeSprites(cs.marioIdleRight,cs.marioIdleLeft,cs.marioRunRight,cs.marioRunLeft,cs.marioJumpRight,cs.marioJumpLeft)
                        } else {
                            player.height = 80
                            if (player.powerUp.big) {
                                player.changeSprites(cs.marioIdleRight__big,cs.marioIdleLeft__big,cs.marioRunRight__big,cs.marioRunLeft__big,cs.marioJumpRight__big,cs.marioJumpLeft__big)
                            }
                            else if (player.powerUp.fire) {
                                player.changeSprites(cs.marioIdleRight__fire,cs.marioIdleLeft__fire,cs.marioRunRight__fire,cs.marioRunLeft__fire,cs.marioJumpRight__fire,cs.marioJumpLeft__fire)
                            }
                        }
                        player.vel.y = 0
                        player.disable = false
                        player.gravity = true
                        player.physics = true

                        flag.flagActive = false
                    }
                }

            }
        })
    }

    end() {
        this.world.tiles.filter(t => t.index == 3).forEach(lastGround => {
            genLogic.endPipe(this.world, lastGround, tileType.PIPERIGHT, w1_2World, 0, 0)
        })
    }


    update() {
        genLogic.coinCollection(11)
        genLogic.coinCollection(17)
        genLogic.coinCollection(20)
        genLogic.blankMystery(tileType.MYSTERY, tileType.BLANK)
        genLogic.goomba(charType.GOOMBA)
        genLogic.goombaWeakness(charType.GOOMBA, charType.GOOMBADEAD)
        genLogic.mmAppear(14, tileType.BLANK)
        genLogic.ffAppear(22, tileType.BLANK)
        genLogic.marioFire(charType.GOOMBA, charType.GOOMBAFLIP)

        this.flag()
        this.end()
    }
}

w1_1Logic = new W1_1Logic()