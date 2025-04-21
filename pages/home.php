<?php

// includes functions.php

include 'backend/notIsLogged.php';

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
    </section>
<?php