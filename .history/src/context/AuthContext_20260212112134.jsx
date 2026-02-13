import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
      setUser(JSON.parse(userInfo))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const { data } = await axios.post('http://localhost:5000/api/auth/login', {
      email,
      password
    })
    setUser(data)
    localStorage.setItem('userInfo', JSON.stringify(data))
    return data
  }

  const register = async (name, email, password) => {
    const { data } = await axios.post('http://localhost:5000/api/auth/register', {
      name,
      email,
      password
    })
    setUser(data)
    localStorage.setItem('userInfo', JSON.stringify(data))
    return data
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cart')
  }

  const updateUser = (updatedUser) => {
    setUser(updatedUser)
    localStorage.setItem('userInfo', JSON.stringify(updatedUser))
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
