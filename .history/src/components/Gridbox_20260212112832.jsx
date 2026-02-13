import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { CartContext } from '../context/CartContext'
import { Heart, Star } from 'lucide-react'
import axios from 'axios'
import API_URL from '../config/api'

const Gridbox = ({ id, image, name, description, price, category }) => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const { addToCart } = useContext(CartContext)
  const [wishlisted, setWishlisted] = useState(false)
  const [favorited, setFavorited] = useState(false)

  const handleAddToCart = () => {
    const numericPrice = typeof price === 'string' 
      ? Number(price.replace('₹', ''))
      : price

    addToCart({
      id,
      image,
      name,
      description,
      price: numericPrice,
      category
    })
  }

  const handleWishlist = async (e) => {
    e.stopPropagation()
    
    if (!user) {
      navigate('/login')
      return
    }

    try {
      if (!wishlisted) {
        await axios.post(
          `${API_URL}/api/wishlist`,
          { productId: id },
          { headers: { Authorization: `Bearer ${user.token}` } }
        )
        setWishlisted(true)
      } else {
        await axios.delete(
          `${API_URL}/api/wishlist/${id}`,
          { headers: { Authorization: `Bearer ${user.token}` } }
        )
        setWishlisted(false)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleFavorite = async (e) => {
    e.stopPropagation()
    
    if (!user) {
      navigate('/login')
      return
    }

    try {
      if (!favorited) {
        await axios.post(
          `${API_URL}/api/favorites`,
          { productId: id },
          { headers: { Authorization: `Bearer ${user.token}` } }
        )
        setFavorited(true)
      } else {
        await axios.delete(
          `${API_URL}/api/favorites/${id}`,
          { headers: { Authorization: `Bearer ${user.token}` } }
        )
        setFavorited(false)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const viewDetails = () => {
    navigate("/cart", {
      state: {
        product: {
          id,
          image,
          name,
          description,
          price,
          category
        }
      }
    })
  }

  return (
    <div className="group flex flex-col items-center text-center gap-3 rounded-xl bg-white p-4 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
      <div className="relative overflow-hidden rounded-lg w-full">
        <img
          src={image}
          alt={name}
          loading='lazy'
          className="w-full h-68 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {user && (
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              onClick={handleWishlist}
              className="bg-white p-2 rounded-full shadow-lg hover:scale-110 transition"
              title="Add to Wishlist"
            >
              <Heart
                size={20}
                className={wishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}
              />
            </button>
            <button
              onClick={handleFavorite}
              className="bg-white p-2 rounded-full shadow-lg hover:scale-110 transition"
              title="Add to Favorites"
            >
              <Star
                size={20}
                className={favorited ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}
              />
            </button>
          </div>
        )}
      </div>

      <div className="space-y-1 w-full">
        <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
        <p className="text-xs text-gray-500 italic">{description}</p>
        <p className="text-lg font-bold bg-gradient-to-r from-pink-300 to-purple-600 bg-clip-text text-transparent">
          {typeof price === 'string' ? price : `₹${price}`}
        </p>
      </div>

      <div className="flex gap-2 w-full">
        <button
          className="flex-1 px-4 py-2 text-sm bg-gradient-to-r from-pink-300 to-purple-600 text-white rounded-full hover:shadow-md transition"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
        <button
          className="flex-1 px-4 py-2 text-sm border-2 border-purple-600 text-purple-600 rounded-full hover:bg-purple-50 transition"
          onClick={viewDetails}
        >
          View Details
        </button>
      </div>
    </div>
  )
}

export default React.memo(Gridbox)
