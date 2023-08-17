// Function to handle player movement
function movePlayer() {
    if (leftPressed && player.x > 0) {
        player.x -= player.speed;
    }

    if (rightPressed && player.x < canvas.width - player.width) {
        player.x += player.speed;
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
                player.y = canvas.height - player.height + 16;
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
        ctx.strokeText('FPS: ' + currentFPS, 5, 515);
        ctx.fillText('FPS: ' + currentFPS, 5, 515); // Position it below the High Score text
    }
}