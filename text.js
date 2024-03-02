class Texts {
    constructor({text, x, y, fontFamily, size, color}) {
        this.text = text
        this.pos = {
            x: x, 
            y: y
        }
        this.fontFamily = fontFamily
        this.size = size
        this.color = color
    }

    write() {
        ctx.fillStyle = this.color
        ctx.font = `${this.size}px ${this.fontFamily}`
        ctx.fillText(this.text, this.pos.x, this.pos.y)
    }

    update() {
        this.write()
    }
}