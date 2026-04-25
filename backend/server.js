import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./utils/db.js";
import authRoutes from "./routes/authRoutes.js";
import conversationRoutes from "./routes/conversationRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { initializeSocket } from "./socket.js";
import { socketAuthMiddleware } from "./socket/socketAuthMiddleware.js";

const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  },
});

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/conversations", messageRoutes);

io.use(socketAuthMiddleware);
initializeSocket(io);

async function startServer() {
  try {
    await connectDB();
    const port = process.env.PORT || 4000;
    httpServer.listen(port, () => console.log(`server run in port ${port}`));
  } catch (err) {
    console.log("The server is Failed to start");
    process.exit(1);
  }
}

startServer();
