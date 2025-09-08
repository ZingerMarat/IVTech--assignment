import React, { useEffect, useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import Question from "../components/Question.jsx"
import { useMemo } from "react"

const allTags = [
  "javascript",
  "typescript",
  "python",
  "java",
  "cpp",
  "vite",
  "tailwind",
  "css",
  "react",
  "hooks",
]

export default function ViewQuestions() {
  const [allQuestions, setAllQuestions] = useState([])
  const [loading, setLoading] = useState(false)
  const token = useSelector((state) => state.token)
  const [tagsForFilter, setTagsForFilter] = useState([])
  const [searchForFilter, setSearchForFilter] = useState([])

  const toggleTag = (tag) => {
    setTagsForFilter((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const handleSearch = (query) => {
    let searchWords = query.trim().split(" ")
    searchWords = searchWords.map((w) => w.toLowerCase())

    setSearchForFilter(searchWords)
  }

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true)

      try {
        const res = await axios.get("http://localhost:3001/getQuestions", {
          headers: { Authorization: `Bearer ${token}` },
        })
        setAllQuestions(res.data)
      } catch (err) {
        console.error("Fetch question error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchQuestions()
  }, [token])

  const filteredQuestions = useMemo(() => {
    let result = allQuestions

    if (tagsForFilter.length > 0) {
      result = result.filter((r) => r.tags.some((t) => tagsForFilter.includes(t)))
    }

    if (searchForFilter.length > 0) {
      result = result.filter((r) =>
        searchForFilter.some(
          (s) => r.title.toLowerCase().includes(s) || r.body.toLowerCase().includes(s)
        )
      )
    }

    return result
  }, [allQuestions, tagsForFilter, searchForFilter])

  return (
    <div className="flex">
      <div className="w-1/5 p-6 flex flex-col justify-start space-y-4">
        <div>
          {allTags.map((tag, index) => (
            <label key={tag} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={tagsForFilter.includes(tag)}
                onChange={() => toggleTag(tag)}
                className="rounded"
              />
              <span className="capitalize">{tag === "cpp" ? "C++" : tag}</span>
            </label>
          ))}
        </div>

        <div>
          <input
            type="text"
            placeholder="search"
            className="border rounded pl-1"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="w-4/5 p-6 space-y-4">
        {loading && <p>Loading...</p>}
        {filteredQuestions && filteredQuestions.map((q) => <Question key={q._id} question={q} />)}
      </div>
    </div>
  )
}
