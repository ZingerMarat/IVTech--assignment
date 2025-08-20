import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"

export default function ProtectedRoute({ children }) {
  const token = useSelector((s) => s.token)
  const location = useLocation()
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  return children
}
