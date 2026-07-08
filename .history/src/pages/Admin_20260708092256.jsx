import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import API_URL from '../config/api'
import AdminSidebar from '../components/AdminSidebar'

const Admin = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [subscribers, setSubscribers] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [showEditModal, setShowEditModal] = useState(false)
  const [editProduct, setEditProduct] = useState(null)
  const [editFields, setEditFields] = useState({ name: '', description: '', price: '', image: '', category: '', countInStock: 0 })

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/')
      return
    }
    fetchData()
  }, [user, activeTab, navigate])

  const fetchData = async () => {
    setLoading(true)
    setMessage('')

    try {
      if (activeTab === 'products') {
        const { data } = await axios.get(`${API_URL}/api/product`)
        setProducts(Array.isArray(data) ? data : data.products || [])
      } else if (activeTab === 'orders') {
        const { data } = await axios.get(`${API_URL}/api/orders/all`, {
          headers: { Authorization: `Bearer ${user.token}` }
        })
        setOrders(data)
      } else if (activeTab === 'subscribers') {
        const { data } = await axios.get(`${API_URL}/api/newsletter/subscribers`, {
          headers: { Authorization: `Bearer ${user.token}` }
        })
        setSubscribers(data)
      } else if (activeTab === 'users') {
        const { data } = await axios.get(`${API_URL}/api/users`, {
          headers: { Authorization: `Bearer ${user.token}` }
        })
        setUsers(data)
      } else {
        const [prodRes, orderRes, subRes, userRes] = await Promise.all([
          axios.get(`${API_URL}/api/product`),
          axios.get(`${API_URL}/api/orders/all`, { headers: { Authorization: `Bearer ${user.token}` } }),
          axios.get(`${API_URL}/api/newsletter/subscribers`, { headers: { Authorization: `Bearer ${user.token}` } }),
          axios.get(`${API_URL}/api/users`, { headers: { Authorization: `Bearer ${user.token}` } })
        ])

        setProducts(Array.isArray(prodRes.data) ? prodRes.data : prodRes.data.products || [])
        setOrders(orderRes.data)
        setSubscribers(subRes.data)
        setUsers(userRes.data)
      }
    } catch (error) {
      console.error(error)
      setMessage(error.response?.data?.message || 'Unable to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.put(`${API_URL}/api/orders/${orderId}/status`, { status }, {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      await fetchData()
      setMessage('Order status updated')
    } catch (error) {
      console.error(error)
      setMessage('Could not update order status')
    }
  }

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/product/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      await fetchData()
      setMessage('Product deleted successfully')
    } catch (error) {
      console.error(error)
      setMessage('Unable to delete product')
    }
  }

  const updateUserRole = async (id, role) => {
    try {
      await axios.put(`${API_URL}/api/users/${id}/role`, { role }, {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      await fetchData()
      setMessage('User role updated')
    } catch (error) {
      console.error(error)
      setMessage('Unable to update role')
    }
  }

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/users/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      await fetchData()
      setMessage('User removed')
    } catch (error) {
      console.error(error)
      setMessage('Unable to delete user')
    }
  }

  const openEdit = (product) => {
    setEditProduct(product)
    setEditFields({
      name: product.name || '',
      description: product.description || '',
      price: product.price || '',
      image: product.image || '',
      category: product.category || '',
      countInStock: product.countInStock || 0
    })
    setShowEditModal(true)
  }

  const submitEdit = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`${API_URL}/api/product/${editProduct._id}`, editFields, {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      setMessage('Product updated')
      setShowEditModal(false)
      setEditProduct(null)
      await fetchData()
    } catch (error) {
      console.error(error)
      setMessage(error.response?.data?.message || 'Unable to update product')
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
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-white to-purple-50 text-gray-900">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="space-y-6">
            <div className="rounded-4xl bg-white/90 shadow-gray-500 p-6 backdrop-blur-md">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-3xl uppercase font-bold text-pink-500">Admin summary</p>
                  {/* <h1 className="text-3xl font-bold mt-2">Humanized dashboard</h1> */}
                </div>
                <span className="rounded-full bg-purple-100 px-4 py-2 text-sm text-purple-700">
                  Welcome back, {user.name}
                </span>
              </div>
              {/* Admin intro removed as requested - streamlined dashboard */}
            </div>

            {message && (
              <div className="rounded-3xl border border-green-200 bg-green-50 px-5 py-4 text-sm text-green-900">
                {message}
              </div>
            )}

            {loading ? (
              <div className="rounded-3xl bg-white/90 shadow-xl p-8 text-center">Loading dashboard...</div>
            ) : (
              <>
                {activeTab === 'overview' && (
                  <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-4xl bg-white p-6 shadow-lg">
                      <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Products</p>
                      <p className="mt-4 text-4xl font-bold">{products.length}</p>
                      <p className="mt-2 text-sm text-gray-600">Total products</p>
                    </div>
                    <div className="rounded-4xl bg-white p-6 shadow-lg">
                      <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Orders</p>
                      <p className="mt-4 text-4xl font-bold">{orders.length}</p>
                      <p className="mt-2 text-sm text-gray-600">Total orders</p>
                    </div>
                    <div className="rounded-4xl bg-white p-6 shadow-lg">
                      <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Subscribers</p>
                      <p className="mt-4 text-4xl font-bold">{subscribers.length}</p>
                      <p className="mt-2 text-sm text-gray-600">Current subscribers</p>
                    </div>
                    <div className="rounded-4xl bg-white p-6 shadow-lg">
                      <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Users</p>
                      <p className="mt-4 text-4xl font-bold">{users.length}</p>
                      <p className="mt-2 text-sm text-gray-600">Registered accounts</p>
                    </div>
                  </div>
                )}

                {activeTab === 'products' && (
                  <div className="rounded-4xl bg-white p-6 shadow-xl">
                    <h2 className="text-xl font-semibold mb-6">Product catalog</h2>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-gray-200 text-sm uppercase text-gray-500">
                            <th className="p-4">Product</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Stock</th>
                            <th className="p-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map(product => (
                            <tr key={product._id} className="border-b border-gray-100 hover:bg-gray-50">
                              <td className="p-4 flex items-center gap-3">
                                <img src={product.image} alt={product.name} className="h-16 w-16 rounded-2xl object-cover" />
                                <div>
                                  <p className="font-semibold">{product.name}</p>
                                  <p className="text-sm text-gray-500">{product.description.slice(0, 40)}...</p>
                                </div>
                              </td>
                              <td className="p-4">{product.category}</td>
                              <td className="p-4">₹{product.price}</td>
                              <td className="p-4">{product.countInStock}</td>
                              <td className="p-4 flex flex-wrap gap-2">
                                <button onClick={() => openEdit(product)} className="rounded-2xl bg-purple-600 px-4 py-2 text-sm text-white">Edit</button>
                                <button onClick={() => deleteProduct(product._id)} className="rounded-2xl bg-red-500 px-4 py-2 text-sm text-white">Delete</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeTab === 'orders' && (
                  <div className="rounded-4xl bg-white p-6 shadow-xl space-y-4">
                    <h2 className="text-xl font-semibold">Orders</h2>
                    {orders.map(order => (
                      <div key={order._id} className="rounded-3xl border border-gray-200 p-5">
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                          <div>
                            <p className="font-semibold">Order #{order._id.slice(-8)}</p>
                            <p className="text-sm text-gray-500">{order.userName} · {order.userEmail}</p>
                          </div>
                          <div className={`rounded-full px-4 py-2 text-sm font-semibold ${getStatusColor(order.status)}`}>
                            {order.status}
                          </div>
                        </div>
                        <div className="mt-4 grid gap-4 md:grid-cols-3">
                          <div>
                            <p className="text-sm uppercase text-gray-500">Total</p>
                            <p className="font-semibold">₹{order.totalAmount}</p>
                          </div>
                          <div>
                            <p className="text-sm uppercase text-gray-500">Created</p>
                            <p className="font-semibold">{new Date(order.createdAt).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-sm uppercase text-gray-500">Items</p>
                            <p className="font-semibold">{order.items.length}</p>
                          </div>
                        </div>
                        <div className="mt-4 flex flex-wrap items-center gap-3">
                          <label className="text-sm font-semibold">Status</label>
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                            className="rounded-2xl border border-gray-200 px-4 py-2 text-sm"
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
                  <div className="rounded-4xl bg-white p-6 shadow-xl overflow-x-auto">
                    <h2 className="text-xl font-semibold mb-4">Newsletter subscribers</h2>
                    <table className="w-full text-left">
                      <thead className="border-b border-gray-200 text-sm uppercase text-gray-500">
                        <tr>
                          <th className="p-4">Email</th>
                          <th className="p-4">Subscribed</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subscribers.map(sub => (
                          <tr key={sub._id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="p-4">{sub.email}</td>
                            <td className="p-4">{new Date(sub.subscribedAt).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === 'users' && (
                  <div className="rounded-4xl bg-white p-6 shadow-xl overflow-x-auto">
                    <h2 className="text-xl font-semibold mb-4">Users</h2>
                    <table className="w-full text-left">
                      <thead className="border-b border-gray-200 text-sm uppercase text-gray-500">
                        <tr>
                          <th className="p-4">Name</th>
                          <th className="p-4">Email</th>
                          <th className="p-4">Role</th>
                          <th className="p-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map(userItem => (
                          <tr key={userItem._id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="p-4">{userItem.name}</td>
                            <td className="p-4">{userItem.email}</td>
                            <td className="p-4 capitalize">{userItem.role}</td>
                            <td className="p-4 flex flex-wrap gap-2">
                              <button
                                onClick={() => updateUserRole(userItem._id, userItem.role === 'admin' ? 'user' : 'admin')}
                                className="rounded-2xl bg-blue-600 px-4 py-2 text-sm text-white"
                              >
                                {userItem.role === 'admin' ? 'Demote' : 'Promote'}
                              </button>
                              <button
                                onClick={() => deleteUser(userItem._id)}
                                className="rounded-2xl bg-red-500 px-4 py-2 text-sm text-white"
                              >
                                Delete
                              </button>
                            </td>
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
      </div>
      {/* Edit product modal */}
      {showEditModal && editProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-2xl rounded-4xl bg-white p-6 shadow-2xl">
            <h3 className="text-xl font-semibold mb-4">Edit product</h3>
            <form onSubmit={(e) => submitEdit(e)} className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <input value={editFields.name} onChange={(e) => setEditFields(f => ({ ...f, name: e.target.value }))} className="w-full rounded-2xl border px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <input value={editFields.category} onChange={(e) => setEditFields(f => ({ ...f, category: e.target.value }))} className="w-full rounded-2xl border px-3 py-2" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Description</label>
                <textarea value={editFields.description} onChange={(e) => setEditFields(f => ({ ...f, description: e.target.value }))} className="w-full rounded-2xl border px-3 py-2" rows={4} />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Price</label>
                  <input type="number" value={editFields.price} onChange={(e) => setEditFields(f => ({ ...f, price: e.target.value }))} className="w-full rounded-2xl border px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm font-medium">Stock</label>
                  <input type="number" value={editFields.countInStock} onChange={(e) => setEditFields(f => ({ ...f, countInStock: e.target.value }))} className="w-full rounded-2xl border px-3 py-2" />
                </div>
                <div>
                  <label className="text-sm font-medium">Image URL</label>
                  <input value={editFields.image} onChange={(e) => setEditFields(f => ({ ...f, image: e.target.value }))} className="w-full rounded-2xl border px-3 py-2" />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-2">
                <button type="button" onClick={() => { setShowEditModal(false); setEditProduct(null) }} className="rounded-2xl border px-4 py-2">Cancel</button>
                <button type="submit" className="rounded-2xl bg-purple-600 px-4 py-2 text-white">Save changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Admin
