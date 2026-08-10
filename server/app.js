const http = require("http");
const { Server } = require("socket.io");
const teamRoutes = require("./routes/teamRoutes");
const express = require("express");
const cors = require("cors");

// Deployment Config: Load environment variables from .env file for local development / Render deployment
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();
const server = http.createServer(app);

// Deployment Config: Dynamic CORS setup to support production frontend domain via CLIENT_URL env variable while maintaining local dev support
const allowedOrigins = process.env.CLIENT_URL
  ? [process.env.CLIENT_URL, "http://localhost:5173", "http://localhost:3000"]
  : "*";

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

// Deployment Config: Configure Socket.IO CORS to allow production client domain or local dev fallback
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true
  }
});

let latestAuctionState = null;

io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Send latest cached state to newly connected client immediately
  if (latestAuctionState) {
    socket.emit("SYNC_STATE", latestAuctionState);
  }

  socket.on("SYNC_STATE", (payload) => {
    latestAuctionState = payload;
    // Broadcast updated auction state to all connected clients
    io.emit("SYNC_STATE", payload);
  });

  socket.on("PLACE_BID", (payload) => {
    if (
      !payload ||
      typeof payload.teamId === "undefined" ||
      typeof payload.amount !== "number" ||
      isNaN(payload.amount) ||
      payload.amount <= 0
    ) {
      return;
    }
    // Relay place bid event to all clients (including Auction.jsx operator)
    io.emit("PLACE_BID", payload);
  });

  socket.on("REQUEST_SYNC", () => {
    if (latestAuctionState) {
      socket.emit("SYNC_STATE", latestAuctionState);
    }
    // Request fresh state from operator if online
    socket.broadcast.emit("REQUEST_SYNC");
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

app.use("/api/teams", teamRoutes);

app.get("/", (req, res) => {
    res.send("LiteraryFest Pro API is Running...");
});

// Deployment Config: Render automatically assigns process.env.PORT dynamically in production; defaults to 5000 locally
const PORT = process.env.PORT || 5000;

// Deployment Config: Connect to MongoDB Atlas via process.env.MONGO_URI before launching HTTP server
connectDB().then(() => {
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});