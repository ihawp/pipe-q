<?php

session_start();

include_once 'functions.php';

/*
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: http://localhost");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Max-Age: 86400");
    exit(0);
}

header("Access-Control-Allow-Origin: http://localhost");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST");
*/
/*
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echoJSONEncode(['error' => file_get_contents("php://input")]);
}
*/
/*
if (!isset($_POST['message']) || !isset($_POST['sender']) || !isset($_POST['receiver'])) {
    send('../home');
}
    */

$response = file_get_contents("php://input")['response'];

if (!isset($response['message']) || !isset($response['username']) || !isset($response['receiver'])) {
    echoJSONEncode(['error' => 'error']);
}

echoJSONEncode(['response' => file_get_contents("php://input")]);