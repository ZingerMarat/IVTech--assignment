import mongoose from "mongoose"
import dotenv from "dotenv"
import Question from "../models/Question.js"
import Answer from "../models/Answer.js"

dotenv.config()

await mongoose.connect(process.env.MONGO_URI)
console.log("DB connected")

try {
  await Question.deleteMany({})
  await Answer.deleteMany({})
  console.log("Cleared questions & answers")

  // --- Seed Questions ---
  const questions = await Question.insertMany([
    {
      authorEmail: "john@example.com",
      authorNickname: "johnny",
      title: "How does closure work in JavaScript?",
      body: "I need a simple explanation with an example.",
      tags: ["javascript"],
    },
    {
      authorEmail: "sally@example.com",
      authorNickname: "sally",
      title: "What is the difference between React useEffect and useLayoutEffect?",
      body: "When should I use one over the other?",
      tags: ["react", "hooks"],
    },
    {
      authorEmail: "mark@example.com",
      authorNickname: "marky",
      title: "How to set up Tailwind CSS with Vite?",
      body: "I’m stuck on the installation step, can someone help?",
      tags: ["vite", "tailwind", "css"],
    },
  ])

  console.log(`Seeded ${questions.length} questions`)

  // --- Seed Answers ---
  const answers = [
    // Q1 answers
    {
      questionId: questions[0]._id,
      authorEmail: "sally@example.com",
      authorNickname: "sally",
      body: "A closure is when a function remembers the variables from its outer scope even after that scope has closed.",
    },
    {
      questionId: questions[0]._id,
      authorEmail: "mark@example.com",
      authorNickname: "marky",
      body: "Think of it as packing variables in a backpack that a function carries wherever it goes.",
    },
    {
      questionId: questions[0]._id,
      authorEmail: "john@example.com",
      authorNickname: "johnny",
      body: "Closures are useful for creating private variables and function factories.",
    },

    // Q2 answers
    {
      questionId: questions[1]._id,
      authorEmail: "john@example.com",
      authorNickname: "johnny",
      body: "useEffect runs after paint, useLayoutEffect runs before paint.",
    },
    {
      questionId: questions[1]._id,
      authorEmail: "sally@example.com",
      authorNickname: "sally",
      body: "If you need to measure DOM size and apply layout changes, useLayoutEffect is safer.",
    },
    {
      questionId: questions[1]._id,
      authorEmail: "mark@example.com",
      authorNickname: "marky",
      body: "In most cases useEffect is enough, useLayoutEffect is for rare UI adjustments.",
    },

    // Q3 answers
    {
      questionId: questions[2]._id,
      authorEmail: "john@example.com",
      authorNickname: "johnny",
      body: "Install tailwindcss, postcss and autoprefixer, then run `npx tailwindcss init -p`.",
    },
    {
      questionId: questions[2]._id,
      authorEmail: "sally@example.com",
      authorNickname: "sally",
      body: "Don’t forget to add @tailwind directives in your CSS file.",
    },
    {
      questionId: questions[2]._id,
      authorEmail: "mark@example.com",
      authorNickname: "marky",
      body: "Also make sure your template paths are set correctly in tailwind.config.js.",
    },
  ]

  await Answer.insertMany(answers)
  console.log(`Seeded ${answers.length} answers`)
} catch (e) {
  console.error("seed error:", e)
  process.exit(1)
}

await mongoose.disconnect()
process.exit(0)
