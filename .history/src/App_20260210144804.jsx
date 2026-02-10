import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import {Route,Routes} from "react-router-dom"
import Blog from './pages/Blog'
import Shopping from './pages/Shopping'
import Cart from './pages/Cart'
import About from './pages/About'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/blog' element={<Blog></Blog>}></Route>
        <Route path='/shop' element={<Shopping></Shopping>}></Route>
        <Route path='/cart' element={<Cart></Cart>}></Route>
        <Route path='/about' element={<About></About>}></Route>
        <Route path='/contact' element={<Contact></Contact>}></Route>
      </Routes>
      
    </>
  )
}

export default App
