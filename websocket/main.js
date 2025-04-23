import { createServer } from "http";
import { Server } from "socket.io";
import session from "express-session";

import { htmlspecialchars, trim, stripslashes } from "./functions.js";

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

function Authentication(socket, next) {
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
}

const chat = io.of('/chat');

chat.use((socket, next) => Authentication(socket, next));

chat.on('connection', socket => {

  socket.on('joinRoom', (receiver) => {
    let roomName = `${socket.decoded.username}_${receiver}`;
    if (receiver > socket.decoded.username) {
      roomName = `${receiver}_${socket.decoded.username}`;
    }
    socket.join(roomName);
  });

  socket.on('chat message', async (rec) => {

    console.log(rec);

    console.log(socket.decoded.username);

    if (rec.username.length >= 5 && rec.username.length <= 16 && rec.message.length > 0 && rec.username == socket.decoded.username) {
      
      rec.message = htmlspecialchars(trim(stripslashes(rec.message)));

      let roomName = `${socket.decoded.username}_${rec.receiver}`;
      if (rec.receiver > socket.decoded.username) {
        roomName = `${rec.receiver}_${socket.decoded.username}`;
      }

      console.log(roomName);

      chat.to(roomName).emit('chat message', rec);

      /*
      let response = await fetch('http://localhost/pipe-q/backend/sendMessageToDB.php', {
        method: 'POST',
        body: JSON.stringify(rec),
      });
      if (response) {
        let data = await response.json();
        console.log(data);

        if (data) {
          console.log(data);
        }
      }
        */

    } else {
      socket.emit('error', 'there was an error');
    }

  });

});

server.listen(4343, () => {
  console.log('Socket.IO server running on port 4343');
});