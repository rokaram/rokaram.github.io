document.querySelector('.wrapper').classList.add('dnone');
new WOW().init();

window.onload = function() {

    document.querySelector('.loader').classList.add('dnone');
    document.querySelector('.wrapper').classList.remove('dnone');


// Modal
let 
    modal           = document.querySelector('.modal'),
    modalContainer  = document.querySelector('.modal__container'),
    modalClose      = document.querySelector('.modal__close'),
    modalLearn      = document.querySelector('.modal-learn');

modal.style.display = 'none';

// Open modal
function openModal() {
    modal.style.display = 'flex';

    setTimeout (() => 
        modalContainer.classList.add('modal__container--active'),
        modal.classList.add('modal--active')
    , 10)
}

// Hide modal
function hideModal() {
    setTimeout (() =>
        modal.style.display = 'none'
    , 300)

    modalContainer.classList.remove('modal__container--active');
    modal.classList.remove('modal--active');
}


modalLearn.addEventListener('click', (e) => { 
    e.preventDefault();
    openModal();
});

modalClose.addEventListener('click', () => { 
    hideModal();
});

modal.addEventListener('click', (e) => { 
    switch(e.target) {
        case modal:
            hideModal();
    }
});

window.addEventListener('keyup', (e) => { 
    switch(e.key) {
        case 'Escape':
            hideModal();
    }
});



// Scroll changes header and scroll-top-button
document.querySelector('.header').classList.add('header--active');

let headerLogAll = document.querySelectorAll('.header__logo img');

for (let i = 0; i < headerLogAll.length; i++) {
    headerLogAll[i].style.width = 190 + 'px';
}

window.addEventListener('scroll', (event) => {

    if (pageYOffset > 0) {
        document.querySelector('.header').classList.remove('header--active');

        for (let i = 0; i < headerLogAll.length; i++) {
            headerLogAll[i].style.width = 165 + 'px';
        }
    } else {
        document.querySelector('.header').classList.add('header--active');

        for (let i = 0; i < headerLogAll.length; i++) {
            headerLogAll[i].style.width = 190 + 'px';
        }
    }

    if (pageYOffset > document.querySelector('.intro').offsetHeight) {
        document.querySelector('.scroll-top').classList.add('scroll-top--active');
    } else {
        document.querySelector('.scroll-top').classList.remove('scroll-top--active');
    }

});


// Nav link active
let navLinkAll = document.querySelectorAll('.nav__link');

for (let i = 0; i < navLinkAll.length; i++) {
    navLinkAll[i].onclick = () => {

        for (let i = 0; i < navLinkAll.length; i++) {
            navLinkAll[i].classList.remove('nav__link--active');
        }

        navLinkAll[i].classList.add('nav__link--active');
    }
}

// Nav link active on scroll
window.addEventListener('scroll', () => {

    for (let i = 0; i < navLinkAll.length; i++) {
        if (pageYOffset < document.querySelector('.intro').offsetHeight
             + document.querySelector('.slider-cards').offsetHeight
             - document.querySelector('.header').offsetHeight
             + document.querySelector('.nav-burger__menu').offsetHeight) {

            navLinkAll[i].classList.remove('nav__link--active');
            navLinkAll[0].classList.add('nav__link--active');
            navLinkAll[7].classList.add('nav__link--active');
        }
        
        if (pageYOffset > document.querySelector('.intro').offsetHeight
            + document.querySelector('.slider-cards').offsetHeight
            - document.querySelector('.header').offsetHeight
            + document.querySelector('.nav-burger__menu').offsetHeight) {

            navLinkAll[i].classList.remove('nav__link--active');
            navLinkAll[1].classList.add('nav__link--active');
            navLinkAll[8].classList.add('nav__link--active');

        }
    }

    if (pageYOffset > document.querySelector('.intro').offsetHeight
                    + document.querySelector('.slider-cards').offsetHeight
                    + document.querySelector('.aboutus').offsetHeight
                    - document.querySelector('.header').offsetHeight
                    + document.querySelector('.nav-burger__menu').offsetHeight) {
                        
        for (let i = 0; i < navLinkAll.length; i++) {
            navLinkAll[i].classList.remove('nav__link--active');
            navLinkAll[2].classList.add('nav__link--active');
            navLinkAll[9].classList.add('nav__link--active');
        }
    }

    if (pageYOffset > document.querySelector('.intro').offsetHeight
                    + document.querySelector('.slider-cards').offsetHeight
                    + document.querySelector('.aboutus').offsetHeight
                    + document.querySelector('.sevices').offsetHeight
                    + document.querySelector('#steps-section').offsetHeight
                    - document.querySelector('.header').offsetHeight
                    + document.querySelector('.nav-burger__menu').offsetHeight) {

        for (let i = 0; i < navLinkAll.length; i++) {
            navLinkAll[i].classList.remove('nav__link--active');
            navLinkAll[3].classList.add('nav__link--active');
            navLinkAll[10].classList.add('nav__link--active');
        }
    }

    if (pageYOffset > document.querySelector('.intro').offsetHeight
                    + document.querySelector('.slider-cards').offsetHeight
                    + document.querySelector('.aboutus').offsetHeight
                    + document.querySelector('.sevices').offsetHeight
                    + document.querySelector('#steps-section').offsetHeight
                    + document.querySelector('#team').offsetHeight
                    - document.querySelector('.header').offsetHeight
                    + document.querySelector('.nav-burger__menu').offsetHeight) {

        for (let i = 0; i < navLinkAll.length; i++) {
            navLinkAll[i].classList.remove('nav__link--active');
            navLinkAll[4].classList.add('nav__link--active');
            navLinkAll[11].classList.add('nav__link--active');
        }
    }

    if (pageYOffset > document.querySelector('.intro').offsetHeight
                    + document.querySelector('.slider-cards').offsetHeight
                    + document.querySelector('.aboutus').offsetHeight
                    + document.querySelector('.sevices').offsetHeight
                    + document.querySelector('#steps-section').offsetHeight
                    + document.querySelector('#team').offsetHeight
                    + document.querySelector('#pricing').offsetHeight
                    + document.querySelector('.section-blue').offsetHeight
                    - document.querySelector('.header').offsetHeight
                    + document.querySelector('.nav-burger__menu').offsetHeight) {

        for (let i = 0; i < navLinkAll.length; i++) {
            navLinkAll[i].classList.remove('nav__link--active');
            navLinkAll[5].classList.add('nav__link--active');
            navLinkAll[12].classList.add('nav__link--active');
        }
    }

});


// Nav burger
let 
    btnNavBurger = document.querySelector('.nav-burger'),
    btnNavMenu = document.querySelector('.nav-burger__menu');

document.querySelector('body').onclick = (e) => {
    btnNavBurger.classList.remove('nav-burger--active');
    btnNavMenu.classList.remove('nav-burger__menu--active');
} 

btnNavBurger.onclick = (e) => {
    e.stopPropagation();

    btnNavBurger.classList.toggle('nav-burger--active');
    btnNavMenu.classList.toggle('nav-burger__menu--active');
}

btnNavMenu.onclick = (e) => {
    e.stopPropagation();
}


// Theme Site
let
    wrapper = document.querySelector('.wrapper'),

	themeButtonOrange   	= document.querySelector('.theme-block__orange'),
	themeButtonGreen		= document.querySelector('.theme-block__green'),
	themeButtonBlue			= document.querySelector('.theme-block__blue'),
	themeButtonPink   		= document.querySelector('.theme-block__pink'),
	themeButtonBlueLight	= document.querySelector('.theme-block__blue-light'),
	themeButtonPheol		= document.querySelector('.theme-block__pheol');

wrapper.classList.add('blue-theme');
themeButtonBlue.classList.add('theme-shadow');

document.querySelector('.theme-block__open').onclick = () => {
    document.querySelector('.theme-block').classList.toggle('theme-block-open');
};

themeButtonBlue.onclick = () => {
    wrapper.classList.add('blue-theme');
    wrapper.classList.remove('green-theme');
    wrapper.classList.remove('blue-light-theme');
    wrapper.classList.remove('orange-theme');
    wrapper.classList.remove('pink-theme');
    wrapper.classList.remove('pheol-theme');

    // Delete shadow of theme buttons
    for (let i = 0; i < document.querySelectorAll('.theme').length; i++) {
        document.querySelectorAll('.theme')[i].classList.remove('theme-shadow');
    }

    themeButtonBlue.classList.add('theme-shadow');
};

themeButtonOrange.onclick = () => {
    wrapper.classList.add('orange-theme');
    wrapper.classList.remove('green-theme');
    wrapper.classList.remove('blue-light-theme');
    wrapper.classList.remove('pink-theme');
    wrapper.classList.remove('green-theme');
    wrapper.classList.remove('pheol-theme');

    // Delete shadow of theme buttons
    for (let i = 0; i < document.querySelectorAll('.theme').length; i++) {
        document.querySelectorAll('.theme')[i].classList.remove('theme-shadow');
    }

    themeButtonOrange.classList.add('theme-shadow');
};

themeButtonGreen.onclick = () => {
    wrapper.classList.add('green-theme');
    wrapper.classList.remove('orange-theme');
    wrapper.classList.remove('blue-light-theme');
    wrapper.classList.remove('pink-theme');
    wrapper.classList.remove('pheol-theme');

    // Delete shadow of theme buttons
    for (let i = 0; i < document.querySelectorAll('.theme').length; i++) {
        document.querySelectorAll('.theme')[i].classList.remove('theme-shadow');
    }
    themeButtonGreen.classList.add('theme-shadow');
};

themeButtonPink.onclick = () => {
    wrapper.classList.add('pink-theme');
    wrapper.classList.remove('orange-theme');
    wrapper.classList.remove('blue-light-theme');
    wrapper.classList.remove('green-theme');
    wrapper.classList.remove('pheol-theme');

    // Delete shadow of theme buttons
    for (let i = 0; i < document.querySelectorAll('.theme').length; i++) {
        document.querySelectorAll('.theme')[i].classList.remove('theme-shadow');
    }

    themeButtonPink.classList.add('theme-shadow');
};

themeButtonPheol.onclick = () => {
    wrapper.classList.add('pheol-theme');
    wrapper.classList.remove('orange-theme');
    wrapper.classList.remove('green-theme');
    wrapper.classList.remove('blue-light-theme');
    wrapper.classList.remove('pink-theme');

    // Delete shadow of theme buttons
    for (let i = 0; i < document.querySelectorAll('.theme').length; i++) {
        document.querySelectorAll('.theme')[i].classList.remove('theme-shadow');
    }

    themeButtonPheol.classList.add('theme-shadow');
};

themeButtonBlueLight.onclick = () => {
    wrapper.classList.add('blue-light-theme');
    wrapper.classList.remove('orange-theme');
    wrapper.classList.remove('green-theme');
    wrapper.classList.remove('pheol-theme');
    wrapper.classList.remove('pink-theme');

    // Delete shadow of theme buttons
    for (let i = 0; i < document.querySelectorAll('.theme').length; i++) {
        document.querySelectorAll('.theme')[i].classList.remove('theme-shadow');
    }

    themeButtonBlueLight.classList.add('theme-shadow');
};



// Review
let 
	reviewText = document.querySelector('.review__comment-text'),
	reviewAutor = document.querySelector('.review__comment-autor'),

	reviewAutorWoman = document.querySelector('.review__img-woman'),
	reviewAutorMan = document.querySelector('.review__img-man'),
	reviewAutorGirl = document.querySelector('.review__img-girl');

reviewAutorWoman.classList.add('review__img-shadow');

reviewAutorWoman.onclick = () => {
	reviewText.textContent = 'Professional recommended and great experience, Nam pulvinar vitae neque et porttitor, Praesent sed nisi eleifend, Consectetur adipisicing elit, sed do eiusmodas temporo incididunt Praesent sed nisi eleifend, Consectetur adipisicing elit'
	reviewAutor.textContent = 'Lana Roadse'

	reviewAutorWoman.classList.add('review__img-shadow');
	reviewAutorMan.classList.remove('review__img-shadow');
	reviewAutorGirl.classList.remove('review__img-shadow');
};

reviewAutorMan.onclick = () => {
	reviewText.textContent = 'Recommended Professional and great experience, Nam pulvinar vitae neque et porttitor, Praesent sed nisi eleifend, Consectetur adipisicing elit, sed do eiusmodas temporo incididunt Praesent sed nisi eleifend, Consectetur adipisicing elit'
	reviewAutor.textContent = 'Robert Sham'

	reviewAutorMan.classList.add('review__img-shadow');
	reviewAutorWoman.classList.remove('review__img-shadow');
	reviewAutorGirl.classList.remove('review__img-shadow');
};

reviewAutorGirl.onclick = () => {
	reviewText.textContent = 'Consectetur Recommended Professional and great experience, Nam pulvinar vitae neque et porttitor, Praesent sed nisi eleifend, adipisicing elit, sed do eiusmodas temporo incididunt Praesent sed nisi eleifend, Consectetur adipisicing elit'
	reviewAutor.textContent = 'Victoria Loben'

	reviewAutorGirl.classList.add('review__img-shadow');
	reviewAutorMan.classList.remove('review__img-shadow');
	reviewAutorWoman.classList.remove('review__img-shadow');
};



}