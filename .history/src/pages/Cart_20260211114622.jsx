import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from "axios"

const Cart = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const product = location.state?.product
  const [count, setCount] = useState(1)
  const [related, setRelated] = useState([])

  useEffect(() => {
    if (!product) return

    const fetchRelated = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/product/related",
          {
            category: product.category,
            id: product.id
          }
        )
        setRelated(res.data)
      } catch (error) {
        console.log("Error fetching related products:", error)
      }
    }

    fetchRelated()
  }, [product])

  if (!product) {
    return (
      <div className="text-center mt-40 text-2xl">
        Cart is empty
      </div>
    )
  }

  return (
    <div>

      {/* ================= MAIN PRODUCT SECTION ================= */}
      <div className="flex justify-center gap-40 text-black mt-20">

        <img
          src={product.image}
          alt={product.name}
          className="w-[300px] h-[300px] rounded-xl object-cover"
        />

        <div className="flex flex-col mt-10 gap-5 justify-center items-center text-xl font-serif italic border w-[550px] h-[600px] rounded-2xl p-6">

          <h1 className="text-3xl font-semibold">{product.name}</h1>

          <div className="flex flex-row gap-4 text-center">
            <h2>{product.description}</h2>
            <h2 className="font-semibold">{product.price}</h2>
          </div>

          <p className="text-center text-gray-600 px-6">
            Captures the essence of a carefree breeze through wildflower fields,
            evoking pure joy with its light and refreshing notes.
          </p>

          <div className="flex items-center gap-4">
            Qty
            <div className="w-16 h-10 border flex items-center justify-center rounded">
              {count}
            </div>
            <button
              onClick={() => setCount(count + 1)}
              className="px-3 text-xl"
            >
              +
            </button>
            <button
              onClick={() => count > 1 && setCount(count - 1)}
              className="px-3 text-xl"
            >
              -
            </button>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="w-72 h-10 bg-green-400 rounded-2xl hover:bg-green-500 transition"
          >
            Buy
          </button>

          <div className="flex justify-between items-center w-80 h-10 bg-pink-100 px-4 rounded">
            SCENT NOTES <button>+</button>
          </div>

          <div className="flex justify-between items-center w-80 h-10 bg-pink-100 px-4 rounded">
            INGREDIENTS <button>+</button>
          </div>

        </div>
      </div>

      <div className="mt-20 px-20">

        <h1 className="font-serif italic text-4xl text-center mb-10">
          Things Related To Your Taste....
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {related.length > 0 ? (
            related.map(item => (
              <div
                key={item._id}
                className="border rounded-xl p-4 hover:shadow-lg transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-[200px] w-full object-cover rounded"
                />
                <h2 className="mt-4 font-semibold">{item.name}</h2>
                <p className="text-gray-600">₹{item.price}</p>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-500">
              No related products found
            </p>
          )}
        </div>
      </div>

    </div>
  )
}

export default Cart
