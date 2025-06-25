const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  console.log("🟢 Nuovo client connesso:", socket.id);

  socket.on("send_answer", (data) => {
    console.log("📩 Risposta ricevuta:", data);
    io.emit("new_answer", data);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnesso:", socket.id);
  });
});

app.get("/", (req, res) => {
  res.send("Backend real-time attivo!");
});

server.listen(5000, () => {
  console.log("✅ Server backend in ascolto su porta 5000");
});
