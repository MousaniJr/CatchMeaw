// Set up the game canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Define game variables and objects
let player = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    width: 80,
    height: 50,
    speed: 3
};

let playerImage = new Image();
playerImage.src = 'player-right.png'; // Replace with the actual path to the right player image

// Set Borders limit to the player
const canvasLeftBoundary = 0;
const canvasRightBoundary = canvas.width - player.width;