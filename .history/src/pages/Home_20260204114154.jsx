import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import Gridbox from '../components/Gridbox';

import "swiper/css";

const Home = () => {
  return (
    <>
    <div className='relative'>
      <img src="src\images\image1.jpg" alt="" className='pt-10 rotate-90 object-cover -mt-90 w-full'/>
      <div className='absolute inset-0 z-10 flex flex-col items-center justify-center text-white'>
        <h1 className=' text-9xl'>Elevate EveryDay <br /> Moments To <br /> Extraordinary</h1>
      </div>
    </div>
    <div className="flex items-center justify-between w-full px-16 py-6 text-black -mt-60 text-4xl">
        <h1 className="font-light italic  ">flow</h1>
        <h1 className="font-semibold  tracking-wide">NINO</h1>
        <h1 className="font-medium ">InTrend</h1>
        <h1 className="font-bold ">JUNE</h1>
        <h1 className="font-semibold  tracking-widest">ZINE</h1>
        <h1 className="font-extrabold ">MAX</h1>
    </div>

    <Gridbox></Gridbox>
    </>
  )
}

export default Home
