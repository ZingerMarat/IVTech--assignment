import { useSelector, useDispatch } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { setUser } from "../store/authReducer"

export default function ProtectedRoute({ children }) {
  const token = useSelector((s) => s.token)
  const dispatch = useDispatch()
  const location = useLocation()
  const [valid, setValid] = useState(null)

  useEffect(() => {
    if (!token) {
      setValid(false)
      dispatch(setUser(null))
      return
    }
    axios
      .get("http://localhost:3001/userInfo", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        dispatch(setUser(res.data))
        setValid(true)
      })
      .catch(() => {
        dispatch(setUser(null))
        setValid(false)
      })
  }, [token, dispatch])

  if (valid === false) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  if (valid === null) {
    return <div>Checking authentication...</div>
  }
  return children
}
