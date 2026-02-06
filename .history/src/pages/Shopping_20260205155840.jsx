import React from 'react'

const Shopping = () => {
  return (
    <div>
      <div className='relative w-full h-screen'>
        <img src="src\images\image7.jpg" alt="" className='w-screen h-[650px] object-cover'/>
        <div className='absolute inset-0 flex items-center justify-center'>
            <h1 className='text-[200px] text-gray-100 font-light italic mt-5'>All fragrances...</h1>
        </div>
      </div>
      <div>
            <div className="bg-gradient-to-r from-pink-50 via-white to-purple-50 py-20">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-center text-gray-400 uppercase tracking-widest text-sm mb-10 font-semibold">Featured Brands</h2>
        <div className="flex items-center justify-between flex-wrap gap-8 text-gray-700">
          <h1 className="font-light italic text-4xl hover:text-pink-600 transition-colors cursor-pointer">flow</h1>
          <h1 className="font-semibold tracking-wide text-4xl hover:text-pink-600 transition-colors cursor-pointer">NINO</h1>
          <h1 className="font-medium text-4xl hover:text-pink-600 transition-colors cursor-pointer">InTrend</h1>
          <h1 className="font-bold text-4xl hover:text-pink-600 transition-colors cursor-pointer">JUNE</h1>
          <h1 className="font-semibold tracking-widest text-4xl hover:text-pink-600 transition-colors cursor-pointer">ZINE</h1>
          <h1 className="font-extrabold text-4xl hover:text-pink-600 transition-colors cursor-pointer">MAX</h1>
        </div>
      </div>
    </div>
      </div>
    </div>
  )
}

export default Shopping
