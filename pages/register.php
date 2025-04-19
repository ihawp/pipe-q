<?php

include_once 'backend/isLogged.php';

include_once 'html/head.html';
include_once 'html/NL-header.html';

?>

    <header>
        <h1>Register</h1>
    </header>
    <section>
        <form action="backend/submitRegister.php" method="POST">
            <div>
                <label for="username">Username:</label>
                <input type="text" name="username" id="username" placeholder="Username">
            </div>    
            <div>
                <label for="email">Email:</label>
                <input type="Email" name="email" id="email" placeholder="Email">
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" name="password" id="password" placeholder="Password">
            </div>
            <div>
                <!-- Could entirely remove this functionality -->
                <label for="passwordAgain">Password (again):</label>
                <input type="password" name="passwordAgain" id="passwordAgain" placeholder="Password (again)">
            </div>

            <input type="submit" value="Submit">

        </form>
    </section>
<?php

include_once 'html/NL-footer.html';