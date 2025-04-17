<?php

include_once 'functions.php';

if (!isLogged()) {
    send('login.php');
}