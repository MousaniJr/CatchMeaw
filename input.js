// update the input.js file with the code:
// Keydown and Keyup event handlers for player movement
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

let rightPressed = false;
let leftPressed = false;
let isJumpButtonPressed = false;

//let currentPlayerImage = 'media/player-right.png'; // Initial player image

const playerImagesRight = [
    'media/player-right00.png', // Replace with actual image paths
    'media/player-right01.png', // Replace with actual image paths
    'media/player-right02.png',  // Replace with actual image paths
    'media/player-right03.png',  // Replace with actual image paths
    'media/player-right04.png',  // Replace with actual image paths
    'media/player-right05.png',  // Replace with actual image paths
    'media/player-right06.png',  // Replace with actual image paths
    'media/player-right07.png'  // Replace with actual image paths
];
let currentRightImageIndex = 0;
let rightImageChangeTimer = null; // Timer for right movement image change


const playerImagesLeft = [
    'media/player-left00.png', // Replace with actual image paths
    'media/player-left01.png', // Replace with actual image paths
    'media/player-left02.png',  // Replace with actual image paths
    'media/player-left03.png',  // Replace with actual image paths
    'media/player-left04.png',  // Replace with actual image paths
    'media/player-left05.png',  // Replace with actual image paths
    'media/player-left06.png',  // Replace with actual image paths
    'media/player-left07.png'  // Replace with actual image paths
];
let currentLeftImageIndex = 0;
let leftImageChangeTimer = null; // Timer for left movement image change


// Preload player images
const preloadedImages = [];
[...playerImagesRight, ...playerImagesLeft].forEach((imagePath) => {
    const image = new Image();
    image.src = imagePath;
    preloadedImages.push(image);
});

// Variable to control image change speed
let imageChangeSpeed = player.speed * 25; // Initial speed in milliseconds

function keyDownHandler(event) {
    if (event.keyCode === 39 || event.key === "d" || event.key === "D") {
        rightPressed = true;
        leftPressed = false;

        clearInterval(leftImageChangeTimer); // Clear left image change timer

        if (!rightImageChangeTimer) {
            rightImageChangeTimer = setInterval(changeRightImage, imageChangeSpeed); // Set interval for image change
        }

    } else if (event.keyCode === 37 || event.key === "a" || event.key === "A") {
        leftPressed = true;
        rightPressed = false;

        clearInterval(rightImageChangeTimer); // Clear right image change timer

        if (!leftImageChangeTimer) {
            leftImageChangeTimer = setInterval(changeLeftImage, imageChangeSpeed); // Set interval for image change
        }

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

        clearInterval(rightImageChangeTimer); // Clear right image change timer
        rightImageChangeTimer = null;

    } else if (event.keyCode === 37 || event.key === "a" || event.key === "A") {
        leftPressed = false;

        clearInterval(leftImageChangeTimer); // Clear left image change timer
        leftImageChangeTimer = null;

    }
}

function changeRightImage() {
    playerImage.src = playerImagesRight[currentRightImageIndex];
    currentRightImageIndex = (currentRightImageIndex + 1) % playerImagesRight.length;
}

function changeLeftImage() {
    playerImage.src = playerImagesLeft[currentLeftImageIndex];
    currentLeftImageIndex = (currentLeftImageIndex + 1) % playerImagesLeft.length;
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
        playerImage.src = 'media/player-left00.gif'; // Replace with the actual path to the left player image
    } else {
        rightPressed = true;
        leftPressed = false;
        playerImage.src = 'media/player-right00.png'; // Replace with the actual path to the right player image
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
        playerImage.src = 'media/player-left00.gif'; // Replace with the actual path to the left player image
    } else {
        rightPressed = true;
        leftPressed = false;
        playerImage.src = 'media/player-right00.png'; // Replace with the actual path to the right player image
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