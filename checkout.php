<?php

session_start();

include_once 'backend/notIsLogged.php';

include_once 'html/head.html';
include_once 'html/header.html';

?>

    <header>
        <h1>Checkout</h1>
    </header>
    <section>
        <div id="payment-request-button"></div>
    </section>


<?php

include_once 'html/footer.html';

?>