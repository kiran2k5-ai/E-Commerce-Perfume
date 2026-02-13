import React, { useContext, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { CartContext } from "../context/CartContext"
import axios from "axios"

const Checkout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const { clearCart } = useContext(CartContext)
  
  const product = location.state?.product
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [country, setCountry] = useState("India")

  if (!product) {
    return (
      <div className="text-center mt-40 text-2xl">
        No product selected
      </div>
    )
  }

  if (!user) {
    navigate('/login')
    return null
  }

  const handlePayment = async () => {
    if (!address || !city || !postalCode) {
      alert('Please fill in all shipping details')
      return
    }

    try {
      const { data } = await axios.post(
        `${API_URL}/api/payment/create-order`,
        {
          amount: product.totalPrice || product.price
        }
      )

      const options = {
        key: "rzp_test_R5uZgmenogCy4j",
        amount: data.amount,
        currency: data.currency,
        name: "Perfume Store",
        description: product.items ? `${product.items.length} items` : product.name,
        order_id: data.id,
        handler: async function (response) {
          try {
            const orderData = {
              items: product.items || [{
                product: product.id,
                name: product.name,
                image: product.image,
                price: product.price,
                quantity: product.quantity || 1
              }],
              totalAmount: product.totalPrice || product.price,
              paymentId: response.razorpay_payment_id,
              shippingAddress: {
                address,
                city,
                postalCode,
                country
              }
            }

            await axios.post(
              `${API_URL}/api/orders`,
              orderData,
              { headers: { Authorization: `Bearer ${user.token}` } }
            )

            clearCart()
            alert("Payment Successful! Order placed.")
            navigate('/profile')
          } catch (error) {
            console.error(error)
            alert("Payment successful but order creation failed")
          }
        },
        theme: {
          color: "#ec4899"
        }
      }

      const rzp = new window.Razorpay(options)
      rzp.open()

    } catch (error) {
      console.log(error)
      alert("Payment initiation failed")
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-pink-50 via-white to-purple-50 p-10">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-4xl">
        <h1 className="text-4xl font-serif italic mb-8 text-center bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent">
          Checkout
        </h1>

        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Shipping Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Street address"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="City"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Postal Code</label>
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Postal code"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Country</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Country"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

            {product.items ? (
              <div className="space-y-3 mb-6">
                {product.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b pb-2">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mb-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="mt-2">Quantity: {product.quantity || 1}</p>
              </div>
            )}

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold">Total:</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent">
                  ₹{product.totalPrice || product.price}
                </span>
              </div>
            </div>

            <button
              onClick={handlePayment}
              className="w-full h-12 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-xl text-lg font-semibold hover:scale-105 transition"
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
