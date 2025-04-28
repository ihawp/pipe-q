<?php

include 'backend/notIsLogged.php';

?>


<header>
    <h1>Chat</h1>
</header>
<section id="messageOut"></section>
<section id="otherUsers">
<?php

        // show users that exists to message!

        include_once 'backend/db_conn.php';

        $query = $conn->prepare('SELECT * FROM users LIMIT 25');

        try {
            if ($query->execute()) {
                $result = $query->get_result();
                if ($result->num_rows > 0) {
                    while ($row = $result->fetch_assoc()) {
                        if ($row['username'] !== $_SESSION['username']) {
                            echo '<a href="./chat/'.$row['username'].'" title="" aria-label="">'.$row['username'].'</a>';
                        }
                    }
                } else {
                    echo 'No Users!!!';
                }
                
            }
        } catch (E) {
            echo 'content unable to load';
        }

?>
</section>
<script src="http://localhost:4343/socket.io/socket.io.js"></script>
<script>
    const socket = io('http://localhost:4343', {
        withCredentials: true,
    });

    // --------------------------------------------------------------
    // Error handling:
    // Message is sent from ../websocket/main.js and is responded to here

    socket.on('error', (rec) => {
        console.log(rec);
        // error handling!
    });

    socket.on('alert', (rec) => {
        alert(rec);
    });


</script>