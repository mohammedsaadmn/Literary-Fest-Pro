import { io } from "socket.io-client";

// Deployed Render backend URL with VITE_API_URL / VITE_SERVER_URL support and local development fallback
const SERVER_URL =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_SERVER_URL ||
  (import.meta.env.DEV
    ? (typeof window !== "undefined"
        ? `http://${window.location.hostname}:5000`
        : "http://localhost:5000")
    : "https://auction-0v6l.onrender.com");

export const socket = io(SERVER_URL, {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
});

export default socket;
