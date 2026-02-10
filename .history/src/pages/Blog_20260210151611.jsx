import React from 'react'
import image12 from "../images/image12.jpg"
import image13 from "../images/image13.jpg"
import image14 from "../images/image14.jpg"
const Blog = () => {
  return (
    <div>
      <h1 className='font-serif italic text-8xl text-center'>All Posts....</h1>
      <div className='flex flex-row gap-10 justify-center items-center mt-10'>
        <div className='flex flex-col gap-4'>
          <img src={image12} alt="" className='w-100 h-70 rounded-2xl' />
          <div className='w-15 h- border border-orange-300'>News</div>
          <h1>Smell as gorgeous as you look.</h1>
          <h2>JULY 9, 2023 | 5 MIN READ</h2>
        </div>
        <div className='flex flex-col gap-4'>
          <img src={image13} alt="" className='w-100 h-70 rounded-2xl' />
          <div>Products</div>
          <h1>Inovative ways to incroporate fragrance into <br />
           your daily routine.</h1>
          <h2>JULY 11, 2023 | 5 MIN READ</h2>
        </div>
        <div className='flex flex-col gap-4'>
          <img src={image14} alt="" className='w-100 h-70 rounded-2xl' />
          <div>Product</div>
          <h1>Exploring sustainable and ethical perfume choices.</h1>
          <h2>JULY 30, 2023 | 5 MIN READ</h2>
        </div>
        
      </div>

      <div className="flex justify-center mt-10">
        <hr className="w-20 border-t-2 border-amber-500" />
      </div>

      <div className='flex flex-row gap-10 justify-center items-center mt-10'>
        <div className='flex flex-col gap-4'>
          <img src={image12} alt="" className='w-100 h-70 rounded-2xl' />
          <div>Company</div>
          <h1>How perfume affect your mood <br />
          and confidence.</h1>
          <h2>JULY 9, 2023 | 5 MIN READ</h2>
        </div>
        <div className='flex flex-col gap-4'>
          <img src={image13} alt="" className='w-100 h-70 rounded-2xl' />
          <div>News</div>
          <h1>A journey throug perfume notes and memories.</h1>
          <h2>JULY 10, 2023 | 5 MIN READ</h2>
        </div>
        <div className='flex flex-col gap-4'>
          <img src={image14} alt="" className='w-100 h-70 rounded-2xl' />
          <div>News</div>
          <h1>Smell as gorgeous as you look.</h1>
          <h2>JULY 25, 2023 | 5 MIN READ</h2>
        </div>
        
      </div>
    </div>
  )
}

export default Blog
