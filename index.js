const cnv = document.getElementById('canvas');
const ctx = cnv.getContext('2d');

let headX;
let headY;
let snail;

let arrow = 'right';
let food;

startGame();

const arrowAction = {
    'down': () => {
        headY += 20;
        if (headY === 1000)
            headY = 0;
    },
    'left': () => {
        headX -= 20;
        if (headX === -20)
            headX = 980;
    },
    'up': () => {
        headY -= 20;
        if (headY === -20)
            headY = 980;
    },
    'right': () => {
        headX += 20;
        if (headX === 1000)
            headX = 0;
    }
}

function addFood() {
    do {
        food = [randomize(), randomize()];
    } while (snail.find(el => food[0] === headX && food[1] === headY));
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.fillRect(food[0], food[1], 20, 20);
    ctx.closePath();
}

setInterval(() => {
    ctx.beginPath();
    ctx.fillStyle = 'white';
    arrowAction[arrow]();
    if (snail.find(el => el[0] === headX && el[1] === headY)) {
        ctx.clearRect(0, 0, 1000, 1000);
        startGame();
        return;
    }
    ctx.fillRect(headX, headY, 20, 20);
    if (headX === food[0] && headY === food[1]) {
        addFood();
    } else {
        const [tailX, tailY] = snail.shift();
        ctx.clearRect(tailX, tailY, 20, 20);
    }
    snail.push([headX, headY]);
    ctx.closePath();
}, 100);

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowDown':
            if (arrow !== 'up')
                arrow = 'down';
            break;
        case 'ArrowLeft':
            if (arrow !== 'right')
                arrow = 'left';
            break;
        case 'ArrowUp':
            if (arrow !== 'down')
                arrow = 'up';
            break;
        case 'ArrowRight':
            if (arrow !== 'left')
                arrow = 'right';
            break;
    }
});

function randomize() {
    return Math.floor(Math.random() * 980 / 20) * 20;
}

function startGame() {
    ctx.fillStyle = 'white';
    headX = 0;
    headY = 480;
    snail = [[headX, headY]];
    ctx.fillRect(headX, headY, 20, 20);
    arrow = 'right';
    food = [];
    addFood();
}