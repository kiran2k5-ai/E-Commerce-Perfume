import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-amber-50 flex flex-row gap-10' >
      <div >
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
