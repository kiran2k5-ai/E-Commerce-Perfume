import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { CartContext } from '../context/CartContext'
import { Heart, ShoppingCart, User, LogOut, Menu, X, Star } from 'lucide-react'

const Navbar = () => {
  const { user, logout } = useContext(AuthContext)
  const { itemCount } = useContext(CartContext)
  const [showMenu, setShowMenu] = useState(false)

  return (
    <nav className="w-full bg-pink-100 z-50 left-0 px-4 md:px-16 py-4 text-light italic">
      <div className="flex items-center justify-between">

        <div className="hidden md:flex gap-6">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/about" className="hover:underline">
            About
          </Link>
          <Link to="/quiz" className="hover:underline">
            Find Your Scent
          </Link>
        </div>

        <div className="text-2xl font-serif uppercase tracking-widest">
          Perfume
        </div>

        <div className="hidden md:flex gap-6 items-center">
          <Link to="/shop" className="hover:underline">
            Shop
          </Link>
          <Link to="/blog" className="hover:underline">
            Blog
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact
          </Link>
          
          {user && (
            <>
              <Link to="/wishlist" className="hover:text-pink-600 transition" title="Wishlist">
                <Heart size={20} />
              </Link>
              <Link to="/favorites" className="hover:text-yellow-500 transition" title="Favorites">
                <Star size={20} />
              </Link>
              <Link to="/cart" className="hover:text-pink-600 transition relative">
                <ShoppingCart size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
            </>
          )}

          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/profile" className="hover:underline flex items-center gap-1">
                <User size={18} />
                {user.name}
              </Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="hover:underline text-purple-600 font-semibold">
                  Admin
                </Link>
              )}
              <button onClick={logout} className="hover:text-red-600 transition">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </div>
          )}
        </div>

        <button 
          className="md:hidden"
          onClick={() => setShowMenu(!showMenu)}
        >
          {showMenu ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {showMenu && (
        <div className="md:hidden mt-4 pb-4 flex flex-col gap-3">
          <Link to="/" onClick={() => setShowMenu(false)} className="hover:underline">
            Home
          </Link>
          <Link to="/shop" onClick={() => setShowMenu(false)} className="hover:underline">
            Shop
          </Link>
          <Link to="/quiz" onClick={() => setShowMenu(false)} className="hover:underline">
            Find Your Scent
          </Link>
          <Link to="/about" onClick={() => setShowMenu(false)} className="hover:underline">
            About
          </Link>
          <Link to="/blog" onClick={() => setShowMenu(false)} className="hover:underline">
            Blog
          </Link>
          <Link to="/contact" onClick={() => setShowMenu(false)} className="hover:underline">
            Contact
          </Link>
          {user ? (
            <>
              <Link to="/wishlist" onClick={() => setShowMenu(false)} className="hover:underline">
                Wishlist
              </Link>
              <Link to="/profile" onClick={() => setShowMenu(false)} className="hover:underline">
                Profile
              </Link>
              {user.role === 'admin' && (
                <Link to="/admin" onClick={() => setShowMenu(false)} className="hover:underline text-purple-600">
                  Admin
                </Link>
              )}
              <button onClick={() => { logout(); setShowMenu(false); }} className="text-left hover:underline text-red-600">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setShowMenu(false)} className="hover:underline">
                Login
              </Link>
              <Link to="/register" onClick={() => setShowMenu(false)} className="hover:underline">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
