const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const clients = {}; // Store connected remote hosts

io.on("connection", (socket) => {
  console.log("New connection:", socket.id);

  // Identify if it's a remote machine
  socket.on("register", (hostId) => {
    clients[hostId] = socket;
    console.log(`Remote host registered: ${hostId}`);
  });

  // Forward screen data from remote host to the client
  socket.on("screen-data", (data) => {
    io.emit("screen-update", data);
  });

  // Forward control commands to the remote host
  socket.on("control", ({ hostId, action, payload }) => {
    if (clients[hostId]) {
      clients[hostId].emit(action, payload);
    }
  });

  socket.on("disconnect", () => {
    console.log("Disconnected:", socket.id);
    for (const [hostId, client] of Object.entries(clients)) {
      if (client.id === socket.id) {
        delete clients[hostId];
      }
    }
  });
});

server.listen(3001, () => console.log("Server running on port 3001"));
