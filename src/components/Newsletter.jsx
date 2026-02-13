import React, { useState } from 'react'
import Footer from '../components/Footer'
import axios from 'axios'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')
    setLoading(true)

    try {
      await axios.post(`${API_URL}/api/newsletter/subscribe`, {
        email
      })
      setMessage('Successfully subscribed to our newsletter!')
      setEmail('')
    } catch (err) {
      setError(err.response?.data?.message || 'Subscription failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gradient-to-r from-pink-100 to-purple-100 py-12 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          Stay Updated with Exclusive Offers
        </h2>
        <p className="text-gray-700 mb-6">
          Subscribe to our newsletter and get 10% off your first order!
        </p>

        {message && (
          <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-4">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
          >
            {loading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Newsletter
