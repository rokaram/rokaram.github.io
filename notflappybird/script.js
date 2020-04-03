'use strict';

const modal = document.querySelector('.modal');
const modalItem = modal.querySelector('.modal__item');

let isMobail;
const reg = /(iPhone|Android|iPad|RIM)/;

if (navigator.userAgent.match(reg)){
    isMobail = true;
    modal.classList.remove('hide');
    modalItem.textContent = 'На данный момент мобильные устройства не поддерживают данное приложение :(';
} else {
    isMobail = false;
}

if(!isMobail) {
document.querySelector('.settings-icon').classList.remove('hide');

function mathRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

const scoreText = document.querySelector('.score');
const bestScoreText = document.querySelector('.best-score');

const cvs = document.querySelector('.canvas');
const ctx = cvs.getContext('2d');

const playerOut = new Image(); playerOut.src = 'images/player.png';
const groundOut = new Image(); groundOut.src = 'images/ground.png';
const obstacleOut = new Image(); obstacleOut.src = 'images/obstacle.png';
const settingsBlackOut = new Image(); settingsBlackOut.src = 'images/settings_black.png';
const settingsWhiteOut = new Image(); settingsWhiteOut.src = 'images/settings_white.png';

const distanceBetweenObstacles = 200;
let speedPlayer = 50;
let grav = 2;

let score = localStorage.getItem('score');
let bestScore = localStorage.getItem('bestScore');
let allScores = JSON.parse(localStorage.getItem('allScores'));


// if new player
if(!score) {
    modalItem.innerHTML = `Добро пожаловать в игру<br> 'not Flappy Bird' <p class='small-text'>(Кликни сюда чтобы начать игру)</p>`;
    modal.classList.remove('hide');

    modal.addEventListener('click', () => { 
        location.reload();
    });

    localStorage.setItem('allScores', JSON.stringify([]));
    allScores = JSON.parse(localStorage.getItem('allScores'));

    localStorage.setItem('score', 0);
}

// default position for player
let player = JSON.parse(localStorage.getItem('player'));

function defaultPosForPlayer() {
    localStorage.setItem('player', JSON.stringify({
        x: 10,
        y: cvs.height - 115,
        width: 70,
        height: 50
    }));

    player = JSON.parse(localStorage.getItem('player'));
}

if(!player) defaultPosForPlayer();


// default position for obstacles
let obstacle = JSON.parse(localStorage.getItem('obstacle'));

function defaultPosForObstacles() {
    localStorage.setItem('obstacle', JSON.stringify([]));
    obstacle = JSON.parse(localStorage.getItem('obstacle'));

    obstacle[0] = {
        x: cvs.width,
        y: cvs.height - 130,
        width: 65,
        height: 300
    }
}

if(!obstacle || obstacle.length == 0) defaultPosForObstacles();

let ground = [];

ground[0] = {
    x: 0,
    y: cvs.height - 70
}

ground[1] = {
    x: cvs.width,
    y: cvs.height - 70
}


// what happend if you loos:
function loosFunc() {
    defaultPosForPlayer();
    defaultPosForObstacles();
    
    allScores.push(Number(score));
    allScores.sort().splice(0, allScores.length - 1);

    localStorage.setItem('bestScore', allScores[0]);
    localStorage.setItem('allScores', JSON.stringify(allScores));
    localStorage.setItem('score', 0);

    localStorage.setItem('timerForRestart', 10);

    location.reload();
}

// loos window open
let timerForRestart = localStorage.getItem('timerForRestart');

if(!timerForRestart) {
    localStorage.setItem('timerForRestart', 10);
    timerForRestart = localStorage.getItem('timerForRestart');
}

let IsOpenLoosModal = false;

function loosModalOpen() {
    IsOpenLoosModal = true;

    if(score > bestScore) {
        modalItem.innerHTML = `Ты чо проиграл) ну ладно хоть рекорд <br> Игра начнётся через: ${timerForRestart} сек. <br> Или просто кликни сюда`
    } else {
        modalItem.innerHTML = `Ты чо проиграл) <br> Игра начнётся через: ${timerForRestart} сек. <br> Или просто кликни сюда`;
    }
    modal.classList.remove('hide')

    setInterval(() => {
        if(timerForRestart > 0) {
            localStorage.setItem('timerForRestart', --timerForRestart);
            if(score > bestScore) {
                modalItem.innerHTML = `Ты чо проиграл) ну ладно хоть рекорд <br> Игра начнётся через: ${timerForRestart} сек. <br> Или просто кликни сюда`
            } else {
                modalItem.innerHTML = `Ты чо проиграл) <br> Игра начнётся через: ${timerForRestart} сек. <br> Или просто кликни сюда`;
            }

            modal.addEventListener('click', () => loosFunc() );
        } else {
            localStorage.setItem('timerForRestart', 10);
            loosFunc();
        }
    }, 1000);
}

if(timerForRestart && timerForRestart < 10) {
    loosModalOpen();
    setInterval(() => drawGameInPause() , 0)
}


// player move function
function movePlayer(code) {
    if(modal.classList.contains('hide')) {
        if ((code === 'Space' || code === 'ArrowUp') && player.y >= cvs.height - 115) {
            player.y -= 155;
            localStorage.setItem('player', JSON.stringify(player));
        } 
        else if (code === 'ArrowRight' && player.x <= cvs.width - player.width / 2) {
            player.x += speedPlayer;
            localStorage.setItem('player', JSON.stringify(player));

            for(let i = 0; i < obstacle.length; i++) {
                if (player.x >= obstacle[i].x && player.x <= obstacle[i].x + player.width / 1.5) {
                    localStorage.setItem('score', ++score);
                }
            }
        } 
        else if (code === 'ArrowLeft' && player.x >= 0) {
            player.x -= speedPlayer;
            localStorage.setItem('player', JSON.stringify(player));
        }
    }
}


function drawGameInPause() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);

    for(let i = 0; i < ground.length; i++) {
        ctx.drawImage(groundOut, ground[i].x, ground[i].y, cvs.width, 250);
    }

    ctx.drawImage(playerOut, player.x, player.y, player.width, player.height);

    for(let i = 0; i < obstacle.length; i++) {
        ctx.drawImage(obstacleOut, obstacle[i].x, obstacle[i].y, obstacle[i].width, obstacle[i].height);
    }

    localStorage.setItem('player', JSON.stringify(player))
    scoreText.textContent = `Счёт: ${score}`;
    bestScoreText.textContent = `Лучший счёт: ${allScores.length > 0 ? bestScore : score}`;
}


// key down to move
window.addEventListener('keydown', ({ code }) => movePlayer(code) );


// draw objects, logic for spawn objects and check for loos
function drawGame() {
    if(modal.classList.contains('hide')) {
        ctx.clearRect(0, 0, cvs.width, cvs.height);

        // logic for spawn ground and move ground
        for(let i = 0; i < ground.length; i++) {
            ctx.drawImage(groundOut, ground[i].x, ground[i].y, cvs.width, 250);
            ground[i].x -= 2;

            if(ground[i].x === -cvs.width) {
                ground.push({
                    x: cvs.width,
                    y: cvs.height - 70
                });
            }

            if(ground[i].x === 0) ground.shift();
        }

        ctx.drawImage(playerOut, player.x, player.y, player.width, player.height);

        // logic for spawn obstacle and move obstacle
        for(let i = 0; i < obstacle.length; i++) {
            ctx.drawImage(obstacleOut, obstacle[i].x, obstacle[i].y, obstacle[i].width, obstacle[i].height);

            obstacle[i].x -= 2;
            localStorage.setItem('obstacle', JSON.stringify(obstacle));

            if(obstacle[i].x === distanceBetweenObstacles) {
                obstacle.push({
                    x: cvs.width,
                    y: mathRandom(obstacle[i].y + 4, obstacle[i].y - 3),
                    width: 65,
                    height: 300
                });    
            }

            if (player.x === obstacle[i].x) {
                localStorage.setItem('score', ++score);
            }

            // check for loos
            if((player.x + player.width >= obstacle[i].x 
                && player.x + player.width <= (obstacle[i].x + obstacle[i].width + player.width)) 
                && (player.y + player.height >= obstacle[i].y)) {
                loosModalOpen()
            }
        }

        // gravitation
        if (player.y <= cvs.height - 115) {
            player.y += grav;
        }

        localStorage.setItem('player', JSON.stringify(player))
        scoreText.textContent = `Счёт: ${score}`;
        bestScoreText.textContent = `Лучший счёт: ${allScores.length > 0 ? bestScore : 0}`;
    } else {
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        ctx.drawImage(settingsWhiteOut, cvs.width - 60, 10, 50, 50);
        drawGameInPause()
    }

    requestAnimationFrame(drawGame)
}

drawGame();

const settings = document.querySelector('.settings');
const settingsLinks = document.querySelectorAll('.settings__link');
const settingsSpecifications = document.querySelectorAll('.settings__specification');
const settingsLinkArrows = document.querySelectorAll('.settings__link-arrow');
const settingsIcons = document.querySelectorAll('.settings-icon');
const settingsIconWhite = document.querySelector('.settings-icon--white');
const removeDataBtn = document.querySelector('.settings__specification-removedata');

let isGamePause = JSON.parse(localStorage.getItem('isGamePause'));

// open settings links
for(let i = 0; i < settingsLinks.length; i++) {
    settingsLinks[i].addEventListener('click', () => {
        if(!settingsSpecifications[i].classList.contains('settings__specification--active')) {
            settingsSpecifications[i].style.maxHeight = settingsSpecifications[i].scrollHeight + 'px';
        } else {
            settingsSpecifications[i].style.maxHeight = 0 + 'px';
        }

        removeDataBtn.addEventListener('click', () => {
            localStorage.clear();
            defaultPosForPlayer();
            location.reload();
        });

        settingsSpecifications[i].classList.toggle('settings__specification--active');
        settingsLinkArrows[i].classList.toggle('settings__link-arrow--active');
    });
}

function openModal() {
    if(modal.classList.contains('hide')) {
        modalItem.style.top = 25 + '%';
        modalItem.style.transform = `translate(${-50}%, ${0}%)`;
        localStorage.setItem('isGamePause', JSON.stringify(true));
    } else {
        localStorage.setItem('isGamePause', JSON.stringify(false));
        modalItem.style.top = 50 + '%';
        modalItem.style.transform = `translate(${-50}%, ${-50}%)`;
    }

    modal.classList.toggle('hide');
    settings.classList.toggle('hide');
    settingsIconWhite.classList.toggle('hide');
}

// change settings icon
for(let i = 0; i < settingsIcons.length; i++) {
    settingsIcons[i].addEventListener('click', () => openModal());
}

window.addEventListener('keydown', ({ code }) => {
    if(code === 'Escape' && !IsOpenLoosModal) openModal();
});


if(isGamePause) {
    modalItem.style.top = 25 + '%';
    modalItem.style.transform = `translate(${-50}%, ${0}%)`;
    localStorage.setItem('isGamePause', JSON.stringify(true));

    modal.classList.remove('hide');
    settings.classList.remove('hide');
    settingsIconWhite.classList.remove('hide');
}

}