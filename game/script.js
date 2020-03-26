'use strict';

const cvs = document.querySelector('.canvas');
const ctx = cvs.getContext('2d');

const playerOut = new Image();
const groundOut = new Image();
const obstacleOut = new Image();

playerOut.src = 'images/player.png';
groundOut.src = 'images/ground.png';
obstacleOut.src = 'images/obstacle.png';

cvs.style.width = 600 + 'px';
cvs.style.height = 400 + 'px';

let speedPlayer = 30;
let grav = 1;

let score = localStorage.getItem('score');

if(!score) {
    localStorage.setItem('score', score = 0);
}

let distanceBetweenObstacles = 10;

let player = JSON.parse(localStorage.getItem('player'));

if(!player) {
    localStorage.setItem('player', JSON.stringify({
        x: 10,
        y: cvs.height - 50,
        width: 30,
        height: 20
    }))
}

function defaultPosForPlayer() {
    player.x = 10;
    player.y = cvs.height - 50;
    localStorage.setItem('player', JSON.stringify(player))
}

let obstacle = JSON.parse(localStorage.getItem('obstacle'));

function defaultPosForObstacles() {
    localStorage.setItem('obstacle', JSON.stringify([]));
    obstacle = JSON.parse(localStorage.getItem('obstacle'));

    obstacle[0] = {
        x: cvs.width,
        y: cvs.height - 50,
        width: 30,
        height: 100
    }
}

if(!obstacle || obstacle.length == 0) {
    defaultPosForObstacles()
}

let ground = [];

ground[0] = {
    x: 0,
    y: cvs.height - 30,
}

ground[1] = {
    x: cvs.width,
    y: cvs.height - 30,
}

function mathRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

window.addEventListener('click', () => {
    if(player.y >= cvs.height - 50) {
        player.y -= 60;
        localStorage.setItem('player', JSON.stringify(player))
    }
});

window.addEventListener('keydown', ({ code }) => {
    code == 'F5' ? localStorage.clear() : null;
    movePlayer(code)
});

function movePlayer(code) {
    if (code == 'Space' && player.y >= cvs.height - 50) {
        player.y -= 60;
        localStorage.setItem('player', JSON.stringify(player))
    } 
    else if (code == 'ArrowRight' && player.x <= cvs.width - player.width - (player.width / 3)) {
        player.x += speedPlayer;
        localStorage.setItem('player', JSON.stringify(player))

        for(let i = 0; i < obstacle.length; i++) {
            if (player.x >= obstacle[i].x && player.x <= obstacle[i].x + player.width) {
                localStorage.setItem('score', ++score);
            }
        }
    } 
    else if (code == 'ArrowLeft' && player.x >= player.width / 1.5) {
        player.x -= speedPlayer
        localStorage.setItem('player', JSON.stringify(player));
    } 
}

function drawGame() {
    ctx.clearRect(0, 0, cvs.offsetWidth, cvs.offsetHeight);

    for(let i = 0; i < ground.length; i++) {
        ctx.drawImage(groundOut, ground[i].x, ground[i].y);
        ground[i].x--

        if(ground[i].x == -cvs.width) {
            ground.push({
                x: cvs.width,
                y: cvs.height - 30
            });
        }

        if(ground[i].x == 0) ground.shift()
    }

    ctx.drawImage(playerOut, player.x, player.y, player.width, player.height);

    for(let i = 0; i < obstacle.length; i++) {
        ctx.drawImage(obstacleOut, obstacle[i].x, obstacle[i].y, obstacle[i].width, obstacle[i].height);

        obstacle[i].x -= 1;
        localStorage.setItem('obstacle', JSON.stringify(obstacle));

        if(obstacle[i].x == distanceBetweenObstacles) {
            obstacle.push({
                x: cvs.width,
                y: mathRandom(obstacle[i].y + 5, obstacle[i].y - 6),
                width: 30,
                height: 100
            });    
        }

        if((player.x + player.width >= obstacle[i].x && player.x + player.width <= (obstacle[i].x + obstacle[i].width + player.width)) &&
        (player.y + player.height >= obstacle[i].y)) {

            defaultPosForPlayer()
            defaultPosForObstacles()
            localStorage.setItem('score', score = 0);

            location.reload();
        }

        if (player.x == obstacle[i].x) {
            localStorage.setItem('score', ++score);
        }
    }

    if (player.y <= cvs.height - 50) {
        player.y += grav;
    }

    localStorage.setItem('player', JSON.stringify(player))

    ctx.fillStyle = '#000';
    ctx.font = '13px Verdana';
    ctx.fillText(`Score: ${score}`, 5, 15);
    // ctx.fillText(`Best Score ${score}`, 100, 15);

    requestAnimationFrame(drawGame)
}

drawGame();