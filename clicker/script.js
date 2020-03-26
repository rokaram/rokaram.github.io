'use strict';

const currentClicksOut = document.querySelector('.gameplay__header-clicks');
const countMoneyOut = document.querySelector('.gameplay__header-money');
const powerClickOut = document.querySelector('.gameplay__header-force');
const btnClick = document.querySelector('.gameplay__main-btn');

let autoclickProductIndex = localStorage.getItem('autoclickProductIndex');
let timeForActiveProductCountOut = localStorage.getItem('timeForActiveProductCountOut');
const timeForActiveProductToStay = 20;

function enhancePowerOfClicker(i) {
    productInfo[i].productPrice *= 2;
    marketItemPrices[i].innerHTML = `${productInfo[i].productPrice}$`;
    localStorage.setItem('pluser', ++pluser)
    powerClickOut.innerHTML = `Сила: ${pluser}`;
}

function timeForActiveProductInterval(i) {
    let timeForActiveProduct = setInterval(() => {
        marketItems[i].className = 'market__item--noactive';
        
        localStorage.setItem('timeForActiveProductCount', ++timeForActiveProductCount);

        if ( !timeForActiveProductCountOut || timeForActiveProductCountOut <= 0 ) {
            localStorage.setItem('timeForActiveProductCountOut', timeForActiveProductCountOut = timeForActiveProductToStay)
        }

        localStorage.setItem('timeForActiveProductCountOut', --timeForActiveProductCountOut);

        productInfo[i].productPrice = `Будет доступно через: ${timeForActiveProductCountOut} сек`;
        localStorage.setItem('productInfo', JSON.stringify(productInfo));
        marketItemPrices[i].innerHTML = productInfo[i].productPrice;

        if(timeForActiveProductCount >= timeForActiveProductToStay) {
            productInfo[i].isActiveProduct = true;
            marketItemPrices[i].innerHTML = `Доступен`;
            localStorage.setItem('productInfo', JSON.stringify(productInfo));
            localStorage.setItem('timeForActiveProductCount', timeForActiveProductCount = 0);
            localStorage.setItem('clicksForActiveProduct', clicksForActiveProduct = 0);
            clearInterval(timeForActiveProduct);
        }
    }, 1000);
}

function autoClickLogicInterval(i) {
    let autoClickLogic = setInterval(() => {
        currentClicks--;
        btnClick.dispatchEvent( new Event('click') );
        localStorage.setItem('timeForAutoClick', ++timeForAutoClick);
        marketItemPrices[i].innerHTML = `В процессе выполнения`;

        if(timeForAutoClick >= productInfo[i].productUseful) {
            timeForActiveProductInterval(autoclickProductIndex);
            clearInterval(autoClickLogic);
            productInfo[autoclickProductIndex].isActiveProduct = false;
            localStorage.setItem('timeForAutoClick', timeForAutoClick = 0);
            localStorage.setItem('clicksForActiveProduct', clicksForActiveProduct = 1);
         }
    }, 1000);
}

function logicForAutocliker(i) {
    localStorage.setItem('autoclickProductIndex', autoclickProductIndex = i);
    localStorage.setItem('clicksForActiveProduct', clicksForActiveProduct++);
    let timeForActiveProductCount = localStorage.getItem('timeForActiveProductCount');

    if(clicksForActiveProduct == 1 && !productInfo[i].isActiveProduct) timeForActiveProductInterval(i);

    if(clicksForActiveProduct == 1 && productInfo[i].isActiveProduct) autoClickLogicInterval(i);
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
            productPrice: 'Доступен',
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
if ( currentClicks ) {
    currentClicksOut.innerHTML = `Всего кликов: ${currentClicks}`;
    countMoneyOut.innerHTML = `${countMoney}$`;
    powerClickOut.innerHTML = `Сила: ${pluser}`;
}

btnClick.addEventListener('click', function() {
    localStorage.setItem('currentClicks', ++currentClicks);
    currentClicksOut.innerHTML = `Всего кликов: ${currentClicks}`;
    
    countMoney = Number(countMoney);
    pluser = Number(pluser);
    localStorage.setItem('pluser', pluser);
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

if ( autoclickProductIndex && !productInfo[autoclickProductIndex].isActiveProduct ) {
    localStorage.setItem('clicksForActiveProduct', clicksForActiveProduct = 2);
    timeForActiveProductInterval(autoclickProductIndex);
}

if ( autoclickProductIndex && timeForAutoClick && timeForAutoClick != 0 && productInfo[autoclickProductIndex].isActiveProduct == true ) {
    productInfo[autoclickProductIndex].productPrice = `В процессе выполнения`;
    localStorage.setItem('productInfo', JSON.stringify(productInfo));

    marketItemPrices[autoclickProductIndex].innerHTML = productInfo[autoclickProductIndex].productPrice;

    let autoClickLogic = setInterval(() => {
        currentClicks--;
        btnClick.dispatchEvent( new Event('click') );
        localStorage.setItem('timeForAutoClick', ++timeForAutoClick);

        if(timeForAutoClick >= productInfo[autoclickProductIndex].productUseful) {
            productInfo[autoclickProductIndex].isActiveProduct = false;
            localStorage.setItem('productInfo', JSON.stringify(productInfo));
            localStorage.setItem('timeForAutoClick', timeForAutoClick = 0);
            localStorage.setItem('clicksForActiveProduct', clicksForActiveProduct = 2);
            timeForActiveProductInterval(autoclickProductIndex);
            clearInterval(autoClickLogic);
        }
    }, 1000)
}


