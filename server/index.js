const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');

const authRouter = require("./routes/authRoutes");
const chatRouter = require("./routes/chatRoutes");
const {app , server} = require('./scoketio/socket');



  // const app = express();

  // Port connection
  const port = process.env.PORT || 3030;

  const _dirname = path.resolve();



// Middlewares
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  allowedHeaders : ['Content-Type', 'Authorization'],
  credentials: true
}));

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v2/chat", chatRouter);


app.use(express.static(path.join(_dirname , "/frontend/dist")))
app.get( '*', (_, res)=>{
  res.sendFile(path.resolve(_dirname , "frontend" , "dist" , "index.html"));
} )






server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Mongoose connection
mongoose.connect(process.env.MONGO_URL).then(
  () => console.log("Mongoose connected"),
  () => console.log("Connection failed or network error:")
);
