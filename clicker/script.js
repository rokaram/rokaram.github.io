'use strict';

const currentClicksOut = document.querySelector('.gameplay__header-clicks');
const countMoneyOut = document.querySelector('.gameplay__header-money');
const powerClickOut = document.querySelector('.gameplay__header-force');
const btnClick = document.querySelector('.gameplay__main-btn');

let autoclickProductIndex = localStorage.getItem('autoclickProductIndex');

function enhancePowerOfClicker(i) {
    productInfo[i].productPrice *= 2;
    marketItemPrices[i].innerHTML = `${productInfo[i].productPrice}$`;
    localStorage.setItem('pluser', ++pluser)
    powerClickOut.innerHTML = `Сила: ${pluser}`;
}

function logicForAutocliker(i) {
    localStorage.setItem('autoclickProductIndex', autoclickProductIndex = i);
    localStorage.setItem('clicksForActiveProduct', clicksForActiveProduct++);
    let timeForActiveProductCount = localStorage.getItem('timeForActiveProductCount');
    let timeForActiveProductCountOut = localStorage.getItem('timeForActiveProductCountOut');

    if(clicksForActiveProduct == 1 && !productInfo[i].isActiveProduct) {
        let timeForActiveProduct = setInterval(() => {
            localStorage.setItem('timeForActiveProductCount', ++timeForActiveProductCount);

            !timeForActiveProductCountOut ? localStorage.setItem('timeForActiveProductCountOut', timeForActiveProductCountOut = 20) : null

            localStorage.setItem('timeForActiveProductCountOut', --timeForActiveProductCountOut)

            if(timeForActiveProductCount >= 20) {
                productInfo[i].isActiveProduct = true;
                localStorage.setItem('productInfo', JSON.stringify(productInfo));
                localStorage.setItem('timeForActiveProductCount', timeForActiveProductCount = 0);
                localStorage.setItem('clicksForActiveProduct', clicksForActiveProduct = 0);
                clearInterval(timeForActiveProduct);
            }
        }, 1000);
    }

    if(clicksForActiveProduct == 1 && productInfo[i].isActiveProduct) {
        let autoClickLogic = setInterval(() => {
            currentClicks--;
            btnClick.dispatchEvent( new Event('click') );
            localStorage.setItem('timeForAutoClick', ++timeForAutoClick);
            
            if(timeForAutoClick >= productInfo[i].productUseful) {
                productInfo[i].isActiveProduct = false;
                localStorage.setItem('timeForAutoClick', timeForAutoClick = 0);
                localStorage.setItem('clicksForActiveProduct', clicksForActiveProduct = 0);
                clearInterval(autoClickLogic);
            }
        }, 1000);
    }
}

const productFunctions = [
    {
        productFunctionUseful: logicForAutocliker
    },
    {
        productFunctionUseful: enhancePowerOfClicker
    },
]

// draw products
const market = document.querySelector('.market__inner');
let timeForAutoClick = localStorage.getItem('timeForAutoClick');
let clicksForActiveProduct = localStorage.getItem('clicksForActiveProduct');

let productInfo = JSON.parse(localStorage.getItem('productInfo'));

if (!productInfo) {
    localStorage.setItem('productInfo', JSON.stringify([   
        {
            productName: `Автоклик в течений 30 сек`,
            productUseful: 30,
            productPrice: 'доступно через 2 мин',
            isActiveProduct: false
        },
        {   
            productName: `+2 к силе Кликера`,
            productUseful: 1,
            productPrice: 20,
            isActiveProduct: true
        },
        {
            productUseful: 'unknown',
            productName: 'unknown',
            productPrice: 'unknown',
            isActiveProduct: true
        }
    ]));

    productInfo = JSON.parse(localStorage.getItem('productInfo'));
};


for(let i = 0; i < productInfo.length; i++) {
    market.innerHTML += `
        <div class="market__container">
            <div class="market__item">
                <p class="market__item-name">${productInfo[i].productName}</p>
                <p class="market__item-price">${productInfo[i].productPrice}</p>
            </div>
        </div>
    `
}

// logic for market
const marketItems = document.querySelectorAll('.market__item');
const marketItemPrices = document.querySelectorAll('.market__item-price');

for(let i = 0; i < marketItems.length; i++) {
    marketItems[i].addEventListener('click', function() {
        if ( !isNaN(Number(productInfo[i].productPrice)) && countMoney >= productInfo[i].productPrice ) {
            saveMoney(countMoney -= productInfo[i].productPrice);
            countMoneyOut.innerHTML = `${countMoney}$`;
            
            productFunctions[i].productFunctionUseful(i);
            localStorage.setItem('productInfo', JSON.stringify(productInfo));
        } else if ( !isNaN(Number(productInfo[i].productPrice)) && countMoney < productInfo[i].productPrice ) {
            alert('nope')
        } else if ( isNaN(Number(productInfo[i].productPrice)) ) {
            productFunctions[i].productFunctionUseful(i);
            localStorage.setItem('productInfo', JSON.stringify(productInfo));
        }
    });
}


let currentClicks = localStorage.getItem('currentClicks');
let countMoney = localStorage.getItem('countMoney');
let pluser = localStorage.getItem('pluser');


// information output if this new game
if( !currentClicks ) {
    currentClicksOut.innerHTML = `Всего кликов: 0`;
    countMoneyOut.innerHTML = `0$`;
    powerClickOut.innerHTML = `Сила: ${++pluser}`;
}


// money save in localStorage
function saveMoney(isSave) {
    localStorage.setItem('countMoney', isSave);    
    countMoney = localStorage.getItem('countMoney');
}


// information output after page reload
if( currentClicks ) {
    currentClicksOut.innerHTML = `Всего кликов: ${currentClicks}`;
    countMoneyOut.innerHTML = `${countMoney}$`;
    powerClickOut.innerHTML = `Сила: ${pluser}`;
}

btnClick.addEventListener('click', function() {
    localStorage.setItem('currentClicks', ++currentClicks);
    currentClicksOut.innerHTML = `Всего кликов: ${currentClicks}`;
    countMoney = Number(countMoney);
    pluser = Number(pluser);
    saveMoney(countMoney += pluser);
    
    countMoney = localStorage.getItem('countMoney');
    countMoneyOut.innerHTML = (countMoney > 0) ? `${countMoney}$` : '0$';
});


// localStorage clear
window.addEventListener('keydown', ({ key }) => {
    if(key == 'F5') {
        localStorage.clear();
    }
});


// continue auto click after page reload
let timeForActiveProductCount = localStorage.getItem('timeForActiveProductCount');

if( autoclickProductIndex && productInfo[autoclickProductIndex].isActiveProduct == false ) {
    let timeForActiveProduct = setInterval(() => {
        localStorage.setItem('timeForActiveProductCount', ++timeForActiveProductCount);

        if(timeForActiveProductCount >= 20) {
            productInfo[autoclickProductIndex].isActiveProduct = true;
            localStorage.setItem('productInfo', JSON.stringify(productInfo));
            localStorage.setItem('timeForActiveProductCount', timeForActiveProductCount = 0);
            localStorage.setItem('clicksForActiveProduct', clicksForActiveProduct = 0);
            clearInterval(timeForActiveProduct);
        }
    }, 1000);
}

if( autoclickProductIndex && timeForAutoClick && timeForAutoClick != 0 ) {
    let autoClickLogic = setInterval(() => {
        currentClicks--;
        btnClick.dispatchEvent( new Event('click') );
        localStorage.setItem('timeForAutoClick', ++timeForAutoClick);
        
        if(timeForAutoClick >= 30) {
            clearInterval(autoClickLogic);
            productInfo[autoclickProductIndex].isActiveProduct = false;
            localStorage.setItem('timeForAutoClick', timeForAutoClick = 0);
            localStorage.setItem('clicksForActiveProduct', clicksForActiveProduct = 0);
        }
    }, 1000)
}


