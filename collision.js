//update the collision.js with the code:
// Function to check if two rectangles are colliding
function areRectanglesColliding(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}

// Collision detection
function checkCollisions() {

    const playerRect = {
        x: player.x + player.width * 0.5, // Reduce the width by 50%
        y: player.y + player.height * 0.5, // Reduce the height by 50%
        width: player.width * 0.5, // 50% of the original width
        height: player.height * 0.5 // 50% of the original height
    };

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const itemRect = {
            x: item.x - 10, // Add a buffer zone of 10 pixels around the item
            y: item.y - 10,
            width: item.width + 20,
            height: item.height + 20
        };

        // Check for collision between player and item rectangle
        if (areRectanglesColliding(playerRect, itemRect)) {
            playCollisionSound();
            items.splice(i, 1);
            score++;

            // Update high score if the current score is higher
            if (score > highScore) {
                highScore = score;
            }
        }

        // Count when at least half of the item's height touches the ground
        if (item.y + item.height / 2 >= canvas.height) {
            objectsTouchedGround++;
            // Remove the object that touched the ground
            playGroundCollision();
            items.splice(i, 1);

            // Reduce player's life and update heart images
            playerLife--;
            updateHeartImages();

        }
    }
}

// Function to update heart images based on player's life
function updateHeartImages() {
    const heartsContainer = document.getElementById('heartsContainer');
    const heart1 = document.getElementById('heart1');
    const heart2 = document.getElementById('heart2');
    const heart3 = document.getElementById('heart3');

    switch (playerLife) {
        case 3:
            heart1.src = 'media/fullheart.png';
            heart2.src = 'media/fullheart.png';
            heart3.src = 'media/fullheart.png';
            break;
        case 2:
            heart1.src = 'media/emptyheart.png';
            heart2.src = 'media/fullheart.png';
            heart3.src = 'media/fullheart.png';
            break;
        case 1:
            heart1.src = 'media/emptyheart.png';
            heart2.src = 'media/emptyheart.png';
            heart3.src = 'media/fullheart.png';
            break;
        case 0:
            heart1.src = 'media/emptyheart.png';
            heart2.src = 'media/emptyheart.png';
            heart3.src = 'media/emptyheart.png';
            break;
        default:
            break;
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