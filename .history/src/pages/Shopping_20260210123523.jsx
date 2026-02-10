import React, { useEffect, useState, useMemo } from 'react'
import Gridbox from '../components/Gridbox'
import Footer from '../components/Footer'
import axios from 'axios'
import image7 from "../images/image11.jpg"

const Shopping = () => {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [sort, setSort] = useState("")
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

  const filteredProducts = useMemo(() => {
    let temp = [...products]

    if (search) {
      temp = temp.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (category !== "All") {
      temp = temp.filter(p => p.category === category)
    }

    if (sort === "low") {
      temp.sort((a, b) => a.price - b.price)
    }

    if (sort === "high") {
      temp.sort((a, b) => b.price - a.price)
    }

    return temp
  }, [products, search, category, sort])

  return (
    <div>
      <div
        className="relative h-screen bg-fixed bg-cover bg-center"
        style={{ backgroundImage: `url(${image7})` }}
      >
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-[200px] text-gray-100 font-medium italic">
            All fragrances...
          </h1>
        </div>
      </div>

      <div className="flex flex-wrap gap-6 justify-between items-center px-10 mt-16">
        <input
          type="text"
          placeholder="Search fragrance..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded w-72"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-4 py-2 rounded"
        >
          <option value="All">All</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Unisex">Unisex</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border px-4 py-2 rounded"
        >
          <option value="">Sort By</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      {error && (
        <div className="text-center mt-20 text-red-500">
          {error}
        </div>
      )}

      {!error && (
        <div className="mt-14 px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map(p => (
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
