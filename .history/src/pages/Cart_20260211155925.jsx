import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import Footer from "../components/Footer"

const Cart = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const product = location.state?.product
  const [count, setCount] = useState(1)
  const [related, setRelated] = useState([])

  if (!product) {
    return (
      <div className="text-center mt-40 text-2xl">
        Cart is empty
      </div>
    )
  }

  const numericPrice =
    typeof product.price === "string"
      ? Number(product.price.replace("₹", ""))
      : product.price

  const totalPrice = numericPrice * count

  useEffect(() => {
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

  return (
    <div>

      <div className="flex justify-center gap-40 text-black mt-20">

        <img
          src={product.image}
          alt={product.name}
          className="mt-10 w-[300px] h-[300px] rounded-xl object-cover"
        />

        <div className="flex flex-col gap-15 justify-center items-center text-xl font-serif italic border w-[550px] h-[600px] rounded-2xl p-6">

          <h1 className="text-3xl font-semibold">
            {product.name}
          </h1>

          <p className="text-center text-gray-600">
            {product.description}
          </p>

          <p className="text-2xl font-bold">
            ₹{totalPrice}
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
            onClick={() =>
              navigate("/checkout", {
                state: {
                  product: {
                    ...product,
                    price: totalPrice,
                    quantity: count
                  }
                }
              })
            }
            className="w-72 h-10 bg-green-500 text-white rounded-2xl hover:bg-green-600 transition"
          >
            Proceed to Checkout
          </button>

        </div>
      </div>

      <div className="mt-20 px-20">
        <h1 className="font-serif italic text-4xl text-center mb-10">
          Things Related To Your Taste....
        </h1>

        {related.length > 0 && (
          <Carousel
            infinite
            autoPlay
            autoPlaySpeed={2500}
            responsive={{
              desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
              tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
              mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
            }}
          >
            {related.map(item => (
              <div key={item._id} className="px-4">
                <div className="border rounded-xl p-4 bg-white">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-[200px] w-full object-cover rounded"
                  />
                  <h2 className="mt-4 font-semibold text-center">
                    {item.name}
                  </h2>
                  <p className="text-center">₹{item.price}</p>
                  <button onClick={() => {navigate('/')}} className='w-40 h-12 bg-green-300 rounded-3xl'>Shop Now</button>
        
                </div>
              </div>
            ))}
          </Carousel>
        )}
      </div>

      <div className="mt-20">
        <Footer />
      </div>

    </div>
  )
}

export default Cart
