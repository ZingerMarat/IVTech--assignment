import express from "express"
import { verifyToken } from "../middleware/auth.js"
import {
  getQuestionAnswers,
  createQuestion,
  getQuestions,
  answerQuestion,
} from "../controllers/qaController.js"

const router = express.Router()

router.get("/getQuestions", verifyToken, getQuestions)
router.post("/createQuestion", verifyToken, createQuestion)
router.get("/getQuestionAnswers/:id", verifyToken, getQuestionAnswers)
router.post("/answer/:id", verifyToken, answerQuestion)

export default router
