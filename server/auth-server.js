import express from "express"
import jwt from "jsonwebtoken"
import crypto, { verify } from "crypto"
import cors from "cors"
import { error } from "console"

const app = express()
app.use(express.json())

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
)

const JWT_SECRET = "supersecretkey"
const JWT_EXPIRES_IN = "1h"

// Hardcoded users
const users = [
  {
    nickname: "johnny",
    fullName: "John Doe",
    email: "john@example.com",
    password: crypto.createHash("sha512").update("password123").digest("hex"),
  },
  {
    nickname: "sally",
    fullName: "Sally Smith",
    email: "sally@example.com",
    password: crypto.createHash("sha512").update("qwerty456").digest("hex"),
  },
]

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

function authenticate(email, password) {
  const hash = crypto.createHash("sha512").update(password).digest("hex")
  return users.find((u) => u.email === email && u.password === hash)
}

app.post("/login", (req, res) => {
  const { email, password } = req.body
  const user = authenticate(email, password)

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" })
  }

  const token = jwt.sign({ email: user.email, nickname: user.nickname }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
  res.json({ token })
})

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).json({ error: "No token provided" })

  const token = authHeader.split(" ")[1]
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token" })
    req.user = decoded
    next()
  })
}

app.get("/userInfo", verifyToken, (req, res) => {
  const user = users.find((u) => u.email === req.user.email)
  if (!user) return res.status(404).json({ error: "User not found" })
  res.json({ nickname: user.nickname, fullName: user.fullName, email: user.email })
})

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

app.post("/createQuestion", verifyToken, (req, res) => {
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

  console.log(questions)
})

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

app.get("/getQuestions", verifyToken, (req, res) => {
  const list = questions
  res.json(list)
})

app.get("/getQuestionAnswers/:id", verifyToken, (req, res) => {
  const { id } = req.params
  const ans = answers.filter((an) => an.questionId === Number(id))
  res.json(ans)
})

app.post("/answer/:id", verifyToken, (req, res) => {
  const { id } = req.params
  const user = req.user
  const { body } = req.body

  const answer = createAnswer({ questionId: id, authorEmail: user.email, authorNickname: user.nickname, body })
  res.json(answer)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
