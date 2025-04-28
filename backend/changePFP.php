<?php

session_start();

include_once 'functions.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send('../home');
}

if (!isLogged()) {
    send('../login');
}

const IMAGE_TYPES = ['image/jpeg', 'image/png'];

$pfpUpload = $_FILES['pfp-upload'];

$imageTypesArray = ['image/jpeg', 'image/png'];

if (!in_array($pfpUpload['type'], IMAGE_TYPES)) {
    send('../account');
}

// No Size (file doesnt really exist)
if ($pfpUpload['size'] <= 0) {
    sendHome('error=no_size');
}

// File Size Too Large
if ($pfpUpload['size'] > 2000000) {
    send('../account?error=size_too_large');
}

// Change PFP:

// upload image
// by moving file into directory called uploads (inside of parent pfp)

const PFP_UPLOAD = __DIR__ . '/pfp/uploads/';
const COMPRESSED_FOLDER = __DIR__ . '/pfp/compressed/';

$targetFile = session_id() . basename($pfpUpload["name"]);

if (!move_uploaded_file($pfpUpload['tmp_name'], PFP_UPLOAD . $targetFile)) {
    send('../account');
}

$createImage = PFP_UPLOAD . $targetFile;

if (!exif_imagetype($createImage)) {
    send('../account?error=not_image');
}

$image;

switch ($pfpUpload['type']) {
    case 'image/jpeg':
    case 'image/jpg':
        imagecreatefromjpeg($createImage);
        break;
    case 'image/png':
        $image = imagecreatefrompng($createImage);
        break;
}

$newName = 'compressed-' . $targetFile;

if (!imagejpeg($image, PFP_UPLOAD . $newName, 60)) {
    send('../account?error=compression_failed');
}

if (!copy(PFP_UPLOAD . $newName, COMPRESSED_FOLDER . $newName)) {
    send('../account?error=delete_failed');
}

if (!unlink(PFP_UPLOAD . $targetFile) || !unlink(PFP_UPLOAD . $newName)) {
    send('../account?error=delete_failed');
}

// update PFP column in users table
// HERE DO THAT:

include_once 'db_conn.php';

$query = $conn->prepare('UPDATE users SET pfp = ? WHERE id = ? LIMIT 1');

$query->bind_param('si', $newName, $_SESSION['id']);

if (!$query->execute()) {
    send('../account?error=query_failed');
}

// Remove old PFP before updating session.
if ($_SESSION['pfp'] !== 'user-pfp.jpg') {
    if (!unlink(COMPRESSED_FOLDER . $_SESSION['pfp'])) {
        send('../account?error=unlink_fail');
    }
}

$_SESSION['pfp'] = $newName;

// assume operations complete and send user back to the acocunt page

send('../account');