import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import {Route,Routes} from "react-router-dom"
import Blog from './pages/Blog'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={Home}></Route>
        <Route path='/blog' element={Blog}></Route>
        <Route path='/shop' element={}></Route>
      </Routes>
    </>
  )
}

export default App
