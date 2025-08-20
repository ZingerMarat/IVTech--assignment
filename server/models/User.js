import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  nickname: String,
  fullName: String,
  email: { type: String, unique: true },
  password: String,
})

export default mongoose.model("User", userSchema)
