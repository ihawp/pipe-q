<?php

if (isLogged()) {
    ?>

    <header>
        <nav>
            <ul>
                <li>
                    <a href="./home" title="">Home</a>
                </li>
                <li>
                    <a href="./logout" title="">Logout</a>
                </li>
            </ul>
        </nav>
    </header>
    <main>

    <?php
} else {
    ?>

    <header>
        <nav>
            <ul>
                <li>
                    <a href="./home" title="Home">Home</a>
                </li>
                <li>
                    <a href="./login" title="Login">Login</a>
                </li>
                <li>
                    <a href="./register" title="Register">Register</a>
                </li>
            </ul>
        </nav>
    </header>
    <main>

    <?php
}