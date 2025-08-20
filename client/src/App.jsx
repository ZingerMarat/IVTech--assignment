import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import { useSelector } from "react-redux"
import Navbar from "./components/Navbar.jsx"
import CreateQuestion from "./pages/CreateQuestion.jsx"
import ViewQuestions from "./pages/ViewQuestions.jsx"

function Home() {
  const user = useSelector((state) => state.user)
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

export default function App() {
  const user = useSelector((state) => state.user)
  return (
    <BrowserRouter>
      {user ? <Navbar /> : null}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateQuestion />
            </ProtectedRoute>
          }
        />
        <Route
          path="/questions"
          element={
            <ProtectedRoute>
              <ViewQuestions />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
