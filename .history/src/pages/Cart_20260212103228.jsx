import React, { useEffect, useState, useContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { CartContext } from "../context/CartContext"
import axios from "axios"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import Footer from "../components/Footer"
import ReviewForm from "../components/ReviewForm"
import ReviewList from "../components/ReviewList"
import { Trash2, Plus, Minus } from "lucide-react"

const Cart = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { cart, addToCart, removeFromCart, updateQuantity, getTotal } = useContext(CartContext)
  
  const singleProduct = location.state?.product
  const [related, setRelated] = useState([])
  const [activeTab, setActiveTab] = useState('cart')

  useEffect(() => {
    window.scrollTo(0, 0)

    if (singleProduct) {
      addToCart({
        id: singleProduct.id,
        image: singleProduct.image,
        name: singleProduct.name,
        description: singleProduct.description,
        price: typeof singleProduct.price === 'string' 
          ? Number(singleProduct.price.replace('₹', ''))
          : singleProduct.price,
        category: singleProduct.category
      }, 1)

      fetchRelated(singleProduct.category, singleProduct.id)
      setActiveTab('details')
    }
  }, [singleProduct])

  const fetchRelated = async (category, id) => {
    try {
      const res = await axios.post(
        "https://e-commerce-perfume-backend.onrender.com/api/product/related",
        { category, id }
      )
      setRelated(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleCheckout = () => {
    if (cart.length === 0) return

    navigate("/checkout", {
      state: {
        product: {
          items: cart,
          totalPrice: getTotal()
        }
      }
    })
  }

  if (activeTab === 'details' && singleProduct) {
    return (
      <div>
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            <img
              src={singleProduct.image}
              alt={singleProduct.name}
              className="w-full lg:w-[400px] h-[400px] rounded-xl object-cover"
            />

            <div className="flex-1">
              <h1 className="text-4xl font-semibold mb-4">
                {singleProduct.name}
              </h1>

              <p className="text-gray-600 text-lg mb-6">
                {singleProduct.description}
              </p>

              <p className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent mb-6">
                ₹{typeof singleProduct.price === 'string' 
                  ? singleProduct.price.replace('₹', '')
                  : singleProduct.price}
              </p>

              <div className="flex gap-4 mb-8">
                <button
                  onClick={() => navigate('/cart')}
                  className="px-8 py-3 bg-gradient-to-r from-pink-400 to-purple-600 text-white rounded-lg hover:shadow-lg transition"
                >
                  View Cart ({cart.length} items)
                </button>
                <button
                  onClick={handleCheckout}
                  className="px-8 py-3 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition"
                >
                  Checkout
                </button>
              </div>

              <div className="mt-10">
                <ReviewForm 
                  productId={singleProduct.id} 
                  onReviewAdded={() => {}}
                />
                <ReviewList productId={singleProduct.id} />
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-20">
              <h2 className="text-3xl font-serif italic text-center mb-10">
                You Might Also Like
              </h2>
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
                    <div className="border rounded-xl p-4 bg-white hover:shadow-lg transition">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-[200px] w-full object-cover rounded"
                      />
                      <h3 className="mt-4 font-semibold text-center">
                        {item.name}
                      </h3>
                      <p className="text-center">₹{item.price}</p>
                      <button
                        onClick={() => navigate('/cart', { 
                          state: { 
                            product: { 
                              id: item._id, 
                              image: item.image,
                              name: item.name,
                              description: item.description,
                              price: item.price,
                              category: item.category
                            } 
                          } 
                        })}
                        className="mt-3 w-full px-4 py-2 bg-gradient-to-r from-pink-300 to-purple-600 text-white rounded-full hover:shadow-md transition"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          )}
        </div>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent">
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-600 mb-6">Your cart is empty</p>
            <button
              onClick={() => navigate('/shop')}
              className="px-8 py-3 bg-gradient-to-r from-pink-400 to-purple-600 text-white rounded-full hover:shadow-lg transition"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-6 border-b py-6 last:border-b-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                    <p className="text-lg font-bold text-purple-600 mt-2">
                      ₹{item.price}
                    </p>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-600 transition"
                    >
                      <Trash2 size={20} />
                    </button>

                    <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-3 py-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="hover:text-purple-600 transition"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="hover:text-purple-600 transition"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <p className="font-bold text-lg">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}

              <div className="mt-6 pt-6 border-t">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-2xl font-semibold">Total:</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent">
                    ₹{getTotal()}
                  </span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-4 bg-gradient-to-r from-pink-400 to-purple-600 text-white rounded-xl text-lg font-semibold hover:shadow-lg transition"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default Cart
