<?php

session_start();

session_regenerate_id(true);

include_once 'backend/notIsLogged.php';

$_SESSION = array();

if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(
        session_name(), 
        '', 
        time() - 1, 
        $params['path'], 
        $params['domain'], 
        $params['secure'], 
        $params['httponly']
    );
}

session_destroy();

send('home.php');

?>

