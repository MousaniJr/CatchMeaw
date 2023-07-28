//update the main_menu.js with the code:
// Get references to the necessary DOM elements
const startButton = document.getElementById('startButton');
const mainMenuContainer = document.getElementById('mainMenuContainer');
const gameCanvas = document.getElementById('gameCanvas');
const musicToggle = document.getElementById('musicToggle');

// Add a click event listener to the start button
startButton.addEventListener('click', startGame);

// Audio element for background music
const backgroundMusic = document.getElementById('backgroundMusic');

// Preload the bonus item image
const bonusItemImage = new Image();
bonusItemImage.src = 'media/ratBonus.png';

// Variable to keep track of music state (ON/OFF)
let isMusicPlaying = true;

// Function to toggle background music on/off
function toggleBackgroundMusic() {
    if (isMusicPlaying) {
        // Pause background music
        backgroundMusic.pause();
    } else {
        // Play background music
        backgroundMusic.play();
    }
    // Toggle the music state
    isMusicPlaying = !isMusicPlaying;

    // Change the musicON image based on music state
    if (isMusicPlaying) {
        musicToggle.src = "media/musicON.png";
        musicToggle.alt = "Music ON";
        musicTurnedOff = false;
    } else {
        musicToggle.src = "media/musicOFF.png";
        musicToggle.alt = "Music OFF";
        musicTurnedOff = true;
    }
}
// Add a click event listener to the musicToggle image
musicToggle.addEventListener('click', toggleBackgroundMusic);

let itemInterval;

function startGame() {
    // Hide the main menu container
    mainMenuContainer.style.display = 'none';

    // Unpause the game
    isGamePaused = false;

    // Start the game
    isGameRunning = true;

    // Clear any existing item interval (if it exists)
    clearInterval(itemInterval);

    // Start generating falling items every 2500ms (2.5 seconds)
    itemInterval = setInterval(createItem, 2500);

    if (musicTurnedOff == false) {
        // Play background music
        backgroundMusic.play();
        // Reduce background music volume to half
        backgroundMusic.volume = 0.3;
    }

    // Start the game loop
    requestAnimationFrame(updateGame);
}

// Function to pause the game
function pauseGame() {
    // Pause the game
    isGamePaused = true;

    // Clear the item generation interval
    clearInterval(itemInterval);

    // Pause the background music
    backgroundMusic.pause();
}

// Add event listener to detect when the tab becomes active
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible' && isGameRunning == true) {
        // Tab became active, start the game loop
        startGame();
    } else {
        // Tab became inactive, stop the game loop
        pauseGame();
    }
});

// Check if the user is using a mobile device
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Function to show the jump button on mobile devices
function showJumpButton() {
  const jumpButton = document.getElementById('jumpButton');
  if (isMobileDevice()) {
    jumpButton.style.display = 'block';
  } else {
    jumpButton.style.display = 'none';
  }
}

// Call the function to show the jump button on page load
showJumpButton();