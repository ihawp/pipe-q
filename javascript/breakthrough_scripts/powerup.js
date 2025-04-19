// this the place for powerups and !!

import { randomNumberInRange } from "./functions.js";

export default function Powerup() {

    this.direction = randomNumberInRange(0, 1);
    this.type = undefined;
    this.x = undefined;
    this.y = undefined;
    this.size = 25;
    this.speed = 7;

    this.lastTime = undefined;
    this.lastPrintTime = undefined;
    this.lastInactiveTime = undefined;
    this.happening = false;
    this.active = false;

    this.draw = function(context) {
        context.fillStyle = '#FFF700';
        context.fillRect(this.x, this.y, this.size, this.size);
    }

    this.drawIndicator = function(context) {
        context.fillStyle = '#FFF700';
        context.fillRect(this.x, this.direction ? 0 : 490, this.size, 10);
    }

    this.setActive = (value) => {
        this.active = value;
    }

    this.resetLastTime = function() {
        this.lastTime = Date.now();
    }

    this.resetType = function() {
        this.type = randomNumberInRange(0, 1);
    }

    this.resetX = function() {
        this.x = randomNumberInRange(0, 500);
    }

    this.resetY = function() {
        this.y = this.direction ? -500 : 1000;
    }

    this.resetXY = function() {
        this.resetY();
        this.resetX();
    }

    this.reset = function() {
        this.resetType();
        this.resetXY();
        this.resetLastTime();
    }

    // set initial: x, y, type, lastTime
    this.reset();

}