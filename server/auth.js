import express from "express"
import jwt from "jsonwebtoken"
import crypto from "crypto"

const router = express.Router()

const JWT_SECRET = "supersecretkey"
const JWT_EXPIRES_IN = "1h"

// Hardcoded users
export const users = [
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

function authenticate(email, password) {
  const hash = crypto.createHash("sha512").update(password).digest("hex")
  return users.find((u) => u.email === email && u.password === hash)
}

export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).json({ error: "No token provided" })
  const token = authHeader.split(" ")[1]
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token" })
    req.user = decoded
    next()
  })
}

router.post("/login", (req, res) => {
  const { email, password } = req.body
  const user = authenticate(email, password)
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" })
  }
  const token = jwt.sign({ email: user.email, nickname: user.nickname }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
  res.json({ token })
})

router.get("/userInfo", verifyToken, (req, res) => {
  const user = users.find((u) => u.email === req.user.email)
  if (!user) return res.status(404).json({ error: "User not found" })
  res.json({ nickname: user.nickname, fullName: user.fullName, email: user.email })
})

export default router
