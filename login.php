<?php


// deal with login

?>


<form action="backend/submitLogin.php" method="POST">
    <div>
        <label for="username-or-email">Username or Email:</label>
        <input type="text" name="username-or-email" id="username-or-email" placeholder="Username or Email">
    </div>
    <div>
        <label for="password">Password:</label>
        <input type="password" name="password" id="password" placeholder="Password">
    </div>

    <input type="submit" value="Login">
</form>