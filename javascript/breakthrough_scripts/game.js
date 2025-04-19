import { randomNumberInRange, convertIntToRoman } from "./functions.js";
import Enemy from './enemy.js';
import { Gunner } from './gunner.js';
import { Boopa } from './boopa.js';
import Player from './player.js';
import Powerup from './powerup.js';

const backgroundColor = 'purple';
const framerate = 33.3333333333;

export default function Game(updateState, sendAlert) {

    this.updateState = updateState;

    this.player;
    this.username = undefined;
    this.enemies = [];
    this.powerups = [];
    this.plays = 0;
    this.round = 1;
    this.lives = 3;
    this.totalEnemiesDefeated = 0;
    this.intervalId = undefined;
    this.welcomeId = undefined;
    this.target = 100;
    this.slide = 0;
    this.lastTime = undefined;

    this.lastPrintTime = undefined;

    this.canvas = document.createElement('canvas');
    this.canvas.id = 'canvas';
    this.canvas.setAttribute('width', '500px');
    this.canvas.setAttribute('height', '500px');
    let context = this.canvas.getContext("2d");


    this.sendAlert = sendAlert;



    this.beingPlayed = false;


    this.initiated = false;
    this.setInitiated = function(value) {
        this.initiated = value;
    }

    this.init = function() {

        this.updateEnemiesBasedOnRound();

        // Create Player
        this.player = new Player(237.5, 237.5);

        // Create Powerup
        this.powerup = new Powerup();

        // Update time for tutorial
        this.lastTime = Date.now();

        context.font = '25px Boldonse';
        this.home();

    }

    this.displayCanvas = (main) => {
        main.replaceChildren(this.canvas);
    }

    this.displayTutorial = (main) => {
        this.displayCanvas(main);
        this.startTutorial();
    }

    this.display = (main, name) => {

        this.player.addKeyDown();
        this.player.addKeyUp();

        this.username = name;

        this.displayCanvas(main);

        context.font = '25px Boldonse';

        this.endWelcome();
        
        this.beingPlayedCall();

    }

    this.beingPlayedCall = () => {
        if (this.beingPlayed) {
            this.pause();
            this.drawNoUpdate();
        } else {
            this.home();
        }
    }

    this.startTutorial = () => {

        // Play Tutorial
        this.startWelcome();

        this.removePauseListener();

        // Add 'click' listener to skip the tutorial
        this.addHomeListener();

    }

    // ------------------------------------------------------------------
    // UPDATE GAME FRAME:

    this.draw = function() {

        // Check Round Completion
        if (this.totalEnemiesDefeated >= this.round * this.target) {
            this.pause();
            return this.nextRound();
        }

        // Background
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, 500, 500);

        // Print Lives
        let x = 450;
        for (let i = 0; i < this.lives; i++) {
            let y = (i * 43) + 5;
            context.fillStyle = 'rgb(255, 255, 255, 0.2)';
            context.beginPath();
            context.moveTo(x + 22.5, y + 20);
            context.bezierCurveTo(x + 22.5, y + 11.1, x + 21, y + 7.5, x + 15, y + 7.5);
            context.bezierCurveTo(x + 6, y + 7.5, x + 6, y + 18.75, x + 6, y + 18.75);
            context.bezierCurveTo(x + 6, y + 24, x + 12, y + 30.6, x + 22.5, y + 36);
            context.bezierCurveTo(x + 33, y + 30.6, x + 39, y + 24, x + 39, y + 18.75);
            context.bezierCurveTo(x + 39, y + 18.75, x + 39, y + 7.5, x + 30, y + 7.5);
            context.bezierCurveTo(x + 25.5, y + 7.5, x + 22.5, y + 11.1, x + 22.5, y + 12);
            context.fill();
        }

        // Print Round
        context.save();
        context.font = '25px Boldonse';
        context.fillText('Round: ' + convertIntToRoman(this.round), 12.5, 45);
        context.restore();

        let round = this.round % 2 == 0;
        let thisTime = this.lastPrintTime = Date.now();
        
        // Print progress
        const barX = 325;
        const barY = 478;
        const barLength = 150;
        const thisRoundEnemies = this.totalEnemiesDefeated - ((this.round - 1) * this.target);
        const currentProgress = (thisRoundEnemies / this.target);
        const barPosition = barX + (currentProgress * barLength);
        context.save();
        context.fillRect(barX, barY, 150, 7);
        context.fillStyle = 'gray';
        context.fillRect (barPosition, barY - 3, 3, 13);
        context.restore();

        // Print enemies defeated
        context.save();
        context.font = '15px Boldonse';
        context.fillText(`Enemies Defeated: ${this.totalEnemiesDefeated}`, 12.5, 485);
        context.restore();

        // Players
        this.player.draw(context);

        // Player square.
        let player = { top: this.player.y, bottom: this.player.y + this.player.size, left: this.player.x, right: this.player.x + this.player.size, size: this.player.size }

        // Powerups
        if (this.powerup.active) {
            this.powerup.lastPrintTime = thisTime;
        } else {
            this.powerup.lastInactiveTime = thisTime;
        }

        // Check if powerup has been active for 5 seconds (stop it if so)
        if (this.powerup.active && thisTime - this.powerup.lastTime > 5000) {
            this.setEnemiesSpeed(5);
            this.resetEnemiesSize();
            this.player.setSpeed(5);
            this.powerup.setActive(false);
            this.powerup.happening = false;
        }

        if (!this.powerup.active && this.player.invincible && thisTime - this.powerup.lastTime > 7500) {
            this.player.invincibility(false);
        }

        // Check if player has been alive for 10 seconds
        if (!this.powerup.active && thisTime - this.powerup.lastTime > 10000) {

            if (!this.powerup.happening) {
                this.powerup.happening = true;
            }

            // Move the powerup
            this.powerup.direction ? this.moveDown(this.powerup, this.powerup.speed) : this.moveUp(this.powerup, this.powerup.speed);

            // Draw the powerup
            this.powerup.draw(context);
            // Check if Powerup is offscreen for indicator
            if (this.powerup.y + this.powerup.size < 0 && this.powerup.direction || this.powerup.y > 500 && !this.powerup.direction) {
                this.powerup.drawIndicator(context);
            }

            // Check if Powerup is offscreen for 'removal'
            if (this.powerup.y + this.powerup.size < 0 && !this.powerup.direction || this.powerup.y > 500 && this.powerup.direction) {
                this.powerup.reset();
            }

            // Check player intersection with Powerup
            if (this.checkIntersection(this.powerup, player)) {
                this.powerUpIntersection();
            }

        }

        // Enemies
        this.enemies.forEach(enemy => {

            // Check intersection of enemy and player
            if (!this.player.invincible) {
                if (this.checkIntersection(enemy, player)) {
                    this.enemyIntersection();
                }
            }

            // Update Enemy Position
            if (round) {
                enemy.directionEven ? this.moveDown(enemy, enemy.type.speed) : this.moveUp(enemy, enemy.type.speed);
            } else {
                enemy.directionOdd ? this.moveRight(enemy, enemy.type.speed) : this.moveLeft(enemy, enemy.type.speed);
            }

            // Check if enemy is out of distance.
            if (round && (enemy.y > 500 && enemy.directionEven || enemy.y + enemy.type.size < 0 && !enemy.directionEven)) {
                enemy.resetEven();
                this.defeated();
            }
            
            if (!round && (enemy.x > 500 && enemy.directionOdd || enemy.x + enemy.type.size < 0 && !enemy.directionOdd)) {
                enemy.resetOdd();
                this.defeated();
            }
            
            // Draw the enemy in new position.
            enemy.draw(context);

            // Shoot shots
            if (enemy.type instanceof Gunner) {

                if (!enemy.shot.happening) {
                    enemy.adjustShot();
                    enemy.shot.happening = randomNumberInRange(1, 4);
                }

                // Check intersection of shot and player
                if (!this.player.invincible) {
                    if (this.checkIntersection(enemy.shot, player)) {
                        enemy.adjustShot();
                        this.shotIntersection();
                    }
                }

                // Check if enemy shot is happening, if so move the shot
                if (enemy.shot.happening) {
                    switch (enemy.shot.happening) {
                        case (1):
                            this.moveDown(enemy.shot, enemy.shot.speed);
                            break;
                        case (2):
                            this.moveLeft(enemy.shot, enemy.shot.speed);
                            break;
                        case (3):
                            this.moveUp(enemy.shot, enemy.shot.speed);
                            break;
                        case (4):
                            this.moveRight(enemy.shot, enemy.shot.speed);
                            break;
                    }
                    enemy.drawShot();
                }

                // Check if enemy shot off-screen
                if (enemy.shot.x > 500 || enemy.shot.x < 0 || enemy.shot.y > 500 || enemy.shot.y < 0) {
                    enemy.shot.happening = false;
                }

            }

        });

    }

    this.purpleBackground = function() {
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, 500, 500);
    }

    this.drawNoUpdate = function() {

        // Background
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, 500, 500);

        // Print Lives
        let x = 450;
        for (let i = 0; i < this.lives; i++) {
            let y = (i * 43) + 5;
            context.fillStyle = 'rgb(255, 255, 255, 0.2)';
            context.beginPath();
            context.moveTo(x + 22.5, y + 20);
            context.bezierCurveTo(x + 22.5, y + 11.1, x + 21, y + 7.5, x + 15, y + 7.5);
            context.bezierCurveTo(x + 6, y + 7.5, x + 6, y + 18.75, x + 6, y + 18.75);
            context.bezierCurveTo(x + 6, y + 24, x + 12, y + 30.6, x + 22.5, y + 36);
            context.bezierCurveTo(x + 33, y + 30.6, x + 39, y + 24, x + 39, y + 18.75);
            context.bezierCurveTo(x + 39, y + 18.75, x + 39, y + 7.5, x + 30, y + 7.5);
            context.bezierCurveTo(x + 25.5, y + 7.5, x + 22.5, y + 11.1, x + 22.5, y + 12);
            context.fill();
        }

        // Print Round
        context.save();
        context.font = '25px Boldonse';
        context.fillText('Round: ' + convertIntToRoman(this.round), 12.5, 45);
        context.restore();

        let thisTime = Date.now();
        
        // Print progress
        const barX = 325;
        const barY = 478;
        const barLength = 150;
        const thisRoundEnemies = this.totalEnemiesDefeated - ((this.round - 1) * this.target);
        const currentProgress = (thisRoundEnemies / this.target);
        const barPosition = barX + (currentProgress * barLength);
        context.save();
        context.fillRect(barX, barY, 150, 7);
        context.fillStyle = 'gray';
        context.fillRect (barPosition, barY - 3, 3, 13);
        context.restore();

        // Print enemies defeated
        context.save();
        context.font = '15px Boldonse';
        context.fillText(`Enemies Defeated: ${this.totalEnemiesDefeated}`, 12.5, 485);
        context.restore();

        // Players
        this.player.draw(context);

        // Enemies
        this.enemies.forEach(enemy => {

            // Draw the enemy in new position.
            enemy.draw(context);

            if (enemy.type instanceof Gunner) {
                // Check if enemy shot is happening, if so move the shot
                if (enemy.shot.happening) {
                    enemy.drawShot();
                }
            }

        });

        // Powerups
        // Check if player has been alive for 15 seconds
        if (this.powerup.happening) {

            // Draw the powerup
            this.powerup.draw(context);

            // Check if Powerup is offscreen for indicator
            if (this.powerup.y + this.powerup.size < 0 && this.powerup.direction || this.powerup.y > 500 && !this.powerup.direction) {
                this.powerup.drawIndicator(context);
            }

        }

    }

    // ------------------------------------------------------------------
    // MOVEMENT:

    this.moveRight = function(item, speed) {
        item.x += speed;
    }
    this.moveLeft = function(item, speed) {
        item.x -= speed;
    }
    this.moveUp = function(item, speed) {
        item.y -= speed;
    }
    this.moveDown = function(item, speed) {
        item.y += speed;
    }
    
    // ------------------------------------------------------------------
    // RESET:

    // Reset single enemy
    this.resetEnemy = function(enemy) {
        if (this.round % 2 == 0) {
            enemy.resetEven();
        } else {
            enemy.resetOdd();
        }
        if (enemy.type instanceof Gunner) {
            enemy.adjustShot();
        }
    }

    // Reset all enemies
    this.resetEnemies = function() {
        this.enemies.forEach(enemy => this.resetEnemy(enemy));
    }

    // Reset between rounds
    this.resetBetween = function() {
        this.player.reset();
        this.resetEnemies();
        this.powerup.reset();
        this.powerup.setActive(false);
        this.cancelPowerup();
    }

    // Reset the player/game stats
    this.resetStats = function() {
        this.round = 1;
        this.totalEnemiesDefeated = 0;
        this.lives = 3;
        this.enemies.forEach(enemy => {
            enemy.makeBoopa();
        });
    }

    // ------------------------------------------------------------------
    // GENERAL CHECK INTERSECTION:

    // +1 to totalEnemiesDefeated count
    this.defeated = function() {
        this.totalEnemiesDefeated += 1;
    }

    // Intersection has happened... do this
    this.intersection = function() {
        this.resetEnemies();
        
        this.pause();

        if (this.lives <= 0) {
            return this.dead();
        }

        this.respawn();
    }

    // Check if an intersection is happening
    this.checkIntersection = function(checkable, player) {

        // Square representing where edges are of checkable item
        let left = checkable.x;
        let right = checkable.x + checkable.size;
        let top = checkable.y;
        let bottom = checkable.y + checkable.size;

        // Gather if checkable item is intersecting with player
        let ifTop = top >= player.top && top <= player.bottom;
        let ifBottom = bottom >= player.top && bottom <= player.bottom;
        let ifRight = right >= player.left && right <= player.right;
        let ifLeft = left <= player.right && left >= player.left;

        // Test if checkable item is intersecting with player
        if (ifTop && ifLeft || ifBottom && ifLeft || ifTop && ifRight || ifBottom && ifRight) {
            return 1;
        }

        // Over Edge
        if (this.player.overedge) {

            // Create variables for possible use
            let t;
            let b;
            let l;
            let r;

            switch (this.player.distorted) {
                case (1):
                    // Off Top
                    t = player.top + 500;
                    b = player.bottom + 500;
                    break;
                case (2):
                    // Off Bottom
                    t = player.top - 500;
                    b = player.bottom - 500;
                    break;
                case (3):
                    // Off Left
                    l = player.left + 500;
                    r = player.right + 500;
                    break;
                case (4):
                    // Off Right
                    l = player.left - 500;
                    r = player.right - 500;
                    break;
            }

            let ifThisTop = top >= t && top <= b;
            let ifThisBottom = bottom >= t && bottom <= b;
            let ifThisLeft = left <= r && left >= l;
            let ifThisRight = right <= r && right >= l;

            // Test if checkable item is intersecting with MIRRORED player.
            if (ifThisTop && ifLeft || ifThisBottom && ifLeft || ifThisTop && ifRight || ifThisBottom && ifRight) {
                return 1;
            }

            if (ifTop && ifThisLeft || ifBottom && ifThisLeft || ifTop && ifThisRight || ifBottom && ifThisRight) {
                return 1;
            }

        }

        // No intersection
        return 0;

    }

    // ------------------------------------------------------------------
    // SPECIFIC INTERSECTIONS:

    this.cancelPowerup = () => {
        this.setEnemiesSpeed(5);
        this.resetEnemiesSize();
        this.player.invincibility(false);
        this.player.setSpeed(5);
        this.powerup.setActive(false);
    }

    this.powerUpIntersection = () => {

        this.powerup.setActive(true);

        switch (this.powerup.type) {
            case (0):
                // Slowdown
                this.setEnemiesSpeed(1);
                break;
            case (1):
                // Rainbow
                this.setEnemiesSpeed(10);
                this.setEnemiesSize(0);
                this.player.invincibility(true);
                break;
            case (2):
                // Trick
                this.player.setSpeed(3);
                this.lives++;
                break;
            case (3):
                // Free Life
                this.lives++;
                break;
        }

        this.powerup.reset();

    }

    this.enemyIntersection = function() {

        this.removeLife();

        this.intersection();

    }

    this.shotIntersection = function() {

        this.removeLife();

        this.intersection();

    }

    // ------------------------------------------------------------------
    // SET VALUE(s):

    this.addPlay = function() {
        this.plays++;
    }

    this.addRound = function() {
        this.round++;
    }

    this.addLife = function() {
        this.lives++;
    }

    this.removeLife = function() {
        this.lives--;
    }

    this.setEnemiesSpeed = function(speed) {
        this.enemies.forEach(enemy => {
            enemy.setSpeed(speed);
            enemy.setShotSpeed(speed * 1.6);
        });
    }

    this.setEnemiesSize = function(size) {
        this.enemies.forEach(enemy => {
            enemy.setSize(size);
            enemy.setShotSize(size);
        });
    }

    this.resetEnemiesSize = function() {
        this.enemies.forEach(enemy => {
            enemy.type instanceof Gunner ? enemy.setSize(13) : enemy.setSize(8);
            enemy.shot.size = 8;
        });
    }

    // ------------------------------------------------------------------
    // START/PAUSE:

    this.startGame = () => {
        
        this.beingPlayed = true;

        let time = Date.now();

        if (this.powerup.active) {

            this.powerup.lastTime = time - (this.powerup.lastPrintTime - this.powerup.lastTime);
        
        } else if (!this.powerup.happening) {

            this.powerup.lastTime = time;

        }

        return this.intervalId = setInterval(() => this.draw(), framerate);
    }

    this.pause = function() {
        return this.intervalId = clearInterval(this.intervalId);
    }

    this.pauseController = () => {
        if (this.intervalId) {
            return this.pause();
        }
        this.startGame();
    }

    // ------------------------------------------------------------------
    // SCREENS:

    this.homeListener = () => {
        this.endWelcome();
        this.removeHomeListener();
        this.addPauseListener();
        updateState('play');
        this.beingPlayedCall();
    }

    this.addHomeListener = () => {
        this.canvas.addEventListener('click', this.homeListener);
    }

    this.removeHomeListener = () => {
        this.canvas.removeEventListener('click', this.homeListener);
    }

    this.addPauseListener = () => {
        this.canvas.addEventListener('click', this.pauseController);
    }

    this.removePauseListener = () => {
        this.canvas.removeEventListener('click', this.pauseController);
    }

    this.welcomeHandler = () => this.welcomeScene();

    this.startWelcome = function() {
        this.slide = 0;
        this.welcomeScene();
        if (this.welcomeId) {
            this.endWelcome();
        }
        this.welcomeId = setInterval(this.welcomeHandler, 1000);
    }

    this.endWelcome = function() {
        this.welcomeId = clearInterval(this.welcomeId);
        this.removeHomeListener();
        this.addPauseListener();
    }

    this.welcomeScene = function() {
        context.fillStyle = '#fff';
        context.fillRect(0, 0, 500, 500);
        context.fillStyle = 'purple';

        context.font = '9px Boldonse';
        context.fillText('Click anywhere to skip the tutorial.', 150, 485);

        switch (this.slide) {
            case (0):
                context.font = '25px Boldonse';
                context.fillText('Welcome to Breakthrough v2!', 28, 230);
                context.font = '15px Boldonse';
                context.fillText('Click nothing to watch the tutorial.', 90, 290);
                break;
            case (1):
                context.font = '25px Boldonse';
                context.fillText('How do I move the player?', 52, 230);
                context.font = '15px Boldonse';
                context.fillText('Use the WASD keys on your keyboard.', 85, 290);
                context.fillStyle = '#000';
                context.fillRect(225, 100, 50, 50);
                break;
            case (2):
                context.font = '25px Boldonse';
                context.fillText('What if I reach the edge?', 52, 230);
                context.font = '15px Boldonse';
                context.fillText('Your player will mirror on the opposing edge', 47, 290);
                context.fillText('of the screen.', 180, 325);
                context.fillStyle = '#000';
                context.fillRect(485, 50, 15, 50);
                context.fillRect(0, 50, 35, 50);
                break;
            case(3):
                context.font = '25px Boldonse';
                context.fillText('What are the enemy types?', 45, 230);
                context.font = '15px Boldonse';
                context.fillText("Greens and Gunners.", 155, 290);
                context.fillStyle = '#16a34a';
                context.fillRect(225, 110, 16, 16);
                context.fillStyle = '#F10040';
                context.fillRect(249, 100, 26, 26);
                break;
            case(4):
                context.font = '25px Boldonse';
                context.fillText('What do Greens do?', 90, 230);
                context.font = '15px Boldonse';
                context.fillText('Nothing... unless you run into one.', 95, 290);
                context.fillStyle = '#16a34a';
                context.fillRect(242, 100, 16, 16);
                break;
            case(5):
                context.font = '25px Boldonse';
                context.fillText('What do Gunners do?', 85, 230);
                context.font = '15px Boldonse';
                context.fillText('They shoot Greens in all directions.', 84, 290);
                context.fillStyle = '#F10040';
                context.fillRect(237, 100, 26, 26);
                context.fillStyle = '#16a34a';
                context.fillRect(300, 104, 16, 16);
                break;
            case(6):
                context.font = '25px Boldonse';
                context.fillText('How do enemies move?', 65, 230);
                context.font = '15px Boldonse';
                context.fillText('Even Round: Top / Bottom.', 115, 290);
                context.fillText('Odd Round: Left / Right.', 130, 325);
                break;
            case(7):
                context.font = '25px Boldonse';
                context.fillText('Are there powerups?', 85, 230);
                context.font = '15px Boldonse';
                context.fillText('Yes! They fall from the top and bottom', 75, 290);
                context.fillText('of the screen.', 180, 325);
                context.fillStyle = 'yellow';
                context.fillRect(225, 100, 50, 50);
                break;
            case(8):
                context.font = '25px Boldonse';
                context.fillText('Do powerups have indicators?', 25, 230);
                context.font = '15px Boldonse';
                context.fillText('Yes! They are 10 pixels tall and will match', 65, 290);
                context.fillText('the powerups Y value.', 153, 325);
                context.fillStyle = 'yellow';
                context.fillRect(225, 0, 50, 10);
                break;
            case(9):
                context.font = '25px Boldonse';
                context.fillText('Can I pause the game?', 85, 230);
                context.font = '15px Boldonse';
                context.fillText('You can pause the game at anytime', 95, 290);
                context.fillText('by pressing anywhere on the screen.', 90, 325);
                break;
            default:
                updateState('play');
                context.font = 'Boldonse';
                this.home();
                break;
        }

        let thisTime = Date.now();

        if (thisTime - this.lastTime > 3000) {
            this.lastTime = thisTime;
            this.slide++;
        }
        
    }

    this.home = function() {
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, 500, 500);
        context.fillStyle = '#fff';
        context.font = '25px Boldonse';
        context.fillText('Welcome to Breakthrough v2!', 24, 230);
        context.font = '15px Boldonse';
        context.fillText("Click anywhere to start playing.", 100, 290);
    }

    this.dead = async function() {

        this.beingPlayed = false;
        this.resetBetween();

        this.addPlay();
        context.fillStyle = '#F10040';
        context.fillRect(0, 0, 500, 500);
        context.fillStyle = 'blue';
        context.font = '25px Boldonse';
        context.fillStyle = 'white';
        context.fillText('You died.', 190, 200);
        context.font = '15px Boldonse';
        context.fillText(`You defeated ${this.totalEnemiesDefeated} enemies.`, 135, 260);
        context.fillText(`You made it to round ${this.round}.`, 155, 310);
        context.fillText(`You have played ${this.plays} times.`, 150, 360);


        /*
        let response = await fetch('http://localhost/project1/php/leaderboard.php', {
            method: "POST",
            header: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.username,
                enemiesDefeated: this.totalEnemiesDefeated,
                roundLost: this.round,
            })
        });

        if (!response.ok) {
            this.sendAlert('#F10040', 'Error.', '10px');
        }

        let data = await response.json();

        if (data.error) {
            this.sendAlert('#F10040', data.error, '10px');
        }
    
        if (data.success) {
            this.sendAlert('#16A34A', data.success, '10px');
        }
        */
       
        this.resetStats();
        
    }

    this.respawn = function() {
        this.resetBetween();
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, 500, 500);
        context.fillStyle = 'blue';
        context.fillStyle = 'white';
        context.font = '25px Boldonse';
        context.fillText('You lost a life!', 150, 250);
        context.font = '15px Boldonse';
        context.fillText('Click anywhere to respawn.', 130, 310);
    }

    this.nextRound = function() {
        this.resetBetween();
        context.fillStyle = '#16a34a';
        context.fillRect(0, 0, 500, 500);
        context.fillStyle = '#fff';
        context.font = '25px Boldonse';
        context.fillText(`You completed round ${this.round}!`, 70, 250);
        context.font = '15px Boldonse';
        context.fillText('Click anywhere to continue...', 110, 310);
        this.addRound();
        this.updateEnemiesBasedOnRound();
        this.resetEnemies();
    }



    this.updateEnemiesBasedOnRound = function() {
        if (this.enemies.length === 0) {
            for (let i = 0; i < 20; i++) {
                let enemy = new Enemy(context);
                this.resetEnemy(enemy);
                enemy.type = new Boopa();
                enemy.size = enemy.type.size;
                this.enemies.push(enemy);
            }
        }

        switch (this.round) {
            case 3:
                this.makeGunner(0);
                break;
            case 5:
                this.makeGunner(1);
                break;
            case 7:
                this.makeGunner(2);
                break;
            case 9:
                this.makeGunner(3);
                break;
            case 11:
                this.makeGunner(4);
                break;
            case 20:
                this.makeGunner(5);
                break;
            case 30:
                this.makeGunner(6);
                break;
            case 40:
                this.makeGunner(7);
                break;
            case 50:
                this.makeGunner(8);
                break;
            case 60:
                this.makeGunner(9);
                break;
        }
    }

    this.makeGunner = (index) => {
        this.enemies[index].makeGunner();
    }

}