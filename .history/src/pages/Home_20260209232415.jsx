import React, { useEffect, useState } from 'react'
import Gridbox from '../components/Gridbox'
import Footer from '../components/Footer'
import axios from 'axios'
import image3 from "../images/image3.jpg"
import image6 from "../images/image6.jpg"
import image4 from "../images/image4.jpg"
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [products, setProducts] = useState([])
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/product")
        const productArray = Array.isArray(res.data)
          ? res.data
          : res.data.products || []
        setProducts(productArray.slice(0, 6))
      } catch (err) {
        setError("Failed to load products")
        setProducts([])
      }
    }

    fetchProducts()
  }, [])

  return (
    <>
      <div className='relative h-screen overflow-hidden font-light italic'>
        <div className="absolute inset-0 bg-gradient-to-br from-pink-200/30 via-purple-200/30 to-blue-200/30"></div>
        <div
          className="relative h-screen bg-fixed bg-cover bg-center"
          style={{ backgroundImage: `url(${image3})` }}
        ></div>

        <div className='absolute inset-0 flex flex-col items-center justify-center text-white px-6'>
          <h1 className='text-7xl font-bold text-center leading-tight mb-6'>
            Elevate EveryDay<br />
            Moments To<br />
            <button onclick = {()=>{navigate("/shop")}} className='bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent'>
              Extraordinary
            </button>
          </h1>
          <p className='text-xl text-gray-100 mt-4 font-light tracking-wide'>
            Discover Your Signature Scent
          </p>
          <button className='mt-10 px-10 py-4 bg-white text-gray-800 rounded-full font-semibold text-lg hover:bg-pink-100 hover:scale-105 transition-all duration-300 shadow-2xl'>
            Explore Collection
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-r from-pink-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-center text-gray-400 uppercase tracking-widest text-sm mb-10 font-semibold">
            Featured Brands
          </h2>
          <div className="flex items-center justify-between flex-wrap gap-8 text-gray-700">
            <h1 className="font-light italic text-4xl">flow</h1>
            <h1 className="font-semibold tracking-wide text-4xl">NINO</h1>
            <h1 className="font-medium text-4xl">InTrend</h1>
            <h1 className="font-bold text-4xl">JUNE</h1>
            <h1 className="font-semibold tracking-widest text-4xl">ZINE</h1>
            <h1 className="font-extrabold text-4xl">MAX</h1>
          </div>
        </div>
      </div>

      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-pink-300 to-purple-600 bg-clip-text text-transparent mb-4">
              Featured Collection
            </h2>
            <p className="text-gray-600 text-lg">
              Discover our most beloved fragrances
            </p>
          </div>

          {!error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {Array.isArray(products) && products.map(p => (
                <Gridbox
                  key={p._id}
                  id={p._id}
                  name={p.name}
                  description={p.description}
                  price={`₹${p.price}`}
                  image={p.image || image6}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className='flex justify-center gap-20 px-20 py-20 font-light italic'>
        <img src={image4} alt="" className='w-[350px] h-[500px] rounded-3xl object-cover' />
        <div className='flex flex-col justify-center gap-20'>
          <h1 className="text-3xl">Smell like a dream.</h1>
          <p className="text-gray-600 leading-relaxed">
            With every delicate spritz, our scents weave a tapestry of dreams,<br />
            enveloping you in an irresistible aura that lingers like the sweetest reverie.
          </p>
          <button className='w-40 h-12 bg-green-300 rounded-3xl'>Shop Now</button>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Home
