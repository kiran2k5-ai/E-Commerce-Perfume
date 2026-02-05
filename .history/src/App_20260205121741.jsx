import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import {Routes}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar></Navbar>
      
    </>
  )
}

export default App
