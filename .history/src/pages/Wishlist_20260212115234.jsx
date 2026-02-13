import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import Footer from '../components/Footer'
import axios from 'axios'
import API_URL from '../config/api'
import { Trash2, Heart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Wishlist = () => {
  const { user } = useContext(AuthContext)
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    fetchWishlist()
  }, [user])

  const fetchWishlist = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/wishlist`,
        {
          headers: { Authorization: `Bearer ${user.token}` }
        }
      )
      setWishlist(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const removeItem = async (productId) => {
    try {
      await axios.delete(
        `${API_URL}/api/wishlist/${productId}`,
        {
          headers: { Authorization: `Bearer ${user.token}` }
        }
      )
      setWishlist(wishlist.filter(item => item._id !== productId))
    } catch (error) {
      console.error(error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent">
          My Wishlist
        </h1>

        {wishlist.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-600 mb-6">Your wishlist is empty</p>
            <button
              onClick={() => navigate('/shop')}
              className="px-8 py-3 bg-gradient-to-r from-pink-400 to-purple-600 text-white rounded-full hover:shadow-lg transition"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlist.map(product => (
              <div key={product._id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                  <button
                    onClick={() => removeItem(product._id)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent mb-4">
                  ₹{product.price}
                </p>
                <button
                  onClick={() => navigate('/cart', { state: { product: { ...product, id: product._id, price: `₹${product.price}` } } })}
                  className="w-full py-2 bg-gradient-to-r from-pink-400 to-purple-600 text-white rounded-lg hover:shadow-lg transition"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Wishlist
