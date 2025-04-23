<?php


function cleanString($string) {
    return stripslashes(trim(htmlspecialchars($string)));
}

function send($location) {
    header('Location: '.$location);
    exit();
}

function isLogged() {
    return isset($_SESSION['id']) && isset($_SESSION['username']);
}










function Query() {
    include_once 'db_conn.php';

    $query = $conn->prepare('SELECT * FROM users LIMIT 25');

    try {
        if ($query->execute()) {
            $result = $query->get_result();
            if ($result->num_rows > 0) {
                return $result;
            }
            return 0;
        }
    } catch (E) {
        return 0;
    }

}