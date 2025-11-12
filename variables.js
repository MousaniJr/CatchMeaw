//update the variables.js file with the code:
// Define the variables
let debug = 0;

let items = []; //falling items (rats)
let score = 0;
let highScore = 0;

let original_speed = 0.005

//collision.js
const maxObjectsTouchedGround = 3;// Number of objects that can touch the ground before game over
let objectsTouchedGround = 0;

// Combo system variables
let combo = 0;
let maxCombo = 0;
let comboMultiplier = 1;
let totalCatches = 0;

// Score popup system
let scorePopups = [];

// Particle system
let particles = [];

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

// Variable to track player's jump state
let isJumping = false;

let isGameRunning = false;

let debuffed = false;
let buffed = false;

// Spritesheet animation variables
let walkingSpritesheet = null;
let spritesheetLoaded = false;
const SPRITE_COLS = 4;
const SPRITE_ROWS = 3;
const SPRITE_FRAMES = 12;
let currentFrame = 0;
let animationTimer = 0;
const ANIMATION_SPEED = 80; // milliseconds per frame (default)
let currentAnimationSpeed = 80; // Current animation speed (can be modified by buffs/debuffs)
let facingRight = true; // Track player direction



