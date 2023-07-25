// Collision detection
function checkCollisions() {
    for (let i = 0; i < items.length; i++) {

        // Count when at least half of the item's height touches the ground
        if (items[i].y + items[i].height / 2 >= canvas.height)
        {
            objectsTouchedGround++;
            // Remove the object that touched the ground
            playGroundCollision()
            items.splice(i, 1);
        }

        // + 10px to sync the audio
        if (
            player.x < items[i].x + items[i].width + 10 &&
            player.x + player.width + 10 > items[i].x &&
            player.y < items[i].y + items[i].height + 10 &&
            player.y + player.height + 10 > items[i].y
        ) {
            playCollisionSound();
        }

        // count when the player touch the item
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
    collisionSound.playbackRate = 1; // Increase the playback rate (adjust the value as needed)
    collisionSound.volume = 1; // Set the volume to 0.8 (80% of the maximum volume)
    collisionSound.play();
}

// Function to play the ground collision
function playGroundCollision() {
    const groundCollision = document.getElementById('groundCollision');
    groundCollision.playbackRate = 2; // Increase the playback rate (adjust the value as needed)
    groundCollision.volume = 0.5; // Set the volume to 0.8 (80% of the maximum volume)
    groundCollision.play();
}