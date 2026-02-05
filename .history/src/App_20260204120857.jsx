import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <cla>
      <Navbar></Navbar>
      <Home></Home>
    </cla>
  )
}

export default App
