<?php

?>


<header>
    <h1>Chat</h1>
</header>
<section>
    <a href="../chat"><- Back</a>
</section>
<section>
        <form id="formSubmit">
            <input type="text">
            <button type="submit">Submit</button>
        </form>
    </section>
    <section id="messageOut"></section>
    <section id="otherUsers">
        <?php

        // select past messages

        include_once 'backend/db_conn.php';

        $query = $conn->prepare('SELECT * FROM messages WHERE sender = ? AND receiver = ? OR receiver = ? AND sender = ?');

        // checking for chat username
        $checkURLForChat = explode('/', $location);

        if ($checkURLForChat[2] === 'chat') {
            $location = PREPEND . 'chat';
        }

        $query->bind_param('ssss', $_SESSION['username'], $checkURLForChat[3], $_SESSION['username'], $checkURLForChat[3]);

        try {
            if ($query->execute()) {
                $result = $query->get_result();
                if ($result->num_rows > 0) {
                    while ($row = $result->fetch_assoc()) {
                        var_dump($row);
                    }
                } else {
                    echo 'No Chats';
                }
                
            }
        } catch (E) {
            echo 'content unable to load';
        }

        ?>
    </section>
    <script src="http://localhost:4343/socket.io/socket.io.js"></script>
    <script>
    const socket = io('http://localhost:4343/<?= $checkURLForChat[3] ?>', {
        withCredentials: true,
    });

    let formSubmit = document.getElementById('formSubmit');
    const username = "<?= $_SESSION['username'] ?>";

    socket.on('connect', () => {

        let formSubmit = document.getElementById('formSubmit');

        formSubmit.addEventListener('submit', function(event) {
            event.preventDefault();

            let input = event.target[0];

            socket.emit('chat message', { username: username, message: input.value });
            input.value = '';
        });

    });

    socket.on('chat message', (rec) => {
        let chat = `
            <div class="chat">
                <span class="username">${rec.username}: </span>
                <span class="message">${rec.message}</span>
            </div>
        `;

        messageOut.innerHTML += chat;
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