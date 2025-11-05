//update the game_over.js with the code:
// Function to display "GAME OVER" text and the restart button
function showGameOver() {

    // Show GAME OVER text in the middle of the display with a shadow
    ctx.fillStyle = 'red';
    ctx.font = 'bold 60px Arial';
    ctx.shadowColor = 'black';
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    const gameOverText = 'GAME OVER';
    const textWidth = ctx.measureText(gameOverText).width;
    const textX = (canvas.width - textWidth) / 2;
    const textY = canvas.height * 0.25;
    ctx.fillText(gameOverText, textX, textY);

    // Show final score
    ctx.fillStyle = 'yellow';
    ctx.font = 'bold 36px Arial';
    ctx.shadowColor = 'black';
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    const finalScoreText = 'Final Score: ' + score;
    const finalScoreWidth = ctx.measureText(finalScoreText).width;
    ctx.fillText(finalScoreText, (canvas.width - finalScoreWidth) / 2, canvas.height * 0.38);

    // Show statistics
    ctx.fillStyle = 'white';
    ctx.font = 'bold 24px Arial';

    const stats = [
        'High Score: ' + highScore,
        'Total Catches: ' + totalCatches,
        'Best Combo: ' + maxCombo + 'x'
    ];

    for (let i = 0; i < stats.length; i++) {
        const statWidth = ctx.measureText(stats[i]).width;
        ctx.fillText(stats[i], (canvas.width - statWidth) / 2, canvas.height * 0.48 + i * 35);
    }

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

    // Reset combo system variables
    combo = 0;
    maxCombo = 0;
    comboMultiplier = 1;
    totalCatches = 0;
    scorePopups = [];
    particles = [];

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

