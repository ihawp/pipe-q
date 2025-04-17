<?php

include_once 'functions.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send('../register.php');
}

// If one of these are NOT set, send the user back.
if (!isset($_POST['username']) || !isset($_POST['email']) || !isset($_POST['password']) || !isset($_POST['passwordAgain'])) {
    send('../register.php?error=missing_info');
}

// POST data and check validity of submitted data
$username = cleanString($_POST['username']);
$email = cleanString($_POST['email']);
$password = $_POST['password'];
$passwordAgain = $_POST['passwordAgain'];

if ($password !== $passwordAgain || !is_string($password) || !is_string($passwordAgain)) {
    send('../register.php?error=passwords_do_not_match');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || !is_string($email)) {
    send('../register.php?error=not_an_email');
}

if (strlen($username) < 5 || strlen($username) > 16 || !is_string($username)) {
    send('../register.php?error=username_length');
}


include_once 'db_conn.php';

// Check if user with this $username or $email already exists
$query = $conn->prepare('SELECT id, username FROM users WHERE username = ? OR email = ?');

$query->bind_param('ss', $username, $email);

$query->execute();

$result = $query->get_result();

if ($result->num_rows > 0) {
    send('../register.php?error=account_already_exists');
}

// Create new user in DB
$query = $conn->prepare('INSERT INTO users (username, email, password) VALUES (?, ?, ?)');

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$query->bind_param('sss', $username, $email, $hashedPassword);

if ($query->execute()) {

    session_start();
    session_regenerate_id(true);

    $_SESSION['id'] = $query->insert_id;
    $_SESSION['username'] = $username;

    send('../home.php');
} else {
    send('../register?error=failed_to_register');
}