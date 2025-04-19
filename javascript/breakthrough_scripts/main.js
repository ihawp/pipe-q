// ihawp.com Canvas API Game

import Game from './game.js';
import ParticleBackground from './particle.js';
import Fullscreen from './fullscreen.js';
import Leaderboard, { LeaderboardFetch } from './leaderboard.js';
import Error from './error.js';
import Username from './username.js';
import Alert from './alert.js';
import Questions from './questions.js';

function Main() {

    this.main = document.getElementById('main');

    this.navigation = document.getElementById('navigation');

    // Test device type
    this.regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    if (this.regex.test(navigator.userAgent)) {
        this.navigation.classList.add('none');
        this.main.style.width = '100vw';
        this.main.insertAdjacentHTML('afterbegin', `
            <section class="text-center flex col gap-2 items-center justify-center">
                <h2>Your screen is too small to play Breakthrough v2.</h2>
                <p class="max-width-300">Please use a Laptop or Desktop device.</p>
            </section>
        `);
        return;
    }

    this.actual = window.location.pathname.split('/');
    this.actual = this.actual[this.actual.length - 1];
    
    this.state = 'play';
    if (this.state !== this.actual && this.actual.length > 0) {
        this.state = this.actual;
    }

    // Create loading animation (generally only ever actually visible on leaderboard load)
    this.loader = document.createElement('div');
    this.loader.classList.add('flex', 'items-center', 'justify-center');
    this.div = document.createElement('div');
    this.div.classList.add('loader');
    this.loader.replaceChildren(this.div);

    this.particleBackground = new ParticleBackground().init();

    this.leaderboard = new Leaderboard();

    this.fullscreen = new Fullscreen;

    this.error = new Error;

    this.alert = new Alert();

    this.username = new Username(this.alert.sendAlert);

    this.lastLeta = undefined;


    // INVESTIGATE
    /*
    this.dynamicImport = async function(module) {
        let l = await import('./'+module+'.js');
        if (l) {
            console.log(l);
        }
    }
    this.dynamicImport('boopa');
    */
    // INVESTIGATE
    this.pushState = function(urlTitle) {
        history.replaceState({ page: urlTitle }, '', urlTitle);
    }

    this.updateState = (state) => {
        this.state = state;
        this.displayState();
    }

    this.displayState = async () => {

        // error.js get rid of this logic
        if (this.state !== 'play') {
            this.game.pause();
        }

        this.main.replaceChildren(this.loader);

        this.main.scrollTop = 0;

        if (this.last && this.last.classList.contains('nav-hover')) {
            this.last.classList.remove('nav-hover');
        }
        if (this.navButtons[this.state]) {
            this.last = this.navButtons[this.state];
            this.last.classList.add('nav-hover');
        }

        switch (this.state) {

            case 'tutorial':
                this.game.displayTutorial(this.main);
                break;

            case 'leaderboard':
                let data = await LeaderboardFetch();
                if (data) {
                    if (this.state === 'leaderboard') {
                        this.leaderboard.display(this.main, data);
                    }
                } else if (this.state === 'leaderboard') {
                    this.error.display(this.main);
                }
                break;

            case 'play':
                this.game.display(this.main, this.username.name);
                break;

            case 'username':

                // So that w a s d can be entered (I could also remove this logic and not prevent default with the keydown and keyup listeners... more buttons could be used eventually so it's not unreasonable to leave the functions in place (as someone might want to ctrl+w out of the tab ))
                if (this.game.initiated) {
                    this.game.player.removeKeyDown();
                    this.game.player.removeKeyUp();
                }
                this.username.display(this.main);
                break;

            case 'how-to-play':
                this.questions.display(this.main);
                break;

            default:
                this.error.display(this.main, this.navigation);
                break;
        }
        this.pushState(this.state);
    }

    this.navButtons = {
        'play': document.getElementById('play'),
        'leaderboard': document.getElementById('leaderboard'),
        'username': document.getElementById('username'),
        'how-to-play': document.getElementById('how-to-play')
    }

    for (let key in this.navButtons) {
        let item = this.navButtons[key];
        item.addEventListener('click', event => {
            event.preventDefault();
            if (key === this.state) return;
            this.updateState(key);
        });
    }

    this.game = new Game(this.updateState, this.alert.sendAlert);
    this.game.init();
    this.game.setInitiated(true);

    this.questions = new Questions(this.updateState);

    this.pushState(this.state);
    this.updateState(this.state);

}


window.addEventListener('load', () => {
    document.fonts.load('25px "Boldonse"').then(() => {
        const main = new Main();

        window.addEventListener('popstate', event => {
            main.updateState(event.state.page);
        });
    });
});