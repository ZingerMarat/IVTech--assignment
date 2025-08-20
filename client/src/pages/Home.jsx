import React from "react"
import { useSelector } from "react-redux"
import CreateQuestion from "./CreateQuestion.jsx"

const Home = () => {
  const user = useSelector((state) => state.user)
  return (
    <div>
      <CreateQuestion />
    </div>
  )
}

export default Home
