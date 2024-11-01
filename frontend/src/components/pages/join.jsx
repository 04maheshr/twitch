import { useState, useRef } from "react";
import { useHMSActions } from "@100mslive/react-sdk";
import { ArrowRightIcon } from "@100mslive/react-icons";
import Socket from "../service/socket";

function Join() {
  const hmsActions = useHMSActions();
  const roomCodeRef = useRef(null);
  const userNameRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Function to handle joining an existing room
  const handleSubmit = async (e) => {
    e.preventDefault();
    const roomCode = roomCodeRef.current?.value;

    try {
      const authToken = await hmsActions.getAuthTokenByRoomCode({ roomCode });
      Socket.emit("joinRoom", roomCode); 
      await hmsActions.join({
        userName: userNameRef.current?.value,
        authToken,
      });
    } catch (error) {
      console.error("Error joining room:", error);
      setErrorMessage("Failed to join room. Please check the room code.");
    }
  };

  // Function to create a new room and join as the host
  const createRoom = async () => {
    setLoading(true);
    setErrorMessage(""); // Clear any previous error messages

    try {
      // Call the backend API to create the room
      const response = await fetch("http://localhost:5000/api/create-room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to create room: " + response.statusText);
      }

      const { roomCode } = await response.json();
      Socket.emit("joinRoom", roomCode);

      const authToken = await hmsActions.getAuthTokenByRoomCode({ roomCode });
      await hmsActions.join({
        userName: userNameRef.current?.value,
        authToken,
      });
    } catch (error) {
      console.error("Error creating or joining room:", error);
      setErrorMessage("Error creating or joining room: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h2 className="text-3xl font-bold text-purple-500 mb-4">Create or Join Room</h2>
      <p className="text-gray-300 mb-6">Enter your room code and name before joining</p>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-lg shadow-lg">
        <div className="input-container mb-4">
          <input
            ref={roomCodeRef}
            id="room-code"
            type="text"
            name="roomCode"
            placeholder="Your Room Code"
            required
            className="w-full p-3 rounded bg-gray-800 text-purple-500 placeholder-purple-500"
          />
        </div>
        <div className="input-container mb-6">
          <input
            required
            ref={userNameRef}
            id="name"
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full p-3 rounded bg-gray-800 text-purple-500 placeholder-purple-500"
          />
        </div>
        <button type="submit" className="w-full flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50" disabled={loading}>
          Join Now
          <ArrowRightIcon
            height={16}
            width={16}
            className="ml-2"
          />
        </button>
      </form>
    </div>
  );
}
import React, { useRef, useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom"; 
import Socket from "../service/socket" // Import the socket.io client
import TWITCHBG2 from './TWITCHBG2.jpg';

const Join = () => {
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const roomId = useRef('');
  const [error, setError] = useState(""); // State for error message
  const socketRef = useRef(); // Create a ref for the socket instance

  const handleInputChange = (e, index) => {
    const value = e.target.value;

    // Move focus to the next or previous input based on input value
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
    if (!value && index > 0) {
      inputRefs.current[index - 1].focus();
    }

    console.log(`Input ${index} changed to:`, value);

    // Update roomId based on the values of the inputs
    roomId.current = Array.from(inputRefs.current)
      .map((input) => input.value)
      .join('');
  };

  const handleKeyDown = (e, index) => {
    // Allow only alphanumeric input and Backspace
    if (!/[0-9a-zA-Z]/.test(e.key) && e.key !== "Backspace") {
      e.preventDefault();
    }
  };

  const validate = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/join", { // Corrected URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          roomId: roomId.current, 
          userName: localStorage.getItem("user_name"), // Assuming you are storing the username in localStorage
        }),
      });

      // Check if the response is okay (status in the range 200-299)
      if (response.ok) {
        const data = await response.json(); // Parse the JSON response
        console.log("Join created successfully:", data);

       
        Socket.emit("joinRoom", roomId.current); 

        navigate(`/room/${roomId.current}`); // Adjust as needed based on your URL structure
      } else {
        const errorMessage = await response.text(); // Get the error message
        console.error("Failed to join room:", errorMessage);
        setError("Room ID does not match. Please re-enter."); // Set error message
      }
    } catch (error) {
      console.error("Error joining room:", error);
      setError("An error occurred while joining the room."); // Set error message for network errors
    }
  };

  
  useEffect(() => {
    return () => {
      if (Socket) {
        Socket.disconnect();
      }
    };
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${TWITCHBG2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="p-6 rounded-lg shadow-lg" style={{ backgroundColor: '#0D120D' }}>
        <div className="flex space-x-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <input
              key={index}
              maxLength={1}
              className="w-12 h-12 text-center border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-transparent text-white"
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              style={{ color: '#FFFFFF' }}
            />
          ))}
        </div>
        <button className="bg-violet-900 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition-all mt-4" onClick={validate}>
          Join Stream
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>} {/* Display error message */}
      </div>
    </div>
  );
};


export default Join;
