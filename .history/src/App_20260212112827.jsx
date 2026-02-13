import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Chatbot from './components/Chatbot'
import Home from './pages/Home'
import {Route,Routes, useLocation} from "react-router-dom"
import Blog from './pages/Blog'
import Shopping from './pages/Shopping'
import Cart from './pages/Cart'
import About from './pages/About'
import Contact from './pages/Contact'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Wishlist from './pages/Wishlist'
import Favorites from './pages/Favorites'
import PerfumeQuiz from './pages/PerfumeQuiz'
import Admin from './pages/Admin'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'

function AppContent() {
  const location = useLocation()
  const hideNavbarRoutes = ['/login', '/register']
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname)

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/blog' element={<Blog></Blog>}></Route>
        <Route path='/shop' element={<Shopping></Shopping>}></Route>
        <Route path='/cart' element={<Cart></Cart>}></Route>
        <Route path='/about' element={<About></About>}></Route>
        <Route path='/contact' element={<Contact></Contact>}></Route>
        <Route path='/checkout' element={<Checkout></Checkout>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/profile' element={<Profile></Profile>}></Route>
        <Route path='/wishlist' element={<Wishlist></Wishlist>}></Route>
        <Route path='/quiz' element={<PerfumeQuiz></PerfumeQuiz>}></Route>
        <Route path='/admin' element={<Admin></Admin>}></Route>
      </Routes>
      {shouldShowNavbar && <Chatbot />}
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  )
}

export default App
