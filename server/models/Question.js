import mongoose from "mongoose"

const questionSchema = new mongoose.Schema({
  authorEmail: String,
  authorNickname: String,
  title: String,
  body: String,
  tags: [String],
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("Question", questionSchema)
