//update the input.js file with the code:
// Keydown and Keyup event handlers for player movement
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

let rightPressed = false;
let leftPressed = false;

function keyDownHandler(event) {
    if (event.keyCode === 39) {
        rightPressed = true;
        leftPressed = false;
        playerImage.src = 'media/player-right.png'; // Replace with the actual path to the right player image
    } else if (event.keyCode === 37) {
        leftPressed = true;
        rightPressed = false;
        playerImage.src = 'media/player-left.png'; // Replace with the actual path to the left player image
    } else if (event.code === 'Space') {
        // Check if the player is not already jumping
        if (!isJumping) {
            isJumping = true;
            playerJump();
        }
      }
}

function keyUpHandler(event) {
    if (event.keyCode === 39) {
        rightPressed = false;
    } else if (event.keyCode === 37) {
        leftPressed = false;
    }
}

// Touch event handling
//const gameCanvas = document.getElementById('gameCanvas');
let touchStartX = 0;

gameCanvas.addEventListener('touchstart', function(event) {
    // Prevent default touch behavior (e.g., scrolling)
    event.preventDefault();

    // Get the X-coordinate of the touch
    touchStartX = event.touches[0].clientX;

    // Determine if touch is on the left or right side of the screen
    const halfScreenWidth = gameCanvas.width / 2;
    if (touchStartX < halfScreenWidth) {
        leftPressed = true;
        rightPressed = false;
        playerImage.src = 'media/player-left.png'; // Replace with the actual path to the left player image
    } else {
        rightPressed = true;
        leftPressed = false;
        playerImage.src = 'media/player-right.png'; // Replace with the actual path to the right player image
    }
});

gameCanvas.addEventListener('touchend', function(event) {
    // Prevent default touch behavior (e.g., scrolling)
    event.preventDefault();

    // Reset movement flags when touch ends
    leftPressed = false;
    rightPressed = false;
});