import React, { useEffect, useState } from 'react'
import Gridbox from '../components/Gridbox'
import Footer from '../components/Footer'
import axios from 'axios'
import image7 from "../images/image7"

const Shopping = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/product")
        setProducts(res.data)
        setLoading(false)
      } catch (err) {
        setError("Failed to load products")
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div>

      <div
        className="relative h-screen bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url('src\images\image7.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-[200px] text-gray-100 font-light italic">
            All fragrances...
          </h1>
        </div>
      </div>

      {loading && (
        <div className="text-center mt-20 text-xl">Loading products...</div>
      )}

      {error && (
        <div className="text-center mt-20 text-red-500">{error}</div>
      )}

      {!loading && !error && (
        <div className="mt-20 px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map(p => (
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

      <div className="mt-20">
        <Footer />
      </div>

    </div>
  )
}

export default Shopping
