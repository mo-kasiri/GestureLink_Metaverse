import { useState } from 'react'
import Mediapipe from "./components/Mediapipe.jsx";

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
      <Mediapipe/>
  )
}

export default App
