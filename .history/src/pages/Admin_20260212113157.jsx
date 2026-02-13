import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import API_URL from '../config/api'
import Footer from '../components/Footer'

const Admin = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('products')
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [subscribers, setSubscribers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/')
      return
    }
    fetchData()
  }, [user, activeTab])

  const fetchData = async () => {
    setLoading(true)
    try {
      if (activeTab === 'products') {
        const { data } = await axios.get(`${API_URL}/api/product`)
        setProducts(Array.isArray(data) ? data : data.products || [])
      } else if (activeTab === 'orders') {
        const { data } = await axios.get(
          `${API_URL}/api/orders/all`,
          { headers: { Authorization: `Bearer ${user.token}` } }
        )
        setOrders(data)
      } else if (activeTab === 'subscribers') {
        const { data } = await axios.get(
          `${API_URL}/api/newsletter/subscribers`,
          { headers: { Authorization: `Bearer ${user.token}` } }
        )
        setSubscribers(data)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.put(
        `${API_URL}/api/orders/${orderId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${user.token}` } }
      )
      fetchData()
    } catch (error) {
      console.error(error)
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

  if (!user || user.role !== 'admin') {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex gap-4 mb-6 border-b">
            {['products', 'orders', 'subscribers'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-semibold capitalize ${
                  activeTab === tab
                    ? 'border-b-2 border-purple-600 text-purple-600'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : (
            <>
              {activeTab === 'products' && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4">Image</th>
                        <th className="text-left p-4">Name</th>
                        <th className="text-left p-4">Category</th>
                        <th className="text-left p-4">Price</th>
                        <th className="text-left p-4">Stock</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(product => (
                        <tr key={product._id} className="border-b hover:bg-gray-50">
                          <td className="p-4">
                            <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                          </td>
                          <td className="p-4">{product.name}</td>
                          <td className="p-4">{product.category}</td>
                          <td className="p-4">₹{product.price}</td>
                          <td className="p-4">{product.countInStock}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="space-y-4">
                  {orders.map(order => (
                    <div key={order._id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="font-semibold">Order #{order._id.slice(-8)}</p>
                          <p className="text-sm text-gray-600">{order.userName} - {order.userEmail}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(order.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">₹{order.totalAmount}</p>
                          <p className="text-sm text-gray-600">{order.items.length} items</p>
                        </div>
                      </div>
                      <div className="mb-4">
                        <p className="text-sm font-semibold mb-2">Items:</p>
                        {order.items.map((item, idx) => (
                          <p key={idx} className="text-sm text-gray-600">
                            {item.name} x {item.quantity} - ₹{item.price}
                          </p>
                        ))}
                      </div>
                      <div className="flex items-center gap-4">
                        <label className="text-sm font-semibold">Status:</label>
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                          className={`px-4 py-2 rounded-lg ${getStatusColor(order.status)}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'subscribers' && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4">Email</th>
                        <th className="text-left p-4">Subscribed Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscribers.map(sub => (
                        <tr key={sub._id} className="border-b hover:bg-gray-50">
                          <td className="p-4">{sub.email}</td>
                          <td className="p-4">{new Date(sub.subscribedAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Admin
