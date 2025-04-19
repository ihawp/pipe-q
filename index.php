<?php

require 'vendor/autoload.php';

$location = $_SERVER['REQUEST_URI'];

// could load header and footer here as well.
// and header/footer can be based off of logged state

include_once 'backend/functions.php';

if (isLogged()) {
    include_once 'html/head.html';
    include_once 'html/header.html';
} else {
    // head will likely be different eventually
    include_once 'html/head.html';
    include_once 'html/NL-header.html';
}

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
        include_once 'pages/home.php';
        break;
    default:
        include_once 'pages/error.php';
        break;

}





// include_once 'backend/isLogged.php';

include_once 'html/head.html';
include_once 'html/NL-header.html';
include_once 'html/NL-footer.html';


