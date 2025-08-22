import express from "express"
import cors from "cors"
import authRoutes from "./routes/auth.js"
import qaRoutes from "./routes/qa.js"

import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB not connected:", err.message))

const app = express()

app.use(express.json())

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
)

app.use(authRoutes)
app.use(qaRoutes)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
