import express from "express"
import { login, getUserInfo } from "../controllers/authController.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

router.post("/login", login)
router.get("/userInfo", verifyToken, getUserInfo)

export default router
