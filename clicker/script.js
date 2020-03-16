'use strict';

const currentClicksOut = document.querySelector('.gameplay__header-clicks');
const countMoneyOut = document.querySelector('.gameplay__header-money');
const powerClickOut = document.querySelector('.gameplay__header-force');
const btnClick = document.querySelector('.gameplay__main-btn');

const productFunctions = [
    {
        productFunctionUseful: function(i) {     
            productInfo[i].productPrice *= 2;
            console.log(productInfo)
            marketItemPrices[i].innerHTML = `${productInfo[i].productPrice}$`;
            localStorage.setItem('pluser', ++pluser)
            powerClickOut.innerHTML = `Сила: ${pluser}`;
        }
    },
    {
        productFunctionUseful: function(i) {
            localStorage.setItem('clicksForActiveProduct', ++clicksForActiveProduct);

            if(clicksForActiveProduct == 1) {
                let autoClickLogic = setInterval(() => {
                    currentClicks--;
                    btnClick.dispatchEvent( new Event('click') );
                    localStorage.setItem('timeForAutoClick', ++timeForAutoClick);
                    
                    if(timeForAutoClick >= productInfo[i].productUseful) {
                        clearInterval(autoClickLogic);
                        localStorage.setItem('timeForAutoClick', timeForAutoClick -= timeForAutoClick);
                        localStorage.setItem('clicksForActiveProduct', clicksForActiveProduct = 0);
                    }
                }, 1000);
            }
        }
    }
]

// draw products
const market = document.querySelector('.market__inner');
let timeForAutoClick = localStorage.getItem('timeForAutoClick');
let clicksForActiveProduct = localStorage.getItem('clicksForActiveProduct');

let productInfo = JSON.parse(localStorage.getItem('productInfo'));

if (!productInfo) {
    localStorage.setItem('productInfo', JSON.stringify([   
        {   
            productName: `+2 к силе Кликера`,
            productUseful: 1,
            productPrice: 20,
        },
        {
            productName: `Автоклик в течений 30 сек`,
            productUseful: 30,
            productPrice: '',
        },
        {
            productUseful: 'unknown',
            productName: 'unknown',
            productPrice: 'unknown'
        }
    ]));

    productInfo = JSON.parse(localStorage.getItem('productInfo'));
};


for(let i = 0; i < productInfo.length; i++) {
    market.innerHTML += `
        <div class="market__container">
            <div class="market__item">
                <p class="market__item-name">${productInfo[i].productName}</p>
                <p class="market__item-price">${productInfo[i].productPrice}$</p>
            </div>
        </div>
    `
}

// logic for market
const marketItems = document.querySelectorAll('.market__item');
const marketItemPrices = document.querySelectorAll('.market__item-price');

for(let i = 0; i < marketItems.length; i++) {
    marketItems[i].addEventListener('click', function() {
        if (countMoney >= productInfo[i].productPrice) { 
            saveMoney(countMoney -= productInfo[i].productPrice);
            countMoneyOut.innerHTML = `${countMoney}$`;
            productFunctions[i].productFunctionUseful(i);
            localStorage.setItem('productInfo', JSON.stringify(productInfo));
        } else {
            alert('nope')
        }
    });
}


let currentClicks = localStorage.getItem('currentClicks');
let countMoney = localStorage.getItem('countMoney');
let pluser = localStorage.getItem('pluser');


// information output if this new game
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
if( timeForAutoClick && timeForAutoClick != 0 ) {
    let autoClickLogic = setInterval(() => {
        currentClicks--;
        btnClick.dispatchEvent( new Event('click') );
        localStorage.setItem('timeForAutoClick', ++timeForAutoClick);
        
        if(timeForAutoClick >= 10) {
            clearInterval(autoClickLogic);
            localStorage.setItem('timeForAutoClick', timeForAutoClick -= timeForAutoClick);
        }
    }, 1000)
}





// for(let i = 0; i < marketItem.length; i++) {
//     marketItem[i].addEventListener('click', function() {
//         if (countMoney >= Math.round(productInfo[i].productPrice)) { 
//             saveMoney(countMoney -= productInfo[i].productPrice);
//             countMoneyOut.innerHTML = countMoney + `$`;

//             if (productInfo[i].isPowerPlus) {
//                 isPowerPlus = true;
//                 pluser = Number(pluser);

//                 localStorage.setItem('productPricePowerPlus', productInfo[i].productPrice *= 1.7); 
//                 marketItemPrice[i].textContent = productInfo[i].productPrice + '$';

//                 localStorage.setItem('pluser', pluser += productInfo[i].productUseful);
//                 powerClickOut.innerHTML = `Сила: ${pluser}`;
            
//             } else if (productInfo[i].isAutoClick) {
//                 isAutoClick = true;
                
//                 localStorage.setItem('productPriceAutoClick', productInfo[i].productPrice *= 1.3);                
//                 marketItemPrice[i].textContent = Math.ceil(productInfo[i].productPrice) + '$';

//                 let timeForAutoClick = localStorage.getItem('timeForAutoClick');
//                 let autoClicker = setInterval(() => {
//                     localStorage.setItem('timeForAutoClick', timeForAutoClick++);
//                     localStorage.setItem('currentClicks', --currentClicks);
//                     btnClick.dispatchEvent( new Event('click') );

//                     if(timeForAutoClick == productInfo[i].productUseful) {
//                         clearInterval(autoClicker);
//                     }
//                 }, 1000)
//             }
//         } else {
//             alert('nope') 
//         };
//     });
// }

