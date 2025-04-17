<?php

session_start();

// includes functions.php
include_once 'backend/notIsLogged.php';

include_once 'html/head.html';
include_once 'html/header.html';

?>
    <header>
        <h1>Home</h1>
    </header>
    <section>
        <h2>Welcome <?= $_SESSION['username'] ?></h2>
        <p>Your User Identification Number is <?= $_SESSION['id'] ?></p>
    </section>
<?php

include_once 'html/footer.html';