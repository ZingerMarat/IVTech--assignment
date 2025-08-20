import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { login } from "../store/authReducer"
import axios from "axios"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (!email || !password) throw new Error("Enter email and password")
      const res = await axios.post("http://localhost:3001/login", { email, password })
      dispatch(login(res.data.token))
      navigate("/")
    } catch (err) {
      setError(err.message || "Login error")
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="w-full max-w-sm p-6 bg-white rounded shadow space-y-4">
        <h2 className="text-xl font-semibold text-center">Login</h2>

        <div>
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded px-2 py-1" />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border rounded px-2 py-1" />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Sign in
        </button>
      </form>
    </div>
  )
}

export default Login
