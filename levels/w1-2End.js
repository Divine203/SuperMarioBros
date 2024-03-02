class W1_2End {
    constructor () {
        this.tiles = []
        this.chars = []
        this.bgColor = '#000'
        this.endAud = true
    }

    init () {
        this.tiles = [
            new Tile({x: 0, y: 476, width: 3675, height: 100, type: [tileType.GROUND]}),
        ] 

        this.chars = []

        this.texts = [
            new Texts({text: 'T H A N K S   F O R    P L A Y I N G   : )', x: 100, y: 100, fontFamily: 'arcadeclassic', size: '24', color: 'white'})
        ]
    }

}

w1_2End = new W1_2End()
w1_2End.init()