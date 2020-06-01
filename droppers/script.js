'use strict';

function mathRandom(min, max) {
	return Math.random() * (max - min) + min;
}

const cvs = document.querySelector('.canvas');
const ctx = cvs.getContext('2d');

cvs.width = window.innerWidth;
cvs.height = window.innerHeight;

const droppersImg = new Image();
droppersImg.src = 'https://www.flaticon.com/premium-icon/icons/svg/2914/2914280.svg';

let sumDroppers = 10;
let isPauseGame = false;
let isDropping = true;
let isMouseDown = false;
let isStopDrop = false;
let isFollowMouse = false;
let isEnemyMouse = false;

let mouseX;
let mouseY;

const droppersInfo = [];
const randomSpeedsArr = [];
const randomSizesArr = [];

function randomSpeeds(min, max) {
	for(let i = 0; i < sumDroppers; i++) {
		randomSpeedsArr.push(mathRandom(min, max))
	}
	return randomSpeedsArr;
}

function randomSizes(min, max) {
	for(let i = 0; i < sumDroppers; i++) {
		randomSizesArr.push(mathRandom(min, max))
	}
	return randomSizesArr;
}

for(let i = 0; i < sumDroppers; i++) {
	droppersInfo.push({
		width: randomSizes(20, 35)[i],
		heigth: randomSizes(10, 35)[i],
		x: mathRandom(0, window.innerWidth),
		y: mathRandom(0, window.innerHeight),
		speedDrop: randomSpeeds(1, 1)[i],
		speedFollow: mathRandom(2, 3),
		speedRun: mathRandom(10, 10),
		bettwenMouse: mathRandom(10, 70)
	});
}

const droppers = {
	pause() {
		isPauseGame = true;
	},
	start() {
		isPauseGame = false;
	},
	followMouse(bool, mouseX) {
		if(bool) {
			for(let i = 0; i < sumDroppers; i++) {
				if((mouseX - droppersInfo[i].bettwenMouse > droppersInfo[i].x || mouseX + droppersInfo[i].bettwenMouse < droppersInfo[i].x) && (mouseX && mouseX > 20 && mouseX < window.innerWidth - 20 && mouseY < window.innerHeight - 20 && mouseY > 20)) {
					if(droppersInfo[i].x > mouseX) {
						droppersInfo[i].x -= droppersInfo[i].speedFollow;
					} else {
						droppersInfo[i].x += droppersInfo[i].speedFollow;
					}
				}
			}
		}
	},
	enemyMouse(bool) {
		if(bool) {
			for(let i = 0; i < sumDroppers; i++) {
				if((droppersInfo[i].x - mouseX < 0 && droppersInfo[i].x - mouseX > -100) 
						&& (droppersInfo[i].y - mouseY < 0 && droppersInfo[i].y - mouseY > -100)) {
					droppersInfo[i].y += droppersInfo[i].speedDrop;
					droppersInfo[i].x -= droppersInfo[i].speedDrop;
				}

				if((droppersInfo[i].x - mouseX > 0 && droppersInfo[i].x - mouseX < 100) 
						&& (droppersInfo[i].y - mouseY < 0 && droppersInfo[i].y - mouseY < 100)) {
					droppersInfo[i].y -= droppersInfo[i].speedDrop;
					droppersInfo[i].x += droppersInfo[i].speedDrop;
				}
			}
		}
	},
	drop(where) {
		switch(where) {
			case 'bottom':
				for(let i = 0; i < sumDroppers; i++) {
					if(droppersInfo[i].y >= window.innerHeight) {
						droppersInfo[i].y = 0;
						droppersInfo[i].x = mathRandom(0, window.innerWidth);
					} else {
						droppersInfo[i].y += randomSpeeds(5, droppersInfo.speedDrop)[i];
					}
				}
				break;
			case 'top':
				for(let i = 0; i < sumDroppers; i++) {
					if(droppersInfo[i].y <= 0) {
						droppersInfo[i].y = window.innerHeight;
						droppersInfo[i].x = mathRandom(0, window.innerWidth);
					} else {
						droppersInfo[i].y -= randomSpeeds(5, droppersInfo.speedDrop)[i];
					}
				}
				break;
			case 'stopdrop':
				isDropping = false;
				break;
		}
	},
	drag(mouseX, mouseY) {
		for(let i = 0; i < sumDroppers; i++) {
			if((mouseX <= droppersInfo[i].x + droppersInfo[i].width && mouseX >= droppersInfo[i].x) && (mouseY >= droppersInfo[i].y && mouseY <= droppersInfo[i].y + droppersInfo[i].width)) {
				droppersInfo[i].x = mouseX - droppersInfo[i].width / 2;
				droppersInfo[i].y = mouseY - droppersInfo[i].heigth / 2;
			}
		}
	}
};

function drawGame() {
	if(!isPauseGame) {
		ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

		for(let i = 0; i < sumDroppers; i++) {
			ctx.drawImage(droppersImg, droppersInfo[i].x, droppersInfo[i].y, droppersInfo[i].width, droppersInfo[i].heigth)
		}

		if(isDropping) {
			droppers.drop('bottom');
		}

		if(isFollowMouse) {
			droppers.followMouse(true, mouseX);
		}

		if(isEnemyMouse) {
			droppers.enemyMouse(true, mouseX);
		}

		if(isMouseDown) {
			droppers.drag(mouseX, mouseY);
		}
	}

	requestAnimationFrame(drawGame);
}

drawGame();

window.addEventListener('mouseup', e => {
	isMouseDown = false;
});

window.addEventListener('mousedown', e => {
	isMouseDown = true;
});

window.addEventListener('mousemove', e => {
	mouseX = e.clientX;
	mouseY = e.clientY;

	if(isMouseDown) {
		droppers.drag(mouseX, mouseY);
	}
});


const pauseBtn = document.querySelector('.pause');
pauseBtn.addEventListener('click', () => isPauseGame ? (droppers.start(), pauseBtn.textContent = '||') : (droppers.pause() , pauseBtn.textContent = '>'));

const followMouseBtn = document.querySelector('.followMouseBtn');
followMouseBtn.addEventListener('click', () => isFollowMouse ? isFollowMouse = false : isFollowMouse = true)

const enemyMouseBtn = document.querySelector('.enemyMouseBtn');
enemyMouseBtn.addEventListener('click', () => isEnemyMouse ? isEnemyMouse = false : isEnemyMouse = true)

const dropBtn = document.querySelector('.dropBtn');










