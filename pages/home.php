<?php

// includes functions.php

include 'backend/notIsLogged.php';

function base64UrlEncode($data) {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

$header = json_encode(['alg' => 'HS256', 'typ' => 'JWT']);
$payload = json_encode([
    'user_id' => $_SESSION['id'],
    'username' => $_SESSION['username'],
    'exp' => time() + 3600,
]);

$base64UrlHeader = base64UrlEncode($header);
$base64UrlPayload = base64UrlEncode($payload);

$secret = 'this_is_a_secret';

$signature = hash_hmac('sha256', "$base64UrlHeader.$base64UrlPayload", $secret, true);
$base64UrlSignature = base64UrlEncode($signature);

$jwt = "$base64UrlHeader.$base64UrlPayload.$base64UrlSignature";

// OUTSIDE OF DEV ENV:
// SET 'secure' => true
// ADD 'domain' => domain
setcookie('jwt', $jwt, [
    'expires' => time() + 5,
    'path' => '/',
    'secure' => false,
    'httponly' => true,
    'samesite' => 'Strict'
]);

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
    <section id="messageOut"></section>
    <canvas id="canvas" width="500" height="500"></canvas>

    <script src="http://localhost:4343/socket.io/socket.io.js"></script>
    <script>
    const socket = io('http://localhost:4343', {
        withCredentials: true,
    });

    let formSubmit = document.getElementById('formSubmit');
    const username = "<?= $_SESSION['username'] ?>";

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