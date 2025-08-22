import jwt from "jsonwebtoken"
import crypto from "crypto"
import User from "../models/User.js"

import dotenv from "dotenv"
dotenv.config()

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

export const login = async (req, res) => {
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
}

export const getUserInfo = async (req, res) => {
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
}
