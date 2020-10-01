'use strict'

const playerScoreOut = document.querySelectorAll('.player-score')
const enemyScoreOut = document.querySelectorAll('.enemy-score')
const modal = document.querySelector('.modal')
const settingsBtns = document.querySelectorAll('.settings')
const lobbySection = document.querySelector('.lobby')
const gameplaySection = document.querySelector('.gameplay')

const cvs = document.querySelector('.canvas')
const ctx = cvs.getContext('2d')

cvs.width = window.innerWidth
cvs.height = window.innerHeight

const bollImg = new Image()
bollImg.src = 'player.png'

const bollOnLeftImg = new Image()
bollOnLeftImg.src = 'player2.png'

const playerImg = new Image()
playerImg.src = 'obstacle.png'

const enemyImg = new Image()
enemyImg.src = 'obstacle.png'

let isMouseDown = false
let pauseGame = false
let onTheLobby = true

let isDoublePlayerMode = false

const mathRandom = {
    n(min, max) {
        return Math.random() * (min - max) + max
    },
    round(min, max) {
        return Math.round(Math.random() * (min - max) + max)
    },
    floor(min, max) {
        return Math.floor(Math.random() * (min - max) + max)
    },
    ceil(min, max) {
        return Math.ceil(Math.random() * (min - max) + max)
    }
}

let obtY = random([false, true])
let obtX = random([false, true])

const boll = {
    width: 60,
    height: 40,
    x: window.innerWidth / 2 - 30,
    y: window.innerHeight / 2 - 20,
    default: {
        x: window.innerWidth / 2 - 30,
        y: window.innerHeight / 2 - 20,
    },
    speedX: 30,
    speedY: mathRandom.round(15, 20)
}

const player = {
    width: 20,
    height: 80,
    x: 5,
    y: window.innerHeight / 2 - 40,
    default: {
        x: 5,
        y: window.innerHeight / 2 - 40
    },
    smallerSpeed: onTheLobby ? mathRandom.n(0.7, 1) : 1,
    speed: onTheLobby ? boll.speedY * mathRandom.n(0.7, 1) : 100,
    score: 0
}

const enemy = {
    width: 20,
    height: 80,
    x: window.innerWidth - 25,
    y: window.innerHeight / 2 - 40,
    default: {
        x: window.innerWidth - 25,
        y: window.innerHeight / 2 - 40,
    },
    smallerSpeed: mathRandom.n(0.7, 1),
    speed: isDoublePlayerMode ? player.speed : boll.speedY * mathRandom.n(0.7, 1),
    score: 0
}

function random(arr) {
    return arr[mathRandom.floor(0, arr.length)]
}

function lossed(who) {
    switch(who) {
        case player: 
            player.x = player.default.x
            player.y = player.default.y
            enemy.x = enemy.default.x
            enemy.y = enemy.default.y

            boll.x = player.x + player.width
            boll.y = player.y + player.height / 2 - boll.height / 2
            break
        case enemy:
            enemy.x = enemy.default.x
            enemy.y = enemy.default.y
            player.x = player.default.x
            player.y = player.default.y

            boll.x = enemy.x - boll.width
            boll.y = enemy.y + enemy.height / 2 - boll.height / 2
            break
    }
}

function stayDeafultPos() {
    boll.y = boll.default.y
    boll.x = boll.default.x

    player.y = player.default.y
    player.x = player.default.x

    enemy.y =enemy.default.y
    enemy.x =enemy.default.x
}

function changeSpeed() {
    if(onTheLobby) {
        boll.speedY = mathRandom.round(15, 20)
        enemy.speed = boll.speedY * mathRandom.n(0.7, 1)
        player.speed = boll.speedY * mathRandom.n(0.7, 1)
    } else {
        boll.speedY = mathRandom.round(5, 20)
        enemy.speed = boll.speedY * enemy.smallerSpeed
        player.speed = boll.speedY * player.smallerSpeed
    }
}

function scoreOut() {
    playerScoreOut.forEach(item => item.textContent = player.score)
    enemyScoreOut.forEach(item => item.textContent = enemy.score)
}

function startNewGame() {
    enemy.score = player.score = 0
    boll.x = boll.default.x
    boll.y = boll.default.y
}

function playPlayer(mouseY) {
    if(onTheLobby) {
        if(player.y + player.height / 2 > boll.y + boll.height / 2) player.y -= player.speed
        else if(player.y < boll.y) player.y += player.speed
    } else {
        player.y = mouseY - player.height / 2
    }
}

function playEnemy() {
    if(enemy.y + enemy.height / 2 > boll.y + boll.height / 2) enemy.y -= enemy.speed
    else if(enemy.y < boll.y) enemy.y += enemy.speed
}

function exitOnLobby() {
    onTheLobby = true

    lobbySection.style.display = 'flex'
    cvs.classList.add('canvasOnLobby')
    gameplaySection.classList.add('hide')

    modal.classList.toggle('hide')
    pauseGame = !pauseGame
}

function exitFromLobby() {
    stayDeafultPos()
    onTheLobby = false
    lobbySection.style.display = 'none'
    cvs.classList.remove('canvasOnLobby')
    gameplaySection.classList.remove('hide')

    pauseGame = true
    setTimeout(() => pauseGame = false , 1000)
    boll.speedX = 30

    enemy.smallerSpeed = 0.9
    enemy.speed = isDoublePlayerMode ? player.speed : boll.speedY * mathRandom.n(0.7, 1)
}

function grav() {
    if(window.innerHeight - boll.y > boll.height && !obtY) {
        boll.y += boll.speedY

        if(window.innerHeight - boll.y <= boll.height) {
            obtY = true
            changeSpeed()
        }
    } else if(boll.y > 0 && obtY) {
        boll.y -= boll.speedY

        if(boll.y <= 0) {
            obtY = false
            changeSpeed()
        }
    }

    if(window.innerWidth - boll.x >= 0 && !obtX) {
        boll.x += boll.speedX

        if(boll.x + boll.width >= enemy.x 
            && boll.x <= enemy.x + enemy.width
            && boll.y + boll.height >= enemy.y
            && boll.y < enemy.y + enemy.height) {
            obtX = true
        } else if(boll.x >= window.innerWidth) {
            player.score++
            obtX = true
            lossed(enemy)
            pauseGame = true
            setTimeout(() => {
                pauseGame = false
            }, 3000)
        }
    } else if(boll.x >= 0 && obtX) {
        boll.x -= boll.speedX

        if(boll.x + boll.width >= player.x 
            && boll.x <= player.x + player.width
            && boll.y + boll.height >= player.y
            && boll.y < player.y + player.height) {
            obtX = false
        } else if(boll.x <= 0) {
            enemy.score++
            obtX = false
            lossed(player)
            
            pauseGame = true
            setTimeout(() => {
                pauseGame = false
            }, 3000)
        }
    }
}

function drawImages() {
    ctx.drawImage(obtX ? bollOnLeftImg : bollImg, boll.x, boll.y, boll.width, boll.height)
    ctx.drawImage(playerImg, player.x, player.y, player.width, player.height)
    ctx.drawImage(enemyImg, enemy.x, enemy.y, enemy.width, enemy.height)
}

function drawGame() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    scoreOut()

    if(!pauseGame) {
        drawImages()
        if(!isDoublePlayerMode) playEnemy()
        if(onTheLobby) playPlayer()
        grav()
    } else {
        drawImages()
    }

    requestAnimationFrame(drawGame)
}

drawGame()

window.addEventListener('keydown', ({ code }) => {
    if(!pauseGame) {
        switch(code) {
            case 'KeyW':
                player.y -= player.speed
                break
            case 'KeyS':
                player.y += player.speed
                break
        }

        if(isDoublePlayerMode) {
            if(code === 'ArrowUp') {
                enemy.y -= enemy.speed
            } else if(code === 'ArrowDown') {
                enemy.y += enemy.speed
            }
        }
    }
})

window.addEventListener('mouseup', () => {
    isMouseDown = false
})

window.addEventListener('mousedown', () => {
    isMouseDown = true
})

window.addEventListener('mousemove', (e) => {
    if(isMouseDown && !pauseGame && !isDoublePlayerMode && !onTheLobby) {
        playPlayer(e.clientY, e.clientX)
    }
})

window.addEventListener('touchmove', (e) => {
    let touch = e.targetTouches[0]

    if(!pauseGame && !onTheLobby) {
        playPlayer(touch.clientY, touch.clientX)
    }
})


for(let i = 0; i < settingsBtns.length; i++) {
    settingsBtns[i].addEventListener('click', () => {
        modal.classList.toggle('hide')
        pauseGame = !pauseGame
    })
}

const menu = document.querySelector('.menu')
const menuLinks = document.querySelectorAll('.menu__link')
const menuSpecifications = document.querySelectorAll('.menu__specifications')

const exitOnLobbyBtn = document.querySelector('.pausemenu__link')

exitOnLobbyBtn.addEventListener('click', () => {
    exitOnLobby()
})

menuLinks[0].addEventListener('click', () => {
    exitFromLobby()
    startNewGame()
})