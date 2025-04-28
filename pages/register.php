<?php

include_once 'backend/isLogged.php';

// Deal with errors
if (isset($_GET['error'])) {
    
    $error = cleanString($_GET['error']);

    echo '<p class="error">';

    switch ($error) {
        case 'account_already_exists':
            echo 'An account with this username or email already exists.';
            break;
        case 'missing_info':
            echo 'Registration Failed: You are missing required info.';
            break;
        case 'passwords_do_not_match':
            echo 'Passwords do not match.';
            break;
        case 'not_an_email':
            echo 'Not a valid email.';
            break;
        case 'username_length':
            echo 'Username must be between 5 and 16 characters in length.';
            break;
        case 'failed_to_register':
            echo 'Failed to Register. This is likely a server error.';
            break;
        case 'preg_match':
            echo 'There was an issue with the formatting of your username.
                  Usernames should use uppercase or lowercase letters, and numbers.';
            break;
    }

    echo '</p>';

}

?>

    <header>
        <h1>Register</h1>
    </header>
    <section>
        <form action="backend/submitRegister.php" method="POST">
            <div>
                <label for="username">Username:</label>
                <input type="text" name="username" pattern="^[A-Za-z0-9]+$" autocomplete="username" id="username" placeholder="Username" minlength="5" maxlength="16" required>
            </div>    
            <div>
                <label for="email">Email:</label>
                <input type="Email" name="email" autocomplete="email" id="email" placeholder="Email" required>
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" name="password" autocomplete="new-password" id="password" placeholder="Password" required>
            </div>
            <div>
                <label for="passwordAgain">Password (again):</label>
                <input type="password" name="passwordAgain" autocomplete="new-password" id="passwordAgain" placeholder="Password (again)" required>
            </div>

            <input type="submit" value="Submit">

        </form>
    </section>