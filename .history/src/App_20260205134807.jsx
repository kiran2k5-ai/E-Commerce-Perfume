import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import {Route,Routes} from "react-router-dom"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={Home}></Route>
        <Route path=''></Route>
      </Routes>
    </>
  )
}

export default App
