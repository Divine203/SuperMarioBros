const cvs = document.querySelector('canvas')
const ctx = cvs.getContext('2d')

const gravity = 1.5
cam = { vel: { x: 0 } }

const arena = {
    pos: {
        x: 0,
        y: 0
    }
}

let player;
let genLogic;
let w1_1World;
let w1_1Logic;
let w1_2World;
let w1_2Logic;
let w1_2End;

const worlds = {
    W1_1: 'w1-1',
    W1_2: 'w1-2',
}

const tileType = {
    GROUND              : 'tile1Ground',
    GROUND_BLUE         : 'tile1Ground__blue',
    PIPEHEAD            : 'tile2PipeHead',
    PIPEHEAD_BLUE       : 'tile2PipeHead__blue',
    PIPEBODY            : 'tile2PipeBody',
    PIPEBODY_BLUE       : 'tile2PipeBody__blue',
    PIPERIGHT           : 'tile2PipeRight',
    PIPERIGHT_BLUE      : 'tile2PipeRight__blue',
    BRICK               : 'tile3Brick',
    BRICK_BLUE          : 'tile3Brick__blue',
    MYSTERY             : 'tile4Mystery',
    MYSTERY_BLUE        : 'tile4Mystery__blue',
    BOX                 : 'tile5Box',
    BOX_BLUE            : 'tile5Box__blue',
    BLANK               : 'tile6Blank',
    BLANK_BLUE          : 'tile6Blank__blue',
    BRICKPARTICLE       : 'brickParticle',
    BRICKPARTICLE_BLUE  : 'brickParticle__blue',
    FLOATINGPLATFORM    : 'floatingPlatform',

    FLAG                : 'flag',
    FLAGPOLE            : 'flagPole',
    FLAGPOLEHEAD        : 'flagPoleHead',
    FLAGPOLEBODY        : 'flagPoleBody',
    CASTLE              : 'castle',
    COIN                : 'coin',
    COIN_BLUE           : 'coin__blue',
    COIN2               : 'coin2'
}

const charType = {
    MEGAMUSHROOM        : 'megaMushroom',
    GOOMBA              : 'goomba',
    GOOMBADEAD          : 'goombaDead',
    GOOMBAFLIP          : 'goombaFlip',
    GOOMBA_BLUE         : 'goomba_blue',
    GOOMBADEAD_BLUE     : 'goombaDead_blue',
    GOOMBAFLIP_BLUE     : 'goombaFlip_blue',

    PIRANHAPLANT        : 'piranhaPlant',
    PIRANHAPLANT_BLUE   : 'piranhaPlant_blue',

    FIREFLOWER          : 'fireFlower',
    MARIOFIRE           : 'marioFire',
    KOOPARIGHT          : 'koopaRight',
    KOOPALEFT           : 'koopaLeft',
    KOOPASHELL          : 'koopaShell',
    KOOPASHELL_FLIP     : 'koopaShell_flip',

    BOWSEROPENRIGHT     : 'bowserOpenRight',
    BOWSEROPENLEFT      : 'bowserOpenLeft',
    BOWSERCLOSEDRIGHT   : 'bowserClosedRight',
    BOWSERCLOSEDLEFT    : 'bowserClosedLeft',
    BOWSERFIRERIGHT     : 'bowserFireRight',
    BOWSERFIRELEFT      : 'bowserFireLeft',
}