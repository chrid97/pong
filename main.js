// excercies for later
// make ball move faster after paddle hits it
// change colors of ball when it hits paddle
//

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = document.body.clientWidth;
canvas.height = 1004;

//score
let playerOneScore = 0;
let playerTwoScore = 0;

// ball
let x = canvas.width/2;
let y = canvas.height/2;
let dx = 3;
let dy = -3;
const ballRadius = 10;

// paddle
const paddleHeight = 100;
const paddleWidth = 10;
let paddleY = canvas.height / 2 - paddleHeight / 2;
let downPressed = false;
let upPressed = false;

window.addEventListener('keydown', keyDownHandler);
window.addEventListener('keyup', keyUpHandler);

function keyDownHandler({ key }) {
    if(key === 'ArrowUp') {
        upPressed = true;
    } else if(key === 'ArrowDown') {
        downPressed = true;
    }
}

function keyUpHandler({ key }) {
    if(key === 'ArrowUp') {
        upPressed = false;
    } else if(key === 'ArrowDown') {
        downPressed = false;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    drawText(playerOneScore, canvas.width/4, canvas.height/5);
    drawText(playerTwoScore, 3*canvas.width/4, canvas.height/5);
    drawNet();
    drawPaddle();
    comPaddle();
    drawBall();
    requestAnimationFrame(draw);
}

function drawPaddle() {
    if (paddleY > 0 && upPressed) {
        paddleY -= 4;       
    } 

    if (paddleY + paddleHeight < canvas.height && downPressed) {
        paddleY += 4;       
    }

    ctx.fillRect(0, paddleY, paddleWidth, paddleHeight);
}

function comPaddle() {
   ctx.fillRect(canvas.width - paddleWidth, paddleY, paddleWidth, paddleHeight);
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x , y , ballRadius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();

    if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }

    if(x + dx > canvas.width-ballRadius) {
        if(y > paddleY && y < paddleY + paddleHeight) {
            dx = -dx;
        } else {
           playerOneScore++;
           if(playerOneScore === 2) {
              alert("Player One Wins!");
              document.location.reload();
           }
           ballReset();
        }
    }

    if(x + dy < ballRadius) {
        if(y > paddleY && y < paddleY + paddleHeight) {
            dx = -dx;
        }  else {
           playerTwoScore++;
           if(playerTwoScore === 2) {
              alert("Player Two Wins!");
              document.location.reload();
           }
           ballReset();
        }
    }

    x += dx;
    y += dy;
}

function ballReset() {
   x = canvas.width/2;
   y = canvas.height/2;
}

function drawText(text, x, y) {
    ctx.fillStyle = "white";
    ctx.font = "75px fantasy";
    ctx.fillText(text, x, y);
}

function drawNet() { 
    for(let i = 0; i <= canvas.height; i+=15) {
        ctx.fillRect((canvas.width - 2)/2, i, 2, 10, "white");
    }
}

function randomColor() {
    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);

    return `rgb(${red},${green},${blue})`;
}

draw();
