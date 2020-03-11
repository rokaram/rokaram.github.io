'use strict';

const currentClicksOut = document.querySelector('.gameplay__header-clicks');
const countMoneyOut = document.querySelector('.gameplay__header-money');
const powerClickOut = document.querySelector('.gameplay__header-force');
const btnClick = document.querySelector('.gameplay__main-btn');

let isPowerPlus = false;
let isAutoClick = false;

let currentClicks = localStorage.getItem('currentClicks');
let countMoney = localStorage.getItem('countMoney');
let powerClick = 0;
let pluser = localStorage.getItem('pluser');

if( !pluser ) {
    currentClicksOut.innerHTML = `Всего кликов: 0`;
    countMoneyOut.innerHTML = `0$`;
    powerClickOut.innerHTML = `Сила: ${++pluser}`;
}

// money save in localStorage
function saveMoney(isSave) {
    localStorage.setItem('countMoney', isSave);    
    countMoney = localStorage.getItem('countMoney');
}

// current clicks and count
if( currentClicks ) {
    currentClicksOut.innerHTML = `Всего кликов: ${currentClicks}`;
    countMoneyOut.innerHTML = countMoney + `$`;
    powerClickOut.innerHTML = `Сила: ${pluser}`;
}

btnClick.addEventListener('click', function() {
    localStorage.setItem('currentClicks', ++currentClicks);
    currentClicksOut.innerHTML = `Всего кликов: ${currentClicks}`;
    
    countMoney = Number(countMoney);
    pluser = Number(pluser);
    saveMoney(countMoney += pluser);
    
    countMoney = localStorage.getItem('countMoney');
    countMoneyOut.innerHTML = (countMoney > 0) ? countMoney+`$` : 0+'$';
});

// localStorage clear
window.addEventListener('keydown', ({ key }) => {
    if(key == 'F5') {
        localStorage.clear();
    }
});

// draw products
const market = document.querySelector('.market__inner');
const productPricePowerPlus = localStorage.getItem('productPricePowerPlus');
const productPriceAutoClick = localStorage.getItem('productPriceAutoClick');

const productInfo = [
    {   
        productUseful: 1,
        productName: `+2 к силе Кликера`,
        productPrice: productPricePowerPlus ? productPricePowerPlus : 20,
        isPowerPlus: true
    },
    {
        productUseful: 120,
        productName: `Автоклик в течений 2 мин`,
        productPrice: productPriceAutoClick ? productPriceAutoClick : 50,
        isAutoClick: true
    },
    {
        productUseful: 'unknown',
        productName: 'unknown',
        productPrice: 'unknown'
    }
];

function drawProducts() {

    if(document.querySelector('.market__container')) {
        const containerItem = document.querySelectorAll('.market__container');

        for(let item of containerItem) {
            item.remove();
        }
    }

    for(let i in productInfo) {
        market.innerHTML += `
            <div class="market__container">
                <div class="market__item">
                    <p class="market__item-name">${productInfo[i].productName}</p>
                    <p class="market__item-price">${productInfo[i].productPrice}$</p>
                </div>
            </div>
        `
    }
} drawProducts()

// logic for market
const marketItem = document.querySelectorAll('.market__item');
const marketItemPrice = document.querySelectorAll('.market__item-price');

for(let i = 0; i < marketItem.length; i++) {
    marketItem[i].addEventListener('click', function() {
        if (countMoney >= Math.round(productInfo[i].productPrice)) { 
            saveMoney(countMoney -= productInfo[i].productPrice);
            countMoneyOut.innerHTML = countMoney + `$`;

            if (productInfo[i].isPowerPlus) {
                isPowerPlus = true;
                pluser = Number(pluser);

                localStorage.setItem('productPricePowerPlus', productInfo[i].productPrice *= 1.7); 
                marketItemPrice[i].textContent = productInfo[i].productPrice + '$';

                localStorage.setItem('pluser', pluser += productInfo[i].productUseful);
                powerClickOut.innerHTML = `Сила: ${pluser}`;
            
            } else if (productInfo[i].isAutoClick) {
                isAutoClick = true;
                
                localStorage.setItem('productPriceAutoClick', productInfo[i].productPrice *= 1.3);                
                marketItemPrice[i].textContent = productInfo[i].productPrice + '$';

                let timeForAutoClick = 0;
                let autoClicker = setInterval(() => {
                    timeForAutoClick++;
                    localStorage.setItem('currentClicks', --currentClicks);
                    btnClick.dispatchEvent( new Event('click') );

                    if(timeForAutoClick == productInfo[i].productUseful) {
                        clearInterval(autoClicker);
                    }
                }, 1000)
            }
        } else {
            alert('nope') 
        };
    });
}

