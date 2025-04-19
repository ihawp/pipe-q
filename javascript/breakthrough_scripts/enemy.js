import { randomNumberInRange } from "./functions.js";

import { Gunner } from './gunner.js';
import { Boopa } from './boopa.js';

export default function Enemy(context) {
    this.directionOdd = randomNumberInRange(0, 1);
    this.directionEven = randomNumberInRange(0, 1);
    this.y;
    this.x;
    this.type = undefined;
    this.context = context;
    this.shot = {
        happening: false,
        x: undefined,
        y: undefined,
        speed: 8,
        size: 8,
    }

    this.makeGunner = function() {
        this.type = new Gunner();
    }

    this.makeBoopa = function() {
        this.type = new Boopa();
    }

    this.draw = function() {
        this.context.save();
        this.context.fillStyle = this.type.color;
        this.context.fillRect(this.x, this.y, this.type.size, this.type.size);
        this.context.restore();
    }

    this.resetOdd = function() {
        if (this.directionOdd) {
            this.x = -(randomNumberInRange(100, 600));
        } else {
            this.x = randomNumberInRange(600, 1100);
        }
        this.y = randomNumberInRange(0, 500);
    }

    this.resetEven = function() {
        if (this.directionEven) {
            this.y = -(randomNumberInRange(100, 600));
        } else {
            this.y = randomNumberInRange(600, 1100);
        }
        this.x = randomNumberInRange(0, 500);
    }

    // Shoot shots
    // Extendable for sure so leaving it in here, although as of now it is only used for the gunner class
    this.drawShot = function() {
        // "Shoots boopas rather than bullets"
        this.context.fillStyle = '#16a34a';
        this.context.fillRect(this.shot.x, this.shot.y, this.shot.size, this.shot.size);
    }

    this.adjustShot = function() {
        this.shot.x = this.x;
        this.shot.y = this.y;
    }

    this.setShotSpeed = function(speed) {
        this.shot.speed = speed;
    }

    this.setShotSize = function(size) {
        this.shot.size = size;
    }

    this.setSpeed = function(speed) {
        this.type.speed = speed;
    }

    this.setSize = function(size) {
        this.type.size = size;
    }

}