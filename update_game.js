//update the update_game.js with the code:
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

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the player image
    ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);

    // Draw the falling items
    for (let i = 0; i < items.length; i++)
    {
        const itemImage = new Image();
        itemImage.src = 'media/rat.png'; // Replace with the actual path to your item image
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

    // Draw the Score with a shadow
    ctx.fillStyle = 'white';
    ctx.font = 'bold 24px Arial'; // Use the Arial font with a font size of 24 pixels

    // Add shadow properties
    ctx.shadowColor = 'black'; // Set the shadow color to black
    ctx.shadowOffsetX = 2; // Set the horizontal shadow offset
    ctx.shadowOffsetY = 2; // Set the vertical shadow offset

    ctx.fillText('Score: ' + score, 10, 30);

    // Draw the High score with a shadow
    ctx.fillText('High Score: ' + highScore, 10, 62);

//    // Reset the shadow settings to avoid affecting other elements
//    ctx.shadowColor = 'transparent';
//    ctx.shadowOffsetX = 0;
//    ctx.shadowOffsetY = 0;

    // Draw heart images
    const heartsContainer = document.getElementById('heartsContainer');
    heartsContainer.style.position = 'absolute';
    heartsContainer.style.top = '10px';
    heartsContainer.style.left = `${(canvas.width - 80) / 2}px`;


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

// Function to reset heart images to full hearts
function resetHearts() {
  // Full hearts
  const fullHearts = document.querySelectorAll('.full-heart');
  for (let heart of fullHearts) {
    heart.src = 'media/fullheart.png';
  }

  // Empty hearts
  const emptyHearts = document.querySelectorAll('.empty-heart');
  for (let heart of emptyHearts) {
    heart.src = 'media/emptyheart.png';
  }
}

// Player jump function
function playerJump() {
    const jumpHeight = 14; // Adjust the jump height as needed
    const jumpSpeed = 2; // Adjust the jump speed as needed
    let currentJumpHeight = 0;

    // Function to animate the jump
    function animateJump() {
        // Move the player upwards until the jump height is reached
        if (currentJumpHeight < jumpHeight) {
            player.y -= jumpSpeed;
            currentJumpHeight += jumpSpeed;
            requestAnimationFrame(animateJump);
        } else {
            // Jump height reached, start falling back down
            animateFall();
        }
    }

    // Function to animate the fall back down
    function animateFall() {
        // Move the player downwards until the original position is reached
        if (currentJumpHeight > 0) {
            const newY = player.y + jumpSpeed;
            if (newY > canvas.height - player.height + 10) {
                player.y = canvas.height - player.height + 10;
            } else {
                player.y = newY;
            }
            currentJumpHeight -= jumpSpeed;
            requestAnimationFrame(animateFall);
        } else {
            // Jump completed, reset the jump state
            isJumping = false;
        }
    }

    // Start the jump animation
    animateJump();
}