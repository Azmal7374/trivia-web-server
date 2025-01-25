/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import quizService from "./quiz.service";

// Define your controller functions as async
class QuizController {
  // Create a new quiz room
  async createQuiz(req: Request, res: Response) {
    try {
      const validatedData = req.body; // Assuming validation has been done already
      const quiz = await quizService.createQuiz(validatedData);
      res.status(201).json(quiz);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : "Error occurred" });
    }
  }

  // Get quiz by room code
  async getQuizByRoomCode(req: Request, res: Response) {
    try {
      const { roomCode } = req.params;
      const quiz = await quizService.getQuizByRoomCode(roomCode);
      if (!quiz) {
        return res.status(404).json({ error: "Quiz room not found" });
      }
      res.status(200).json(quiz);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new QuizController();
