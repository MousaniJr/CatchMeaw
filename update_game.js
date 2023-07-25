// Function to calculate and display the FPS
function displayFPS() {
    const now = performance.now();
    if (now - lastFPSUpdate >= fpsUpdateInterval) {
        currentFPS = Math.round((frameCount * 1000) / (now - lastFPSUpdate));
        frameCount = 0;
        lastFPSUpdate = now;
    }
    //debug show fps
    if (debug == 1)
    {
        ctx.strokeStyle = 'black'; // Set the color of the outline
        ctx.lineWidth = 3; // Set the width of the outline
        ctx.fillStyle = 'green';
        ctx.font = '20px Arial';
        ctx.strokeText('FPS: ' + currentFPS, 705, 515);
        ctx.fillText('FPS: ' + currentFPS, 705, 515); // Position it below the High Score text
    }
}

// Define a variable to store the player's original position
let originalPlayerX = canvas.width / 2;
let originalPlayerY = canvas.height - 50;

// Update and draw the game
function updateGame(timestamp) {

    // Calculate the elapsed time since the last frame
    const deltaTime = timestamp - lastTimestamp;

    // If the elapsed time is less than the frame time, delay the next frame
    if (deltaTime < frameTime) {
        setTimeout(() => {
            requestAnimationFrame(updateGame);
        }, frameTime - deltaTime);
        return;
    }

    lastTimestamp = timestamp; // Update lastTimestamp after the delay (if any)
    frameCount++;

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

    // Move the player based on the direction
    if (rightPressed && player.x < canvas.width - player.width) {
        player.x += player.speed;
    } else if (leftPressed && player.x > 0) {
        player.x -= player.speed;
    }

    // Check for collision with items and jump towards them
    for (let i = 0; i < items.length; i++) {
        const item = items[i];

        // Calculate distance between player and item
        const distanceX = item.x - player.x;
        const distanceY = item.y - player.y;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        // If the item is within 100 pixels distance, jump towards it
        if (distance < 80) {
            const jumpSpeed = 8; // Adjust the jump speed as needed
            const jumpDistanceX = (distanceX / distance) * jumpSpeed;
            const jumpDistanceY = (distanceY / distance) * jumpSpeed;
            player.x += jumpDistanceX;
            player.y += jumpDistanceY;
        }
    }

    // If the distance exceeds 100 pixels, return to the original position Y
    const returnSpeed = 8; // Adjust the return speed as needed
    const returnDistanceY = (originalPlayerY - player.y) / returnSpeed;
    player.y += returnDistanceY;


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

        //++++++++debug+++++++++
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


    //++++++++debug+++++++++
    if (debug == 1)
    {
        ctx.strokeStyle = 'black'; // Set the color of the outline
        ctx.lineWidth = 3; // Set the width of the outline
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.strokeText('Player SPD: ' + player.speed, 660, 590);
        ctx.fillText('Player SPD: ' + player.speed, 660, 590);
    }
    //++++++++debug+++++++++
    if (debug == 1)
    {
        ctx.strokeStyle = 'black'; // Set the color of the outline
        ctx.lineWidth = 3; // Set the width of the outline
        ctx.fillStyle = 'yellow';
        ctx.font = '20px Arial';
        ctx.strokeText('Touched Grd: ' + objectsTouchedGround, 650, 540);
        ctx.fillText('Touched Grd: ' + objectsTouchedGround, 650, 540);
    }

   // Display the FPS
    displayFPS();

    requestAnimationFrame(updateGame);
}

// Start the game loop
requestAnimationFrame(updateGame);