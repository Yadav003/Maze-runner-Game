const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const maze = [
[1, 1, 1, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,1,0,1],
[1, 0, 1, 1, 1, 1, 1, 0, 1, 1,1,1,1,1,0,1,0,1,0,1],
[1, 0, 0, 0, 0, 0, 1, 0, 1, 0,0,0,0,0,0,1,0,1,0,1],
[1, 0, 1, 1, 1, 0, 1, 0, 1, 0,1,0,1,1,0,1,0,1,0,1],
[1, 0, 1, 0, 0, 0, 0, 0, 1, 0,1,0,1,1,0,1,0,1,0,1],
[1, 0, 1, 0, 1, 0, 1, 0, 1, 0,1,0,1,1,0,1,0,1,0,1],
[1, 0, 0, 0, 1, 0, 1, 0, 0, 0,0,0,0,0,0,1,0,1,0,1],
[1, 0, 1, 0, 1, 0, 1, 1, 1, 0,1,0,1,1,0,1,0,0,0,1],
[1, 0, 1, 0, 1, 0, 0, 0, 0, 0,1,0,1,1,0,1,0,1,0,1],
[1, 0, 1, 0, 1, 1, 1, 1, 1, 1,1,0,1,1,0,1,0,1,0,1],
[1, 0, 1, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,1,0,1,0,1],
[1, 0, 1, 1, 1, 1, 1, 1, 1, 1,1,1,1,1,0,1,0,1,0,1],
[1, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,1,0,1,0,1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1,1,1,1,1,1,0,1,0,1],
[1, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,1,0,1],
[1, 0, 1, 1, 1, 1, 1, 1, 0, 1,1,1,1,1,1,1,1,1,0,1],
[1, 0, 1, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,1],
[1, 0, 1, 0, 1, 1, 1, 1, 1, 1,1,1,1,1,1,1,1,1,0,1],
[1, 0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1,1,1,1,1,1,1,1,1,1],
];

const player = {
x: 1.2,
y: 1.2,
size: 10,
color: '#FF0000',
speed: 0.05
};

const end = {
x: 19.2,
y: 18.2,
size: 10,
color: '#00FF00'
};

let keyPress = {};

function drawMaze() {
for (let y = 0; y < maze.length; y++) {
for (let x = 0; x < maze[y].length; x++) {
if (maze[y][x] === 1) {
ctx.fillStyle = '#295';   // main color is #000
} else {
ctx.fillStyle = '#ffe';
}
ctx.fillRect(x * 20, y * 20, 20, 20);
}
}
}

function drawPlayer() {
ctx.fillStyle = player.color;
ctx.fillRect(player.x * 20, player.y * 20, player.size, player.size);
}

function drawEnd() {
ctx.fillStyle = end.color;
ctx.fillRect(end.x * 20, end.y * 20, end.size, end.size);
}

function movePlayer() {
if (keyPress['ArrowUp']) {
if (maze[Math.round(player.y - player.speed)][Math.round(player.x)] !== 1) {
player.y -= player.speed;
}
}
if (keyPress['ArrowDown']) {
if (maze[Math.round(player.y + player.speed)][Math.round(player.x)] !== 1) {
player.y += player.speed;
}
}
if (keyPress['ArrowLeft']) {
if (maze[Math.round(player.y)][Math.round(player.x - player.speed)] !== 1) {
player.x -= player.speed;
}
}
if (keyPress['ArrowRight']) {
if (maze[Math.round(player.y)][Math.round(player.x + player.speed)] !== 1) {
player.x += player.speed;
}
 }
}


function checkWin() {
    // Calculate the distance between the player and the end point
    const distance = Math.sqrt(Math.pow((player.x - end.x), 2) + Math.pow((player.y - end.y), 2));

    // Check if the distance is less than a threshold (e.g., 0.5) to consider it a win
    if (distance < 0.5) {
        return true;
    }
    return false;
}



function gameLoop() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
drawMaze();
drawPlayer();
drawEnd();
if (checkWin()) {
alert(' Congratulatins You win!');
return;
}
movePlayer();
requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (e) => {
keyPress[e.key] = true;
});

document.addEventListener('keyup', (e) => {
keyPress[e.key] = false;
});
let isDragging = false;

canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (
        mouseX >= end.x * 20 &&
        mouseX <= end.x * 20 + end.size &&
        mouseY >= end.y * 20 &&
        mouseY <= end.y * 20 + end.size
    ) {
        isDragging = true;
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        end.x = mouseX / 20;
        end.y = mouseY / 20;
    }
});

canvas.addEventListener('mouseup', () => {
    isDragging = false;
});

gameLoop();

