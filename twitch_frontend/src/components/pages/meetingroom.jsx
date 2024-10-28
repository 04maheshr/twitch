import { useState, useEffect } from "react";
import { FaVideo, FaDesktop } from "react-icons/fa";
import Chatbox from "../chatbox";
import { useParams } from "react-router-dom";
import Socket from "../../service/socket"; // Import socket.io-client

const MeetingRoom = () => {
  const { roomId } = useParams();

  useEffect(() => {
    // Establish socket connection
    Socket.connect();

    const createRoomFun = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/createroom", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            roomId: roomId,
            userName: localStorage.getItem("user_name"),
          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log("Room created successfully:", data);

        // Join the room after successfully creating it
        Socket.emit("joinRoom", roomId);

      } catch (error) {
        console.error("Error creating room:", error);
        alert(`Failed to create room: ${error.message}`); // Provide specific error message
      }
    };

    createRoomFun(); 

    // Cleanup function to disconnect the socket
    return () => {
      if (Socket.connected) {
        Socket.disconnect();
      }
    };
  }, [roomId]); 

  return (
    <div>
      <Chatbox /> 
    </div>
  );
};

export default MeetingRoom;

