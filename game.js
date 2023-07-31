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
let player = {
    x: canvas.width * 0.5, // 50% of canvas width
    y: canvas.height - (canvas.height * 0.08), // Placed at the bottom of the canvas
    width: canvas.width * 0.08, // 8% of canvas width
    height: canvas.height * 0.08, // 8% of canvas height
    speed: 0.005 * canvas.width // 0.5% of canvas width
};

let playerImage = new Image();
playerImage.src = 'media/player-right.png'; // Replace with the actual path to the right player image

// Set Borders limit to the player
const canvasLeftBoundary = 0;
const canvasRightBoundary = canvas.width - player.width;