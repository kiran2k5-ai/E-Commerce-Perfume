import React from 'react'

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'products', label: 'Products' },
    { id: 'orders', label: 'Orders' },
    { id: 'subscribers', label: 'Subscribers' },
    { id: 'users', label: 'Users' }
  ]

  return (
    <aside className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 w-full md:w-72">
      <div className="text-center mb-8">
        <p className="text-sm uppercase tracking-[0.4em] text-pink-500">Management</p>
        <h2 className="text-2xl font-semibold mt-2">Admin Panel</h2>
      </div>

      <div className="space-y-3">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full text-left px-4 py-3 rounded-2xl transition flex items-center gap-3 font-medium ${
              activeTab === tab.id ? 'bg-linear-to-r from-pink-400 to-purple-500 text-white shadow-lg' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-10 text-sm text-gray-500 space-y-3">
        <div>
          <p className="font-semibold text-gray-900">Tips</p>
          <p>Use this panel to manage products, orders, subscribers and users.</p>
        </div>
        <div>
          <p className="font-semibold text-gray-900">Live data</p>
          <p>Every action updates the database and keeps the dashboard in sync.</p>
        </div>
      </div>
    </aside>
  )
}

export default AdminSidebar
