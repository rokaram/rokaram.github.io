'use strict'

const documentWrapper = document.querySelector('.wrapper')
const loader = document.querySelector('.loader')

document.addEventListener("DOMContentLoaded", () => {
    documentWrapper.style.display = 'block'
    loader.style.display = 'hide'
})

const colors = ['#d62828', '#C71585', '#FFD700', '#FF8C00', '#EE82EE', '#32CD32', '#57c4e5']
const text = document.querySelector('.intro__title')
const updateBtn = document.querySelector('.intro__updateBtn')
const destroyBtn = document.querySelector('.intro__destroyBtn')
const introBlock = document.querySelector('.intro__block')

let isAnimPhrase = true

const rand = (min, max) => Math.round(Math.random() * (max - min) + min)

const anim = (htmlEl, animName) => {
    htmlEl.classList.remove(animName, 'animated')
    setTimeout(() => htmlEl.classList.add(animName, 'animated'), 0)
}

const splitClass = (htmlEl, className) => {
    const text = htmlEl.textContent.split('')
    const classedText = text.map(el => `<span class='${className}'>${el}</span>`)
    htmlEl.innerHTML = classedText.join('')
}

splitClass(text, "intro__title-letter")

const multicolorLet = htmlEl => {
    const text = htmlEl.children.length ? htmlEl.children : htmlEl
    if(text.length) {
        for(let i = 0; i < text.length; i++) {
            text[i].style.color = `${colors[rand(0, colors.length - 1)]}`
        }
    } else {
        text.style.color = `${colors[rand(0, colors.length - 1)]}`
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
    anim(text, 'headShake')
    anim(updateBtn, 'jello')
})

const textLets = document.querySelectorAll('.intro__title-letter')

textLets.forEach(el => {
    el.addEventListener('mouseover', () => isAnimPhrase && multicolsizeLet(el))
    el.addEventListener('touchmove', () => isAnimPhrase && multicolsizeLet(el))
})

introBlock.addEventListener('mouseover', () => isAnimPhrase && text.classList.add('tada', 'animated'))
introBlock.addEventListener('mouseout', () => text.classList.remove('tada', 'animated'))


