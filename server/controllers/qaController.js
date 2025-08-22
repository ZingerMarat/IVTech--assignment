import { verifyToken } from "../middleware/auth.js"
import Question from "../models/Question.js"
import Answer from "../models/Answer.js"

export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find()

    res.json(questions)
  } catch (err) {
    console.error("Error fetching questions:", err)
    return res.status(500).json({ error: "Internal server error" })
  }
}

//router.post("/createQuestion", verifyToken, async (req, res) => {
export const createQuestion = async (req, res) => {
  try {
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
  } catch (err) {
    console.error("Error creating questions:", err)
    return res.status(500).json({ error: "Internal server error" })
  }
}

export const getQuestionAnswers = async (req, res) => {
  try {
    const { id } = req.params
    const questionAnswers = await Answer.find({ questionId: id })

    res.json(questionAnswers)
  } catch (err) {
    console.error("Error fetching question answers:", err)
    return res.status(500).json({ error: "Internal server error" })
  }
}

export const answerQuestion = async (req, res) => {
  try {
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
  } catch (err) {
    console.error("Error answering question:", err)
    return res.status(500).json({ error: "Internal server error" })
  }
}
