/*
    Two Implementations

    1. DOM: Uses <div> and <span> elements.

    2. Canvas: Particles are drawn to <canvas>. 
    
    All particle instances are stored in array in ( instanceName.particles ).

*/

import { randomNumberInRange } from './functions.js';

// DOM Version
export function Panel() {
    this.panel = document.createElement('div');
    this.panel.id = ('panel');
    this.style = this.panel.style;
    this.style.position = 'absolute';
    this.style.top = '0';
    this.style.left = '0';
    this.style.width = '100vw';
    this.style.height = '100vw';
    this.style.zIndex = '-1';

    this.particles = [];

    this.init = function() {
        document.body.insertAdjacentElement('afterbegin', this.panel);

        for (let i = 0; i < 500; i++) {

            let particle = document.createElement('span');
            let style = particle.style;

            style.background = 'white';
            style.borderRadius = '100px';
            style.position = 'absolute';

            style.width = '1px';
            style.height = '1px';

            style.top = `${randomNumberInRange(0, window.innerHeight)}px`;
            style.left = `${randomNumberInRange(0, window.innerWidth)}px`;

            this.panel.insertAdjacentElement('beforeend', particle);
            this.particles.push(particle);

        }
    }
}

// Canvas Version
export default function ParticleBackground() {

    this.canvas = document.createElement('canvas');
    this.particles = [];
    this.context = this.canvas.getContext('2d');
    this.canvas.id = 'particle-background';
    this.style = this.canvas.style;
    this.style.position = 'absolute';
    this.style.top = '0';
    this.style.left = '0';
    this.style.zIndex = '-1';
    this.intervalId = undefined;

    // center of screen.
    this.center = undefined;

    this.setDimensions = function() {
        this.canvas.setAttribute('width', `${window.innerWidth}`);
        this.canvas.setAttribute('height', `${window.innerHeight}`);
    }

    this.resetParticles = function() {
        this.particles = [];
    }

    this.generateParticles = function() {
        for (let i = 0; i < 125; i++) {

            let particle = new Particle(this.center);

            this.particles.push(particle);

        }
    }

    this.updateParticles = function() {

            this.context.fillStyle = 'purple';
            this.context.fillRect(0, 0, window.innerWidth, window.innerHeight);
        this.particles.forEach(particle => {
            this.context.fillStyle = '#800080';
            particle.draw(this.context, particle.last.x, particle.last.y, 5, 5);
            particle.rotate();
            this.context.fillStyle = 'white';
            particle.draw(this.context, particle.x, particle.y, particle.size, particle.size);
        });
    }

    this.updateHandler = () => this.updateParticles();

    this.init = function() {

        this.center = {x: window.innerWidth / 2, y: window.innerHeight / 2}

        this.setDimensions();

        this.resetParticles();

        this.generateParticles();

        document.body.insertAdjacentElement('afterbegin', this.canvas);

    }

    this.initHandler = () => this.init();

    window.addEventListener('resize', this.initHandler);

    setInterval(this.updateHandler, 75);

}

function Particle(center) {
    this.x = randomNumberInRange(0, window.innerWidth);
    this.y = randomNumberInRange(0, window.innerHeight);
    this.last = { x: undefined, y: undefined };
    this.speed = randomNumberInRange(0, 1);
    this.size = 1;
    this.center = center;
    this.radius = Math.sqrt(Math.pow(this.x - this.center.x, 2) + Math.pow(this.y - this.center.y, 2));
    this.angle = Math.atan2(this.y - center.y, this.x - center.x);

    this.rotate = function() {
        this.last.x = this.x;
        this.last.y = this.y;
        this.x = this.center.x + this.radius * Math.cos(this.angle);
        this.y = this.center.y + this.radius * Math.sin(this.angle);
        this.angle -= 0.002;
    }

    this.draw = function(context, x, y, size) {
        context.fillRect(x, y, size, size);
    }
}