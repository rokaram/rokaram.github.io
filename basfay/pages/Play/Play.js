'use strict'

const container = document.querySelector('.container')
const pauseModal = document.querySelector('.modal')
const pauseBtn = document.querySelector('.pauseBtn')

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
let allScores = localStorage.getItem('allScores') || 0
let bestScore = localStorage.getItem('bestScore') || 0
let sizeFood = 40
let pauseGame = localStorage.getItem('pauseGame') || false

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

function checkPause() {
    return !pauseModal.classList.contains('hide') ? true : localStorage.getItem('pauseGame')
}

function setDefaultX(item) {
    item.x = random(10, cvs.width - item.width + 5)
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
        setDefaultX(item)
        localStorage.setItem('missingScore', missingScore++)
        item.y = 0 - item.height
        item.speed = random(4, 7)
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
            localStorage.setItem('score', score++)
            setDefaultX(foods[i])
            foods[i].speed = random(4, 7)
            foods[i].y = -foods[i].height
        }
    }
}

function drawGame() {
    pauseGame = checkPause()

    if(!pauseGame) {
        ctx.clearRect(0, 0, cvs.width, cvs.height)
        ctx.drawImage(basketImg, basket.x, basket.y, basket.width, basket.height)

        drawFoods()
        bump()
        outScore(score)
        outMissingScore(missingScore)
    }
    requestAnimationFrame(drawGame)
}

cvs.addEventListener('mousemove', e => moveBasket(e.offsetX))
cvs.addEventListener('touchmove', e => moveBasket(e.changedTouches[0].clientX))

pauseBtn.addEventListener('click', () => {
    pauseModal.classList.toggle('hide')
})

drawGame()