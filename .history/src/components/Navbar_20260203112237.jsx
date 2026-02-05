import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-pink-300 flex flex-row gap-130' >
      <div className='flex flex-row' >
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
