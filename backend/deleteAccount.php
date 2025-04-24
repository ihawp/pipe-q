<?php

session_start();

include_once 'functions.php';
if (!isLogged()) {
    send('../login');
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['delete']) && cleanString($_POST['delete']) === 'TRUE') {

    include_once 'db_conn.php';

    $query = $conn->prepare('DELETE FROM users WHERE id = ?');

    $query->bind_param('i', $_SESSION['id']);

    if ($query->execute()) {
        include_once 'logout.php';
        send('../home');
    } else {
        send('../account?error=account_not_deleted');
    }

    $query->close();
    $conn->close();

} else {
    send('../home');
}