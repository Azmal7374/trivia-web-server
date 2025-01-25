import mongoose, { Schema } from "mongoose";
import { Room } from "./room.interface";

const roomSchema = new Schema<Room>({
  roomCode: { type: String, required: true, unique: true },
  users: [{ username: { type: String, required: true } }],
  quizCategories: [{ type: String, required: true }], // Category names
  questions: [
    {
      question: { type: String, required: true },
      options: [{ type: String, required: true }],
      correctAnswer: { type: String, required: true },
    },
  ],
  timer: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<Room>("Room", roomSchema);
