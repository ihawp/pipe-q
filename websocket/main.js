import { createServer } from "http";
import { Server } from "socket.io";

const server = createServer();

const io = new Server(server, {
  cors: {
    origin: "http://localhost",
    methods: ["GET", "POST"]
  }
});

let player = {
    x: 250,
    y: 250,
}

io.on('connection', socket => {
  // console.log('User connected:', socket.id);

  io.emit('player-set', player);

  socket.on('chat message', (rec) => {
    console.log(rec.username, rec.message);

    if (rec.username.length > 0 && rec.message.length > 0) {

        io.emit('chat message', rec);

    }

  });

  socket.on('player-move', (rec) => {
    player = rec;
    io.emit('player-receive', rec);
  })
});

server.listen(4343, () => {
  console.log('Socket.IO server running on port 4343');
});