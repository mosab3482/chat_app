import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import connectDB from "./utils/db.js";
import authRoutes from "./routes/authRoutes.js";
const app = express();
const httpServer = http.createServer(app);

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  }),
);
app.use(cookieParser());

app.use("/api/auth", authRoutes);

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
