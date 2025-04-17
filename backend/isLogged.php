<?php

session_start();
include_once 'functions.php';

if (isLogged()) {
    send('home.php');
}