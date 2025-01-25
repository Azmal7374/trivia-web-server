import express from "express";
import quizController from "./quiz.controller";
import { asyncHandler } from "../../errors/asyncHandler";

const router = express.Router();

router.post("/create", asyncHandler(quizController.createQuiz));
router.get("/:roomCode", asyncHandler(quizController.getQuizByRoomCode));

export default router;
