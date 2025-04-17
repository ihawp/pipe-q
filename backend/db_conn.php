<?php

$dbUser = 'root';
$dbPassword = '';
$dbName = 'pip-q';
$dbHost = 'localhost';

$conn = new mysqli($dbHost, $dbUser, $dbPassword, $dbName);

if ($conn->connect_error) {
    die(' '.$conn->connect_error);
}