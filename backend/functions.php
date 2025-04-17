<?php


function cleanString($string) {
    return stripslashes(trim(htmlspecialchars($string)));
}

function send($location) {
    header('Location: '.$location);
    exit();
}

function isLogged() {
    return isset($_SESSION['id']) && isset($_SESSION['username']);
}