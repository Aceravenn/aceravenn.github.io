document.addEventListener("DOMContentLoaded", function () {
    const player = document.getElementById("player");
    const walls = document.querySelectorAll(".wall");
    const goal = document.querySelector(".goal");
    const restartButton = document.getElementById("restart");
    const timerDisplay = document.getElementById("timer");

    let playerX = 0, playerY = 0;
    const step = 50;
    let timeLeft = 20;
    let timer;

    function startTimer() {
        clearInterval(timer);
        timeLeft = 20;
        timerDisplay.textContent = timeLeft;

        timer = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(timer);
                alert("⏳ Time's up! You lost.");
                resetGame();
            }
        }, 1000);
    }

    document.addEventListener("keydown", function (e) {
        let newX = playerX, newY = playerY;

        if (e.key === "ArrowRight") newX += step; // Moves right
        if (e.key === "ArrowLeft") newX -= step; // Moves left
        if (e.key === "ArrowDown") newY += step; // Moves down
        if (e.key === "ArrowUp") newY -= step; // Moves up

        // Prevent moving outside boundaries
        if (newX < 0 || newX >= 300 || newY < 0 || newY >= 300) return;

        // Prevent moving through walls
        for (let wall of walls) {
            if (newX === wall.offsetLeft && newY === wall.offsetTop) return;
        }

        playerX = newX;
        playerY = newY;
        player.style.left = `${playerX}px`;
        player.style.top = `${playerY}px`;

        if (playerX === goal.offsetLeft && playerY === goal.offsetTop) {
            clearInterval(timer);
            alert("🎉 You win!");
            window.location.href = "https://aceravenn.github.io/aceraven.github.io/"; 

        }
    });

    function resetGame() {
        playerX = 0;
        playerY = 0;
        player.style.left = "0px";
        player.style.top = "0px";
        startTimer();
    }

    restartButton.addEventListener("click", resetGame);
    startTimer();
});