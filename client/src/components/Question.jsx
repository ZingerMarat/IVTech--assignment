import React, { useState } from "react"
import Answers from "./Answers.jsx"

const Question = ({ question }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="border rounded-md p-4 shadow-sm bg-white space-y-2">
      <h3
        className="text-lg font-semibold text-gray-800 cursor-pointer"
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      >
        {question.title}
      </h3>
      <p className="text-gray-700">{question.body}</p>
      <div className="flex gap-2 flex-wrap">
        {question.tags.map((tag, i) => (
          <span key={i} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
            {tag}
          </span>
        ))}
      </div>

      {isOpen && <Answers questionId={question._id} />}
    </div>
  )
}

export default Question
