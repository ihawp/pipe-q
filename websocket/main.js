import { createServer } from "http";
import { Server } from "socket.io";
import session from "express-session";

import jwt from 'jsonwebtoken';

const server = createServer();

const io = new Server(server, {
  cors: {
    origin: "http://localhost",
    methods: ["GET", "POST"],
    credentials: true,
  }
});

function parseCookies(cookieHeader) {
  const cookies = {};
  if (!cookieHeader) return cookies;

  cookieHeader.split(';').forEach(cookie => {
    const [name, ...rest] = cookie.trim().split('=');
    cookies[name] = decodeURIComponent(rest.join('='));
  });

  return cookies;
}

io.use((socket, next) => {


  const cookieHeader = socket.handshake.headers.cookie;
  const cookies = parseCookies(cookieHeader);
  const token = cookies['jwt'];


  if (!token) {
      return next(new Error('Authentication error: No token provided'));
  }

  try {
      const decoded = jwt.verify(token, 'this_is_a_secret');
      socket.decoded = decoded;
      next();
  } catch (err) {
      next(new Error('Authentication error: Invalid token'));
  }
});

io.on('connection', socket => {

  console.log(socket.decoded);
  // console.log('User connected:', socket.id);

  socket.on('chat message', (rec) => {

    if (rec.username.length > 0 && rec.message.length > 0) {

        io.emit('chat message', rec);

    }

  });
});

server.listen(4343, () => {
  console.log('Socket.IO server running on port 4343');
});