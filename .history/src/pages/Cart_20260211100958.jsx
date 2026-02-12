import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Cart = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const product = location.state?.product
  const [count, setCount] = useState(1)

  if (!product) {
    return (
      <div className="text-center mt-40 text-2xl">
        Cart is empty
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-center gap-40 text-black">

        <img
          src={product.image}
          alt={product.name}
          className="w-[300px] h-[300px] mt-60 rounded-xl object-cover"
        />

        <div className="flex flex-col mt-32 gap-5 justify-center items-center text-xl font-light italic border w-[520px] h-[600px] rounded-2xl">
          <h1 className="text-3xl">{product.name}</h1>

          <div className="flex ">
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
            className="w-72 h-10 bg-green-400 rounded-2xl"
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

      <div className='mt-20'>
        <div className='flex justify-center items-center'><h1 className='fonnt-medium italic text-'>Things Related To Your Taste....</h1></div>
      </div>
    </div>
  )
}

export default Cart
