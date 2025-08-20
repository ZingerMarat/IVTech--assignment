import mongoose from "mongoose"

const questionSchema = new mongoose.Schema({
  authorEmail: { type: String, required: true },
  authorNickname: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  tags: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("Question", questionSchema)
