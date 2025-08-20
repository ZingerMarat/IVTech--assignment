import mongoose from "mongoose"

const answerSchema = new mongoose.Schema({
  questionId: mongoose.Schema.Types.ObjectId,
  authorEmail: String,
  authorNickname: String,
  body: String,
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("Answer", answerSchema)
