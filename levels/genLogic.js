// This file contains all the general logic applicable to
// all levels of the game.

player = new Player()

class GenLogic {
    constructor() {
        this.world = w1_1World
        // this.world = w1_2End
        // this.world = w1_2World

        // goomba related properties
        // (some can't be reused)
        this.goombaLeft = true

        // toad related properties
        // (some can't be reused)
        this.pMMJump = true
        this.boolStoreMarioY = true
        this.storeMarioY = null
        this.deathAud = true
        this.active = true

    }

    physics() {
        // applys to physics to game components
        // that require it
        this.world.tiles.forEach(t => {
            if (player.physics) {
                if (t.isPlatform) addPhysics(player, t)
            }
            this.world.chars.filter(c => c.appeared && c.isPhysics).forEach(c => {
                if (collision.top(c, t) && t.isPlatform) {
                    c.pos.y = (t.pos.y - c.height) - 1
                    c.vel.y = 0
                }
            })
        })
    }

    // changes the tileType of mysteryBoxes to blank once 
    // mario bounces them
    blankMystery(tType, blankType) {
        this.world.tiles.forEach(t => {
            if (t.type[0] == tType && t.shouldBounce) {
                t.type = [blankType];
            }
        });
    }

    // removes a coin from the world
    // called once a coin has been collected
    removeCoin = (coin) => {
        this.world.tiles = this.world.tiles.filter(tile => tile !== coin)
    }


    // in coinCollection tileIndex argument indicates
    // the index of the tile we want the coin to be collected once it has bounced
    coinCollection(tileIndex) {
        this.world.tiles.filter(t => t.index === tileIndex && t.shouldBounce).forEach(t => {
            this.world.tiles.filter(tile => tile.index === t.index - 1).forEach(coin => {
                coin.bounceRange = 100
                coin.bounceSpeed = 9
                coin.shouldBounce = true
                if(coin.audio) {
                    audio.playAudio(audio.sound.coin)
                    coin.audio = false
                }
                setTimeout(() => this.removeCoin(coin), 400) // waits for the coin to bounce
            })
        })
    }

    // This is for looting base coins that lie around in the map
    coinLoot(coinType) {
        this.world.tiles.filter(t => t.type[0] == coinType).forEach(coin => {
            if (['left', 'right', 'top', 'bottom'].some(side => collision[side](player, coin))) {
                this.removeCoin(coin)
            }
        })
    }

    // This is the "appearing" animation
    // for megaMushrooms
    #mysteryAppear(c) {
        if (c.pos.y > c.initPos.y - c.height) {
            c.vel.y = -1
        } else {
            c.vel.y = 0
            c.appeared = true
        }
    }

    // code for megaMushroom appearance 
    mmAppear(tileIndex, blankType) {
        // w1-1 megaMushroom appears for mysterBox index 14 and 32
        this.world.tiles.filter(t => t.index === tileIndex).forEach(t => {
            if (t.type[0] == blankType) {
                
                setTimeout(() => {
                    if (t.showMysteryItem) {
                        audio.playAudio(audio.sound.powerupAppears)
                        this.world.chars.push(new Character({ x: t.pos.x - 1, y: t.pos.y, width: 45, height: 45, type: charType.MEGAMUSHROOM, appeared: false, index: 0 }))
                        t.showMysteryItem = false
                    }
                    this.world.chars.filter(c => c.index == 0).forEach(c => {
                        if (c.appeared == false) {
                            this.#mysteryAppear(c)
                        }
                    })
                }, 300)
            }
        })
    }

    // code for fireFlower appearance 
    // fireFlower logic itself is on `genLogic.js`
    ffAppear(tIndex, blankType) { // 22
        // w1-1 2nd fireFlower appears
        this.world.tiles.filter(t => t.index === tIndex).forEach(t => {
            if (t.type[0] == blankType) {
                setTimeout(() => {
                    if (t.showMysteryItem) {
                        audio.playAudio(audio.sound.powerupAppears)
                        this.world.chars.push(new Character({ x: t.pos.x - 1, y: t.pos.y, width: 45, height: 45, type: charType.FIREFLOWER, appeared: false, index: 0 }))
                        t.showMysteryItem = false
                    }
                    this.world.chars.filter(c => c.index == 0).forEach(c => {
                        if (c.appeared == false) {
                            this.#mysteryAppear(c)
                        }
                    })
                }, 300)
            }
        })
    }

    #charMovement(c, startVel) {
        // charMovement is for crawling characters in the game
        // that move left or right on collision with (platform type) objects
        // e.g goombas or toads
        // (c, startVel) c: the character to move. startVel: its default moving direction
        this.world.tiles.filter(t => t.isPlatform).forEach(tile => {
            if (collision.right(c, tile)) c.vel.x = 1
            else if (collision.left(c, tile)) c.vel.x = -1
            else {
                if (c.left) {
                    c.vel.x = startVel
                    c.left = false
                    return true
                }
            }
        })
    }

    playerDeath() {
        if (player.mState.isDead) {
            spawn(-1600)
            player.mState.isDead = false
            w1_1World.init()
        }
    }

    #killEnemy = (c) => {
        this.world.chars = this.world.chars.filter(char => char !== c)

        // The code below is to balance the enemies animation speed
        // as we remove each enemy, so the movement animation doesn't slow down
        // or speed up in the long run for other enemies. 
        if (c.type === charType.GOOMBADEAD) cs.goomba.animation.staggerFrames -= 6
        if (c.type === charType.GOOMBADEAD_BLUE) cs.goomba_blue.animation.staggerFrames -= 6
        if (c.type === charType.KOOPASHELL) cs.goomba.animation.staggerFrames -= 6
    }

    goombaWeakness(cType, cTypeDead) {

        this.world.chars.filter(c => c.type === cType).forEach(goomba => {
            // were adding a dummy tile at the top of the goomba's head
            // setting the .type[0] of the tile to null 
            // is to indicate that its a dummy tile
            // .type[1] is the goomba associated to the dummy tile
            // so it can be easily referenced for other logic

            let dT = new Tile({ x: goomba.pos.x, y: goomba.pos.y, width: 28, height: 8, type: [null, goomba], isPlatform: false })
            if (goomba.goombaWeak) {
                this.world.tiles.push(dT)
                goomba.goombaWeak = false
            }

            if (goomba.pos.y >= cvs.height) this.#killEnemy(goomba)

            this.world.tiles.filter(t => t.type[0] == null).forEach((t) => {
                let g = t.type[1]
                t.pos.x = g.pos.x + 6
                t.pos.y = g.pos.y - 10

                // goomba's death logic
                // on player collision with dummy tile 
                // on goomba's head

                if (collision.top(player, t) && g.type !== cTypeDead &&
                    g.type == cType && player.disable === false) {
                    if(t.audio) {
                        audio.playAudio(audio.sound.kick)
                        t.audio = false
                    }
                    player.vel.y -= 35
                    g.vel.x = 0
                    g.type = cTypeDead
                    this.world.tiles = this.world.tiles.filter(tile => tile !== t)
                    // wait for half a second for goomba death sprite to show
                    // before removing goomba from world
                    setTimeout(() => { this.#killEnemy(g) }, 500)
                }
            })
        })
    }


    // KoopaWeakness is pretty much identical as the 
    // goombaWeakness method XD

    koopaWeakness() {

        this.world.chars.filter(c => c.type == charType.KOOPALEFT || c.type == charType.KOOPARIGHT).forEach(koopa => {

            let dT = new Tile({ x: koopa.pos.x, y: koopa.pos.y, width: 34, height: 8, type: [null, koopa], isPlatform: false })
            if (koopa.koopaWeak) {
                this.world.tiles.push(dT)
                koopa.koopaWeak = false
            }

            this.world.tiles.filter(t => t.type[0] == null).forEach((t) => {
                let k = t.type[1]
                t.pos.x = k.pos.x + 6
                t.pos.y = k.pos.y - 10

                if (collision.top(player, t) && k.type !== charType.KOOPASHELL &&
                    (k.type == charType.KOOPARIGHT || k.type == charType.KOOPALEFT)
                    && player.disable === false) {
                    t.audio = true
                    if(t.audio) {
                        audio.playAudio(audio.sound.kick)
                        t.audio = false
                    }
                    player.vel.y -= 40

                    // Mario must jump on it's head 3 times
                    // before it dies
                    k.kJumpCounter++
                    if (k.kJumpCounter >= 3) {

                        k.vel.x = 0
                        k.type = charType.KOOPASHELL
                        this.world.tiles = this.world.tiles.filter(tile => tile !== t)

                        setTimeout(() => { this.#killEnemy(k) }, 500)
                    }
                }
            })
        })
    }


    // FLOATING PLATFORMS in w1-2 code...
    floatingPlatform() {
        this.world.tiles.filter(t => t.type[0] == tileType.FLOATINGPLATFORM).forEach(fp => {
            fp.velY = -1

            if (fp.pos.y <= -fp.height) {
                fp.pos.y = cvs.height
            }
        })
    }

    // piranhaPlant
    piranhaPlant(pType) {
        this.world.chars.filter(c => c.type == pType).forEach(plant => {
            // Appear and hide sequence...
            if (plant.pos.y === plant.initPos.y) {
                plant.vel.y = 0

                setTimeout(() => {
                    plant.vel.y = 1
                }, 2000)

                setTimeout(() => {
                    plant.vel.y = -1
                }, 6000)
            }

            // killMario on collision
            this.#killMario(plant)

            // Death on fire contact
            this.world.chars.filter(c => c.type == charType.MARIOFIRE).forEach(fire => {
                if (['left', 'right', 'bottom', 'top'].some(side => collision[side](plant, fire))) {
                    this.world.chars = this.world.chars.filter(char => char !== plant) // removes plant from world
                }
            })
        })
    }

    // The some() method in JavaScript is used to test whether at least one element 
    // in the array passes the test implemented by the provided function. 
    // It returns true if at least one element in the array satisfies the condition, 
    // otherwise it returns false.

    #marioDies() {
        if (player.powerUp.big === false && player.powerUp.fire === false) {
            this.active = false
            audio.playAudio(audio.sound.died)
            player.disable = true
            player.height = 46
            player.mState.isDead = true; // kill mario
        } else {
            player.height = player.defaultHeight // reset to default height
            player.changeSprites(
                cs.marioIdleRight,
                cs.marioIdleLeft,
                cs.marioRunRight,
                cs.marioRunLeft,
                cs.marioJumpRight,
                cs.marioJumpLeft
            )
            // wait a second after removing powerUp
            // before the goomba can kill mario again
            setTimeout(() => {
                player.powerUp.big = false
                player.powerUp.fire = false
            }, 1000)
        }
    }
    #killMario(char) {
        if (['left', 'right', 'bottom'].some(side => collision[side](player, char))) {
           
            this.#marioDies()
        }
    }

    goomba(cType) {
        this.world.chars.filter(c => c.type == cType).forEach(goomba => {
            this.#charMovement(goomba, -1)
            this.#killMario(goomba)
        });
    }

    // koopa is the same every world
    // so no need to specify cType like the
    // goomba method
    koopa() {
        this.world.chars.filter(c => c.type == charType.KOOPALEFT || c.type == charType.KOOPARIGHT).forEach(koopa => {
            this.#charMovement(koopa, -1)

            if (koopa.vel.x > 0) koopa.type = charType.KOOPARIGHT
            else koopa.type = charType.KOOPALEFT

            this.#killMario(koopa)
        });
    }

    // same just like the koopa, 
    // the same every world
    megaMushroom() {
        this.world.chars.filter(c => c.type == charType.MEGAMUSHROOM).forEach((mm) => {
            if (mm.appeared) {
                this.#charMovement(mm, 1)
                if (['left', 'right', 'top', 'bottom'].some(side => collision[side](player, mm)) && player.powerUp.big === false) {

                    // storing marios current Y position (Once)
                    // to 'force push' his Y position UP
                    // before he starts growing
                    if (mm.mmBoolStoreMarioY) {
                        audio.playAudio(audio.sound.powerup)
                        this.storeMarioY = player.pos.y
                        mm.mmBoolStoreMarioY = false
                    }
                    if (mm.mmJump) {
                        player.disable = true
                        keys.right.pressed = false
                        keys.left.pressed = false
                        player.mState.isIdle = true
                        player.pos.y = this.storeMarioY - 35
                        player.height = 80
                        player.changeSprites(...Array(6).fill(cs.marioGrowRight))

                        // setTimeout is to give the grow animation above
                        // time to run, before mario becomes big
                        setTimeout(() => {
                            player.vel.x = 0
                            player.disable = false
                            player.powerUp.big = true
                            player.powerUp.fire = false
                            player.changeSprites(
                                cs.marioIdleRight__big,
                                cs.marioIdleLeft__big,
                                cs.marioRunRight__big,
                                cs.marioRunLeft__big,
                                cs.marioJumpRight__big,
                                cs.marioJumpLeft__big
                            )
                            // remove megaMushroom from world
                            this.world.chars = this.world.chars.filter(c => c !== mm)
                            mm.mmJump = false

                        }, 950)
                    }
                }
            }
        });
    }


    // the same everyWorld
    fireFlower() {
        this.world.chars.filter(c => c.type == charType.FIREFLOWER).forEach((ff) => {
            if (ff.appeared) {
                if (['left', 'right', 'top', 'bottom'].some(side => collision[side](player, ff)) && player.powerUp.fire === false) {
                    player.powerUp.fire = true
                    player.powerUp.big = false
                    if (ff.ffBoolStoreMarioY) {
                        audio.playAudio(audio.sound.powerup)
                        this.storeMarioY = player.pos.y
                        ff.mmBoolStoreMarioY = false
                    }
                    if (ff.ffJump) {
                        player.pos.y = this.storeMarioY - 35
                        player.height = 80
                        player.changeSprites(
                            cs.marioIdleRight__fire,
                            cs.marioIdleLeft__fire,
                            cs.marioRunRight__fire,
                            cs.marioRunLeft__fire,
                            cs.marioJumpRight__fire,
                            cs.marioJumpLeft__fire
                        )
                        // remove fireFlower from world
                        this.world.chars = this.world.chars.filter(c => c !== ff)
                        ff.ffJump = false
                    }
                }
            }
        })
    }

    marioFire(goombaType, goombaFlipType) {
        this.world.chars.filter(c => c.type == charType.MARIOFIRE).forEach(f => {

            // remove fire from world if...
            if (f.pos.y >= cvs.height) {
                this.world.chars = this.world.chars.filter(c => c !== f) // remove fire
            }

            // fire bouncing on (top) 
            // collision with platforms
            this.world.tiles.filter(t => t.isPlatform).forEach(platform => {
                if (collision.top(f, platform)) {
                    f.vel.y -= 10
                } else if (['left', 'right'].some(side => collision[side](f, platform))) {
                    this.world.chars = this.world.chars.filter(c => c !== f)
                }
            })

            // fire killing goombas, koopas and plants
            // on collision
            this.world.chars.filter(c => c.type === goombaType || c.type === charType.KOOPALEFT || c.type === charType.KOOPARIGHT).forEach(char => {
                if (['left', 'right', 'top', 'bottom'].some(side => collision[side](f, char))) {
                    // removing dummy tiles of enemy
                    this.world.tiles.filter(t => t.type[0] == null && t.type[1] == char).forEach(t => {
                        this.world.tiles = this.world.tiles.filter(tile => tile !== t)
                    });
                    if (char.type === goombaType) {
                        char.type = goombaFlipType
                    } else { // means its a koopa
                        char.type = charType.KOOPASHELL_FLIP
                    }
                    if (char.gJump) {
                        audio.playAudio(audio.sound.bump)
                        char.vel.y -= 20
                        char.isPhysics = false
                        this.world.chars = this.world.chars.filter(c => c !== f) // removing fire
                        char.gJump = false
                    }
                }
            })

            // fire killing bowser by removing 10 health from his hp
            this.world.chars.filter(c => c.isBoss).forEach(b => {
                if (['left', 'right', 'top', 'bottom'].some(side => collision[side](f, b))) {
                    audio.playAudio(audio.sound.bump)
                    b.bHp -= 10

                    this.world.chars = this.world.chars.filter(c => c !== f) // removing fire
                    if (b.bHp <= 0) {
                        if (b.gJump) {
                            audio.playAudio(audio.sound.bowserFalls)
                            b.width = 45
                            b.height = 45
                            b.vel.y -= 20
                            b.isPhysics = false
                            this.world.chars = this.world.chars.filter(c => c !== f) // removing fire
                            b.gJump = false
                        }
                        // wait one second before removing bowser from the world
                        setTimeout(() => {
                            this.world.chars = this.world.chars.filter(char => char !== b)
                        }, 1000)
                    }
                }
            })

        })
    }

    // the below method is for the sprite changes based on the state of bowser
    // the 'b' argument indicates the bowser were applying the logic too...
    #bowserSprites(b) {
        if (b.bHp > 0) {
            if (b.open) {
                if (b.bRight) {
                    b.type = charType.BOWSEROPENRIGHT
                } else {
                    b.type = charType.BOWSEROPENLEFT
                }
            } else {
                if (b.bRight) {
                    b.type = charType.BOWSERCLOSEDRIGHT
                } else {
                    b.type = charType.BOWSERCLOSEDLEFT
                }
            }
        } else {
            b.type = charType.KOOPASHELL_FLIP
        }
    }

    #bowserMovement(b) {
        if (player.mState.isIdle === false && Math.abs(player.pos.x - b.pos.x) < 300) {
            if (b.bRight && b.bLeft === false) {
                b.vel.x = 1
            } else if (b.bRight === false && b.bLeft) {
                b.vel.x = -1
            }
        } else {
            b.vel.x = 0
        }
    }

    #bowserFire(b) {
        if (b.bFire) {
            audio.playAudio(audio.sound.bowserFire)
            let fire = new Character({ x: b.bLeft ? b.pos.x - 50 : b.pos.x + 50, y: b.pos.y + 29, width: 80, height: 22, type: charType.BOWSERFIRELEFT, isPhysics: false, appeared: false })
            if (b.bRight) {
                fire.vel.x = 4
                fire.type = charType.BOWSERFIRERIGHT
            } else {
                fire.vel.x = -4
                fire.type = charType.BOWSERFIRELEFT
            }
            this.world.chars.push(fire)
        }
    }

    //-- BOWSER (W1-2) AI --//
    bowser() {
        let m = player // mario
        this.world.chars.filter(c => c.isBoss === true).forEach(bowser => {
            this.#bowserSprites(bowser)
            this.#bowserMovement(bowser)

            // movement follow Mario
            if (m.pos.x < bowser.pos.x) {
                bowser.bLeft = true
                bowser.bRight = false
            } else if (m.pos.x > bowser.pos.x) {
                bowser.bLeft = false
                bowser.bRight = true
            }
            if (m.mState.isIdle && bowser.pos.x <= m.pos.x + 500) {
                this.#bowserFire(bowser)
                bowser.bFire = true
                setTimeout(() => {
                    bowser.bFire = false
                }, 1)
            }


            // remove fires from world if it collides
            // with any platform
            this.world.chars.filter(c => c.type === charType.BOWSERFIRERIGHT || c.type === charType.BOWSERFIRELEFT).forEach(fire => {
                if (['left', 'right', 'top', 'bottom'].some(side => collision[side](fire, m))) {
                    this.world.chars = this.world.chars.filter(char => char !== fire)
                    this.#marioDies()
                }
                this.world.tiles.forEach(tiles => {
                    if (['left', 'right', 'top', 'bottom'].some(side => collision[side](fire, tiles))) {
                        this.world.chars = this.world.chars.filter(char => char !== fire)
                    }
                })
            })

        })
    }

    // Method `endPipe()`
    // Transports to a new world on collision with pipe.
    // lastGround: The ground where the endPipe is (usually the last one)
    // pipeType: The type of pipe depending on which world were transporting from
    // newWorld: The new world were transporting to.
    
    endPipe(oldWorld, lastGround, pipeType, newWorld, xPos, yPos) {
        if (collision.top(player, lastGround)) { // checking if mario is on the ground
            this.world.tiles.filter(t => t.type[0] == pipeType).forEach(endPipe => {
                if (player.pos.x >= endPipe.pos.x + 20) {
                   
                    if(endPipe.audio) {
                        audio.playAudio(audio.sound.pipe)
                        endPipe.audio = false
                        if(newWorld === w1_2World) {
                            audio.playBackgroundMusic(false)
                            audio.currentMusic = audio.music.underground
                        } else if (newWorld === w1_2End) {
                            audio.playBackgroundMusic(false)
                            audio.currentMusic = null
                        }
                    }
                    oldWorld.hasTransported = true
                    player.disable = true
                    genLogic.world = newWorld
                    player.pos.y = xPos
                    player.pos.x = yPos

                    if (player.vel.y == 1.5 || player.vel.y == 0) {
                        player.disable = false
                    }
                }
            })
        }

    }

    spawn = (xCor) => {
        genLogic.world.tiles.forEach(t => t.pos.x += xCor)
        genLogic.world.chars.forEach(c => c.pos.x += xCor)
    }

    gameReset() {
        if (player.pos.y >= cvs.height) {
            setTimeout(() => {
                this.deathAud = true
                this.active = true
                this.world.init()
                cam.vel.x = 0
                player.init() // reset player properties
                cs.goomba.animation.staggerFrames = 84 // resets the speed of the goomba animation
                keys.right.pressed = false
                keys.left.pressed = false
                player.defaultState()
                this.spawn(0)
            }, 3000)
        }
    }

    update() {
        this.koopaWeakness()
        this.koopa()
        this.megaMushroom()
        this.fireFlower()

        this.physics()
        this.gameReset()
    }
}

genLogic = new GenLogic()