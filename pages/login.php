<?php

include_once 'backend/isLogged.php';

// Deal with errors
if (isset($_GET['error'])) {
    
    $error = cleanString($_GET['error']);

    echo '<p class="error">';

    switch ($error) {
        case 'account_doesnt_exist':
            echo 'That account does not exist.';
            break;
        case 'wrong_password':
            echo 'Incorrect Password.';
            break;
    }

    echo '</p>';

}

?>
    <header>
        <h1>Login</h1>
    </header>
    <section>
        <form action="backend/submitLogin.php" method="POST">
            <div>
                <label for="username-or-email">Username or Email:</label>
                <input type="text" name="username-or-email" autocomplete="username" id="username-or-email" placeholder="Username or Email" minlength="5" maxlength="16" required>
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" name="password" autocomplete="current-password" id="password" placeholder="Password">
            </div>

            <input type="submit" value="Login">
        </form>
    </section>