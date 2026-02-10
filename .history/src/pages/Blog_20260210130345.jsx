import React from 'react'
import image12 from "../images/image12.jpg"
import image13 from "../images/image12.jpg"

const Blog = () => {
  return (
    <div>
      <h1 className='font-light italic text-9xl text-center'>All Posts....</h1>
      <div className='flex flex-row gap-10 justify-center items-center mt-10'>
        <div className='flex flex-col gap-4'>
          <img src={image12} alt="" className='w-100 h-70 rounded-2xl' />
          <div>News</div>
          <h1>Smell as gorgeous as you look.</h1>
          <h2>JULY 9, 2023 | 5 MIN READ</h2>
        </div>
        <div className='flex flex-col gap-4'>
          <img src={image12} alt="" className='w-100 h-70 rounded-2xl' />
          <div>News</div>
          <h1>Smell as gorgeous as you look.</h1>
          <h2>JULY 9, 2023 | 5 MIN READ</h2>
        </div>
        <div className='flex flex-col gap-4'>
          <img src={image12} alt="" className='w-100 h-70 rounded-2xl' />
          <div>News</div>
          <h1>Smell as gorgeous as you look.</h1>
          <h2>JULY 9, 2023 | 5 MIN READ</h2>
        </div>
      </div>
    </div>
  )
}

export default Blog
