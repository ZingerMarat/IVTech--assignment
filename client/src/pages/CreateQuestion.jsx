import React, { useState } from "react"
import { useSelector } from "react-redux"
import axios from "axios"

const allTags = ["javascript", "typescript", "python", "java", "cpp"]

export default function CreateQuestion() {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState()
  const user = useSelector((state) => state.user)
  const token = useSelector((state) => state.token)

  const toggleTag = (value) => {
    setTags((prev) => (prev.includes(value) ? prev.filter((t) => t !== value) : [...prev, value]))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (!title || !body || tags.length === 0) throw new Error("All fields are required")
      const res = await axios.post("http://localhost:3001/createQuestion", { user, title, body, tags }, { headers: { Authorization: `Bearer ${token}` } })

      if (res.status === 200) {
        setTitle("")
        setBody("")
        setTags([])
      }
    } catch (err) {
      console.error("Error creating question:", err)
      setError(err.message || "Create question error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-start justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="w-full max-w-sm p-6 bg-white rounded shadow space-y-4">
        <h2 className="text-xl font-semibold text-center">Create a new question</h2>

        <div>
          <label htmlFor="title" className="block mb-1">
            Title:
          </label>
          <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border rounded px-2 py-1" />
        </div>

        <div>
          <label htmlFor="body" className="block mb-1">
            Body:
          </label>
          <textarea id="body" value={body} onChange={(e) => setBody(e.target.value)} className="w-full border rounded px-2 py-1 min-h-[120px]" />
        </div>

        <fieldset>
          <legend className="block mb-2">Tags (choose 1–5):</legend>
          <div className="grid grid-cols-2 gap-2">
            {allTags.map((tag) => (
              <label key={tag} className="flex items-center space-x-2">
                <input type="checkbox" checked={tags.includes(tag)} onChange={() => toggleTag(tag)} className="rounded" />
                <span className="capitalize">{tag === "cpp" ? "C++" : tag}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Submit
        </button>
      </form>
    </div>
  )
}
