// src: https://www.mariouniverse.com/sprites-nes-smb/

class CharSprites {
    constructor() {
        this.sheet = new Image()
        this.sheet.src = './spriteSheets/characters_big.png';

        this.marioIdleRight = this.#createSprite(2765, 440, 139, 160);
        this.marioIdleLeft = this.#createSprite(2235, 440, 139, 160);
        this.marioJumpRight = this.#createSprite(3560, 440, 150, 160);
        this.marioJumpLeft = this.#createSprite(1420, 440, 150, 160);
        this.marioRunRight = this.#createSpriteAnimation(2920, 440, 139, 160, true, 2, 7, 145);
        this.marioRunLeft = this.#createSpriteAnimation(1777, 440, 139, 160, true, 2, 7, 145);
        this.marioDead = this.#createSprite(4860, 440, 139, 160);
        this.marioClimb = this.#createSprite(3888, 440, 139, 160);

        this.megaMushroom = this.#createSprite(4100, 3360, 160, 160);

        this.goomba = this.#createSpriteAnimation(2960, 1870, 160, 160, true, 1, 84, 190);
        this.goombaDead = this.#createSprite(2768, 1870, 160, 160);
        this.goombaFlip = this.#createSprite(3704, 1870, 160, 160);
        this.goomba_blue = this.#createSpriteAnimation(2388, 1870, 160, 160, true, 1, 87, 190);
        this.goombaDead_blue = this.#createSprite(2198, 1870, 160, 160);
        this.goombaFlip_blue = this.#createSprite(1065, 1870, 160, 160);

        this.piranhaPlant = this.#createSpriteAnimation(1248, 1800, 160, 230, true, 1, 17, 190);
        this.piranhaPlant_blue = this.#createSpriteAnimation(3338, 1800, 160, 230, true, 1, 47, 190);
        this.fireFlower =  this.#createSpriteAnimation(508, 3680, 158, 158, true, 3, 7, 160)
        this.marioFire = this.#createSprite(4758, 3520, 80, 80)
        this.koopaRight = this.#createSpriteAnimation(2958, 2060, 160, 240, true, 1, 14, 190)
        this.koopaLeft = this.#createSpriteAnimation(1817, 2060, 160, 240, true, 1, 14, 190)
        this.koopaShell = this.#createSprite(1438, 2060, 160, 240)
        this.koopaShell_flip = this.#createSpriteAnimation(3528, 2060, 160, 240)

        this.marioIdleRight__big = this.#createSprite(2580, 10, 160, 315);
        this.marioIdleLeft__big = this.#createSprite(2390, 10, 160, 315)
        this.marioJumpRight__big = this.#createSprite(3690, 10, 160, 315)
        this.marioJumpLeft__big = this.#createSprite(1280, 10, 160, 315)
        this.marioRunRight__big = this.#createSpriteAnimation(2960, 10, 160, 315, true, 2, 7, 180);
        this.marioRunLeft__big = this.#createSpriteAnimation(1650, 8, 160, 315, true, 2, 7, 180);
        this.marioCrouchLeft__big = this.#createSprite(2198, 110, 160, 220)
        this.marioCrouchRight__big = this.#createSprite(2768, 110, 160, 220)
        this.marioClimb__big = this.#createSprite(4048, 60, 160, 315)

        this.marioIdleRight__fire = this.#createSprite(2580, 1250, 160, 315)
        this.marioIdleLeft__fire = this.#createSprite(2390, 1250, 160, 315)
        this.marioJumpRight__fire = this.#createSprite(3690, 1250, 160, 315)
        this.marioJumpLeft__fire = this.#createSprite(1280, 1250, 160, 315)
        this.marioRunRight__fire = this.#createSpriteAnimation(2960, 1250, 160, 315, true, 2, 7, 180);
        this.marioRunLeft__fire = this.#createSpriteAnimation(1650, 1250, 160, 315, true, 2, 7, 180);
        this.marioCrouchLeft__fire = this.#createSprite(2198, 1320, 160, 220)
        this.marioCrouchRight__fire = this.#createSprite(2768, 1320, 160, 220)
        this.marioClimb__fire = this.#createSprite(4048, 1270, 160, 315)

        this.marioGrowRight = this.#createSpriteAnimation(23, 1594, 160, 323, true, 4, 7, 168)

        this.bowserOpenRight = this.#createSpriteAnimation(3268, 3680, 320, 320, true, 1, 13, 350)
        this.bowserOpenLeft = this.#createSpriteAnimation(1168, 3680, 320, 320, true, 1, 13, 350)
        this.bowserClosedRight = this.#createSpriteAnimation(2568, 3680, 320, 320, true, 1, 13, 350)
        this.bowserClosedLeft = this.#createSpriteAnimation(1868, 3680, 320, 320, true, 1, 13, 350)
        this.bowserFireLeft = this.#createSprite(4798, 3440, 240, 80)
        this.bowserFireRight = this.#createSprite(3733, 3440, 240, 80)

    }

    #createSprite(sX, sY, cropWidth, cropHeight) {
        return {
            sX,
            sY,
            cropWidth,
            cropHeight,
            animate: false,
        };
    }

    #createSpriteAnimation(sX, sY, cropWidth, cropHeight, animate, frames, staggerFrames, frameCut) {
        return {
            sX,
            sY,
            cropWidth,
            cropHeight,
            animate,
            animation: {
                frames,
                staggerFrames,
                frameCut,
                frameX: 0,
                gameFrame: 0,
            },
        };
    }

    animate(state) {
        if (state.animate) {
            let sa = state.animation
            if (sa.gameFrame % sa.staggerFrames == 0) {
                if (sa.frameX < sa.frames) sa.frameX++
                else sa.frameX = 0
            }

            sa.gameFrame++;
        }
    }
}

const cs = new CharSprites()