<?php


include_once 'backend/notIsLogged.php';

include_once 'head.php';
include_once 'header.php';
?>
<header>
    <h1>Account</h1>
</header>
<section>
    <h2>Delete Your Account</h2>
    <form action="backend/deleteAccount.php" method="POST">
        <input type="text" name="delete" value="TRUE" hidden required>
        <button type="submit">Delete Account</button>
    </form>
</section>
<section>
    <ul>
        <li>
            <a href="./logout" title="Logout">Logout</a>
        </li>
    </ul>
</section>


<?php
include_once 'footer.php';