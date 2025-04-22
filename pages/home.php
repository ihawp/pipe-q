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

    <script src="http://localhost:4343/socket.io/socket.io.js"></script>

    <script>
    const socket = io('http://localhost:4343');

    let formSubmit = document.getElementById('formSubmit');
    const messageOut = document.getElementById('messageOut');

    const username = "<?= $_SESSION['username'] ?>";

    console.log(username);

    socket.on('connect', () => {

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