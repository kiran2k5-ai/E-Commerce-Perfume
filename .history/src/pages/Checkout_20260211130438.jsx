import React from "react"
import { useLocation } from "react-router-dom"
import axios from "axios"

const Checkout = () => {
  const location = useLocation()
  const product = location.state?.product

  if (!product) {
    return (
      <div className="text-center mt-40 text-2xl">
        No product selected
      </div>
    )
  }

  const handlePayment = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/payment/create-order",
        {
          amount: product.price
        }
      )

      const options = {
        key: "YOUR_RAZORPAY_KEY_ID",
        amount: data.amount,
        currency: data.currency,
        name: "Perfume Store",
        description: product.name,
        order_id: data.id,
        handler: function (response) {
          alert("Payment Successful")
          console.log(response)
        },
        theme: {
          color: "#ec4899"
        }
      }

      const rzp = new window.Razorpay(options)
      rzp.open()

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-50 via-white to-purple-50 flex justify-center items-center p-10">

      <div className="bg-white shadow-2xl rounded-2xl p-10 w-[900px] flex gap-10">

        {/* Product Image */}
        <div className="w-1/2 flex justify-center items-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-[350px] h-[350px] object-cover rounded-xl"
          />
        </div>

        {/* Order Summary */}
        <div className="w-1/2 flex flex-col justify-between">

          <div>
            <h1 className="text-4xl font-serif italic mb-6">
              Order Summary
            </h1>

            <h2 className="text-2xl font-semibold">
              {product.name}
            </h2>

            <p className="text-gray-600 mt-2">
              {product.description}
            </p>

            <div className="mt-6 text-xl font-semibold">
              Price: ₹{product.price}
            </div>
          </div>

          <button
            onClick={handlePayment}
            className="mt-10 w-full h-12 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-xl text-lg font-semibold hover:scale-105 transition"
          >
            Pay Now
          </button>

        </div>

      </div>

    </div>
  )
}

export default Checkout
