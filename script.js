'use strict'

window.addEventListener('DOMContentLoaded', () => {
    const start = document.querySelector('.start'),
          gameArea = document.querySelector('.gameArea'),
          score = document.querySelector('.score'),
          car = document.createElement('div');

    car.classList.add('car');

    const MAX_ENEMY = 2;
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
        traffic: 3,
    };

    start.addEventListener('click', startGame);
    document.addEventListener('keydown', runGame);
    document.addEventListener('keyup', stopGame);

    function startGame() {
        start.classList.add('hide');
        

        for (let i = 0; i < getQualitityElements(100); i++) {
            const line = document.createElement('div');
            line.classList.add('line');
            line.style.top = (100 * i) + 'px';
            line.y = i * 100;
            gameArea.append(line);
        }

        for (let i = 0; i < getQualitityElements(100 * setting.traffic); i++) {
            const enemy = document.createElement('div');
            enemy.classList.add('enemy');
            let randomEnemy = Math.floor(Math.random() * MAX_ENEMY);
            enemy.style.background = `url('/image/enemy${randomEnemy + 1}.png') center / cover no-repeat`;
            enemy.y = 100 * setting.traffic * (i + 1);
            enemy.style.top = enemy.y + 'px';
            console.log(enemy.style.top);
            enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
            gameArea.append(enemy);
        }

        setting.start = true;
        setting.score = 0;
        requestAnimationFrame(playGame);
        gameArea.append(car);
        setting.x = car.offsetLeft;
        setting.y = car.offsetTop;
    }

    function playGame() {
        
        if (setting.start) {
            score.textContent = setting.score;
            
            setting.score += setting.speed;
            moveRoad();
            moveEnemy();
            requestAnimationFrame(playGame);
            if (keys.ArrowRight && setting.x <= (gameArea.offsetWidth - car.offsetWidth)) {
                setting.x += setting.speed; 
            }

            if (keys.ArrowLeft && setting.x >= 0) {
                setting.x -= setting.speed; 
            }

            if (keys.ArrowUp && setting.y >= 0) {
                setting.y -= setting.speed; 
            }

            if (keys.ArrowDown && setting.y <= (gameArea.offsetHeight - car.offsetHeight)) {
                setting.y += setting.speed; 
            }

            car.style.left = setting.x + 'px';
            car.style.top = setting.y + 'px';
        }
 
    }

    function runGame(event) {
        if (keys.hasOwnProperty(event.key)) {
            event.preventDefault();
            keys[event.key] = true;
        }
    }

    function stopGame(event) {
        if (keys.hasOwnProperty(event.key)) {
            event.preventDefault();
            keys[event.key] = false;
        }    
        
    }

    function getQualitityElements(height) {
        return document.documentElement.clientHeight / height + 1;
    }

    function moveRoad() {
        let lines = document.querySelectorAll('.line');
        lines.forEach(line => {
            line.y += setting.speed;
            line.style.top = line.y + 'px';

            if (line.y >= document.documentElement.clientHeight) {
                line.y = -100;
            }
            
        }); 
    }

    function moveEnemy() {
        let enemies = document.querySelectorAll('.enemy');
        enemies.forEach(enemy => {
            let carRect = car.getBoundingClientRect();
            let enemyRect = enemy.getBoundingClientRect();

            if (carRect.rignt >= enemyRect.left &&
                carRect.top <= enemyRect.bottom &&
                carRect.left <= enemyRect.right &&
                carRect.bottom >= enemyRect.top) {
                setting.start = false;
            }
            enemy.y += setting.speed / 2;
            enemy.style.top = enemy.y + 'px';

            if (enemy.y >= document.documentElement.clientHeight) {
                enemy.y = -100 * setting.traffic;
                enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
            }
            
        }); 
    }
})
