'use strict'

const title = document.querySelector('.menu__header-title')
let clicks = 0

title.addEventListener('click', () => {
    clicks++
    if(clicks >= 10) {
        clicks = 0
        localStorage.clear()
        location.reload()
    }
})