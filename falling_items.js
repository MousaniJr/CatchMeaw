//update the falling_items.js with the code:

//Create falling items
function createItem() {
    let item = {
        x: Math.random() * (canvas.width - 50),
        y: 0,
        width: 50,
        height: 50,
        speed: 2 + Math.floor(score / 10) * 0.5, // Initial speed, adjusted based on score
        rotation: 0, // Rotation angle in degrees
        image: 'media/rat.png' // Default item image
    };
    // Randomly assign the new item image
    const randomValue = Math.random();
    if (randomValue < 0.15) { // 15% chance for ratBonus
        item.image = 'media/ratBonus.png';
        item.speed = 3; // RatBonus falling speed
    } else if (randomValue >= 0.15 && randomValue < 0.25) { // 10% chance for ratLife
        item.image = 'media/ratLife.png';
        item.speed = 4; // RatLife falling speed
    } else if (randomValue >= 0.25 && randomValue < 0.45) { // 10% chance for ratLife
        item.image = 'media/ratDebuff.png';
        item.speed = 6; // ratDebuff falling
    }
    items.push(item);
}

// moving down the item created
function moveItems() {
    for (let i = 0; i < items.length; i++) {
        items[i].y += items[i].speed;
        // Increase the rotation angle of the falling item
        items[i].rotation += -2; // Adjust the rotation speed as needed
    }
}
