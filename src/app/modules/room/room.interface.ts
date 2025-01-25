import { Document } from "mongoose";
import { Question } from "../category/category.model";

export interface Room extends Document {
  roomCode: string;
  users: { username: string }[];
  quizCategories: string[]; // Array of selected category names
  questions: Question[]; // Collected questions from categories
  timer: number;
  createdAt: Date;
}
