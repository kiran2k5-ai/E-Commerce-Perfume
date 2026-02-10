import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import Gridbox from '../components/Gridbox';
import Footer from '../components/Footer';
import "swiper/css";
import axios from 'axios'
import image3 from "../images/image3.jpg"
import image6 from "../images/image6.jpg"
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
        setProducts(productArray)
      } catch (err) {
        setError("Failed to load products")
        setProducts([])
      }
    }

    fetchProducts()
  }, [])

  return (
    <>
    <div className='relative h-screen overflow-hidden font-light italic '>
      <div className="absolute inset-0 bg-gradient-to-br from-pink-200/30 via-purple-200/30 to-blue-200/30"></div>
      <div
              className="relative h-screen bg-fixed bg-cover bg-center"
              style={{ backgroundImage: `url(${image3})` }}
            ></div>
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

    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-pink-300 to-purple-600 bg-clip-text text-transparent mb-4">
            Featured Collection
          </h2>
          <p className="text-gray-600 text-lg">Discover our most beloved fragrances</p>
        </div>
        
        {!error && (
        <div className="mt-20 px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {Array.isArray(products) && products.map(p => (
            <Gridbox
              key={p._id}
              id={p._id}
              name={p.name}
              description={p.description}
              price={`₹${p.price}`}
              image={p.image}
            />
          ))}
        </div>
      )}
      </div>
    </div>
    <div className='flex flex-row justify-center gap-70 text-lg font-light italic '> 
      <img src="src\images\image4.jpg" alt="" className='w-[350px] h-[500px] rounded-3xl' />
      <div className='mt-5 flex flex-col justify-center items-center gap-8'>
        <h1>Smell like a dream.</h1>
        <div className='ml-6'>
          <h2>With every delicate spritz, our scents weave a <br />
          tapestry of dreams, enveloping you in <br />
          an irresistible aura that lingers like the sweetest reverie. <br />
          Each note is meticulously crafted to transport you to a realm <br />
          where your aspirations come alive, leaving an impression that's <br />
          as lasting as the memory of a cherished dream.</h2>
        </div>
        <button className='w-75 h-10 bg-green-300 rounded-3xl'>Shop Now</button>
      </div>
    </div>
    <div className='mt-10'>
      <Footer ></Footer>
    </div>
    

    </>
  )
}

export default Home
