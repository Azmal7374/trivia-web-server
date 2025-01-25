import mongoose, { Schema, Document } from "mongoose";
import { Quiz } from "./quiz.interface";

// Define the Mongoose schema for Quiz
const quizSchema = new Schema(
  {
    name: { type: String, required: true },
    roomCode: { type: String, required: true, unique: true },
    selectedQuizzes: { type: [String], required: true },
    timer: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }, // Automatically set createdAt if not provided
  },
  {
    timestamps: true, // Optional: This will automatically add createdAt and updatedAt
  }
);

// Create the Mongoose model
const QuizModel = mongoose.model<Quiz & Document>("Quiz", quizSchema);

export default QuizModel;
