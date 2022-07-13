import express from "express";
import path from "path";
import { v4 as uuid } from "uuid";
import { Server as WebSocketServer } from "socket.io";
import http from "http";
const app = express();
const httpServer = http.createServer(app);
let notes = [];
const io = new WebSocketServer(httpServer);
io.on("connection", (socket) => {
  socket.emit("server:loadNotes", notes);

  socket.on("client:newnote", (data) => {
    const note = { ...data, id: uuid() };
    notes.push({ note });
    socket.emit("server:newnote", note);
  });
  socket.on("client:deletenote", (id) => {
    notes = notes.filter((note) => note.id !== id);
    socket.emit("server:loadNotes", notes);
  });
});
app.use(express.static(path.join(__dirname, "public")));

httpServer.listen(3000);
console.log("Server running on port", 3000);
