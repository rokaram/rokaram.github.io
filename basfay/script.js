'use strict'

const cvs = document.querySelector('.cvs')
const ctx = cvs.getContext('2d')

cvs.width = window.innerWidth
cvs.height = window.innerHeight

const appleImg = new Image()
appleImg.src = 'images/apple.png'

const bananaImg = new Image()
bananaImg.src = 'images/banana.png'

const basketImg = new Image()
basketImg.src = 'images/basket.png'

const sumFoods = 3
let missingScore = 0
let score = 0
let speedFood = 6

let apple = []
for(let i = 0; i < sumFoods; i++) {
    apple.push({
        width: 50,
        height: 50,
        x: random(10, cvs.width - 55),
        y: random(10, cvs.height + 10),
    })
}

let banana = []
for(let i = 0; i < sumFoods; i++) {
    banana.push({
        width: 50,
        height: 50,
        x: random(10, cvs.width - 55),
        y: random(10, cvs.height + 50),
    })
}

let basket = {
    width: 100,
    height: 50,
    x: cvs.width / 2,
    y: cvs.height - 50
}

const foods = [...apple, ...banana]

function random(min, max) {
    return Math.round(Math.random() * (min - max) + max)
}

function setDefaultX(item) {
    item.x = random(10, cvs.width - 55)
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
    item.y += speedFood

    if(item.y > cvs.height) {
        setDefaultX(item)
        missingScore++
        item.y = 0 - item.height
    }
}

function drawFoods() {
    for(let i = 0; i < sumFoods; i++) {
        ctx.drawImage(appleImg, apple[i].x, apple[i].y, apple[i].width, apple[i].height)
        gravFood(apple[i])

        ctx.drawImage(bananaImg, banana[i].x, banana[i].y, banana[i].width, banana[i].height)
        gravFood(banana[i])
    }
}

function moveBasket(x) {
    basket.x = x - basket.width / 2
}

function bump() {
    for(let i = 0; i < foods.length; i++) {
        if(basket.x < foods[i].x + foods[i].width && basket.x + basket.width > foods[i].x
            && basket.y < foods[i].y + foods[i].height && basket.y + basket.height / 4 > foods[i].y + foods[i].height) {
            score++
            setDefaultX(foods[i])
            foods[i].y = -foods[i].height
        }
    }
}

function drawGame() {
    ctx.clearRect(0, 0, cvs.width, cvs.height)
    ctx.drawImage(basketImg, basket.x, basket.y, basket.width, basket.height)

    drawFoods()
    bump()
    outScore(score)
    outMissingScore(missingScore)
    requestAnimationFrame(drawGame)
}

window.addEventListener('mousemove', e => moveBasket(e.clientX))
window.addEventListener('touchmove', e => moveBasket(e.changedTouches[0].clientX))


drawGame()