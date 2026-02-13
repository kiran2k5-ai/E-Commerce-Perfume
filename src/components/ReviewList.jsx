import React, { useState, useEffect } from 'react'
import API_URL from '../config/api'
import { Star } from 'lucide-react'

const ReviewList = ({ productId }) => {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReviews()
  }, [productId])

  const fetchReviews = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/reviews/product/${productId}`
      )
      const data = await response.json()
      setReviews(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0

  if (loading) {
    return <div className="text-center py-4">Loading reviews...</div>
  }

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">Customer Reviews</h3>
        {reviews.length > 0 && (
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  size={20}
                  className={star <= averageRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="text-lg font-semibold">{averageRating}</span>
            <span className="text-gray-600">({reviews.length} reviews)</span>
          </div>
        )}
      </div>

      {reviews.length === 0 ? (
        <p className="text-gray-600">No reviews yet. Be the first to review!</p>
      ) : (
        <div className="space-y-4">
          {reviews.map(review => (
            <div key={review._id} className="border-b pb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      size={16}
                      className={star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="font-semibold">{review.userName}</span>
                <span className="text-gray-500 text-sm">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ReviewList
