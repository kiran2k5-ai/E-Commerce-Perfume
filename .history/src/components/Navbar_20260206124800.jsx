import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className=" fixed w-full bg-pink-100 z-50 left-0 md:px-16 py-4 rounded-4xl text-light it">
      <div className="flex items-center justify-between">

        <div className="flex gap-6">
          <a href="/shop" className="hover:underline">Shop</a>
          <a href="#" className="hover:underline">About</a>
        </div>

        <div className="font-semibold text-2xl">
          Perfume
        </div>

        <div className="flex gap-6">
          <a href="/" className="hover:underline">Home</a>
          <a href="/blog" className="hover:underline">Blog</a>
          <a href="#" className="hover:underline">Contact</a>
        </div>

      </div>
    </nav>
  )
}

export default Navbar
