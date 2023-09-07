//board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
var velocityX = 0;
var velocityY = 0;
var snakeBody = [];

//food

var foodX;
var foodY;

let point = 0;
var gameOver = false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    hideButtonContainer();

    placeFood();
    document.addEventListener("keyup", changeDirection);
    // update(); get called only once
    setInterval(update, 1000/10); //100 milliseconds
}

function update() {
    if (gameOver) {
        showButtonContainer();
        return;
    }

    context.clearRect(0, 0, board.width, board.height);
    context.fillStyle = "#323B54";
    context.fillRect(0, 0, board.width, board.height);
    
    context.fillStyle = "#FF5666";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if(snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        point++;
        placeFood();
    }

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length){
        snakeBody[0] = [snakeX, snakeY];
    }
    
    context.fillStyle = "#00C14A";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
    
    //game over conditions
    if (snakeX < 0 || snakeX > board.width || snakeY < 0 || snakeY > board.height) {
            gameOver = true;
        }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
        }
    }

    document.getElementById("score").innerHTML = "Score: " + point;

}

function changeDirection(e) {
    if (e.code == "ArrowUp" || e.code == "KeyW" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
}
else if (e.code == "ArrowDown" || e.code == "KeyS" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
}
if (e.code == "ArrowLeft" || e.code == "KeyA" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
}
if (e.code == "ArrowRight" || e.code == "KeyD" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
}
}
function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;

}
function hideButtonContainer() {
    const playButtonContainer = document.getElementById("playButtonContainer");
    playButtonContainer.style.display = "none";
}

function showButtonContainer() {
    const playButtonContainer = document.getElementById("playButtonContainer");
    playButtonContainer.style.display = "flex"; // Change to "block" if you don't want it as a flex container
}
