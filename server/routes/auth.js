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
  try {
    const user = await User.findOne({ email }).lean()

    if (!user) return null

    const ok = user.password === crypto.createHash("sha512").update(password).digest("hex")
    if (!ok) return null

    const { password: _, ...safeUser } = user
    return safeUser
  } catch (err) {
    console.log("Error in authenticate function:", err)
    throw err
  }
}

router.post("/login", async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await authenticate(email, password)
    if (!user) return res.status(401).json({ error: "Invalid credentials" })

    const token = jwt.sign({ email: user.email, nickname: user.nickname }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    })
    res.json({ token })
  } catch (err) {
    console.log(err)

    res.status(500).json({ error: "Login failed" })
  }
})

export function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) return res.status(401).json({ error: "No token provided" })

    const token = authHeader.split(" ")[1]

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ error: "Invalid token" })
      req.user = decoded
      next()
    })
  } catch (err) {
    console.error("Error verifying token:", err)
    throw err
  }
}

router.get("/userInfo", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).lean()

    if (!user) return res.status(404).json({ error: "User not found" })

    res.json({
      nickname: user.nickname,
      fullName: user.fullName,
      email: user.email,
    })
  } catch (err) {
    console.error("Error fetching user info:", err)
    return res.status(500).json({ error: "Internal server error" })
  }
})

export default router
