const cors = require('cors');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const roomRoutes = require('./routes/route'); 

const app = express();
app.use(express.json());
app.use(cors());

// Use routes for handling room-related REST APIs
app.use('/api', roomRoutes); 

// Create an HTTP server and bind WebSocket to it
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Adjusted to match your frontend port
    methods: ['GET', 'POST']
  }
});

// Handle WebSocket connections and room events
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Join a room
  socket.on('joinRoom', (room) => {
    console.log(`Received joinRoom event with room: ${room}`);
    socket.currentRoom = room;
    socket.join(room);
    console.log(`User ${socket.id} joined room ${room}`);
    socket.to(room).emit('message', `User ${socket.id} has joined the room.`);
});

socket.on('sendMessage', (message) => {
    const room = socket.currentRoom; // Retrieve the room from the socket
    if (room) {
        console.log(`Message from ${socket.id} in room ${room}: ${message}`);
        io.to(room).emit('clientMessage', message);
    } else {
        console.log(`User ${socket.id} is not in a room.`);
    }
});


  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Start the server on the specified port
const PORT = process.env.PORT || 3001; // Ensure the backend runs on 3001
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
