// update the game.js file with the code:
// Set up the game canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Check if the device is a mobile device
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// Set canvas width and height to full screen if on a mobile device
if (isMobile) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Disable scrolling on mobile devices to prevent unwanted scrolling in the game
    document.body.style.overflow = 'hidden';
}
// Define game variables and objects
const playerWidth = canvas.width * 0.18; // 18% of canvas width
const playerHeight = canvas.height * 0.18; // 18% of canvas height
const playerSpeed = original_speed * canvas.width; // 0.5% of canvas width

let player = {
    width: playerWidth,
    height: playerHeight,
    speed: playerSpeed,
    x: canvas.width * 0.5 - playerWidth / 2, // Centered horizontally
    y: canvas.height - playerHeight + 18, // Adjust this value to position the player on the ground
};

let playerImage = new Image();
playerImage.src = 'media/player-right00.png';

// Set Borders limit to the player
const canvasLeftBoundary = 0;
const canvasRightBoundary = canvas.width - player.width;