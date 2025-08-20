import express from "express"
import { users, verifyToken } from "./auth.js"

const router = express.Router()

const questions = [
  {
    id: 1,
    authorEmail: "john@example.com",
    authorNickname: "johnny",
    title: "Как работает замыкание в JS?",
    body: "Поясните простыми словами...",
    tags: ["javascript"],
    createdAt: Date.now(),
  },
]

const answers = [
  {
    id: 1,
    questionId: 1,
    authorEmail: "sally@example.com",
    authorNickname: "sally",
    body: "Замыкание — это...",
    createdAt: Date.now(),
  },
]

let qId = 2
let aId = 2
const nextQId = () => qId++
const nextAId = () => aId++

function createQuestion({ authorEmail, authorNickname, title, body, tags }) {
  const q = {
    id: nextQId(),
    authorEmail,
    authorNickname,
    title,
    body,
    tags,
    createdAt: Date.now(),
  }
  questions.push(q)
  return q
}

function createAnswer({ questionId, authorEmail, authorNickname, body }) {
  const a = {
    id: nextAId(),
    questionId: Number(questionId),
    authorEmail,
    authorNickname,
    body,
    createdAt: Date.now(),
  }
  answers.push(a)
  return a
}

router.post("/createQuestion", verifyToken, (req, res) => {
  const { title, body, tags } = req.body
  if (!title || !body || !tags.length === 0) {
    return res.status(400).json({ error: "All fields are required" })
  }
  const q = createQuestion({
    authorEmail: req.user.email,
    authorNickname: req.user.nickname,
    title,
    body,
    tags,
  })
  res.json(q)
})

router.get("/getQuestions", verifyToken, (req, res) => {
  res.json(questions)
})

router.get("/getQuestionAnswers/:id", verifyToken, (req, res) => {
  const { id } = req.params
  const ans = answers.filter((an) => an.questionId === Number(id))
  res.json(ans)
})

router.post("/answer/:id", verifyToken, (req, res) => {
  const { id } = req.params
  const user = req.user
  const { body } = req.body
  const answer = createAnswer({ questionId: id, authorEmail: user.email, authorNickname: user.nickname, body })
  res.json(answer)
})

export default router
