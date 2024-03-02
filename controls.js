const controls = () => {
    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowUp':
                if (player.vel.y == 0 && player.disable == false) {
                    audio.playAudio(audio.sound.marioJump)
                    player.mState.isJumping = true;
                    player.vel.y -= 25;
                }
                break;
            case 'ArrowLeft':
                if (keys.right.pressed === false && player.disable == false) {
                    player.mState.isIdle = false;
                    player.mState.isMoving = true;
                    player.mState.isLeft = true;
                    player.mState.isRight = false;
                    keys.left.pressed = true;
                }
                break;
            case 'ArrowRight':
                if (keys.left.pressed === false && player.disable == false) {
                    player.mState.isIdle = false;
                    player.mState.isMoving = true;
                    player.mState.isLeft = false;
                    player.mState.isRight = true;
                    keys.right.pressed = true;
                }
                break;

            case 'x': 
                if (player.disable == false && player.powerUp.fire) {
                    audio.playAudio(audio.sound.fireball)
                    player.shootFire()
                }
        }
    });

    document.addEventListener('keyup', (e) => {
        switch (e.key) {
            case 'ArrowUp':
                break;
            case 'ArrowLeft':
                if (keys.right.pressed === false && player.disable == false) {
                    player.mState.isIdle = true;
                    player.mState.isMoving = false;
                    player.mState.isLeft = true;
                    player.mState.isRight = false;
                    keys.left.pressed = false;
                }
                break;
            case 'ArrowRight':
                if (keys.left.pressed === false && player.disable == false) {
                    player.mState.isIdle = true;
                    player.mState.isMoving = false;
                    player.mState.isLeft = false;
                    player.mState.isRight = true;
                    keys.right.pressed = false;
                }
                break;
        }
    });
}

controls()