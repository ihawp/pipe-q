<?php

require __DIR__ . '/vendor/autoload.php';

$location = $_SERVER['REQUEST_URI'];

session_start();

include_once 'backend/functions.php';

include_once 'pages/head.php';
include_once 'pages/header.php';

const PREPEND = '/pipe-q/';

switch ($location) {
    case PREPEND . 'login':
        include_once 'pages/login.php';
        break;
    case PREPEND . 'logout':
        include_once 'pages/logout.php';
        break;
    case PREPEND . 'register':
        include_once 'pages/register.php';
        break;
    case PREPEND:
    case PREPEND . 'home':
        if (isLogged()) {
            include_once 'pages/home.php';
        } else {
            include_once 'pages/NL-home.php';
        }
        break;
    default:
        include_once 'pages/error.php';
        break;

}

include_once 'pages/footer.php';

?>

</body>
</html>
