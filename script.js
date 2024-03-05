const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");

const boxSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let direction = "right";

function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the snake
  ctx.fillStyle = "#00F";
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x * boxSize, snake[i].y * boxSize, boxSize, boxSize);
  }

  // Draw the food
  ctx.fillStyle = "#F00";
  ctx.fillRect(food.x * boxSize, food.y * boxSize, boxSize, boxSize);
}

function move() {
  // Move the snake
  let newHead = { x: snake[0].x, y: snake[0].y };

  switch (direction) {
    case "up":
      newHead.y--;
      break;
    case "down":
      newHead.y++;
      break;
    case "left":
      newHead.x--;
      break;
    case "right":
      newHead.x++;
      break;
  }

  // Check for collision with walls
  if (
    newHead.x < 0 ||
    newHead.x >= canvas.width / boxSize ||
    newHead.y < 0 ||
    newHead.y >= canvas.height / boxSize
  ) {
    alert("Game Over!");
    resetGame();
    return;
  }

  // Check for collision with itself
  for (let i = 0; i < snake.length; i++) {
    if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
      alert("Game Over!");
      resetGame();
      return;
    }
  }

  // Check for collision with food
  if (newHead.x === food.x && newHead.y === food.y) {
    // Increase the length of the snake
    snake.unshift(food);

    // Generate new food
    generateFood();
  } else {
    // Move the snake
    snake.pop();
    snake.unshift(newHead);
  }
}

function generateFood() {
  food = {
    x: Math.floor(Math.random() * (canvas.width / boxSize)),
    y: Math.floor(Math.random() * (canvas.height / boxSize)),
  };
}

function resetGame() {
  snake = [{ x: 10, y: 10 }];
  direction = "right";
  generateFood();
}

function gameLoop() {
  draw();
  move();
}

// Handle keyboard input
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      direction = "up";
      break;
    case "ArrowDown":
      direction = "down";
      break;
    case "ArrowLeft":
      direction = "left";
      break;
    case "ArrowRight":
      direction = "right";
      break;
  }
});

// Set up the game loop
setInterval(gameLoop, 100);
