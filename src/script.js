import dataCards from './data/data.js'
import {reloadPage, makeRandomCards} from './functions/functions.js';

const playerName = document.querySelector('.playerName');
const popupText = document.querySelector('.popupText');
const popapWrap = document.querySelector('.popup-wrapper');
const popupWindow = document.querySelector('.popup-window');
const clickCount = document.querySelector('.clickCount');
const timer = document.querySelector('.playTime');

const body = document.querySelector('body');
const inputName = document.querySelector('.input');
const btnStartGame = document.querySelector('.btnStart');
const btnRestart = document.querySelector('.btnRestart');
const field = document.querySelector('.field');

const randonCardsArray = dataCards.sort(makeRandomCards);

let timerSec = 0;
let clicksValues = 0;
let cardsArray = [];
let closedCards;
let userName = "";

makeRandomCards();

function runTimer() {
    timerSec++;
    timer.innerHTML = timerSec;
}

const createCard = () => {
    for (let i = 0; i < randonCardsArray.length; i++) {
        const div = document.createElement('div');
        div.className = "card hidden";
        div.style.backgroundImage = `url('src/${randonCardsArray[i].img}')`;
        field.prepend(div);
    }
    cardsArray = [...field.children];
    closedCards = cardsArray.length / 2;
}

btnStartGame.addEventListener('click', () => {
    body.classList.toggle('toggleGame');
    setInterval(runTimer,1000);
    userName = inputName.value;
    playerName.innerHTML = userName;
    inputName.value = '';
    createCard();
})

btnRestart.addEventListener('click', () => {
    body.classList.remove('toggleGame');
    setTimeout(()=>{
        location.reload();
    },700)

})

let count = 0;
let currCard = "";
let prevCard = "";

field.addEventListener('click', clickOnCard);

function clickOnCard (e) {

    e.target.classList.add('active');
    e.target.classList.remove('hidden');
    field.classList.remove('active');
    if (count === 1) {
        prevCard = e.target;
        count++;
    } else {
        currCard = e.target;
        count = 1;
    }

    if (currCard.length !== 0 && prevCard.length !== 0) {
        if (prevCard.style.backgroundImage === currCard.style.backgroundImage) {
            currCard.dataset.state = 'visible';
            prevCard.dataset.state = 'visible';
            closedCards--;
        }

        currCard, prevCard = "";
        clicksValues++;
        clickCount.innerHTML = clicksValues;
        field.removeEventListener('click', clickOnCard);
        setTimeout(() => {
            cardsArray.forEach(el => {
                if (el.dataset.state !== 'visible') {
                    el.classList.remove('active');
                    el.classList.add('hidden');
                }
            });
        }, 1000)
        if (closedCards === 0) {
            setTimeout(() => {
                popupText.innerHTML = `Thanks you ${userName}, you count is ${clicksValues}, and yor time is ${timerSec} sec.`;
            }, 1000)
            setTimeout(() => {
                popapWrap.style.zIndex = '10';
                body.classList.remove('toggleGame');
                popupWindow.addEventListener('click', reloadPage);
            }, 1000);
        }
    }
    setTimeout(() => {
        field.addEventListener('click', clickOnCard);
    }, 1700);
}




