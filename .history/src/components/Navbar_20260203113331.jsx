import React from 'react'

const Navbar = () => {
  return (
    <nav className="w-full bg-pink-300 px-6 md:px-16 py-4 b">
      <div className="flex items-center justify-between">

        <div className="flex gap-6">
          <a href="#" className="hover:underline">Shop</a>
          <a href="#" className="hover:underline">About</a>
        </div>

        <div className="font-semibold text-2xl">
          Perfume
        </div>

        <div className="flex gap-6">
          <a href="#" className="hover:underline">Blog</a>
          <a href="#" className="hover:underline">Contact</a>
        </div>

      </div>
    </nav>
  )
}

export default Navbar
