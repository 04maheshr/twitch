import { useState, useEffect } from "react";
import { FaVideo, FaDesktop } from "react-icons/fa";
import Chatbox from "../chatbox";
import { useParams, useNavigate, useLocation } from "react-router-dom"; 
import Socket from "../../service/socket"; 

const MeetingRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate(); 
  const location = useLocation(); 

  useEffect(() => {
    const handleBeforeUnload = () => {
      
      if (location.pathname.includes('/room')) {
        navigate('/join');
      }
    };
    // postapne measn back arrow in chrome 
    window.addEventListener('popstate', handleBeforeUnload);

   
    return () => {
      window.removeEventListener('popstate', handleBeforeUnload);
    };
  }, [navigate, location]);

  useEffect(() => {
    Socket.connect();
    console.log('Socket initialized:', Socket.id);

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
        alert(`Failed to create room: ${error.message}`);
      }
    };

    createRoomFun(); 

    // Cleanup function to disconnect the socket when component unmounts
    return () => {
      if (Socket && Socket.connected) {
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
