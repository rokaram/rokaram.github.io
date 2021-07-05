'use strict'

const collectedScoreOut = document.querySelector('.collectedScore')
const playedMatchesOut = document.querySelector('.matchesPlayed')
const timeInGameOut = document.querySelector('.timeInGame')
const bestScoreOut = document.querySelector('.bestScore')

let allScores = JSON.parse(localStorage.getItem('allScores')) || []
let timeInGame = localStorage.getItem('timeInGame') || 0
let playedMatches = localStorage.getItem('playedMatches') || 0
console.log(allScores)
let collectedScoresSum = allScores.length && allScores.map(el => el.score).reduce((el, prev) => +el + +prev)
let bestScore = allScores.map(el => el.score).sort((a, b) => a - b)[allScores.length - 1] || 0

collectedScoreOut.textContent = collectedScoresSum
playedMatchesOut.textContent = playedMatches
bestScoreOut.textContent = bestScore
timeInGameOut.innerText = timeInGame > 60 ? `${Math.round(timeInGame / 60)} мин` : `${timeInGame} секунд`