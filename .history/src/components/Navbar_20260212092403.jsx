import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className=" w-full bg-pink-100 z-50 left-0 md:px-16 py-4 rounded-4xl text-light italic">
      <div className="flex items-center justify-between">

        <div className="flex gap-6">
          <Link to="/" className="hover:underline">
            Home
          </Link>

          <Link to="/about" className="hover:underline">
            About
          </Link>
        </div>


        <div className="text-2xl font-serif uppercase tracking-widest">
          Perfume
        </div>


        <div className="flex gap-6">
          <Link to="/shop" className="hover:underline">
            Shop
          </Link>

          <Link to="/blog" className="hover:underline">
            Blog
          </Link>

          <Link to="/contact" className="hover:underline">
            Contact
          </Link>
        </div>


      </div>
    </nav>
  )
}

export default Navbar
