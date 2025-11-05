//update the collision.js with the code:
// Function to check if two rectangles are colliding
function areRectanglesColliding(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}

// Collision detection
function checkCollisions() {

    //creating the rect1 around the player
    const playerRect = {
        x: player.x + player.width * 0.30, // Reduce the width by 50%
        y: player.y + player.height * 0.25, // Reduce the height by 50%
        width: player.width * 0.45, // 50% of the original width
        height: player.height * 0.50 // 50% of the original height
    };

    if (debug == 1)
    {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw rect1 around the player
        ctx.fillStyle = 'white';
        ctx.fillRect(playerRect.x, playerRect.y, playerRect.width, playerRect.height);
    }


    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const itemRect = {
            x: item.x + 5, // Add a buffer zone of 10 pixels around the item
            y: item.y - 5,
            width: item.width - 5,
            height: item.height + 5
        };

         // Draw a rectangle around the falling item
        if (debug == 1) {
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2;
            ctx.strokeRect(itemRect.x, itemRect.y, itemRect.width, itemRect.height);
        }

        // Check for collision between PLAYER and RATS rectangle
        if (areRectanglesColliding(playerRect, itemRect)) {
            if (item.image === 'media/rat.png') {
                handleItemCollision(i);
            } else if (item.image === 'media/ratBonus.png') {
                handleBonusItemCollision(i);
            } else if (item.image === 'media/ratLife.png') {
                handleLifeItemCollision(i);
            }else if (item.image === 'media/ratDebuff.png') {
                handleDebuffItemCollision(i);
            }
        }

        // Check and update high score if needed
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('highScore', highScore); // Store the high score in local storage
        }

        // Check for collision when RATS touches the ground (excluding ratLife)
        if (item.y + item.height / 2 >= canvas.height && item.image !== 'media/ratLife.png' && item.image !== 'media/ratBonus.png' && item.image !== 'media/ratDebuff.png') {
            objectsTouchedGround++;
            playGroundCollision();
            playerLife--;
            updateHeartImages();

            // Reset combo when missing a rat
            combo = 0;
            comboMultiplier = 1;

            items.splice(i, 1);
        }
    }
}

// Function to update heart images based on player's life
function updateHeartImages() {
    const heartsContainer = document.getElementById('heartsContainer');
    const heart1 = document.getElementById('heart1');
    const heart2 = document.getElementById('heart2');
    const heart3 = document.getElementById('heart3');

    switch (playerLife) {
        case 3:
            heart1.src = 'media/fullheart.png';
            heart2.src = 'media/fullheart.png';
            heart3.src = 'media/fullheart.png';
            break;
        case 2:
            heart1.src = 'media/fullheart.png';
            heart2.src = 'media/fullheart.png';
            heart3.src = 'media/emptyheart.png';
            break;
        case 1:
            heart1.src = 'media/fullheart.png';
            heart2.src = 'media/emptyheart.png';
            heart3.src = 'media/emptyheart.png';
            break;
        case 0:
            heart1.src = 'media/emptyheart.png';
            heart2.src = 'media/emptyheart.png';
            heart3.src = 'media/emptyheart.png';
            break;
        default:
            break;
    }
}

// Function to play the collision sound
function playCollisionSound() {
    const collisionSound = document.getElementById('collisionSound');
    collisionSound.playbackRate = 1; // Increase the playback rate (adjust the value as needed)
    collisionSound.volume = 1; // Set the volume to 0.8 (80% of the maximum volume)
    collisionSound.play();
}

// Function to play the ground collision
function playGroundCollision() {
    const groundCollision = document.getElementById('groundCollision');
    groundCollision.playbackRate = 2; // Increase the playback rate (adjust the value as needed)
    groundCollision.volume = 0.5; // Set the volume to 0.8 (80% of the maximum volume)
    groundCollision.play();
}

// Function to handle collision with a regular item
function handleItemCollision(index) {
    // Increase combo
    combo++;
    totalCatches++;
    if (combo > maxCombo) maxCombo = combo;

    // Calculate combo multiplier (every 5 catches = 1x multiplier, max 5x)
    comboMultiplier = Math.min(1 + Math.floor(combo / 5), 5);

    // Calculate points earned with multiplier
    let pointsEarned = 1 * comboMultiplier;
    score += pointsEarned;

    // Create score popup and particles
    createScorePopup(items[index].x + items[index].width / 2, items[index].y, pointsEarned, 'white');
    createParticles(items[index].x + items[index].width / 2, items[index].y + items[index].height / 2, 'white', 6);

    // Remove the collided item from the items array
    items.splice(index, 1);

    // Play the collision sound
    playCollisionSound();
}

// Function to handle collision with the bonus item
function handleBonusItemCollision(index) {
    // Increase combo
    combo++;
    totalCatches++;
    if (combo > maxCombo) maxCombo = combo;

    // Calculate combo multiplier
    comboMultiplier = Math.min(1 + Math.floor(combo / 5), 5);

    // Calculate points earned (bonus rats worth 2 base points)
    let pointsEarned = 2 * comboMultiplier;
    score += pointsEarned;

    // Create score popup and particles
    createScorePopup(items[index].x + items[index].width / 2, items[index].y, pointsEarned, 'yellow');
    createParticles(items[index].x + items[index].width / 2, items[index].y + items[index].height / 2, 'yellow', 10);

    // Apply the speed bonus to the player
    if( player.speed == original_speed * canvas.width ) {
        player.speed = player.speed * 1.50; // The player gains a speed bonus of +2
        imageChangeSpeed = 50; // player image change faster due the speed up
    } else if (debuffed) {
        player.speed = original_speed * canvas.width * 1.50; // The player gains a speed bonus of +2
        imageChangeSpeed = 50; // player image change faster due the speed up
    }

    // Set the duration of the speed bonus (in milliseconds)
    speedBonusDuration = 5000; // 5000 milliseconds = 5 seconds

    // Remove the collided item from the items array
    items.splice(index, 1);

    // Play the collision sound
    playCollisionSound();

    debuffed = false;
    buffed = true;
}

// Function to handle collision with the debuff item
function handleDebuffItemCollision(index) {
    // Debuff rats reset your combo!
    combo = 0;
    comboMultiplier = 1;

    // Create negative popup and particles
    createScorePopup(items[index].x + items[index].width / 2, items[index].y, 'COMBO RESET!', 'green');
    createParticles(items[index].x + items[index].width / 2, items[index].y + items[index].height / 2, 'green', 12);

    // Apply the speed Debuff to the player
    if(player.speed == original_speed * canvas.width) {
        player.speed = player.speed * 0.50; // The player gains a Debuff speed of half
        imageChangeSpeed = 150; // player image change low due the Debuff speed
    } else if (buffed) {
        player.speed = original_speed * canvas.width * 0.50;
        imageChangeSpeed = 150; // player image change low due the Debuff speed
    }

    // Set the duration of the speed bonus (in milliseconds)
    speedBonusDuration = 5000; // 5000 milliseconds = 5 seconds

    // Remove the collided item from the items array
    items.splice(index, 1);

    // Play the collision sound
    playCollisionSound();

    debuffed = true;
    buffed = false;
}

// Function to handle collision with the life item
function handleLifeItemCollision(index) {
    // Increase combo
    combo++;
    totalCatches++;
    if (combo > maxCombo) maxCombo = combo;

    // Calculate combo multiplier
    comboMultiplier = Math.min(1 + Math.floor(combo / 5), 5);

    // Calculate points earned (life rats worth 3 base points)
    let pointsEarned = 3 * comboMultiplier;
    score += pointsEarned;

    // Create score popup and particles
    createScorePopup(items[index].x + items[index].width / 2, items[index].y, pointsEarned, 'red');
    createParticles(items[index].x + items[index].width / 2, items[index].y + items[index].height / 2, 'red', 8);

    // If player's life is less than 3, recover 1 heart life
    if (playerLife < 3) {
        playerLife++;
        objectsTouchedGround--;
        updateHeartImages();
    }

    // Remove the collided item from the items array
    items.splice(index, 1);

    // Play the collision sound
    playCollisionSound();
}

// Function to create score popup
function createScorePopup(x, y, points, color) {
    scorePopups.push({
        x: x,
        y: y,
        text: typeof points === 'number' ? '+' + points : points,
        color: color,
        alpha: 1.0,
        velocity: -2 // Move upward
    });
}

// Function to create particles
function createParticles(x, y, color, count = 8) {
    for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count;
        const speed = 2 + Math.random() * 2;
        particles.push({
            x: x,
            y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            color: color,
            alpha: 1.0,
            size: 3 + Math.random() * 3
        });
    }
}