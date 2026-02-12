import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from "axios"

import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCoverflow, Navigation } from "swiper/modules"

import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/navigation"

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
            category: product.category
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

        <div className="flex flex-col gap-6 justify-center items-center text-xl font-serif italic border w-[550px] h-[500px] rounded-2xl p-6">
          <h1 className="text-3xl font-semibold">{product.name}</h1>

          <div className="flex flex-col gap-2 text-center">
            <p>{product.description}</p>
            <p className="font-bold text-lg">{product.price}</p>
          </div>

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
        </div>
      </div>

      {/* ================= RELATED PRODUCTS CAROUSEL ================= */}
      <div className="mt-32 px-20">

        <h1 className="font-serif italic text-4xl text-center mb-16">
          Things Related To Your Taste....
        </h1>

        {related.length > 0 ? (
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            navigation={true}
            coverflowEffect={{
              rotate: 30,
              stretch: 0,
              depth: 150,
              modifier: 1,
              slideShadows: false,
            }}
            modules={[EffectCoverflow, Navigation]}
            className="w-full py-10"
          >
            {related.map(item => (
              <SwiperSlide key={item._id} className="w-[300px]">
                <div className="bg-white rounded-3xl shadow-xl p-6 text-center transition-all duration-300 hover:scale-105">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-[200px] w-full object-cover rounded-xl"
                  />
                  <h2 className="mt-4 text-lg font-semibold">
                    {item.name}
                  </h2>
                  <p className="text-gray-600">
                    ₹{item.price}
                  </p>

                  <button
                    onClick={() =>
                      navigate("/cart", {
                        state: { product: item }
                      })
                    }
                    className="mt-4 px-4 py-2 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-full"
                  >
                    View
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
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
