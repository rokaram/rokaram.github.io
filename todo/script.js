'use strict';

const todoBody = document.querySelector('.todo__inner-body');
const addBtn = document.querySelector('.todo__inner-add__btn');
const countItems = document.querySelector('.todo__inner-header__info-counter');

let counterItems = 0;
let aimTextsLocal = localStorage.getItem('aimTexts');
let aimTexts = [];
let addAim;

addBtn.addEventListener('click', (e) => {
    const addInput = document.querySelector('.todo__inner-add__input');
    

    aimTexts.push(addInput.value.trim());

    if(addInput.value.trim() != '') {
        counterItems++;

        if (!(addInput.value.trim().startsWith('http://') 
          || (addInput.value.trim().startsWith('https://')) 
          || (addInput.value.trim().startsWith('ftp://')))) {
            addAim = `
                <li class="todo__inner-body__container">
                    <span class="todo__inner-body__checkbox"></span>
                    <p class="todo__inner-body__text">${addInput.value.trim()}</p>
                    <textarea type="text" class="todo__inner-body__changeinput hide"></textarea>

                    <div class="todo__inner-body__panel">
                        <button class="todo__inner-body__panel-change">Изменить</button>
                        <button class="todo__inner-body__panel-delete">Удалить</button>
                    </div>
                </li>
            `
        } else {
            addAim = `
                <li class="todo__inner-body__container">
                    <span class="todo__inner-body__checkbox"></span>
                    <a href="${addInput.value.trim()}" target="_blank" class="todo__inner-body__text">${addInput.value.trim()}</a>
                    <textarea type="text" class="todo__inner-body__changeinput hide"></textarea>

                    <div class="todo__inner-body__panel">
                        <button class="todo__inner-body__panel-change">Изменить</button>
                        <button class="todo__inner-body__panel-delete">Удалить</button>
                    </div>
                </li>
            `
        }
        
        todoBody.innerHTML += addAim;
    }

    addInput.value = '';
    addInput.focus();

    const messages = document.querySelectorAll('.todo__inner-body__text');
    countItems.textContent = `Всего заданий: ${messages.length}`;

    deleteItem();
    changeItem();
    scaningNoAim();
    checkBox();
});

window.addEventListener('keydown', ({ key }) => {
    if(key == 'F4') {
        localStorage.clear();
    }
});

function scaningNoAim() {
    const aims = document.querySelectorAll('.todo__inner-body__text');
    const noAim = document.querySelector('.no-aim');

    if(aims.length <= 0) {
        todoBody.innerHTML = `<p class="no-aim">Задач пока нет</p>`;
    } else if(noAim) {
        noAim.remove();
    }
} scaningNoAim();


function activesAims() {
    const checkboxActiveLen = document.querySelectorAll('.todo__inner-body__checkbox--active').length;
    const aims = document.querySelectorAll('.todo__inner-body__text');

    if(checkboxActiveLen > 0) {
        countItems.textContent = `Выполнено заданий:${checkboxActiveLen}  |  Всего заданий: ${aims.length}`;
    } else {
        countItems.textContent = `Всего заданий: ${aims.length}`;
    }
} activesAims()


function checkBox() {
    const checkboxItems = todoBody.querySelectorAll('.todo__inner-body__checkbox');
    const aim = todoBody.querySelectorAll('.todo__inner-body__text');

    for(let i = 0; i < checkboxItems.length; i++) {
        checkboxItems[i].addEventListener('click', function() {
            this.classList.toggle('todo__inner-body__checkbox--active');
            aim[i].classList.toggle('todo__inner-text--active');

            activesAims()
        });
    }

    activesAims()
}

function deleteItem() {
    const deleteBtn = document.querySelectorAll('.todo__inner-body__panel-delete');
    const aimContainers = document.querySelectorAll('.todo__inner-body__container');

    for(let i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener('click', () => {
            aimContainers[i].remove();

            const aim = document.querySelectorAll('.todo__inner-body__text');
            countItems.textContent = `Всего заданий: ${aim.length}`;

            scaningNoAim();
            activesAims();
        });
    }
} deleteItem()


function changeItem() {
    const changeBtn = document.querySelectorAll('.todo__inner-body__panel-change');
    const messages = document.querySelectorAll('.todo__inner-body__text');
    const changeInput =  document.querySelectorAll('.todo__inner-body__changeinput');

    for(let i = 0; i < changeBtn.length; i++) {
        changeBtn[i].addEventListener('click', function() {
            if(messages[i].classList.contains('hide')) {
                messages[i].textContent = changeInput[i].value;
                messages[i].classList.remove('hide');
                changeInput[i].classList.add('hide');
            } else {
                messages[i].classList.add('hide');
                changeInput[i].classList.remove('hide');
                changeInput[i].value = messages[i].textContent;
                changeInput[i].focus();
                changeInput[i].style.height = changeInput[i].scrollHeight + 'px';
            }

            window.addEventListener('click', ({ target }) => {
                if(target != messages[i] && target != this && target != changeInput[i] && messages[i].classList.contains('hide')) {
                    messages[i].textContent = changeInput[i].value;
                    messages[i].classList.remove('hide');
                    changeInput[i].classList.add('hide');
                }
            });

            window.addEventListener('keydown', ({ key }) => {
                if(key == 'Enter' && messages[i].classList.contains('hide')) {
                    messages[i].textContent = changeInput[i].value;
                    messages[i].classList.remove('hide');
                    changeInput[i].classList.add('hide');
                }
            });

            changeInput[i].addEventListener('input', function() {
                this.style.height = this.scrollHeight + 'px';
            });
        });
    }
} changeItem()

window.addEventListener('keydown', ({ key }) => {
    if(key == 'Enter') {
        addBtn.dispatchEvent( new Event('click') );
    }
});
