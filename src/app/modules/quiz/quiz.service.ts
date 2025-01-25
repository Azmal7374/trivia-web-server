import { Quiz } from "./quiz.interface";
import QuizModel from "./quiz.model";

class QuizService {
  // Create a new quiz room
  async createQuiz(quizData: Quiz): Promise<Quiz> {
    const quiz = new QuizModel(quizData);
    return await quiz.save();
  }

  // Get quiz by room code
  async getQuizByRoomCode(roomCode: string): Promise<Quiz | null> {
    return await QuizModel.findOne({ roomCode });
  }
}

export default new QuizService();
