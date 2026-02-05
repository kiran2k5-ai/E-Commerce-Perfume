import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import {Route,Ro} from "react-router-dom"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar></Navbar>
      
    </>
  )
}

export default App
