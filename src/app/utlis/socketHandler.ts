/* eslint-disable no-console */
import { Server, Socket } from "socket.io";
import roomModel from "../modules/room/room.model";

const activeRooms: Record<string, Set<string>> = {};

const socketHandler = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("New client connected:", socket.id);

    // User joins a room
    socket.on("joinRoom", async ({ roomCode, username }) => {
      try {
        // Check if the room exists
        const room = await roomModel.findOne({ roomCode });
        if (!room) {
          socket.emit("error", { message: "Room does not exist!" });
          return;
        }

        // Add user to the room
        if (!activeRooms[roomCode]) {
          activeRooms[roomCode] = new Set();
        }
        activeRooms[roomCode].add(username);

        socket.join(roomCode);

        // Notify other users
        io.to(roomCode).emit("userJoined", {
          username,
          users: Array.from(activeRooms[roomCode]),
        });

        console.log(`${username} joined room ${roomCode}`);
      } catch (error) {
        if (error instanceof Error) {
          socket.emit("error", { message: error.message });
        } else {
          socket.emit("error", { message: "An unknown error occurred." });
        }
      }
    });

    // Handle sending messages
    socket.on("sendMessage", ({ roomCode, username, message }) => {
      const payload = { username, message, timestamp: new Date() };
      io.to(roomCode).emit("receiveMessage", payload);
      console.log(`Message from ${username} in room ${roomCode}: ${message}`);
    });

    // User disconnects
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
      for (const [roomCode, users] of Object.entries(activeRooms)) {
        if (users.has(socket.id)) {
          users.delete(socket.id);
          io.to(roomCode).emit("userLeft", { username: socket.id });
          console.log(`User ${socket.id} left room ${roomCode}`);
        }
      }
    });
  });
};

export default socketHandler;
