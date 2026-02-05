import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-pink-300 flex flex-row w-100%' >
      <div className='flex flex-row gap-5' >
        <a href=""> Shop </a>
        <a href="">About</a>
      </div>
      <div>Perfume</div>
      <div>
        <a href="">Blog</a>
        <a href="">Contact</a>
      </div>
    </div>
  )
}

export default Navbar
