        // Number of objects that can touch the ground before game over
        const maxObjectsTouchedGround = 3;
        let objectsTouchedGround = 0;

       // Collision detection
        function checkCollisions() {
            for (let i = 0; i < items.length; i++) {


                if (items[i].y + items[i].height >= canvas.height) {
                    objectsTouchedGround++;
                    // Remove the object that touched the ground
                    items.splice(i, 1);
                }


                if (
                    player.x < items[i].x + items[i].width + 10 &&
                    player.x + player.width + 10 > items[i].x &&
                    player.y < items[i].y + items[i].height + 10 &&
                    player.y + player.height + 10 > items[i].y
                ) {
                    playCollisionSound();
                }
                if (
                    player.x < items[i].x + items[i].width - 10 &&
                    player.x + player.width - 10 > items[i].x &&
                    player.y < items[i].y + items[i].height - 20 &&
                    player.y + player.height - 20 > items[i].y
                ) {
                    items.splice(i, 1);
                    score++;

                    // Update high score if the current score is higher
                    if (score > highScore) {
                        highScore = score;
                    }
                }
            }
        }

        // Function to play the collision sound
        function playCollisionSound() {
            const collisionSound = document.getElementById('collisionSound');
            collisionSound.playbackRate = 2; // Increase the playback rate (adjust the value as needed)
            collisionSound.play();
        }