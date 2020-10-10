'use strict'

const collectedScoreOut = document.querySelector('.collectedScore')
const missingScoreOut = document.querySelector('.missingScore')
const timeInGameOut = document.querySelector('.timeInGame')
const bestScoreOut = document.querySelector('.bestScore')

let allScores = JSON.parse(localStorage.getItem('allScores')) || []
let timeInGame = localStorage.getItem('timeInGame') || 0

let collectedScoresSum = allScores.length && allScores.map(el => el.score).reduce((el, prev) => +el + +prev)
let missingScoresSum = allScores.length && allScores.map(el => el.missingScore).reduce((el, prev) => +el + +prev)
let bestScore = allScores.map(el => el.score).sort((a, b) => a - b).slice(-1) || 0

collectedScoreOut.innerText = collectedScoresSum
missingScoreOut.innerText = missingScoresSum
bestScoreOut.innerText = bestScore
timeInGameOut.innerText = timeInGame > 60 ? `${Math.round(timeInGame / 60)} мин` : `${timeInGame} секунд`