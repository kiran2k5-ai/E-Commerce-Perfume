import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import API_URL from '../config/api'
import { Star } from 'lucide-react'

const ReviewForm = ({ productId, onReviewAdded }) => {
  const { user } = useContext(AuthContext)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      setError('Please login to leave a review')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${API_URL}/api/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ productId, rating, comment })
      })

      if (!response.ok) throw new Error('Failed to submit review')

      setRating(5)
      setComment('')
      if (onReviewAdded) onReviewAdded()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-50 p-6 rounded-lg mb-6">
      <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="focus:outline-none"
              >
                <Star
                  size={28}
                  className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Share your thoughts about this perfume..."
          />
        </div>

        <button
          type="submit"
          disabled={loading || !user}
          className="px-6 py-2 bg-gradient-to-r from-pink-400 to-purple-600 text-white rounded-lg hover:shadow-lg transition disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  )
}

export default ReviewForm
