import express from "express"
import { verifyToken } from "./auth.js"
import Question from "../models/Question.js"
import Answer from "../models/Answer.js"

const router = express.Router()

router.get("/getQuestions", verifyToken, async (req, res) => {
  const questions = await Question.find()
  console.log(questions)

  res.json(questions)
})

router.post("/createQuestion", verifyToken, async (req, res) => {
  const { title, body, tags } = req.body

  if (!title || !body || !tags.length === 0) {
    return res.status(400).json({ error: "All fields are required" })
  }

  const newQ = await Question.create({
    authorEmail: req.user.email,
    authorNickname: req.user.nickname,
    title,
    body,
    tags,
  })

  res.json(newQ)
})

router.get("/getQuestionAnswers/:id", verifyToken, async (req, res) => {
  const { id } = req.params
  const questionAnswers = await Answer.find({ questionId: id })

  res.json(questionAnswers)
})

router.post("/answer/:id", verifyToken, async (req, res) => {
  const { id } = req.params
  const user = req.user
  const { body } = req.body

  const newA = await Answer.create({
    questionId: id,
    authorEmail: req.user.email,
    authorNickname: req.user.nickname,
    body,
  })

  res.json(newA)
})

export default router
