import React from 'react'

const Navbar = () => {
  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-md shadow-sm z-50 left-0 transition-all duration-300">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-8 py-5">

        <div className="flex gap-8 text-sm font-medium">
          <a href="#" className="hover:text-pink-600 transition-colors duration-200 relative group">
            Shop
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-600 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#" className="hover:text-pink-600 transition-colors duration-200 relative group">
            About
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-600 group-hover:w-full transition-all duration-300"></span>
          </a>
        </div>

        <div className="font-bold text-3xl tracking-wider bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          PERFUME
        </div>

        <div className="flex gap-8 text-sm font-medium">
          <a href="#" className="hover:text-pink-600 transition-colors duration-200 relative group">
            Blog
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-600 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#" className="hover:text-pink-600 transition-colors duration-200 relative group">
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-600 group-hover:w-full transition-all duration-300"></span>
          </a>
        </div>

      </div>
    </nav>
  )
}

export default Navbar
