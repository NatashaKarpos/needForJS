'use strict'

window.addEventListener('DOMContentLoaded', () => {
    const start = document.querySelector('.start'),
          gameArea = document.querySelector('.gameArea'),
          score = document.querySelector('.score'),
          car = document.createElement('div');

    car.classList.add('car');

    const keys = {
        ArrowUp: false,
        ArrowDown: false,
        ArrowRight: false,
        ArrowLeft: false,
    };

    const setting = {
        start: false,
        score: 0,
        speed: 3,
    };

    start.addEventListener('click', startGame);
    document.addEventListener('keydown', runGame);
    document.addEventListener('keyup', stopGame);

    function startGame() {
        start.classList.add('hide');
        setting.start = true;
        requestAnimationFrame(playGame);
        gameArea.append(car);
    }

    function playGame() {
        console.log('play game');

        if (setting.start) {
            requestAnimationFrame(playGame);
        }
    }

    function runGame(event) {
        event.preventDefault();
        keys[event.key] = true;
    }

    function stopGame(event) {
        event.preventDefault();
        keys[event.key] = false;
    }
});