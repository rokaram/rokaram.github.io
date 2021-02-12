'use strict'

const documentWrapper = document.querySelector('.wrapper')
const loader = document.querySelector('.loader')

document.addEventListener("DOMContentLoaded", () => {
    documentWrapper.style.display = 'block'
    loader.style.display = 'none'
})

const colors = ['#d62828', '#C71585', '#FFD700', '#FF8C00', '#EE82EE', '#32CD32', '#57c4e5']
const title = document.querySelector('.intro__title')
const updateBtn = document.querySelector('.intro__updateBtn')
const introBlock = document.querySelector('.intro__block')

let isAnimPhrase = true

const rand = (min, max) => Math.round(Math.random() * (max - min) + min)

const anim = (htmlEl, animName) => {
    htmlEl.classList.remove(animName, 'animated')
    setTimeout(() => htmlEl.classList.add(animName, 'animated'), 0)
}

const splitClass = (htmlEl, className) => {
    const title = htmlEl.textContent.split('')
    const classedText = title.map(el => `<span class='${className}'>${el}</span>`)
    htmlEl.innerHTML = classedText.join('')
}

splitClass(title, "intro__title-letter")

const multicolorLet = htmlEl => {
    const title = htmlEl.children.length ? htmlEl.children : htmlEl
    if(title.length) {
        for(let i = 0; i < title.length; i++) {
            title[i].style.color = `${colors[rand(0, colors.length - 1)]}`
        }
    } else {
        title.style.color = `${colors[rand(0, colors.length - 1)]}`
    }
}

const multisizeLet = htmlEl => {
    const title = htmlEl.children.length ? htmlEl.children : htmlEl
    if(title.length) {
        for(let i = 0; i < title.length; i++) {
            title[i].style.fontSize = `${rand(30, 50)}px`
        }
    } else {
        title.style.fontSize = `${rand(30, 50)}px`
    }
}

const multicolsizeLet = htmlEl => {
    multicolorLet(htmlEl)
    multisizeLet(htmlEl)
}

multicolsizeLet(title)

updateBtn.addEventListener('click', () => {
    multicolsizeLet(title)
    anim(title, 'headShake')
    anim(updateBtn, 'jello')
})

const textLets = document.querySelectorAll('.intro__title-letter')

textLets.forEach(el => {
    el.addEventListener('mouseover', () => isAnimPhrase && multicolsizeLet(el))
    el.addEventListener('touchmove', () => isAnimPhrase && multicolsizeLet(el))
})

introBlock.addEventListener('mouseover', () => isAnimPhrase && title.classList.add('tada', 'animated'))
introBlock.addEventListener('mouseout', () => title.classList.remove('tada', 'animated'))

