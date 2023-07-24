// Get references to the necessary DOM elements
const startButton = document.getElementById('startButton');
const mainMenuContainer = document.getElementById('mainMenuContainer');
const gameCanvas = document.getElementById('gameCanvas');
const musicToggle = document.getElementById('musicToggle');

// Add a click event listener to the start button
startButton.addEventListener('click', startGame);

// Initialize the game state (paused initially)
let isGamePaused = true;

// Audio element for background music
const backgroundMusic = document.getElementById('backgroundMusic');

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
        musicToggle.src = "musicON.png";
        musicToggle.alt = "Music ON";
    } else {
        musicToggle.src = "musicOFF.png";
        musicToggle.alt = "Music OFF";
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

    // Clear any existing item interval (if it exists)
    clearInterval(itemInterval);

    // Start generating falling items every 2500ms (2.5 seconds)
    itemInterval = setInterval(createItem, 2500);

    // Reduce background music volume to half
    backgroundMusic.volume = 0.5;
    // Play background music
    backgroundMusic.play();

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
// Add event listener to handle window focus/blur
window.addEventListener('focus', startGame);
window.addEventListener('blur', pauseGame);