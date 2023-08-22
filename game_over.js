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
    const textY = canvas.height * 0.3;
    ctx.fillText(gameOverText, textX, textY);

//    // Reset the shadow settings to avoid affecting other elements
//    ctx.shadowColor = 'transparent';
//    ctx.shadowOffsetX = 0;
//    ctx.shadowOffsetY = 0;

    // Show High Score text in the middle of the display with a shadow
    ctx.fillStyle = 'white';
    ctx.font = 'bold 30px Arial';
    ctx.shadowColor = 'black'; // Set the shadow color to black
    ctx.shadowOffsetX = 3; // Set the horizontal shadow offset
    ctx.shadowOffsetY = 3; // Set the vertical shadow offset
    const gameOverHS = 'Your Highest Score: ' + highScore;
    const HStextWidth = ctx.measureText(gameOverHS).width;
    const HSx = (canvas.width - HStextWidth) / 2;
    const HSy = canvas.height * 0.45;
    ctx.fillText(gameOverHS, HSx, HSy);

    // Show the restart button
    const restartButton = document.getElementById('restartButton');
    restartButton.style.display = 'block';
    restartButton.style.position = 'absolute';

    // Show the shareContainer
    const shareButton = document.getElementById('shareContainer');
    shareButton.style.display = 'block';
    shareButton.style.position = 'absolute';

}

// Event listener for the restart button
const restartButton = document.getElementById('restartButton');
restartButton.addEventListener('click', resetGame);

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
    shareContainer.style.display = 'none';

    // Request the next animation frame to restart the game loop
    requestAnimationFrame(updateGame);
}

// Event listener for the shareXButton
const shareXButton = document.getElementById('shareXButton');
// Attach the click event listener to the X share button
shareXButton.addEventListener('click', shareScore);

function shareScore() {
    const tweetText = `I scored ${highScore} points in the game CatchMeaw! Check it out! #GameScore`;  // Modify the text as needed
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;

    // Open a new window to share the score on Twitter
    window.open(tweetUrl, '_blank');
}

// Get the Instagram share button element
const shareInstaButton = document.getElementById('shareInstaButton');
// Attach the click event listener to the Instagram share button
shareInstaButton.addEventListener('click', shareOnInstagram);

// Function to handle Instagram share
function shareOnInstagram() {
    const instahighScore = highScore; // Replace with your actual high score
    const shareURL = `https://www.instagram.com/?highscore=${instahighScore}`; // Replace with your Instagram profile link and parameter
    window.open(shareURL, '_blank');
}

