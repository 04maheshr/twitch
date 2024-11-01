const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
const http = require('http');
const { Server } = require('socket.io');
const setupChat = require('./chat.js');
<<<<<<< HEAD
const dotenv=require('dotenv')
dotenv.config();
=======
>>>>>>> 44999715a85ffa31bb54800f3a67be4fea329dc6

const app = express();
app.use(cors());
app.use(bodyParser.json());


<<<<<<< HEAD
const MANAGEMENT_KEY = process.env.VITE_MANAGEMENT_KEY; // Replace with your management key
const MANAGEMENT_SECRET = process.env.VITE_MANAGEMENT_SECRET
=======
const MANAGEMENT_KEY = '672119944944f067313a7f02'; // Replace with your management key
const MANAGEMENT_SECRET = 'HUNY4pS4flva6djNeHYHyUsE78Oeenb5NddYxScbMm6wiehtP13S93XOVPsAPmwb6JX_hB5IyxXryIl6V1gA1mNrWC3SqEMIOUqdpL3rrJ9s9CA-dxUfyqGv70bek5ZXBpKJ30hmr8NGe1HUXA06rZhJTixoFtlTcPNQS50mED0='; // Replace with your management secret
>>>>>>> 44999715a85ffa31bb54800f3a67be4fea329dc6

// Function to generate management token
const generateManagementToken = async () => {
  const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
  const payload = {
    access_key: MANAGEMENT_KEY,
    type: 'management',
    version: 2,
    jti: crypto.randomUUID(),
    iat: currentTime - 10, // Set issued at time to 10 seconds ago
    exp: currentTime + 864000, // Set expiration to 1 hour from now
  };

  const token = jwt.sign(payload, MANAGEMENT_SECRET, { algorithm: 'HS256' });
  console.log("Generated Token:", token);
  return token;
}

// Endpoint to create a room and return room code
app.post("/api/create-room", async (req, res) => {
  try {
    const token = await generateManagementToken();

    // Step 1: Create the room with a unique name
    const roomName = `New Room ${Date.now()}`; // Add timestamp to ensure unique room name
    const createRoomResponse = await fetch("https://api.100ms.live/v2/rooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: roomName,
<<<<<<< HEAD
        template_id: process.env.VITE_template_id, // Replace with your template ID
=======
        template_id: "672119a81f1e5e9e06836a24", // Replace with your template ID
>>>>>>> 44999715a85ffa31bb54800f3a67be4fea329dc6
      }),
    });

    if (!createRoomResponse.ok) {
      const errorDetails = await createRoomResponse.text();
      throw new Error("Failed to create rosom: " + createRoomResponse.statusText + " - " + errorDetails);
    }

    const roomData = await createRoomResponse.json();
    const roomId = roomData.id;
    console.log(`Room created with ID: ${roomId}`);

    // Step 2: Generate a unique room code with role "host"
    const roomCodeResponse = await fetch(`https://api.100ms.live/v2/room-codes/room/${roomId}/role/host`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!roomCodeResponse.ok) {
      const errorDetails = await roomCodeResponse.text();
      throw new Error("Failed to generate room code: " + roomCodeResponse.statusText + " - " + errorDetails);
    }

    const roomCodeData = await roomCodeResponse.json();
    const roomCode = roomCodeData.code;
    console.log(`Generated room code: ${roomCode}`);

    res.json({ roomCode });
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).json({ error: "Error creating room: " + error.message });
  }
});
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
<<<<<<< HEAD
    origin: process.env.VITE_URL, // Adjusted to match your frontend port
=======
    origin: 'http://localhost:5173', // Adjusted to match your frontend port
>>>>>>> 44999715a85ffa31bb54800f3a67be4fea329dc6
    methods: ['GET', 'POST']
  }
});
setupChat(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
