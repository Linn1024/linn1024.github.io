const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
});

const images = {};
const imageSources = {
    background: 'assets/background.png',
    hedgehogBottom: 'assets/hedgehog_bottom.png',
    hedgehogIdle: 'assets/hedgehog_bottom_idle.png',
    mushroom: 'assets/mushroom.png'
};

let loaded = 0;
const total = Object.keys(imageSources).length;

for (let key in imageSources) {
    const img = new Image();
    img.src = imageSources[key];
    img.onload = () => {
        loaded++;
        if (loaded === total) startGame();
    };
    images[key] = img;
}

const lanes = ["topLeft", "topRight", "bottomLeft", "bottomRight"];
let hedgehogLane = "bottomLeft";
let mushrooms = [];
let score = 0;

const mushroomSpeed = 2;
const mushroomInterval = 2000;

function startGame() {
    setInterval(spawnMushroom, mushroomInterval);
    requestAnimationFrame(gameLoop);
}

function spawnMushroom() {
    const lane = lanes[Math.floor(Math.random() * 4)];
    let startX, startY;

    const centerX = width / 2;
    const centerY = height / 2;

    if (lane === "topLeft") {
        startX = width * 0.10;
        startY = height * 0.10;
    } else if (lane === "topRight") {
        startX = width * 0.90;
        startY = height * 0.10;
    } else if (lane === "bottomLeft") {
        startX = width * 0.10;
        startY = height * 0.90;
    } else if (lane === "bottomRight") {
        startX = width * 0.90;
        startY = height * 0.90;
    }

    const dx = centerX - startX;
    const dy = centerY - startY;
    const length = Math.sqrt(dx * dx + dy * dy);
    const vx = (dx / length) * mushroomSpeed;
    const vy = (dy / length) * mushroomSpeed;

    mushrooms.push({
        lane: lane,
        x: startX,
        y: startY,
        vx: vx,
        vy: vy,
        caught: false
    });
}

function handleTouch(x, y) {
    if (x < width / 2 && y < height / 2) {
        hedgehogLane = "topLeft";
    } else if (x >= width / 2 && y < height / 2) {
        hedgehogLane = "topRight";
    } else if (x < width / 2 && y >= height / 2) {
        hedgehogLane = "bottomLeft";
    } else {
        hedgehogLane = "bottomRight";
    }
}

canvas.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    handleTouch(touch.clientX, touch.clientY);
});

canvas.addEventListener('mousedown', (e) => {
    handleTouch(e.clientX, e.clientY);
});

function drawHedgehog() {
    const size = Math.min(width, height) / 4;
    const x = width / 2;
    const y = height / 2;
    const flip = hedgehogLane.endsWith("Left");

    ctx.save();
    ctx.translate(x, y);
    if (flip) {
        ctx.scale(-1, 1);
    }

    const img = hedgehogLane.startsWith("top") ? images.hedgehogBottom : images.hedgehogIdle;
    ctx.drawImage(img, -size/2, -size/2, size, size);

    ctx.restore();
}

function drawMushrooms() {
    const size = Math.min(width, height) / 10;
    const catchRadius = size * 1.2;

    mushrooms.forEach((mushroom) => {
        if (mushroom.caught) return;

        mushroom.x += mushroom.vx;
        mushroom.y += mushroom.vy;

        ctx.drawImage(images.mushroom, mushroom.x - size/2, mushroom.y - size/2, size, size);

        const hedgehogCenterX = width / 2;
        const hedgehogCenterY = height / 2;
        const distance = Math.hypot(hedgehogCenterX - mushroom.x, hedgehogCenterY - mushroom.y);

        if (distance < catchRadius && mushroom.lane === hedgehogLane) {
            mushroom.caught = true;
            score++;
        }
    });
}

function drawScore() {
    ctx.fillStyle = "#000";
    ctx.font = "bold 36px Arial";
    ctx.fillText("Score: " + score, 20, 50);
}

function gameLoop() {
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(images.background, 0, 0, width, height);
    drawMushrooms();
    drawHedgehog();
    drawScore();
    requestAnimationFrame(gameLoop);
}
