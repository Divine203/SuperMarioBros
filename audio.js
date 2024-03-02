class gameAudio {
    constructor() {
        this.refresh = true
        this.soundPath = './audio/'
        this.musicPath = './audio/music/'

        this.music = {
            openWorld: new Audio(`${this.musicPath}01. Ground Theme.mp3`),
            underground: new Audio(`${this.musicPath}02. Underground Theme.mp3`)
        }

        this.currentMusic = this.music.openWorld

        this.sound = {
            marioJump: {
                file: new Audio(`${this.soundPath}smb_jump-small.wav`),
                volume: 0.4
            },
            coin: {
                file: new Audio(`${this.soundPath}smb_coin.wav`),
                volume: 0.4
            },
            breakBlock: {
                file: new Audio(`${this.soundPath}smb_breakblock.wav`),
                volume: 0.6
            },
            bump: {
                file: new Audio(`${this.soundPath}smb_bump.wav`),
                volume: 0.4
            },
            kick: {
                file: new Audio(`${this.soundPath}smb_kick.wav`),
                volume: 0.4
            },
            flag: {
                file: new Audio(`${this.soundPath}smb_flagpole.wav`),
                volume: 0.4
            },
            fireball: {
                file: new Audio(`${this.soundPath}smb_fireball.wav`),
                volume: 0.4
            },
            pipe: {
                file: new Audio(`${this.soundPath}smb_pipe.wav`),
                volume: 0.4
            },
            powerupAppears: {
                file: new Audio(`${this.soundPath}smb_powerup_appears.wav`),
                volume: 0.4
            },
            powerup: {
                file: new Audio(`${this.soundPath}smb_powerup.wav`),
                volume: 0.4
            },
            bowserFire: {
                file: new Audio(`${this.soundPath}smb_bowserfire.wav`),
                volume: 0.4
            },
            bowserFalls: {
                file: new Audio(`${this.soundPath}smb_bowserfalls.wav`),
                volume: 0.4
            },
            worldClear: {
                file: new Audio(`${this.soundPath}smb_world_clear.wav`),
                volume: 0.4
            },
            died: {
                file: new Audio(`${this.musicPath}08. Lost a Life.mp3`),
                volume: 0.6
            } 

        }
    }

    playAudio = (audio_file) => {
        audio_file.file.volume = audio_file.volume
        audio_file.file.play();
        if (!audio_file.file.ended || !audio_file.file.paused) {
            audio_file.file.currentTime = 0;
            audio_file.file.play();
        }
    }
    
    
    playBackgroundMusic = (bool) => {
        if (bool && genLogic.active) {
            this.currentTime = 0;
            this.currentMusic.volume = 0.8;
            this.currentMusic.play();
    
            this.currentMusic.addEventListener('ended', function () {
                this.playBackgroundMusic(true);
            });
        }
        else this.currentMusic.pause()
    
    }
}


let audio = new gameAudio()

