const cors = require('cors');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const roomRoutes = require('./routes/route'); 
const setupChat = require('./routes/chat');

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
setupChat(io);


// Start the server on the specified port
const PORT = process.env.PORT || 3001; // Ensure the backend runs on 3001
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
