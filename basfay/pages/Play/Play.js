'use strict'

const container = document.querySelector('.container')
const modalDom = document.querySelector('.modal')
const pauseModal = document.querySelector('.pause')
const loseModal = document.querySelector('.lose')
const pauseBtn = document.querySelector('.pauseBtn')
const exitBtn = document.querySelector('.exitBtn')
const restartBtn = document.querySelector('.restartBtn')
const loseTimerOut = document.querySelector('.lose-timer')

const cvs = document.querySelector('.cvs')
const ctx = cvs.getContext('2d')

cvs.width = container.clientWidth
cvs.height = container.clientHeight

const appleImg = new Image()
appleImg.src = '../images/apple.png'

const bananaImg = new Image()
bananaImg.src = '../images/banana.png'

const cauliflowerImg = new Image()
cauliflowerImg.src = '../images/cauliflower.png'

const bombImg = new Image()
bombImg.src = '../images/bomb.png'

const basketImg = new Image()
basketImg.src = '../images/basket.png'

const sumFoods = 2
const sumJunks = 5

let missingScore = localStorage.getItem('missingScore') || 0
let score = localStorage.getItem('score') || 0
let allScores = JSON.parse(localStorage.getItem('allScores')) || []
let bestScore = localStorage.getItem('bestScore') || 0
let playedMatches = localStorage.getItem('playedMatches') || 0
let sizeObjects = 35
let pauseGame = JSON.parse(localStorage.getItem('pauseGame')) || false
let typePause = localStorage.getItem('typePause')
let timeInGame = localStorage.getItem('timeInGame') || 0
let loseTimer = localStorage.getItem('loseTimer') || 6

let cauliflower = []
for(let i = 0; i < sumFoods; i++) {
    cauliflower.push({
        width: sizeObjects,
        height: sizeObjects,
        x: random(10, cvs.width - sizeObjects + 5),
        y: random(-cvs.height - 10, -sizeObjects),
        speed: random(5, 8)
    })
}

let apple = []
for(let i = 0; i < sumFoods; i++) {
    apple.push({
        width: sizeObjects,
        height: sizeObjects,
        x: random(10, cvs.width - sizeObjects + 5),
        y: random(-cvs.height - 10, -sizeObjects),
        speed: random(5, 8)
    })
}

let banana = []
for(let i = 0; i < sumFoods; i++) {
    banana.push({
        width: sizeObjects,
        height: sizeObjects,
        x: random(10, cvs.width - sizeObjects + 5),
        y: random(-cvs.height - 10, -sizeObjects),
        speed: random(5, 8)
    })
}

let bomb = []
for(let i = 0; i < sumJunks; i++) {
    bomb.push({
        width: sizeObjects,
        height: sizeObjects,
        x: random(10, cvs.width - sizeObjects + 5),
        y: random(-cvs.height - 10, -sizeObjects),
        speed: random(4, 7)
    })
}

let basket = {
    width: 80,
    height: 40,
    x: cvs.width / 2,
    y: cvs.height - sizeObjects
}

const foods = [...cauliflower, ...apple, ...banana]
const junks = [...bomb]
const objects = [...foods, ...junks]

function random(min, max) {
    return Math.round(Math.random() * (min - max) + max)
}

function setDefaultX(item) {
    item.x = random(10, cvs.width - item.width + 5)
}

function setScoresNull() {
    localStorage.setItem('score', score = 0)
    localStorage.setItem('missingScore', missingScore = 0)
}

function setAllScores() {
    if(score < 1 && missingScore < 1) return

    allScores.push({score, missingScore})
    localStorage.setItem('allScores', JSON.stringify(allScores))
}

function exit() {
    setScoresNull()
    localStorage.setItem('pauseGame', false)
    location.href = '../index.html'
}

function restartGame() {
    objects.forEach(el => setDefaultY(el))
    setScoresNull()
}

function setDefaultY(item) {
    item.y = random(-cvs.height - 10, -sizeObjects)
}

function timingInGame() {
    setInterval(() => localStorage.setItem('timeInGame', ++timeInGame), 1000)
}

const modal = {
    open(type = 'pause') {
        modalDom.classList.remove('hide')
        localStorage.setItem('pauseGame', pauseGame = true)
        localStorage.setItem('typePause', type)

        switch(type) {
            case 'pause':
                pauseModal.classList.remove('hide')
                break
            case 'lose':
                loseModal.classList.remove('hide')
                modalDom.classList.add('z20')
                break
        }
    },
    close(type = 'pause') {
        modalDom.classList.add('hide')
        localStorage.setItem('pauseGame', pauseGame = false)
        localStorage.setItem('typePause', type)

        switch(type) {
            case 'pause':
                pauseModal.classList.add('hide')
                break
            case 'lose':
                loseModal.classList.add('hide')
                modalDom.classList.remove('z20')
                break
        }
    },
    toggle(type = 'pause') {
        modalDom.classList.toggle('hide')
        localStorage.setItem('pauseGame', !pauseGame)
        localStorage.setItem('typePause', type)

        switch(type) {
            case 'pause':
                pauseModal.classList.toggle('hide')
                break
            case 'lose':
                loseModal.classList.toggle('hide')
                modalDom.classList.toggle('z20')
                break
        }
    },
}

function lose() {
    if(missingScore >= 5) {
        localStorage.setItem('playedMatches', ++playedMatches)
        localStorage.setItem('pauseGame', true)
        modal.open('lose')

        let timer = setInterval(() => {
            localStorage.setItem('loseTimer', --loseTimer)
            loseTimerOut.textContent = loseTimer
            if(loseTimer <= 0) {
                clearInterval(timer)
                localStorage.setItem('loseTimer', 0)
                exit()
            }
        }, 1000)
    }
}

function outScore(score) {
    const scoreText = document.querySelector('.score')
    scoreText.textContent = score
}

function outMissingScore(missingScore) {
    const missingScoreText = document.querySelector('.score-missing')
    missingScoreText.textContent = missingScore
}

function gravFood(item) {
    item.y += item.speed

    if(item.y > cvs.height) {
        item.y = -item.height
        item.speed = random(4, 7)
        setDefaultX(item)
    }
}

function drawObjects(foods, junks) {
    for(let i = 0; i < sumFoods; i++) {
        for(let k = 0; k < foods.length; k++) {
            let objectImg = foods[k][0]
            let object = foods[k][1][i]
            ctx.drawImage(objectImg, object.x, object.y, object.width, object.height)
            gravFood(object)
        }
    }

    for(let i = 0; i < sumJunks; i++) {
        for(let k = 0; k < junks.length; k++) {
            let objectImg = junks[k][0]
            let object = junks[k][1][i]
            ctx.drawImage(objectImg, object.x, object.y, object.width, object.height)
            gravFood(object)
        }
    }
}

function moveBasket(x) {
    if(x > basket.width / 2  && x + basket.width / 2 < cvs.width) basket.x = x - basket.width / 2
}

function bump() {
    for(let i = 0; i < foods.length; i++) {
        if(basket.x < foods[i].x + foods[i].width && basket.x + basket.width > foods[i].x
            && basket.y < foods[i].y + foods[i].height && basket.y + basket.height > foods[i].y + foods[i].height) {
            localStorage.setItem('score', ++score)
            setDefaultX(foods[i])

            foods[i].speed = random(4, 7)
            foods[i].y = -foods[i].height
        }
    }
}

function bumpJunk() {
    for(let i = 0; i < junks.length; i++) {
        if(basket.x < junks[i].x + junks[i].width && basket.x + basket.width > junks[i].x
            && basket.y < junks[i].y + junks[i].height && basket.y + basket.height > junks[i].y + junks[i].height) {
            localStorage.setItem('missingScore', ++missingScore)
            junks[i].y = -junks[i].height
            junks[i].speed = random(4, 7)
            setDefaultX(junks[i])
            lose()
        }
    }
}

function drawGame() {
    pauseGame = JSON.parse(localStorage.getItem('pauseGame')) || false

    outScore(score)
    outMissingScore(missingScore)

    if(!pauseGame) {
        ctx.clearRect(0, 0, cvs.width, cvs.height)
        ctx.drawImage(basketImg, basket.x, basket.y, basket.width, basket.height)

        bump()
        bumpJunk()
        drawObjects([[cauliflowerImg, cauliflower], [appleImg, apple], [bananaImg, banana]], [[bombImg, bomb]])
    }
    requestAnimationFrame(drawGame)
}

if(pauseGame && typePause) {
    modal.open(typePause)
    lose()
}

cvs.addEventListener('mousemove', e => moveBasket(e.offsetX))
cvs.addEventListener('touchmove', e => moveBasket(e.changedTouches[0].clientX))

pauseBtn.addEventListener('click', () => {
    modal.toggle()
})

exitBtn.addEventListener('click', () => exit())

restartBtn.addEventListener('click', () => {
    restartGame()
    modal.toggle()
})

timingInGame()
drawGame()