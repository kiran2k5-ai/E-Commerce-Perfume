import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import {Route,Routes} from "react-router-dom"
import Blog from './pages/Blog'
import Shopping from './pages/Shopping'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<></>}></Route>
        <Route path='/blog' element={Blog}></Route>
        <Route path='/shop' element={Shopping}></Route>
      </Routes>
    </>
  )
}

export default App
