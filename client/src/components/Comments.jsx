import React, { useEffect, useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"

const Comments = ({ questionId }) => {
  const [answers, setAnswers] = useState([])
  const [newAnswer, setNewAnswer] = useState("")
  const token = useSelector((state) => state.token)
  const user = useSelector((state) => state.user)

  const addAnswer = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post(
        `http://localhost:3001/answer/${questionId}`,
        { body: newAnswer },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      setAnswers((prev) => [...prev, res.data])
      setNewAnswer("")
    } catch (e) {
      console.log(e.message)
    }

    setNewAnswer("")
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/getQuestionAnswers/${questionId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setAnswers(res.data)
      } catch (e) {
        console.log(e.message)
      }
    }
    fetchData()
  }, [questionId, token])

  return (
    <div className="border-t pl-20 py-3 space-y-3">
      <h4 className="font-medium">Answers</h4>

      {answers.length ? (
        <ul className="list-disc pl-5 space-y-1">
          {answers.map((a) => (
            <div key={a.id} className="border rounded-md p-3 bg-gray-50 shadow-sm">
              <div className="text-sm text-gray-600 mb-1">
                <span className="font-medium">{a.authorNickname}</span> say(s):
              </div>
              <div className="text-gray-800">{a.body}</div>
            </div>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No answers yet.</p>
      )}

      <form onSubmit={addAnswer} className="space-y-2 pl-5">
        <label htmlFor="newAnswer" className="block text-sm">
          Add your answer
        </label>
        <textarea id="newAnswer" value={newAnswer} onChange={(e) => setNewAnswer(e.target.value)} className="w-full border rounded px-2 py-1 h-[60px]" />
        <div className="flex justify-end">
          <button type="submit" className=" px-3 py-1 rounded bg-blue-600 text-white text-sm">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default Comments
