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
        <input type="submit" value="Delete Account">
    </form>
</section>
<section>
    <ul>
        <li>
            <a href="./logout" title="Logout">Logout</a>
        </li>
        <li>
            <form action="backend/changePFP.php" enctype="multipart/form-data" method="POST">

                <label for="pfp-upload">Upload NEW PFP</label>
                <input type="file" id="pfp-upload" accept="image/png, image/jpeg" name="pfp-upload">

                <input type="submit" value="Change PFP">
            </form>
        </li>
    </ul>
</section>


<?php
include_once 'footer.php';