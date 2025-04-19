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
    <section id="hero">
        <div>
            
        </div>
    </section>
    <section>
        <h2>Welcome <?= $_SESSION['username'] ?></h2>
        <p>Your User Identification Number is <?= $_SESSION['id'] ?></p>
    </section>
    <section id="posts-container">
        <?php


        include_once 'db_conn.php';

        $query = $conn->prepare('');

        $query->bind_param('', '');

        $query->execute();

        $result = $query->get_result();

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                echo $row['thing'];
            }
        }

        ?>
    </section>
<?php

include_once 'html/footer.html';