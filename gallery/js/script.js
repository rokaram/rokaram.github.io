let 
    images = [
        'https://go1.imgsmail.ru/imgpreview?key=77e82056f239594f&mb=imgdb_preview_413',
        'https://go4.imgsmail.ru/imgpreview?key=3d627edd3ad03a21&mb=imgdb_preview_828',
        'https://i.artfile.me/wallpaper/10-04-2012/1920x1080/zhivotnye-lvy-lezhit-smotrit-krasavec-gr-623435.jpg',
        'https://go3.imgsmail.ru/imgpreview?key=b17d43461bd9e2&mb=imgdb_preview_1741',
        'https://go4.imgsmail.ru/imgpreview?key=3d15da80c6d3d2c9&mb=imgdb_preview_1304',
        'https://go3.imgsmail.ru/imgpreview?key=6fe9320f0239df1e&mb=imgdb_preview_1923',
        'https://discordapp.com/assets/8b9d5f124020931b4de093c25506f5aa.svg',
        'https://cdn.discordapp.com/emojis/665991807959826480.png?v=1',
        'https://cdn.discordapp.com/emojis/402868030918492160.png?v=1',
        'https://discordapp.com/assets/a2893dfac8eccc398a9b14402df114c2.svg',
    ];

function $(selector) {
    return document.querySelector(selector);
}

function $All(selector) {
    return document.querySelectorAll(selector);
}

// https://discordapp.com/assets/08c0a077780263f3df97613e58e71744.svg

let 
    hours = new Date().getHours(),
    minutes = new Date().getMinutes(),
    numImg;

function drawItems() {
    numImg = 0;

    for(let i of $All('.gallery__items')) {
        i.remove()
    }

    for(let image of images) {
        numImg++;

        $('.gallery').innerHTML += `
            <div class="gallery__items">
                <div class="gallery__item">
                    <img src="${image}" alt="">

                    <div class="gallery__item-info">
                        <span class="gallery__item-name">${'IMG'}${numImg}</span>
                        <input class="gallery__item-changename dnone" type="text">
                        <span class="gallery__item-time">${hours}:${minutes}</span>
                    </div>
                </div>
            </div>
        `
    }
}

drawItems();

$('.btn').addEventListener('click', () => {
    input = $('.input').value;
    images.push(input);
    drawItems();
});

let
    removeBtn = document.querySelector('.header__inner-removebtn'),
    galleryItem = document.querySelectorAll('.gallery__item'),
    galleryItems = document.querySelectorAll('.gallery__items'),
    checkBox = document.querySelectorAll('.gallery__item-info'),
    quantityClicksForRemove = 0;

removeBtn.addEventListener('click', () => {
    quantityClicksForRemove++;

    for(let i = 0; i < galleryItem.length; i++) {

        if( (quantityClicksForRemove % 2) == 0 ) {
            if(checkBox[i].classList.contains('gallery__item-info--active')) {

                galleryItem[i].remove()
                galleryItems[i].remove();
                checkBox[i].classList.remove('gallery__item-info--active');
            }

            galleryItem[i].classList.remove('gallery__item--active');
            checkBox[i].classList.remove('gallery__item-info--active');
        }
        else {
            galleryItem[i].classList.add('gallery__item--active');
            checkBox[i].classList.remove('gallery__item-info--active');
            
            galleryItem[i].addEventListener('click', () => {
                if( (quantityClicksForRemove % 2) != 0 ) {
                    checkBox[i].classList.toggle('gallery__item-info--active');
                }
            });
        }
    }
});


let 
    imageSrc,
    duplicateNames = 0;

for(let i = 0; i < galleryItem.length; i++) {
    galleryItem[i].addEventListener('click', (e) => {

        if( (quantityClicksForRemove % 2) == 0 
        && e.target != $All('.gallery__item-info')[i]
        && e.target != $All('.gallery__item-name')[i]
        && e.target != $All('.gallery__item-time')[i]
        && e.target != $All('.gallery__item-changename')[i] ) {
            
            imageSrc = $All('.gallery__item img')[i].src;            

            $('.gallery__item-modal img').src = imageSrc;

            $('.gallery__item-modal').classList.remove('dnone');

            $('.gallery__item-modal').addEventListener('click', function({ target }) {
                if(target != $('.gallery__item-modal img')) { 
                    this.classList.add('dnone');
                }
            });
        }
    });

    $All('.gallery__item-name')[i].addEventListener('click', function() {
        let itemChangeName = $All('.gallery__item-changename')[i];

        this.classList.add('dnone');        
            
        itemChangeName.classList.remove('dnone');
        itemChangeName.focus();
        itemChangeName.value = this.textContent;

        itemChangeName.addEventListener('keyup', () => {
            this.textContent = itemChangeName.value.trim();
        });

        let checkNames = () => {
            itemChangeName.classList.add('dnone');
            this.classList.remove('dnone');

            for(let k = 0; k < galleryItem.length; k++) {
                if(this.textContent == $All('.gallery__item-name')[k].textContent) {
                    duplicateNames++;

                    if( duplicateNames > 2 ) {
                        this.textContent += ' (1)';
                        duplicateNames = 0;
                    }
                }
            }
        };

        // window.addEventListener('keyup', ({ key }) => {
        //     if(key == 'Enter') {
        //         checkNames();
        //     }
        // });

        window.addEventListener('click', ({ target }) => {
            if(target != itemChangeName && target != this && !itemChangeName.classList.contains('dnone')) {
                checkNames();
            }
        });
    });
}


