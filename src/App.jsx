import { useState } from 'react'
import './App.css'
import Gallery from "./Gallery";
import "./Gallery.css";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Gallery />
    </>
  )
}

export default App
