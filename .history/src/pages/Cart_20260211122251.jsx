import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from "axios"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"

const Cart = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const product = location.state?.product
  const [count, setCount] = useState(1)
  const [related, setRelated] = useState([])

  useEffect(() => {
    if (!product) return

    window.scrollTo(0, 0)

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
        console.log(error)
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

      <div className="flex justify-center gap-40 text-black mt-20">

        <img
          src={product.image}
          alt={product.name}
          className="mt-10 w-[300px] h-[300px] rounded-xl object-cover"
        />

        <div className="flex flex-col gap-5 justify-center items-center text-xl font-serif italic border w-[550px] h-[600px] rounded-2xl p-6">

          <h1 className="text-3xl font-semibold">
            {product.name}
          </h1>

          <div className="flex flex-col text-center gap-2">
            <p>{product.description}</p>
            <p className="font-semibold">{product.price}</p>
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
            <button onClick={() => setCount(count + 1)} className="px-3 text-xl">
              +
            </button>
            <button onClick={() => count > 1 && setCount(count - 1)} className="px-3 text-xl">
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

        {related.length > 0 ? (
          <Carousel
            arrows
            autoPlay
            autoPlaySpeed={1000}
            infinite
            keyBoardControl
            pauseOnHover
            swipeable
            draggable
            responsive={{
              desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 3
              },
              tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 2
              },
              mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1
              }
            }}
          >
            {related.map(item => (
              <div key={item._id} className="px-4">
                <div className="border rounded-xl p-4 hover:border-green-400 transition bg-white">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-[200px] w-full object-cover rounded"
                  />

                  <h2 className="mt-4 font-semibold text-center">
                    {item.name}
                  </h2>

                  <p className="text-gray-600 text-center">
                    ₹{item.price}
                  </p>

                  <button
                    className="mt-3 w-full px-5 py-2 text-sm bg-green-500 text-white rounded-full hover:shadow-md transition"
                    onClick={() =>
                      navigate("/cart", {
                        state: { product: item }
                      })
                    }
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </Carousel>
        ) : (
          <p className="text-center text-gray-500">
            No related products found
          </p>
        )}

      </div>

    </div>
  )
}

export default Cart
