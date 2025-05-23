<?php

include_once 'functions.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send('../login');
}

if (!isset($_POST['username-or-email']) || !isset($_POST['password'])) {
    send('../login?error=missing_info');
}

$usernameORemail = cleanString($_POST['username-or-email']);
$password = $_POST['password'];

if (!filter_var($usernameORemail, FILTER_VALIDATE_EMAIL)) {
    $strlenUsernameOrEmail = strlen($usernameORemail);
    if ($strlenUsernameOrEmail < 5 || $strlenUsernameOrEmail > 16) {
        send('../login?error=username_length');
    }
}

include_once 'db_conn.php';

$query = $conn->prepare("SELECT id, username, pfp, password FROM users WHERE username = ? OR email = ?");

$query->bind_param('ss', $usernameORemail, $usernameORemail);

$query->execute();

$result = $query->get_result();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        if (password_verify($password, $row['password'])) {

            session_start();
            session_regenerate_id(true);

            // successful login
            $_SESSION['id'] = $row['id'];
            $_SESSION['username'] = $row['username'];
            $_SESSION['pfp'] = $row['pfp'];

            send('../home');

        } else {
            send('../login?error=wrong_password');
        }
    }
} else {
    send('../login?error=account_doesnt_exist');
}