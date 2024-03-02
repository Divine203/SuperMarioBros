const keys = { right: { pressed: false }, left: { pressed: false } }

let cameraYOffset = 0

cvs.width = 1024
cvs.height = 576


arenaWidth = 5120


const moveGame = () => { arena.pos.x = cam.vel.x }

function gameInit() {
    player.pos.x = 150
    arena.pos.x = 0
}

function game() {
    ctx.clearRect(0, 0, cvs.width, cvs.height)
    ctx.fillStyle = genLogic.world.bgColor
    ctx.fillRect(0, 0, cvs.width, cvs.height)
    requestAnimationFrame(game)

    moveGame()

    // ----------------------------------------------------------------- //
    // If your wondering what this monstrousity is XD
    // This is just updating all components of the game.
    // The conditions are for specifying which components should be in front of which components
    // Since the characters and tiles are in seperate arrays, I have to result to this. lol

    genLogic.world.chars.filter(c => c.type === charType.MEGAMUSHROOM || c.type === charType.FIREFLOWER || c.type === charType.PIRANHAPLANT_BLUE).forEach(c => c.update())
    genLogic.world.tiles.filter(t => t.type[0] !== tileType.PIPERIGHT && t.type[0] !== tileType.PIPEHEAD && t.type[0] !== tileType.PIPERIGHT_BLUE).forEach(t => t.update())
    genLogic.world.chars.filter(c => c.type !== charType.MEGAMUSHROOM && c.type !== charType.FIREFLOWER && c.type !== charType.PIRANHAPLANT_BLUE).forEach(c => c.update())

    player.update()

    genLogic.world.tiles.filter(t => t.type[0] == tileType.PIPERIGHT || t.type[0] == tileType.PIPEHEAD || t.type[0] == tileType.PIPERIGHT_BLUE).forEach(t => t.update())
    if(genLogic.world === w1_2End) genLogic.world.texts.forEach(text => text.update())
    // ---------------------------------------------------------------- //

    /******** CAMERA/PLAYER MOVEMENT ***********/
    if (keys.right.pressed) {
        player.vel.x = player.speed
        if (player.isCamLeft() && player.disable === false) {
            player.vel.x = 0
            if (player.camera.pos.x + player.camera.width < arenaWidth) {
                cam.vel.x = -(player.speed)
            }
        }

    } else if (keys.left.pressed) {
        player.vel.x = -player.speed
        if (player.isCamRight() && player.disable === false) {
            player.vel.x = 0
            cam.vel.x = (player.speed)
        }
    } else {
        player.vel.x = 0
        cam.vel.x = 0
    }
    /******** ********************* ***********/

    
    if (genLogic.world === w1_1World) {
        audio.currentMusic = audio.music.openWorld
        w1_1Logic.update()
    } else if (genLogic.world === w1_2World) {
        audio.currentMusic = audio.music.underground
        w1_2Logic.update()
    } else if (genLogic.world === w1_2End) {
        if(genLogic.world.endAud) {
            audio.playAudio(audio.sound.worldClear)
            genLogic.world.endAud = false
        }
        w1_1Logic.update()
    }
    genLogic.update()
  
    audio.playBackgroundMusic(true)   
}


// genLogic.spawn(-10900)
// genLogic.spawn(-8000)
genLogic.spawn(0)   // SPAWN AT THE BEGINING
// genLogic.spawn(-7300)



game()
