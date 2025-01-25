import categoryModel from "../category/category.model";
import roomModel from "./room.model";

class RoomService {
  // Create a new room
  async createRoom(data: { username: string; quizCategories: string[]; timer: number }) {
    const { username, quizCategories, timer } = data;

    // Generate a unique room code
    const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    // Fetch questions from the selected categories
    const categories = await categoryModel.find({ name: { $in: quizCategories } });
    const questions = categories.flatMap((category) => category.questions);

    // Create and save the room
    const room = await roomModel.create({
      roomCode,
      users: [{ username }],
      quizCategories,
      questions,
      timer,
    });

    return room;
  }

 // Join an existing room
 async joinRoom(roomCode: string, username: string) {
  const room = await roomModel.findOne({ roomCode });

  if (!room) {
    throw new Error("Room not found");
  }

  // Check if the username already exists in the room
  const userExists = room.users.some((user: { username: string }) => user.username === username);

  if (userExists) {
    throw new Error(`User "${username}" is already in the room`);
  }

  // Add the user to the room
  room.users.push({ username });
  await room.save();

  return room;
}

  async getAllRooms() {
    const rooms = await roomModel.find(); // Fetch all rooms from the database
    return rooms;
  }
}

export default new RoomService();
