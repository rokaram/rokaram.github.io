'use strict'

const container = document.querySelector('.container')
const modalDom = document.querySelector('.modal')
const pauseModal = document.querySelector('.pause')
const looseModal = document.querySelector('.loose')
const pauseBtn = document.querySelector('.pauseBtn')
const exitBtn = document.querySelector('.exitBtn')
const restartBtn = document.querySelector('.restartBtn')
const looseTimerOut = document.querySelector('.loose-timer')

const cvs = document.querySelector('.cvs')
const ctx = cvs.getContext('2d')

cvs.width = container.clientWidth
cvs.height = container.clientHeight

const appleImg = new Image()
appleImg.src = '../../images/apple.png'

const bananaImg = new Image()
bananaImg.src = '../../images/banana.png'

const cauliflowerImg = new Image()
cauliflowerImg.src = '../../images/cauliflower.png'

const basketImg = new Image()
basketImg.src = '../../images/basket.png'

const sumFoods = 3

let missingScore = localStorage.getItem('missingScore') || 0
let score = localStorage.getItem('score') || 0
let allScores = JSON.parse(localStorage.getItem('allScores')) || []
let bestScore = localStorage.getItem('bestScore') || 0
let sizeFood = 40
let pauseGame = JSON.parse(localStorage.getItem('pauseGame')) || false
let typePause = localStorage.getItem('typePause')
let timeInGame = localStorage.getItem('timeInGame') || 0
let looseTimer = localStorage.getItem('looseTimer') || 6

let cauliflower = []
for(let i = 0; i < sumFoods; i++) {
    cauliflower.push({
        width: sizeFood,
        height: sizeFood,
        x: random(10, cvs.width - sizeFood + 5),
        y: random(-cvs.height - 10, -sizeFood),
        speed: random(4, 7)
    })
}

let apple = []
for(let i = 0; i < sumFoods; i++) {
    apple.push({
        width: sizeFood,
        height: sizeFood,
        x: random(10, cvs.width - sizeFood + 5),
        y: random(-cvs.height - 10, -sizeFood),
        speed: random(4, 7)
    })
}

let banana = []
for(let i = 0; i < sumFoods; i++) {
    banana.push({
        width: sizeFood,
        height: sizeFood,
        x: random(10, cvs.width - sizeFood + 5),
        y: random(-cvs.height - 10, -sizeFood),
        speed: random(4, 7)
    })
}

let basket = {
    width: 100,
    height: 40,
    x: cvs.width / 2,
    y: cvs.height - sizeFood
}

const foods = [...cauliflower, ...apple, ...banana]

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
    setAllScores()
    setScoresNull()
    localStorage.setItem('pauseGame', false)
    location.href = '../../index.html'
}

function restartGame() {
    foods.forEach(el => setDefaultY(el))
    setScoresNull()
}

function setDefaultY(item) {
    item.y = random(-cvs.height - 10, -sizeFood)
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
            case 'loose':
                looseModal.classList.remove('hide')
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
            case 'loose':
                looseModal.classList.add('hide')
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
            case 'loose':
                looseModal.classList.toggle('hide')
                modalDom.classList.toggle('z20')
                break
        }
    },
}

function loose() {
    if(missingScore >= 10) {
        localStorage.setItem('pauseGame', true)
        allScores.push({score, missingScore})
        localStorage.setItem('allScores', JSON.stringify(allScores))
        modal.open('loose')

        let timer = setInterval(() => {
            localStorage.setItem('looseTimer', --looseTimer)
            looseTimerOut.textContent = looseTimer
            if(looseTimer <= 0) {
                clearInterval(timer)
                localStorage.setItem('looseTimer', 6)
                exit()
            }
        }, 1000)
    }
}

function outScore(score) {
    const scoreText = document.querySelector('.score')
    scoreText.innerText = score
}

function outMissingScore(missingScore) {
    const missingScoreText = document.querySelector('.score-missing')
    missingScoreText.innerText = missingScore
}

function gravFood(item) {
    item.y += item.speed

    if(item.y > cvs.height) {
        localStorage.setItem('missingScore', ++missingScore)
        item.y = 0 - item.height
        item.speed = random(4, 7)
        setDefaultX(item)
        loose()
    }
}

function drawFoods() {
    for(let i = 0; i < sumFoods; i++) {
        ctx.drawImage(cauliflowerImg, cauliflower[i].x, cauliflower[i].y, cauliflower[i].width, cauliflower[i].height)
        gravFood(cauliflower[i])

        ctx.drawImage(appleImg, apple[i].x, apple[i].y, apple[i].width, apple[i].height)
        gravFood(apple[i])

        ctx.drawImage(bananaImg, banana[i].x, banana[i].y, banana[i].width, banana[i].height)
        gravFood(banana[i])
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

function drawGame() {
    pauseGame = JSON.parse(localStorage.getItem('pauseGame')) || false

    outScore(score)
    outMissingScore(missingScore)

    if(!pauseGame) {
        ctx.clearRect(0, 0, cvs.width, cvs.height)
        ctx.drawImage(basketImg, basket.x, basket.y, basket.width, basket.height)

        bump()
        drawFoods()
    }
    requestAnimationFrame(drawGame)
}

if(pauseGame && typePause) {
    modal.open(typePause)
    loose()
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