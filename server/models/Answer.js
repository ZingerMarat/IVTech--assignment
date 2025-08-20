import mongoose from "mongoose"

const answerSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
  authorEmail: { type: String, required: true },
  authorNickname: { type: String, required: true },
  body: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("Answer", answerSchema)
