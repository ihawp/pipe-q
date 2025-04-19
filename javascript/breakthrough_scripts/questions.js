export default function Questions(updateState) {

    this.watchTutorial = undefined;

    this.display = function(main) {
        main.innerHTML = `
            <div id="learn-how-to-play" class="content">
                <div class="flex justify-center">
                    <svg class="first" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3l58.3 0c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24l0-13.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1l-58.3 0c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>                            </a>
                </div>
                <h1 class="text-center">How To Play</h1>
                <p>Welcome to Breakthrough v2! Thanks for checking it out.</p>
                <p>The below contents is intended to outline the rules and regulations of the game.</p>
                
                <a href="./tutorial" id="watch-tutorial">Watch Tutorial.</a>

                <h2>Overview</h2>
                <p>You are the player! Your goal is to avoid enemies at all costs.</p>
                <p>
                    On odd numbered rounds enemies will attack from the left and right sides of the gameboard.
                    On even numbered rounds they will attack from the top and bottom.
                    Every time an enemy goes off screen you will gain one (1) enemy defeated.
                    Every time you defeat one-hundred (100) enemies you will move onto the next round.    
                </p>
                <p>Every time you complete a game (lose all your lives) your score will be uploaded to the global leaderboard.</p>
                <p>Every ten (10) seconds that you are alive you will be granted a powerup. You must intersect with the powerup to gain it's abilities.</p>
                <p>You can pause the game at any time by pressing anywhere on the gameboard or navigating to another page on the site.</p>
                
                <h2>Player</h2>
                <p>
                    The player has three (3) lives and moves at a speed of five (5).    
                </p>
                <p>
                    You can move the player around the gameboard by using WASD or the Arrow Keys.
                    If you move the player to an edge of the gameboard (and keep going) it will be mirrored on the opposite side of the gameboard at the same size as distance over the edge.
                    This happens until you have moved entirely 'overedge' and are teleported to the new opposite position.
                </p>
                <h3>WASD</h3>
                <ul class="list disc">
                    <li>
                        <p>W (up)</p>
                    </li>
                    <li>
                        <p>A (left)</p>
                    </li>
                    <li>
                        <p>S (down)</p>
                    </li>
                    <li>
                        <p>D (right)</p>
                    </li>
                </ul>
                <h3>Arrow Keys</h3>
                <ul class="list disc">
                    <li>
                        <p>Up Arrow (up)</p>
                    </li>
                    <li>
                        <p>Left Arrow (left)</p>
                    </li>
                    <li>
                        <p>Down Arrow (down)</p>
                    </li>
                    <li>
                        <p>Right Arrow (right)</p>
                    </li>
                </ul>
                <h2>Enemies</h2>
                <p>
                    There are two enemy types: Greens and Gunners.
                </p>
                <p>
                    In any given round there will be twenty (20) enemies. All enemies move at a speed of five (5). On round one (1) there will be no Gunners, only Greens. At rounds three (3), five (5), seven (7), nine (9), and eleven (11) one (1) Gunner is added into the mix.   
                    One more Gunner is added on rounds twenty (20), thirty (30), forty (40), fifty (50), and sixty (60).
                </p>

                <h3>Types:</h3>
                <ul class="list disc">
                    <li>
                        <p><span class="bold">Green:</span> It doesn't want to hit you just as much as you don't want to hit it.</p>
                    </li>
                    <li>
                        <p><span class="bold">Gunner:</span> Shoots Greens from a random side every time their last shot is off-screen.</p>
                    </li>
                </ul>

                <h2>Powerups</h2>
                <p>
                    There are four (4) powerup types. Powerups fall from the top and bottom of the gameboard. All powerups except for Free Life are active for five (5) seconds if gained. 
                    All powerups are indicated by an indicator. The indicator will let you know where the powerup will fall on the Y axis and from which side (top or bottom).
                </p>
                <h3>Types:</h3>
                <ul class="list disc">
                    <li>
                        <p><span class="bold">Rainbow:</span> All enemies are made invisible. The player gains progress toward round completion. The player is invincible for two-and-a-half (2.5) seconds after the enemies reappear.</p>
                    </li>
                    <li>
                        <p><span class="bold">Trick:</span> Rewards the player with one (1) extra life and slows the players speed to three (3).</p>
                    </li>
                    <li>
                        <p><span class="bold">Free Life:</span> Rewards the player with one (1) extra life.</p>
                    </li>
                    <li>
                        <p><span class="bold">Slow Down:</span> For when you're in a pinch. Enemies are slowed to a speed of one (1)</p>
                    </li>
                </ul>
            </div>
        `;

        this.watchTutorial = document.getElementById('watch-tutorial');
        this.watchTutorial.addEventListener('click', this.updateState);
    }

    this.updateState = (event) => {
        event.preventDefault();
        this.watchTutorial.removeEventListener('click', this.updateState);
        history.pushState({ page: 'tutorial' }, '', 'tutorial');
        updateState('tutorial');
    }

}