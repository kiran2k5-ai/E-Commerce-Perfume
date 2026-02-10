import React from 'react'
import image12 from "../images/image12.jpg"
const Blog = () => {
  return (
    <div>
      <h1 className='font-light italic text-9xl text-center'>All Posts....</h1>
      <div>
        <div>
          <img src={image12} alt="" className='w-80 h-70'/>
          <div>News</div>
          <h1>Smell as gorgeous as you look.</h1>
          <h2>JULY 9, 2023 | 5 MIN READ</h2>
        </div>
      </div>
    </div>
  )
}

export default Blog
