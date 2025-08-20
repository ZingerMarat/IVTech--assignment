import React, { useEffect, useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import Question from "../components/Question.jsx"

export default function ViewQuestions() {
  const [allQuestions, setAllQuestions] = useState(null)
  const [loading, setLoading] = useState(false)
  const token = useSelector((state) => state.token)

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true)

      try {
        const res = await axios.get("http://localhost:3001/getQuestions", { headers: { Authorization: `Bearer ${token}` } })

        if (res.status === 200) {
          setAllQuestions(res.data)
        }
      } catch (err) {
        console.error("Fetch question error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchQuestions()
  }, [token])
  return (
    <div className="p-6 space-y-4">
      {loading && <p>Loading...</p>}
      {allQuestions && allQuestions.map((q) => <Question key={q._id} question={q} />)}
    </div>
  )
}
