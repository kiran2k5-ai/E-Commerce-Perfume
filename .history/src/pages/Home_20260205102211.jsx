import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import Gridbox from '../components/Gridbox';
import Footer from '../components/Footer';
import "swiper/css";

const Home = (id,name,description,price,image) => {
  const products = [
    { id: {id}, name: {name}, description: {description}, price: {price}, image: {image} }
  ];

  return (
    <>
    {/* Hero Section */}
    <div className='relative h-screen overflow-hidden'>
      <div className="absolute inset-0 bg-gradient-to-br from-pink-200/30 via-purple-200/30 to-blue-200/30"></div>
      <img src="src\images\image3.jpg" alt="Hero" className='mt-10 absolute inset-0 w-full h-full object-cover mix-blend-overlay'/>
      <div className='absolute inset-0 flex flex-col items-center justify-center text-white px-6'>
        <h1 className='text-7xl md:text-7xl font-bold text-center leading-tight mb-6 animate-fade-in'>
          Elevate EveryDay<br />
          Moments To<br />
          <span className='bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent'>Extraordinary</span>
        </h1>
        <p className='text-xl md:text-2xl text-gray-100 mt-4 font-light tracking-wide'>Discover Your Signature Scent</p>
        <button className='mt-10 px-10 py-4 bg-white text-gray-800 rounded-full font-semibold text-lg hover:bg-pink-100 hover:scale-105 transition-all duration-300 shadow-2xl'>
          Explore Collection
        </button>
      </div>
    </div>

    {/* Brand Showcase */}
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

    {/* Featured Products Section */}
    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-pink-300 to-purple-600 bg-clip-text text-transparent mb-4">
            Featured Collection
          </h2>
          <p className="text-gray-600 text-lg">Discover our most beloved fragrances</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) => (
            <Gridbox
              key={id}
              name={product.name}
              description={product.description}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </div>
    <Footer></Footer>

    </>
  )
}

export default Home
