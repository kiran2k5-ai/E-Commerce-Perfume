import React, { useEffect, useState } from "react"
import axios from "axios"
import Gridbox from "../components/Gridbox"
import Footer from "../components/Footer"

import image3 from "../images/image3.jpg"
import image6 from "../images/image6.jpg"

const Home = () => {
  const [products, setProducts] = useState([])   // ALWAYS array
  const [offsetY, setOffsetY] = useState(0)

  // ================= PARALLAX =================
  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // ================= FETCH PRODUCTS =================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/products")

        let productArray = []

        if (Array.isArray(res.data)) {
          productArray = res.data
        } else if (Array.isArray(res.data.products)) {
          productArray = res.data.products
        }

        setProducts(productArray.slice(0, 6))
      } catch (error) {
        console.error("Product fetch failed:", error)
        setProducts([])
      }
    }

    fetchProducts()
  }, [])

  return (
    <>
      {/* ================= HERO PARALLAX ================= */}
      <div className="relative h-screen overflow-hidden font-light italic">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-200/30 via-purple-200/30 to-blue-200/30 z-10" />

        <img
          src={image3}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: `translateY(${offsetY * 0.4}px)`,
          }}
        />

        <div className="relative z-20 flex flex-col items-center justify-center text-white h-full px-6">
          <h1 className="text-7xl font-bold text-center leading-tight mb-6">
            Elevate EveryDay<br />
            Moments To<br />
            <span className="bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
              Extraordinary
            </span>
          </h1>

          <p className="text-xl text-gray-100 mt-4">
            Discover Your Signature Scent
          </p>

          <button className="mt-10 px-10 py-4 bg-white text-gray-800 rounded-full font-semibold text-lg hover:bg-pink-100 transition-all">
            Explore Collection
          </button>
        </div>
      </div>

      {/* ================= FEATURED PRODUCTS ================= */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {Array.isArray(products) && products.map((product) => (
              <Gridbox
                key={product._id}
                id={product._id}
                name={product.name}
                description={product.description}
                price={`₹${product.price}`}
                image={product.image || image6}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ================= STORY SECTION ================= */}
      <div className="flex justify-center gap-20 px-20 py-20 font-light italic">
        <img
          src={image6}
          alt="Story"
          className="w-[350px] h-[500px] rounded-3xl object-cover"
        />

        <div className="flex flex-col justify-center gap-8 max-w-xl">
          <h1 className="text-3xl">Smell like a dream.</h1>

          <p className="text-gray-600 leading-relaxed">
            With every delicate spritz, our scents weave a tapestry of dreams,
            enveloping you in an irresistible aura that lingers like the
            sweetest reverie.
          </p>

          <button className="w-40 h-12 bg-green-300 rounded-3xl">
            Shop Now
          </button>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Home
