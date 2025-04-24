import { createServer } from "http";
import { Server } from "socket.io";
import session from "express-session";
import jwt from 'jsonwebtoken';


// Us
import { htmlspecialchars, trim, stripslashes } from "./functions.js";


const PORT = 4343;


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

// Create /chat route (not really required, but for ease of reading, and possilbility of more channels later)
const chat = io.of('/chat');

// Use Authentication(...) middleware to verify users JWT token
chat.use((socket, next) => Authentication(socket, next));

// Prototype Pattern
const defaultUserSession = {
  id: null,
  chatRoom: null,
  role: 'guest',
  time: Date.now(),
  permissions: [], // shared unless cloned
};


// Logic for naming rooms that cannot be copied accidentally (because of DB rules restricting usernames).
function getChatName(username, receiver) {
  return receiver > username ? receiver + username : username + receiver; 
}

chat.on('connection', socket => {

  // Do error handling of potentially passed Error from next() call in Authentication
  // Included in this connection call via .use() on line 57
  // Make error happen by setting cookie php with no token.
  console.log(socket);

  const userSession = structuredClone(defaultUserSession);
  /*
  userSession.id = socket.id;
  socket.session = userSession;
  */

  socket.on('joinRoom', (receiver) => {

    const roomName = getChatName(socket.decoded.username, receiver);

    socket.join(roomName);
  });

  socket.on('chat message', async (rec) => {

    console.log(rec);

    console.log(socket.decoded.username);

    if (rec.username.length >= 5 && rec.username.length <= 16 && rec.message.length > 0 && rec.username == socket.decoded.username) {
      
      rec.message = htmlspecialchars(trim(stripslashes(rec.message)));

      const roomName = rec.receiver > socket.decoded.username ? rec.receiver + socket.decoded.username : socket.decoded.username + rec.receiver; 

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

server.listen(PORT);