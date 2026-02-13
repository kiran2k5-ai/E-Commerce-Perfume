import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import Footer from '../components/Footer'
import axios from 'axios'
import API_URL from '../config/api'
import { Trash2, Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Favorites = () => {
  const { user } = useContext(AuthContext)
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    fetchFavorites()
  }, [user])

  const fetchFavorites = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/favorites`,
        {
          headers: { Authorization: `Bearer ${user.token}` }
        }
      )
      setFavorites(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const removeItem = async (productId) => {
    try {
      await axios.delete(
        `${API_URL}/api/favorites/${productId}`,
        {
          headers: { Authorization: `Bearer ${user.token}` }
        }
      )
      setFavorites(favorites.filter(item => item._id !== productId))
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
        <div className="flex items-center justify-center gap-3 mb-12">
          <Star className="text-yellow-500 fill-yellow-500" size={32} />
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent">
            My Favorites
          </h1>
          <Star className="text-yellow-500 fill-yellow-500" size={32} />
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-20">
            <Star className="mx-auto mb-6 text-gray-300" size={64} />
            <p className="text-2xl text-gray-600 mb-6">No favorites yet</p>
            <p className="text-gray-500 mb-8">Start adding your favorite perfumes!</p>
            <button
              onClick={() => navigate('/shop')}
              className="px-8 py-3 bg-gradient-to-r from-pink-400 to-purple-600 text-white rounded-full hover:shadow-lg transition"
            >
              Explore Perfumes
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.map(product => (
              <div key={product._id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition group">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                  <button
                    onClick={() => removeItem(product._id)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition shadow-lg"
                  >
                    <Trash2 size={20} />
                  </button>
                  <div className="absolute top-2 left-2 bg-yellow-400 text-white p-2 rounded-full shadow-lg">
                    <Star size={20} className="fill-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                <p className="text-sm text-gray-500 mb-4">Category: {product.category}</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent mb-4">
                  ₹{product.price}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate('/cart', { 
                      state: { 
                        product: { 
                          ...product, 
                          id: product._id, 
                          price: `₹${product.price}` 
                        } 
                      } 
                    })}
                    className="flex-1 py-2 bg-gradient-to-r from-pink-400 to-purple-600 text-white rounded-lg hover:shadow-lg transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Favorites
