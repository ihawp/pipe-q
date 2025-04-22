<?php

// includes functions.php

include 'backend/notIsLogged.php';

?>
    <header>
        <h1>Home</h1>
    </header>
    <section id="hero">
        <div>
            
        </div>
    </section>
    <section>
        <h2>Welcome <?= $_SESSION['username'] ?></h2>
        <p>Your User Identification Number is <?= $_SESSION['id'] ?></p>
    </section>
    <section>
        <form id="formSubmit">
            <input type="text">
            <button type="submit">Submit</button>
        </form>
    </section>
    <section id="messageOut">

    </section>
    <canvas id="canvas">
    </canvas>

    <script src="http://localhost:4343/socket.io/socket.io.js"></script>

    <script>
    const socket = io('http://localhost:4343');

    let formSubmit = document.getElementById('formSubmit');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext ('2d');
    const username = "<?= $_SESSION['username'] ?>";

    console.log(username);

    context.fillStyle = 'red';
    context.fillRect(0, 0, 500, 500);

    let player;

    const movePlayer = (event, player) => {
        switch(event.keyCode) {
            case 87:
                player.y -= 5;
                break;
            case 65:
                player.x -= 5;
                break;
            case 83:
                player.y += 5;
                break;
            case 68:
                player.x += 5;
                break;
        }
        return player;
    }

    socket.on('connect', () => {

        socket.on('player-set', pos => { 
            player = pos;
            context.fillStyle = 'black';
            context.fillRect(pos.x, pos.y, 25, 25);
            const handler = () => socket.emit('player-move', movePlayer(event, player));
            document.addEventListener('keydown', handler);
        });

        socket.on('player-receive', pos => {
            
            context.fillStyle = 'red';
            context.fillRect(0, 0, 500, 500);
            context.fillStyle = 'black';
            context.fillRect(pos.x, pos.y, 25, 25);

            player = pos;

        });

        let formSubmit = document.getElementById('formSubmit');

        formSubmit.addEventListener('submit', function(event) {
            event.preventDefault();

            let input = event.target[0];

            socket.emit('chat message', { username: username, message: input.value });
            input.value = '';
        });
    });

    socket.on('chat message', (rec) => {
        let chat = `
            <div class="chat">
                <span class="username">${rec.username}: </span>
                <span class="message">${rec.message}</span>
            </div>
        `;

        messageOut.innerHTML += chat;
    });

    </script>