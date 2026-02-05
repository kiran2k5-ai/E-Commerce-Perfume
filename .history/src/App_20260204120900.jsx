import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <class>
      <Navbar></Navbar>
      <Home></Home>
    </class>
  )
}

export default App
