class Collision {
    constructor() { }

    #topVar(char, object, num) {
        return (char.pos.y + char.height <= object.pos.y - num &&
            char.pos.y + char.height + char.vel.y >= object.pos.y - num &&
            char.pos.x + char.width >= object.pos.x &&
            char.pos.x <= object.pos.x + object.width)
    }

    top(char, object) {
        if (this.#topVar(char, object, 4)) return true
        if (this.#topVar(char, object, 3)) return true
        if (this.#topVar(char, object, 2)) return true
        if (this.#topVar(char, object, 1)) return true
        if (this.#topVar(char, object, 0)) return true
    }

    left(char, object) {
        return (char.pos.x + char.width >= object.pos.x &&
            char.pos.x + char.width + char.vel.x <= object.pos.x + object.width &&
            char.pos.y + char.height >= object.pos.y &&
            char.pos.y <= object.pos.y + object.height)
    }

    right(char, object) {
        return (char.pos.x <= object.pos.x + object.width &&
            char.pos.x + char.vel.x >= object.pos.x &&
            char.pos.y + char.height >= object.pos.y &&
            char.pos.y <= object.pos.y + object.height)
    }

    bottom(char, object) {
        return (char.pos.y >= object.pos.y + object.height &&
            char.pos.y + char.vel.y <= object.pos.y + object.height &&
            char.pos.x + char.width >= object.pos.x &&
            char.pos.x <= object.pos.x + object.width)
    }
}

const collision = new Collision()


const addPhysics = (char, platform) => {
    if (collision.top(char, platform)) {
        char.pos.y = (platform.pos.y - char.height) - 1
        char.vel.y = 0
    }
    if (collision.left(char, platform)) {
        char.vel.x = 0
        if(char == player) cam.vel.x = 0
        if(!collision.bottom(char, platform) == false) char.pos.x = (platform.pos.x - char.width) - 1
        if (keys.left.pressed && char == player) player.vel.x = -10
    }
    if (collision.right(char, platform)) {
        char.vel.x = 0
        if(char == player) cam.vel.x = 0
        if(!collision.bottom(char, platform) == false) char.pos.x = (platform.pos.x + platform.width) + 1
        if (keys.right.pressed && char == player) player.vel.x = 10
    }
    if (platform.underPhysics) {
        if (collision.bottom(char, platform)) {
            char.vel.y = 0
            if(platform.isPlatform && platform.isBreakable === false && platform.bouncy) {
                platform.shouldBounce = true
                platform.isBounceUp = true
            } else if (platform.isPlatform && platform.isBreakable) {
                // remove the tile from the world
                audio.playAudio(audio.sound.breakBlock)
                genLogic.world.tiles = genLogic.world.tiles.filter(t => t !== platform)
                platform.particle()
            }
        }
    }
}

