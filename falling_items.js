// Create falling items
function createItem() {
    let item = {
        x: Math.random() * (canvas.width - 50),
        y: 0,
        width: 50,
        height: 50,
        speed: 2 + Math.floor(score / 10) * 0.5 // Initial speed, adjusted based on score
    };
    items.push(item);
}

// moving down the item created
function moveItems() {
    for (let i = 0; i < items.length; i++) {
        items[i].y += items[i].speed;
    }
}