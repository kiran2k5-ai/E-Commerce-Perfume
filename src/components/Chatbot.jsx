import React, { useState, useEffect, useRef } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'
import axios from 'axios'
import API_URL from '../config/api'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello! I\'m your fragrance assistant. How can I help you find your perfect scent today?' }
  ])
  const [input, setInput] = useState('')
  const [step, setStep] = useState('greeting')
  const [preferences, setPreferences] = useState({})
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const questions = {
    scentFamily: {
      question: 'What scent family do you prefer?',
      options: ['Floral', 'Woody', 'Citrus', 'Oriental', 'Fresh', 'Not sure']
    },
    occasion: {
      question: 'What occasion is this perfume for?',
      options: ['Daily wear', 'Office', 'Evening/Party', 'Special event', 'Gift']
    },
    gender: {
      question: 'Who is this perfume for?',
      options: ['Men', 'Women', 'Unisex']
    },
    budget: {
      question: 'What\'s your budget range?',
      options: ['Under ₹2000', '₹2000-₹5000', '₹5000-₹10000', 'Above ₹10000']
    }
  }

  const addMessage = (type, text) => {
    setMessages(prev => [...prev, { type, text }])
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = input.trim()
    addMessage('user', userMessage)
    setInput('')

    setTimeout(() => {
      processMessage(userMessage)
    }, 500)
  }

  const processMessage = async (message) => {
    const lower = message.toLowerCase()

    if (lower.includes('help') || lower.includes('find') || lower.includes('recommend') || step === 'greeting') {
      setStep('scentFamily')
      addMessage('bot', questions.scentFamily.question)
      addMessage('options', questions.scentFamily.options)
    } else if (step === 'scentFamily') {
      setPreferences(prev => ({ ...prev, scentFamily: message }))
      setStep('occasion')
      addMessage('bot', questions.occasion.question)
      addMessage('options', questions.occasion.options)
    } else if (step === 'occasion') {
      setPreferences(prev => ({ ...prev, occasion: message }))
      setStep('gender')
      addMessage('bot', questions.gender.question)
      addMessage('options', questions.gender.options)
    } else if (step === 'gender') {
      setPreferences(prev => ({ ...prev, gender: message }))
      setStep('budget')
      addMessage('bot', questions.budget.question)
      addMessage('options', questions.budget.options)
    } else if (step === 'budget') {
      setPreferences(prev => ({ ...prev, budget: message }))
      await getRecommendations({ ...preferences, budget: message })
      setStep('complete')
    } else {
      addMessage('bot', 'I can help you find the perfect fragrance! Would you like some recommendations?')
    }
  }

  const getRecommendations = async (prefs) => {
    try {
      addMessage('bot', 'Let me find the perfect fragrances for you...')
      
      const { data } = await axios.get(`${API_URL}/api/product`)
      const products = Array.isArray(data) ? data : data.products || []

      let filtered = products

      // More flexible gender filtering
      if (prefs.gender && prefs.gender !== 'Unisex' && prefs.gender !== 'Not sure') {
        filtered = filtered.filter(p => 
          p.category?.toLowerCase() === prefs.gender.toLowerCase() || 
          p.category === 'Unisex'
        )
      }

      // More flexible budget filtering
      if (prefs.budget) {
        const budgetRanges = {
          'Under ₹2000': [0, 2000],
          '₹2000-₹5000': [2000, 5000],
          '₹5000-₹10000': [5000, 10000],
          'Above ₹10000': [10000, Infinity]
        }
        const [min, max] = budgetRanges[prefs.budget] || [0, Infinity]
        filtered = filtered.filter(p => {
          const productPrice = Number(p.price)
          return productPrice >= min && productPrice < max
        })
      }

      // If no products found with strict filtering, show all products
      const recommendations = filtered.length > 0 ? filtered.slice(0, 3) : products.slice(0, 3)

      if (recommendations.length > 0) {
        const message = filtered.length > 0 
          ? `Based on your preferences, I recommend these ${recommendations.length} fragrances:`
          : `Here are ${recommendations.length} popular fragrances for you:`
        
        addMessage('bot', message)
        recommendations.forEach(p => {
          addMessage('product', {
            name: p.name,
            price: p.price,
            description: p.description,
            id: p._id
          })
        })
        addMessage('bot', 'Would you like to see more options or start a new search?')
      } else {
        addMessage('bot', 'Sorry, I couldn\'t find any fragrances. Please try again later!')
      }
    } catch (error) {
      addMessage('bot', 'Sorry, I\'m having trouble fetching recommendations. Please try again later.')
    }
  }

  const handleOptionClick = (option) => {
    setInput(option)
    setTimeout(() => handleSend(), 100)
  }

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-pink-400 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition z-50"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50">
          <div className="bg-gradient-to-r from-pink-400 to-purple-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MessageCircle size={24} />
              <h3 className="font-semibold">Fragrance Assistant</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx}>
                {msg.type === 'bot' && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-[80%]">
                      {msg.text}
                    </div>
                  </div>
                )}
                {msg.type === 'user' && (
                  <div className="flex justify-end">
                    <div className="bg-gradient-to-r from-pink-400 to-purple-600 text-white rounded-lg px-4 py-2 max-w-[80%]">
                      {msg.text}
                    </div>
                  </div>
                )}
                {msg.type === 'options' && (
                  <div className="flex flex-wrap gap-2 justify-start">
                    {msg.text.map((option, i) => (
                      <button
                        key={i}
                        onClick={() => handleOptionClick(option)}
                        className="px-3 py-1 bg-purple-100 hover:bg-purple-200 text-purple-800 rounded-full text-sm transition"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
                {msg.type === 'product' && (
                  <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg p-3 border border-purple-200">
                    <h4 className="font-semibold text-purple-900">{msg.text.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{msg.text.description}</p>
                    <p className="text-lg font-bold text-purple-600 mt-2">₹{msg.text.price}</p>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
              <button
                onClick={handleSend}
                className="bg-gradient-to-r from-pink-400 to-purple-600 text-white p-2 rounded-full hover:shadow-lg transition"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Chatbot
