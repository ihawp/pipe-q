<?php

require __DIR__ . '/vendor/autoload.php';

$location = explode('?', $_SERVER['REQUEST_URI'])[0];

include_once 'backend/functions.php';

/*
if (isset($_GET['from'])) {
    $location = cleanString($_GET['from']);
    // could be used for routing from pages that shouldn't be accessed 
    // (anything other than index.php)
}
*/

session_start();

if (isLogged()) {
    include_once 'pages/head.php';
    include_once 'pages/header.php';
} else {
    include_once 'pages/NL-head.php';
    include_once 'pages/NL-header.php';
}

const PREPEND = '/pipe-q/';

switch ($location) {
    case PREPEND . 'login':
        include_once 'pages/login.php';
        break;
    case PREPEND . 'logout':
        include_once 'backend/logout.php';
        send('home');
        break;
    case PREPEND . 'register':
        include_once 'pages/register.php';
        break;
    case PREPEND . 'account':
        include_once 'pages/account.php';
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
