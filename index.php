<?php

// use as SPA*

require 'vendor/autoload.php';

$location = $_SERVER['REQUEST_URI'];

const PREPEND = '/pipe-q/';

switch ($location) {
    case PREPEND . 'game':
        include 'game.php';
        break;

}





// include_once 'backend/isLogged.php';

include_once 'html/head.html';
include_once 'html/NL-header.html';
include_once 'html/NL-footer.html';


