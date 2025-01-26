import { Server } from "socket.io";
import categoryModel from "../category/category.model";
import roomModel from "./room.model";
// import QRCode from "qrcode"; // যদি প্রয়োজন হয়, এর সাথে কাজ করতে পারেন

class RoomService {
  private static io: Server;

  constructor(io: Server) {
    RoomService.io = io; // Initialize the static Socket.IO instance
  }

  // Create a new room
  static async createRoom(data: { username: string; quizCategories: string[]; timer: number; roomCode: string; qrCode: string }) {
    const { username, quizCategories, timer, roomCode, qrCode } = data;
  
    // Fetch questions from the selected categories
    const categories = await categoryModel.find({ name: { $in: quizCategories } });
    const questions = categories.flatMap((category) => category.questions);
  
    // Create and save the room with the provided roomCode and qrCode
    const room = await roomModel.create({
      roomCode,  // Use the roomCode passed from the frontend
      users: [{ username }],
      quizCategories,
      questions,
      timer,
      qrCode,  // Use the qrCode passed from the frontend
    });
  
    // Notify all users (optional)
    if (RoomService.io) {
      RoomService.io.emit("roomCreated", { roomCode, username });
    }

    return room;
  }

  // Join an existing room
  static async joinRoom(roomCode: string, username: string) {
    const room = await roomModel.findOne({ roomCode });

    if (!room) {
      throw new Error("Room not found");
    }

    // Check if the username already exists in the room
    const userExists = room.users.some((user) => user.username === username);
    if (userExists) {
      throw new Error("Username already exists in the room");
    }

    // Add the user to the room
    room.users.push({ username });
    await room.save();

    // Notify all users in the room about the new user
    if (RoomService.io) {
      RoomService.io.to(roomCode).emit("userJoined", { username, roomCode });
    } else {
      console.warn("Socket.IO instance is not initialized");
    }

    return room;
  }

  // Get all rooms
  static async getAllRooms() {
    const rooms = await roomModel.find(); // Fetch all rooms from the database
    return rooms;
  }

  // Static method to fetch a single room by roomCode
  static async getRoomByCode(roomCode: string) {
    try {
      // Ensure we are looking for the correct field: roomCode
      const room = await roomModel.findOne({ roomCode }); // Use roomCode instead of roomId
      return room;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error("Failed to retrieve the room: " + error.message);
      } else {
        throw new Error("Failed to retrieve the room: An unknown error occurred.");
      }
    }
  }
}

export default RoomService;
