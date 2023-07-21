        // Function to display "GAME OVER" text and the restart button
        function showGameOver() {
            ctx.fillStyle = 'red';
            ctx.font = '40px Arial';
            const gameOverText = 'GAME OVER';
            const textWidth = ctx.measureText(gameOverText).width;
            const textX = (canvas.width - textWidth) / 2;
            const textY = canvas.height / 2;
            ctx.fillText(gameOverText, textX, textY);

            // Show the restart button
            const restartButton = document.getElementById('restartButton');
            restartButton.style.display = 'block';
            restartButton.style.position = 'absolute';
            restartButton.style.left = canvas.offsetLeft + canvas.width / 2 - restartButton.clientWidth / 2 + 'px';
            restartButton.style.top = canvas.offsetTop + canvas.height / 2 + 50 + 'px';
        }

        // Function to reset the game
        function resetGame() {
            // Reset the game variables
            score = 0;
            objectsTouchedGround = 0;
            items = [];
            player.x = canvas.width / 2;
            player.y = canvas.height - 50;

            // Hide the "GAME OVER" text and restart button
            gameOver = false;
            const restartButton = document.getElementById('restartButton');
            restartButton.style.display = 'none';

            // Request the next animation frame to restart the game loop
            requestAnimationFrame(updateGame);
        }

        // Event listener for the restart button
        const restartButton = document.getElementById('restartButton');
        restartButton.addEventListener('click', resetGame);