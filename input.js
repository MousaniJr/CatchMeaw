// update the input.js file with the code:
// Keydown and Keyup event handlers for player movement
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

let rightPressed = false;
let leftPressed = false;
let isJumpButtonPressed = false;

// Load the walking spritesheet
walkingSpritesheet = new Image();
walkingSpritesheet.src = 'media/combined_sprite_Walking.png';
walkingSpritesheet.onload = function() {
    spritesheetLoaded = true;
    console.log('Walking spritesheet loaded successfully');
};

function keyDownHandler(event) {
    if (event.keyCode === 39 || event.key === "d" || event.key === "D") {
        rightPressed = true;
        leftPressed = false;
        facingRight = true;

    } else if (event.keyCode === 37 || event.key === "a" || event.key === "A") {
        leftPressed = true;
        rightPressed = false;
        facingRight = false;

    } else if (event.code === 'Space' || event.key === "w" || event.key === "W") {
        // Check if the player is not already jumping
        if (!isJumping) {
            isJumping = true;
            playerJump();
        }
      }
}

function keyUpHandler(event) {
    if (event.keyCode === 39 || event.key === "d" || event.key === "D") {
        rightPressed = false;
    } else if (event.keyCode === 37 || event.key === "a" || event.key === "A") {
        leftPressed = false;
    }
}

// Touch event handling
let touchStartX = 0;
let touchMovedX = 0;

gameCanvas.addEventListener('touchstart', function(event) {
    // Prevent default touch behavior (e.g., scrolling)
    event.preventDefault();

    // Get the X-coordinate of the touch
    touchStartX = event.touches[0].clientX;
    touchMovedX = touchStartX;

    // Determine if touch is on the left or right side of the screen
    const halfScreenWidth = gameCanvas.width / 2;
    if (touchStartX < halfScreenWidth) {
        leftPressed = true;
        rightPressed = false;
        facingRight = false;
    } else {
        rightPressed = true;
        leftPressed = false;
        facingRight = true;
    }
});

gameCanvas.addEventListener('touchmove', function(event) {
    // Prevent default touch behavior (e.g., scrolling)
    event.preventDefault();

    // Update touchMovedX with the current X-coordinate of the touch
    touchMovedX = event.touches[0].clientX;

    // Determine the horizontal movement direction of the finger
    const movementX = touchMovedX - touchStartX;
    if (movementX < 0) {
        leftPressed = true;
        rightPressed = false;
        facingRight = false;
    } else {
        rightPressed = true;
        leftPressed = false;
        facingRight = true;
    }
});

gameCanvas.addEventListener('touchend', function(event) {
    // Prevent default touch behavior (e.g., scrolling)
    event.preventDefault();

    // Reset movement flags when touch ends
    leftPressed = false;
    rightPressed = false;
});

// Touch event handling for the jump button
const jumpButton = document.getElementById('jumpButton');
jumpButton.addEventListener('touchstart', function (event) {
  // Prevent default touch behavior (e.g., scrolling)
  event.preventDefault();

  // Set the jump button as pressed
  isJumpButtonPressed = true;

  // Change the jump button image to btnJumpON.png
  jumpButton.src = 'media/btnJumpON.png';

  // Perform the jump action when the button is pressed
  if (!isJumping) {
    isJumping = true;
    playerJump();
  }
});

jumpButton.addEventListener('touchend', function (event) {
  // Prevent default touch behavior (e.g., scrolling)
  event.preventDefault();

  // Set the jump button as not pressed
  isJumpButtonPressed = false;

  // Change the jump button image back to btnJumpOFF.png
  jumpButton.src = 'media/btnJumpOFF.png';
});