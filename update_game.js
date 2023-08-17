// update the update_game.js with the code:

// Define a variable to store the player's original position
let originalPlayerX = canvas.width / 2;
//originalPlayerY for the jump ??
let originalPlayerY = player.y;

// Define a variable to store the player's original speed
const originalPlayerSpeed = player.speed;

// Variable to track the remaining duration of the speed bonus in milliseconds
let speedBonusDuration = 0;

// Variable to store the vertical position where the pause should occur
const pausePosition = canvas.height * 0.2;

// Variable to track the timestamp when ratBonus appears for the first time
let firstRatBonus = true;
let firstRatBonusTimestamp = 0;
let ratBonusInPosition = false;
// Variable to track the timestamp when ratLife appears for the first time
let firstRatLife = true;
let firstRatLifeTimestamp = 0;
let ratLifeInPosition = false;

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

    // If the game is paused, check if the 3 seconds have passed
    if (firstRatBonusTimestamp != 0 && isGamePaused && timestamp - firstRatBonusTimestamp >= 3000) {
        isGamePaused = false; // Resume the game after 3 seconds
        // Reset the firstRatBonusTimestamp to avoid pausing again
        firstRatBonusTimestamp = 0;
    }
    // If the game is paused, check if the 3 seconds have passed for ratLife
    if (firstRatLifeTimestamp != 0 && isGamePaused && timestamp - firstRatLifeTimestamp >= 3000) {
        isGamePaused = false; // Resume the game after 3 seconds
        // Reset the firstRatLifeTimestamp to avoid pausing again
        firstRatLifeTimestamp = 0;
    }

    // If the game is paused, don't update or render the game
    if (isGamePaused) {
        requestAnimationFrame(updateGame);
        return;
    }

    // Check if the game is over
    if (objectsTouchedGround >= maxObjectsTouchedGround) {
        gameOver = true;
        showGameOver();
        return; // Pause the game
    }

    // Move the player based on the direction
    if (rightPressed && player.x < canvas.width - player.width) {
        player.x += player.speed;
    } else if (leftPressed && player.x > 0) {
        player.x -= player.speed;
    }

     // Perform player jump if jumping state is true
    if (isJumping) {
        playerJump();
    } else {
        // If the distance exceeds 80 pixels, return to the original position Y
        const returnSpeed = 8; // Adjust the return speed as needed
        const returnDistanceY = (originalPlayerY - player.y) / returnSpeed;
        player.y += returnDistanceY;
    }

    moveItems(); // Move the falling items
    checkCollisions();

    if (debug == 0)
    {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // If the player has a speed bonus, update the remaining duration
    if (speedBonusDuration > 0) {
        speedBonusDuration -= deltaTime;
        // If the bonus duration is over, reset the player's speed
        if (speedBonusDuration <= 0) {
            player.speed = originalPlayerSpeed; // back to the normal player speed
            imageChangeSpeed = 100; // back to the normal image speed
        }
    }


    // Draw the player image
    ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);

    // Update the remaining time of the speed bonus in the HTML
    const speedBonusTime = document.getElementById('speedBonusTime');
    if (speedBonusDuration > 0) {
        const remainingTime = Math.ceil(speedBonusDuration / 1000); // Convert milliseconds to seconds
        speedBonusTime.textContent = `Speed Bonus: ${remainingTime}s`;
    } else {
        speedBonusTime.textContent = '';
    }


    // Draw the falling items
    for (let i = 0; i < items.length; i++)
    {
        const itemImage = new Image();
        itemImage.src = items[i].image; // Use the correct image path

        // Save the current canvas state
        ctx.save();

        // Translate to the center of the item
        ctx.translate(items[i].x + items[i].width / 2, items[i].y + items[i].height / 2);

        // Rotate the item
        ctx.rotate((items[i].rotation * Math.PI) / 180);

        // Draw the item with rotation applied
        ctx.drawImage(itemImage, -items[i].width / 2, -items[i].height / 2, items[i].width, items[i].height);

        // Restore the canvas state
        ctx.restore();

        // Check if ratBonus is around 20% of the vertical game and it's the first time
        if (
            firstRatBonus &&
            items[i].image === 'media/ratBonus.png' &&
            items[i].y >= pausePosition - items[i].height / 2 &&
            items[i].y <= pausePosition + items[i].height / 2
        ) {
            ratBonusInPosition = true;
            // Store the timestamp of the first appearance of ratBonus
            firstRatBonusTimestamp = timestamp;
            isGamePaused = true; // Pause the game
            firstRatBonus = false; // Set to false to prevent further pausing
        }
        // Check if ratLife is around 20% of the vertical game and it's the first time
        if (
            firstRatLife &&
            items[i].image === 'media/ratLife.png' &&
            items[i].y >= pausePosition - items[i].height / 2 &&
            items[i].y <= pausePosition + items[i].height / 2
        ) {
            ratLifeInPosition = true;
            // Store the timestamp of the first appearance of ratLife
            firstRatLifeTimestamp = timestamp;
            isGamePaused = true; // Pause the game
            firstRatLife = false; // Set to false to prevent further pausing
        }



        //++++++++debug DRAW ITEM SPEED +++++++++
        if (debug == 1)
        {
            ctx.strokeStyle = 'black'; // Set the color of the outline
            ctx.lineWidth = 3; // Set the width of the outline
            ctx.fillStyle = 'red';
            ctx.font = '20px Arial';
            //ctx.fillText('I.Speed: ' + items[i].speed.toFixed(2), items[i].x, items[i].y - 10);
            ctx.strokeText('Item SPD: ' + items[i].speed, 5, 565);
            ctx.fillText('Item SPD: ' + items[i].speed, 5, 565);
        }

        if (ratBonusInPosition) {
            ctx.strokeStyle = 'yellow';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(
                items[i].x + items[i].width / 2,
                items[i].y + items[i].height / 2,
                items[i].width / 2 + 10,
                0,
                2 * Math.PI
            );
            ctx.stroke();

            // Draw text under rat bonus
            ctx.fillStyle = 'yellow';
            ctx.font = 'bold 20px Arial';
            //ctx.textAlign = 'center';
            ctx.fillText('Speed Bonus', items[i].x + items[i].width / 2 - 60, items[i].y + items[i].height + 30);

            ratBonusInPosition = false;
        }
        if (ratLifeInPosition) {
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(
                items[i].x + items[i].width / 2,
                items[i].y + items[i].height / 2,
                items[i].width / 2 + 10,
                0,
                2 * Math.PI
            );
            ctx.stroke();

            // Draw text under rat life
            ctx.fillStyle = 'red';
            ctx.font = 'bold 20px Arial';
            ctx.fillText('Extra Life', items[i].x + items[i].width / 2 - 50, items[i].y + items[i].height + 30);

            ratLifeInPosition = false;
        }

    }

    // Draw the Score with a shadow
    ctx.fillStyle = 'white';
    ctx.font = 'bold 24px Arial'; // Use the Arial font with a font size of 24 pixels

    // Add shadow properties
    ctx.shadowColor = 'black'; // Set the shadow color to black
    ctx.shadowOffsetX = 2; // Set the horizontal shadow offset
    ctx.shadowOffsetY = 2; // Set the vertical shadow offset

    ctx.fillText('Score: ' + score, 10, 62);

    // Draw the High score with a shadow
    ctx.fillText('High Score: ' + highScore, 10, 30);

    // Draw heart images
    const heartsContainer = document.getElementById('heartsContainer');
    heartsContainer.style.position = 'absolute';
    heartsContainer.style.top = '10px';
    heartsContainer.style.left = `${(canvas.width - 80) / 2}px`;


    if (debug == 1)
    {
        //++++++++debug DRAW PLAYER SPEED +++++++++
        ctx.strokeStyle = 'black'; // Set the color of the outline
        ctx.lineWidth = 3; // Set the width of the outline
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.strokeText('Player SPD: ' + player.speed, 5, 590);
        ctx.fillText('Player SPD: ' + player.speed, 5, 590);

        //++++++++debug DRAW OBJECTS TOUCHED THE GROUND +++++++++
        ctx.strokeStyle = 'black'; // Set the color of the outline
        ctx.lineWidth = 3; // Set the width of the outline
        ctx.fillStyle = 'yellow';
        ctx.font = '20px Arial';
        ctx.strokeText('Touched Grd: ' + objectsTouchedGround, 5, 540);
        ctx.fillText('Touched Grd: ' + objectsTouchedGround, 5, 540);

        //++++++++debug EXTRA VARIABLE +++++++++
        ctx.strokeStyle = 'black'; // Set the color of the outline
        ctx.lineWidth = 3; // Set the width of the outline
        ctx.fillStyle = 'blue';
        ctx.font = '20px Arial';
        ctx.strokeText('Extra: ' + player.y, 5, 490);
        ctx.fillText('Extra: ' + player.y, 5, 490);
    }


   // Display the FPS
    displayFPS();

    requestAnimationFrame(updateGame);
}

// Start the game loop
requestAnimationFrame(updateGame);