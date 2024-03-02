// src: https://www.mariouniverse.com/sprites-nes-smb/

class TileSprites {
    
    constructor() {
        this.sheet = new Image()
        this.sheet.src = './spriteSheets/tiles_big.png';

        this.tile1Ground = this.#createSprite(0, 0, 160, 160, 45);
        this.tile1Ground__blue = this.#createSprite(0, 320, 160, 160, 45);
        this.tile2PipeHead = this.#createSprite(0, 1280, 320, 160, 48);
        this.tile2PipeHead__blue = this.#createSprite(0, 1600, 320, 160, 48);
        this.tile2PipeBody = this.#createSprite(0, 1440, 320, 160, 48);
        this.tile2PipeBody__blue = this.#createSprite(0, 1760, 320, 160, 48);
        this.tile2PipeRight__blue = this.#createSprite(320, 1600, 390, 320, 90);
        this.tile2PipeRight = this.#createSprite(320, 1280, 390, 320, 90);
        this.tile3Brick = this.#createSprite(160, 0, 160, 155, 45);
        this.tile3Brick__blue = this.#createSprite(160, 330, 160, 150, 45);
        this.tile4Mystery = this.#createSpriteAnimation(3840, 0, 160, 155, 45, true, 3, 135, 160);
        this.tile4Mystery__blue = this.#createSpriteAnimation(3840, 320, 160, 155, 45, true, 3, 65, 160);
        this.tile5Box = this.#createSprite(0, 160, 160, 160, 45)
        this.tile5Box__blue = this.#createSprite(0, 480, 160, 160, 45)
        this.tile6Blank = this.#createSprite(480, 0, 160, 160, 45)
        this.tile6Blank__blue = this.#createSprite(4480, 320, 160, 160, 45)
        this.brickParticle = this.#createSprite(2280, 240, 80, 80, 12)
        this.brickParticle__blue = this.#createSprite(2280, 560, 80, 80, 12)
        this.floatingPlatform = this.#createSprite(4640, 320, 80, 80, 22)

         // props
         this.flag = this.#createSprite(4160, 1280, 160, 160, 45)
         this.flagPoleHead = this.#createSprite(2560, 1360, 160, 160, 45)
         this.flagPoleBody = this.#createSprite(2560, 1440, 160, 160, 45)
         this.castle = this.#createSprite(1760, 3200, 790, 790, 225)
         this.coin = this.#createSpriteAnimation(3840, 160, 160, 160, 45, true, 2, 7, 160)
         this.coin__blue = this.#createSpriteAnimation(3840, 480, 160, 160, 45, true, 2, 242, 160)
         this.coin2 = this.#createSpriteAnimation(4640, 0, 100, 160, 35, true, 2, 4, 160)
    }


    #createSprite(sX, sY, cropWidth, cropHeight, scale) {
        return {
            sX,
            sY,
            cropWidth,
            cropHeight,
            scale,
            animate: false,
        };
    }

    #createSpriteAnimation(sX, sY, cropWidth, cropHeight, scale, animate, frames, staggerFrames, frameCut) {
        return {
            sX,
            sY,
            cropWidth,
            cropHeight,
            scale,
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

const ts = new TileSprites()