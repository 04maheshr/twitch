import { io } from "socket.io-client";

const Socket = io("http://localhost:4000");

export default Socket;