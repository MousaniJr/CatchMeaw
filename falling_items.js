        // Create falling items
        function createItem() {
            let item = {
                x: Math.random() * (canvas.width - 50),
                y: 0,
                width: 50,
                height: 50,
                speed: 3 // Initial speed
            };
            items.push(item);
        }

            function moveItems() {
                for (let i = 0; i < items.length; i++) {
                    items[i].y += items[i].speed;
                }
            }
