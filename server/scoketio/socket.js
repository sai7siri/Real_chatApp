const express = require("express");
const { Server } = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: "http://localhost:5173",
  method: ["GET", "POST"],
  credentials: true,
});

const userSocketMap = {};

const getSocketUserId = (user) => {
  return userSocketMap[user];
};

io.on("connection", (socket) => {

  const userId = socket.handshake.query.userId;

  if (userId !== "undefined") {
    userSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  // disconnection users
  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

module.exports = { app, server, io, getSocketUserId };
