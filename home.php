<?php

session_start();

include_once 'backend/functions.php';

if (!isLogged())  {
    send('login.php');
}

?>

<!doctype html>
<html lang="en">
<head>
</head>
<body>
    <header>
        <nav aria-label="Site Navigation">
            <ul>
                <li>
                    <a href="backend/logout.php" title="Logout">Logout</a>
                </li>
            </ul>
        </nav>
    </header>
    <main>
        <header>
            <h1>Welcome <?= $_SESSION['username'] ?></h1>
        </header>
        <section>
            <h2>You User Identification Number is <?= $_SESSION['id'] ?></h2>
        </section>
    </main>
    <footer>

    </footer>
</body>
</html>
