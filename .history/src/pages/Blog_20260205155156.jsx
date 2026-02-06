import React from 'react'

const Blog = () => {
  return (
    <div>
      <div className='relative w-full h-screen'>
        <img src="src\images\image7.jpg" alt="" className='w-screen h-[700px] object-cover'/>
        <div className='absolute inset-0 flex items-center justify-center'>
            <h1 className='text-[200px] text-gray-100 font-light italic mt-5'>All fragrances...</h1>
        </div>
      </div>
    </div>
  )
}

export default Blog
