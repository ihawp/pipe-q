export default function Player(x, y) {

    this.x = x;
    this.y = y;
    this.size = 25;
    this.speed = 5;
    this.velocityX = 0;
    this.velocityY = 0;

    this.top = undefined;
    this.bottom = undefined;
    this.left = undefined;
    this.right = undefined;

    this.overedge = false;
    this.distorted = undefined;

    this.invincible = false;

    this.draw = function(context) {

        // Update player position (if velocity !== 0 the player will move)
        this.x += this.velocityX;
        this.y += this.velocityY;

        context.fillStyle = 'black';

        // Block the user in (could be feature)
        /*
        if (this.y < 0) this.y = 0;
        if (this.y > 475) this.y = 475;
        if (this.x < 0) this.x = 0;
        if (this.x > 475) this.x = 475;
        */
        
        // Over Edge
        if (this.y < 25 || this.y > 475 || this.x < 25 || this.x > 475) {
            this.overedge = true;
        }

        if (this.y > 25 && this.y < 475 && this.x > 25 && this.x < 475) {
            this.overedge = false;
            this.distorted = false;
        }

        if (this.y < 25) {
            context.fillRect(this.x, this.y + 500, this.size, this.size);
            this.distorted = 1;
        }

        if (this.y + this.size < 0) {
            this.y = 475;
        }

        if (this.y > 475) {
            context.fillRect(this.x, this.y - 500, this.size, this.size);
            this.distorted = 2;
        }

        if (this.y > 500) {
            this.y = 0;
        }

        if (this.x + this.size < 25) {
            context.fillRect(this.x + 500, this.y, this.size, this.size);
            this.distorted = 3;
        }

        if (this.x + this.size < 0) {
            this.x = 475;
        }

        if (this.x > 475) {
            context.fillRect(this.x - 500, this.y, this.size, this.size);
            this.distorted = 4;
        }

        if (this.x > 500) {
            this.x = 0;
        }

        // Draw Player
        context.fillRect(this.x, this.y, this.size, this.size);
        
    }

    this.invincibility = (boolean) => {
        this.invincible = boolean;
    }

    this.setSpeed = (speed) => {
        this.speed = speed;
    }

    this.w = false;
    this.a = false;
    this.s = false;
    this.d = false;

    this.keyDown = event => {
        let code = event.keyCode;
        if (code === 87 || code === 65 || code === 83 || code === 68) {
            event.preventDefault();
        }
        switch (code) {
            case 87:
            case 38:
                this.w = true;
                if (this.s === true) {
                    this.s = false;
                }
                this.velocityY = -(this.speed);
                break;
            case 65:
            case 37:
                this.a = true;
                if (this.d === true) {
                    this.d = false;
                }
                this.velocityX = -(this.speed);
                break;
            case 83:
            case 40:
                this.s = true;
                if (this.w === true) {
                    this.w = false;
                }
                this.velocityY = this.speed;
                break;
            case 68:
            case 39:
                this.d = true;
                if (this.a === true) {
                    this.a = false;
                }
                this.velocityX = this.speed;
                break;
        }
        
    }

    this.keyUp = event => {
        let code = event.keyCode;
        if (code === 87 || code === 65 || code === 83 || code === 68) {
            event.preventDefault();
        }
        switch (code) {
            case 87:
            case 38:
                this.w = false;
                if (this.s === false) {
                    this.velocityY = 0;
                }
                break;
            case 83:
            case 40:
                this.s = false;
                if (this.w === false) {
                    this.velocityY = 0;
                }
                break;
            case 65:
            case 37:
                this.a = false;
                if (this.d === false) {
                    this.velocityX = 0;
                }
                break;
            case 68:
            case 39:
                this.d = false;
                if (this.a === false) {
                    this.velocityX = 0;
                }
                break;
        }
    }

    this.reset = function() {
        this.x = 237.5;
        this.y = 237.5;
    }

    this.addKeyDown = () => document.addEventListener('keydown', this.keyDown);
    this.addKeyUp = () => document.addEventListener('keyup', this.keyUp);
    this.removeKeyDown = () => document.removeEventListener('keydown', this.keyDown);
    this.removeKeyUp = () => document.removeEventListener('keyup', this.keyUp);

    this.addKeyDown();
    this.addKeyUp();

}