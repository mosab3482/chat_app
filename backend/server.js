require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
const connectDB = require("./utils/db.js");
const app = express();
const httpServer = http.createServer(app);

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  }),
);
app.use(cookieParser());

try {
  await connectDB();
  const port = process.env.PORT || 4000;
  httpServer.listen(port, () => console.log(`server run in port ${port}`));
} catch (err) {
  console.log("The server is Failed to start");
  process.exit(1);
}
