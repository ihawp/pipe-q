import { createServer } from "http";
import { Server } from "socket.io";

const server = createServer();

const io = new Server(server, {
  cors: {
    origin: "http://localhost",
    methods: ["GET", "POST"]
  }
});

io.on('connection', socket => {
  console.log('User connected:', socket.id);

  socket.on('chat message', (rec) => {
    console.log(rec.username, rec.message);
    if (rec.username.length > 0 && rec.message.length > 0) {
        io.emit('chat message', rec);
    }
  });
});

server.listen(4343, () => {
  console.log('Socket.IO server running on port 4343');
});