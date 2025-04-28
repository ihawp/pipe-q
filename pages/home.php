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
    'expires' => time() + 3600,
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
    