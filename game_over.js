//update the game_over.js with the code:
// Function to display "GAME OVER" text and the restart button
function showGameOver() {

    // Show GAME OVER text in the middle of the display with a shadow
    ctx.fillStyle = 'red';
    ctx.font = 'bold 60px Arial';
    ctx.shadowColor = 'black'; // Set the shadow color to black
    ctx.shadowOffsetX = 5; // Set the horizontal shadow offset
    ctx.shadowOffsetY = 5; // Set the vertical shadow offset
    const gameOverText = 'GAME OVER';
    const textWidth = ctx.measureText(gameOverText).width;
    const textX = (canvas.width - textWidth) / 2;
    const textY = canvas.height / 2;
    ctx.fillText(gameOverText, textX, textY);

    // Reset the shadow settings to avoid affecting other elements
    ctx.shadowColor = 'transparent';
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Show the restart button
    const restartButton = document.getElementById('restartButton');
    restartButton.style.display = 'block';
    restartButton.style.position = 'absolute';
    restartButton.style.left = 43% 'px';
    restartButton.style.top = 60% + 'px';

}

// Function to reset the game
function resetGame() {
    // Reset the game variables
    score = 0;
    objectsTouchedGround = 0;
    items = [];
    player.x = canvas.width / 2;
    player.y = canvas.height - 50;
    resetHearts(); // Reset the heart images to full hearts
    playerLife = 3;

    // Hide the "GAME OVER" text and restart button
    gameOver = false;
    const restartButton = document.getElementById('restartButton');
    restartButton.style.display = 'none';

    // Request the next animation frame to restart the game loop
    requestAnimationFrame(updateGame);
}

// Event listener for the restart button
const restartButton = document.getElementById('restartButton');
restartButton.addEventListener('click', resetGame);