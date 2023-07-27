//update the variables.js file with the code:
// Define the variables
let debug = 0;

let items = []; //falling items (rats)
let score = 0;
let highScore = 0;

//collision.js
const maxObjectsTouchedGround = 3;// Number of objects that can touch the ground before game over
let objectsTouchedGround = 0;

//update_game.js
const maxFPS = 60; //set max fps
const frameTime = 1000 / maxFPS; //set max fps

// Variable to keep track of the last timestamp and count frames
let lastTimestamp = 0;
let frameCount = 0;
let lastFPSUpdate = 0;
let currentFPS = 0;
const fpsUpdateInterval = 500; // Update FPS every 500ms (0.5 seconds)

let musicTurnedOff = false; //control if the music was paused

// Initialize the game state (paused initially)
let isGamePaused = true;
let gameStarted = false;

let playerLife = 3;
//gameOver = false;

// New variable to track player's jump state
let isJumping = false;

let isGameRunning = false;
