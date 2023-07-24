// Get references to the necessary DOM elements
const startButton = document.getElementById('startButton');
const mainMenuContainer = document.getElementById('mainMenuContainer');
const gameCanvas = document.getElementById('gameCanvas');

// Add a click event listener to the start button
startButton.addEventListener('click', startGame);

// Initialize the game state (paused initially)
let isGamePaused = true;

function startGame() {
    // Hide the main menu container
    mainMenuContainer.style.display = 'none';

    // Unpause the game
    isGamePaused = false;

    // Start generating falling items ms
    setInterval(createItem, 2500);

    // Start the game loop
    requestAnimationFrame(updateGame);
}