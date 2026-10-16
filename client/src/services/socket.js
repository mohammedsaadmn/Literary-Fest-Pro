import { io } from "socket.io-client";

const SERVER_URL =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_SERVER_URL ||
  (import.meta.env.DEV
    ? `http://${window.location.hostname}:5000`
    : "https://auction-0v6l.onrender.com");

const socket = io(SERVER_URL, {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
});

socket.on("connect", () => {
  console.log("Socket connected:", socket.id, SERVER_URL);
});

socket.on("connect_error", (error) => {
  console.error("Socket connection error:", error.message, SERVER_URL);
});

export { socket };
export default socket;