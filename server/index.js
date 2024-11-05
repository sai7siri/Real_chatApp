const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRouter = require("./routes/authRoutes");
const chatRouter = require("./routes/chatRoutes");
const {app , server} = require('./scoketio/socket');


  // const app = express();

// Middlewares
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v2/chat", chatRouter);

// Port connection
const port = process.env.PORT || 3030;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Mongoose connection
mongoose.connect(process.env.MONGO_URL).then(
  () => console.log("Mongoose connected"),
  () => console.log("Connection failed or network error:")
);
