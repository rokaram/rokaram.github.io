'use strict'

const colors = ['#DC143C', '#C71585', '#FFD700', '#FF8C00', '#EE82EE', '#32CD32']
const text = document.querySelector('.intro__title')
const updateBtn = document.querySelector('.intro__updateBtn')

const rand = (min, max) => {
    return Math.round(Math.random() * (max - min) + min)
}

const splitClass = (htmlEl, className) => {
    const text = htmlEl.textContent.split('')
    const classedText = text.map(el => {
        return `<span class='${className}'>${el}</span>`
    })
    htmlEl.innerHTML = classedText.join('')
}

splitClass(text, "intro__title-letter")

const multicolorLet = htmlEl => {
    const text = htmlEl.children.length ? htmlEl.children : htmlEl
    if(text.length) {
        for(let i = 0; i < text.length; i++) {
            text[i].style.color = `${colors[rand(0, 5)]}`
        }
    } else {
        text.style.color = `${colors[rand(0, 5)]}`
    }
}

const multisizeLet = htmlEl => {
    const text = htmlEl.children.length ? htmlEl.children : htmlEl
    if(text.length) {
        for(let i = 0; i < text.length; i++) {
            text[i].style.fontSize = `${rand(30, 50)}px`
        }
    } else {
        text.style.fontSize = `${rand(30, 50)}px`
    }
}

const multicolsizeLet = htmlEl => {
    multicolorLet(htmlEl)
    multisizeLet(htmlEl)
}

multicolsizeLet(text)

updateBtn.addEventListener('click', () => {
    multicolsizeLet(text)
})

const textLets = document.querySelectorAll('.intro__title-letter')

textLets.forEach(el => {
    el.addEventListener('mouseover', () => multicolsizeLet(el))
    el.addEventListener('touchmove', () => multicolsizeLet(el))
})