import { useEffect, useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"

function App() {
  const [user, setUser] = useState(null)
  const token = useSelector((s) => s.token)

  useEffect(() => {
    if (!token) return
    axios
      .get("http://localhost:3001/userInfo", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
  }, [token])

  return (
    <div>
      {user ? (
        <div>
          <div>Nickname: {user.nickname}</div>
          <div>Full Name: {user.fullName}</div>
          <div>Email: {user.email}</div>
        </div>
      ) : (
        <div>No user info</div>
      )}
    </div>
  )
}

export default App
