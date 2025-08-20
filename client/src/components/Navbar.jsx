import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { logout } from "../store/authReducer"

export default function Navbar() {
  const dispatch = useDispatch()

  return (
    <nav className="flex items-center gap-4 px-4 py-1 border-b bg-gray-100">
      <Link to="/" className="text-blue-600 hover:underline">
        Home
      </Link>
      <Link to="/create" className="text-blue-600 hover:underline">
        Create Question
      </Link>
      <Link to="/questions" className="text-blue-600 hover:underline">
        View Questions
      </Link>
      <button onClick={() => dispatch(logout())} className="ml-auto px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600">
        Logout
      </button>
    </nav>
  )
}
