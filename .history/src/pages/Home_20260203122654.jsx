import React from 'react'

const Home = () => {
  return (
    <>
    <div className='relative'>
      <img src="src\images\image1.jpg" alt="" className='pt-10 rotate-90 object-cover -mt-90 w-full'/>
      <div className='absolute inset-0 z-10 flex flex-col items-center justify-center text-white'>
        <h1 className=' text-9xl'>Elevate EveryDay <br /> Moments To <br /> Extraordinary</h1>
      </div>
    </div>
    <div className="flex items-center justify-between w-full px-16 py-6 text-black -mt-">
        <h1 className="font-light italic text-lg">flow</h1>
        <h1 className="font-semibold text-xl tracking-wide">NINO</h1>
        <h1 className="font-medium text-lg">InTrend</h1>
        <h1 className="font-bold text-xl">JUNE</h1>
        <h1 className="font-semibold text-lg tracking-widest">ZINE</h1>
        <h1 className="font-extrabold text-xl">MAX</h1>
    </div>

    </>
  )
}

export default Home
