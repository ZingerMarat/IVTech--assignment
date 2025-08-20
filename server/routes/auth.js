import express from "express"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import mongoose from "mongoose"
import User from "../models/User.js"

import dotenv from "dotenv"
dotenv.config()

const router = express.Router()

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = "1h"

async function authenticate(email, password) {
  const user = await User.findOne({ email }).lean()

  if (!user) return null

  const ok = user.password === crypto.createHash("sha512").update(password).digest("hex")
  return ok ? user : null
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

router.post("/login", async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await authenticate(email, password)
    if (!user) return res.status(401).json({ error: "Invalid credentials" })

    const token = jwt.sign({ email: user.email, nickname: user.nickname }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
    res.json({ token })
  } catch (err) {
    console.log(err)

    res.status(500).json({ error: "Login failed" })
  }
})

router.get("/userInfo", verifyToken, async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).lean()

  if (!user) return res.status(404).json({ error: "User not found" })

  res.json({
    nickname: user.nickname,
    fullName: user.fullName,
    email: user.email,
  })
})

export default router
