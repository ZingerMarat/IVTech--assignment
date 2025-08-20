import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import { useSelector } from "react-redux"
import Navbar from "./components/Navbar.jsx"
import CreateQuestion from "./pages/CreateQuestion.jsx"
import ViewQuestions from "./pages/ViewQuestions.jsx"
import Home from "./pages/Home.jsx"

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
