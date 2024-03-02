class Tile {
    constructor({ x, y,
        width,
        height,
        underPhysics = true,
        type,
        isPlatform = true,
        bounceRange = 35,
        bounceSpeed = 6,
        index = null,
        isBreakable = false,
        particles,
        isGravity = false,
        bouncy = true
    }) {

        this.pos = {
            x,
            y
        }
        

        this.velY = 0
        this.velX = 0
        this.width = width
        this.height = height
        this.underPhysics = underPhysics
        this.type = type
        this.isPlatform = isPlatform
        this.originY = y

        this.isBounceUp = true
        this.bounceRange = bounceRange
        this.bounceSpeed = bounceSpeed
        this.shouldBounce = false
        this.index = index
        this.isBreakable = isBreakable
        this.particles = particles
        this.isGravity = isGravity
        this.showMysteryItem = true
        this.flagActive = true
        this.bouncy = bouncy
        this.audio = true
    }

    #drawLongObj() {
        let [h, b] = [ts[this.type[0]], ts[this.type[1]]]
        ctx.drawImage(ts.sheet,
            h.sX,
            h.sY,
            h.cropWidth,
            h.cropHeight,
            this.pos.x,
            this.pos.y,
            this.width,
            h.scale
        );
        for (let i = 1; i < this.height / b.scale; i++) {
            ctx.drawImage(ts.sheet,
                b.sX,
                b.sY,
                b.cropWidth,
                b.cropHeight,
                this.pos.x,
                this.pos.y + (b.scale * i),
                this.width,
                b.scale
            );
        }
    }

    #drawTile() {
        let t = ts[this.type[0]]
        const offsetX = t.animate ? t.animation.frameCut * t.animation.frameX : 0;
        for (let j = 0; j < this.height / t.scale; j++) {
            for (let i = 0; i < this.width / t.scale; i++) {
                ctx.drawImage(ts.sheet,
                    t.sX + offsetX,
                    t.sY,
                    t.cropWidth,
                    t.cropHeight,
                    this.pos.x + (t.scale * i),
                    this.pos.y + (t.scale * j),
                    t.scale,
                    t.scale
                );
            }
        }
    }

    bounce() {
        let speed = this.bounceSpeed

        this.velY = -speed
        if (this.pos.y <= this.originY - this.bounceRange) {
            this.isBounceUp = false
        }
        if (this.isBounceUp === false) {
            this.velY = speed
            if (this.pos.y >= this.originY) {
                this.velY = 0
            }
        }
    }

    // Particle Animation for 
    // when brick is destroyed
    particle() {
        const particleSettings = [
            { velX: 5, velY: -17 },
            { velX: 7, velY: -17 },
            { velX: -2, velY: -17 },
            { velX: -6, velY: -17 }
        ];

        particleSettings.forEach(s => {
            const p = new Tile({
                x: this.pos.x,
                y: this.pos.y,
                width: 12,
                height: 12,
                type: [this.particles],
                isPlatform: false,
                isGravity: true
            });
            p.velX = s.velX;
            p.velY = s.velY;
            genLogic.world.tiles.push(p);
        });

        setTimeout(() => {
            genLogic.world.tiles = genLogic.world.tiles.filter(t => !particleSettings.some(s => t.velX === s.velX && t.velY === s.velY));
        }, 1400);
    }
    


    update() {
        if (this.type[0] !== null) {
            if (this.type.length > 1) {
                this.#drawLongObj()
            } else {
                this.#drawTile()
                if (ts[this.type[0]].animate) {
                    ts.animate(ts[this.type[0]])
                }
            }
        }


        if (this.shouldBounce) this.bounce()

        this.pos.x += arena.pos.x
        this.pos.y += arena.pos.y

        this.pos.y += this.velY
        this.pos.x += this.velX

        if(this.isGravity) this.velY += gravity
    }
}
