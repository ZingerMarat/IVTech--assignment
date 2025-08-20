// seedUsers.js
import mongoose from "mongoose"
import crypto from "crypto"
import dotenv from "dotenv"
import { User } from "../routes/auth.js"

dotenv.config()

await mongoose.connect(process.env.MONGO_URI)
console.log("Connected to DB")

const seedUsers = [
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

try {
  await User.deleteMany({})
  console.log("Old users removed")

  await User.insertMany(seedUsers)
  console.log("Users seeded successfully")

  process.exit(0)
} catch (err) {
  console.error("Error seeding users:", err)
  process.exit(1)
}
