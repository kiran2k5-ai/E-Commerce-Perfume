import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import Footer from '../components/Footer'
import axios from 'axios'

const Profile = () => {
  const { user, updateUser } = useContext(AuthContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [scentProfile, setScentProfile] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [orders, setOrders] = useState([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setScentProfile(user.scentProfile || '')
      fetchOrders()
    }
  }, [user])

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(
        'https://e-commerce-perfume-backend.onrender.com/api/orders/myorders',
        {
          headers: { Authorization: `Bearer ${user.token}` }
        }
      )
      setOrders(data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')

    if (password && password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      const updateData = { name, email, scentProfile }
      if (password) updateData.password = password

      const { data } = await axios.put(
        'https://e-commerce-perfume-backend.onrender.com/api/auth/profile',
        updateData,
        {
          headers: { Authorization: `Bearer ${user.token}` }
        }
      )
      
      updateUser(data)
      setMessage('Profile updated successfully')
      setPassword('')
      setConfirmPassword('')
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed')
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent">
          My Profile
        </h1>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Account Information</h2>

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

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Scent Profile
                </label>
                <select
                  value={scentProfile}
                  onChange={(e) => setScentProfile(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Not set</option>
                  <option value="floral">Floral</option>
                  <option value="woody">Woody</option>
                  <option value="citrus">Citrus</option>
                  <option value="oriental">Oriental</option>
                  <option value="fresh">Fresh</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password (optional)
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-pink-400 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Update Profile'}
              </button>
            </form>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Order History</h2>
            
            {orders.length === 0 ? (
              <p className="text-gray-600">No orders yet</p>
            ) : (
              <div className="space-y-4 max-h-[500px] overflow-y-auto">
                {orders.map(order => (
                  <div key={order._id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm text-gray-500">
                        Order #{order._id.slice(-8)}
                      </p>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="font-semibold text-lg">₹{order.totalAmount}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      {order.items.length} item(s)
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Profile
