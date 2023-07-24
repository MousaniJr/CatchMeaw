// Update and draw the game
function updateGame() {

    // If the game is paused, don't update or render the game
    if (isGamePaused) {
        requestAnimationFrame(updateGame);
        return;
    }

    // Check if the game is over
    if (objectsTouchedGround >= maxObjectsTouchedGround) {
        gameOver = true;
        const restartButton = document.getElementById('restartButton');
        restartButton.style.display = 'block'; // Show the restart button
        showGameOver();
        return; // Pause the game
    }

    // Move the player based on the direction
    if (rightPressed && player.x < canvas.width - player.width) {
        player.x += player.speed;
    } else if (leftPressed && player.x > 0) {
        player.x -= player.speed;
    }

    moveItems(); // Move the falling items

    checkCollisions();

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the player image
    ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);

    // Draw the falling items
    for (let i = 0; i < items.length; i++)
    {
        const itemImage = new Image();
        itemImage.src = 'rat.png'; // Replace with the actual path to your item image
        ctx.drawImage(itemImage, items[i].x, items[i].y, items[i].width, items[i].height);

        //debug
        if (debug == 1)
        {
            ctx.strokeStyle = 'black'; // Set the color of the outline
            ctx.lineWidth = 3; // Set the width of the outline
            ctx.fillStyle = 'red';
            ctx.font = '20px Arial';
            //ctx.fillText('I.Speed: ' + items[i].speed.toFixed(2), items[i].x, items[i].y - 10);
            ctx.strokeText('Item SPD: ' + items[i].speed, 677, 565);
            ctx.fillText('Item SPD: ' + items[i].speed, 677, 565);
        }
    }

    // Display the background Score
    ctx.fillStyle = 'white';
    ctx.fillRect(5, 8, 100, 30);

    // Draw the Score
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 30);

    // Display the background High score
    ctx.fillStyle = 'white';
    ctx.fillRect(5, 40, 150, 30);

     // Draw the High score
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('High Score: ' + highScore, 10, 62);

    //debug
    if (debug == 1)
    {
        ctx.strokeStyle = 'black'; // Set the color of the outline
        ctx.lineWidth = 3; // Set the width of the outline
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.strokeText('Player SPD: ' + player.speed, 660, 590);
        ctx.fillText('Player SPD: ' + player.speed, 660, 590);
    }
    //debug
    if (debug == 1)
    {
        ctx.strokeStyle = 'black'; // Set the color of the outline
        ctx.lineWidth = 3; // Set the width of the outline
        ctx.fillStyle = 'yellow';
        ctx.font = '20px Arial';
        ctx.strokeText('Touched Grd: ' + objectsTouchedGround, 650, 540);
        ctx.fillText('Touched Grd: ' + objectsTouchedGround, 650, 540);
    }


    requestAnimationFrame(updateGame);
}

// Start the game loop
requestAnimationFrame(updateGame);