import express from "express"
import cors from "cors"
import authRoutes from "./auth.js"
import qaRoutes from "./qa.js"

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
