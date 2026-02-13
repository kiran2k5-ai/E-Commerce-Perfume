import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'

const PerfumeQuiz = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)

  const questions = [
    {
      id: 'occasion',
      question: 'When do you plan to wear this fragrance?',
      options: [
        { value: 'daily', label: 'Daily wear', icon: '☀️' },
        { value: 'work', label: 'Work/Office', icon: '💼' },
        { value: 'evening', label: 'Evening/Night out', icon: '🌙' },
        { value: 'special', label: 'Special occasions', icon: '🎉' }
      ]
    },
    {
      id: 'personality',
      question: 'Which describes your personality best?',
      options: [
        { value: 'bold', label: 'Bold & Confident', icon: '🔥' },
        { value: 'elegant', label: 'Elegant & Sophisticated', icon: '👑' },
        { value: 'fresh', label: 'Fresh & Energetic', icon: '⚡' },
        { value: 'romantic', label: 'Romantic & Gentle', icon: '🌸' }
      ]
    },
    {
      id: 'notes',
      question: 'Which scent notes appeal to you?',
      options: [
        { value: 'floral', label: 'Floral (Rose, Jasmine)', icon: '🌹' },
        { value: 'woody', label: 'Woody (Sandalwood, Cedar)', icon: '🌲' },
        { value: 'citrus', label: 'Citrus (Lemon, Bergamot)', icon: '🍋' },
        { value: 'oriental', label: 'Oriental (Vanilla, Amber)', icon: '✨' }
      ]
    },
    {
      id: 'season',
      question: 'Which season do you prefer fragrances for?',
      options: [
        { value: 'spring', label: 'Spring', icon: '🌸' },
        { value: 'summer', label: 'Summer', icon: '☀️' },
        { value: 'autumn', label: 'Autumn', icon: '🍂' },
        { value: 'winter', label: 'Winter', icon: '❄️' }
      ]
    }
  ]

  const handleAnswer = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value })
    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      calculateResult({ ...answers, [questionId]: value })
    }
  }

  const calculateResult = (allAnswers) => {
    const profiles = {
      floral: {
        name: 'Floral Enthusiast',
        description: 'You love elegant, romantic fragrances with flower notes. Perfect for someone with a gentle and sophisticated personality.',
        recommendations: ['Floral perfumes', 'Rose-based fragrances', 'Jasmine scents']
      },
      woody: {
        name: 'Woody Wanderer',
        description: 'You prefer earthy, grounding scents. You appreciate depth and complexity in your fragrances.',
        recommendations: ['Sandalwood perfumes', 'Cedar-based fragrances', 'Oud scents']
      },
      citrus: {
        name: 'Citrus Lover',
        description: 'Fresh and energetic, you love vibrant, uplifting scents that invigorate your senses.',
        recommendations: ['Citrus perfumes', 'Bergamot fragrances', 'Fresh cologne']
      },
      oriental: {
        name: 'Oriental Aficionado',
        description: 'Warm, sensual, and mysterious - you love rich, exotic fragrances that make a statement.',
        recommendations: ['Vanilla perfumes', 'Amber fragrances', 'Spiced scents']
      }
    }

    const profile = profiles[allAnswers.notes] || profiles.floral
    setResult(profile)
  }

  const resetQuiz = () => {
    setStep(0)
    setAnswers({})
    setResult(null)
  }

  if (result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🎯</div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent mb-4">
                Your Scent Profile
              </h2>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                {result.name}
              </h3>
              <p className="text-gray-600 text-lg">
                {result.description}
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 mb-6">
              <h4 className="font-semibold text-lg mb-3">Recommended for you:</h4>
              <ul className="space-y-2">
                {result.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-purple-600">✓</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => navigate('/shop')}
                className="flex-1 py-3 bg-gradient-to-r from-pink-400 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
              >
                Explore Recommendations
              </button>
              <button
                onClick={resetQuiz}
                className="flex-1 py-3 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition"
              >
                Retake Quiz
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const currentQuestion = questions[step]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-transparent mb-4">
              Find Your Perfect Scent
            </h1>
            <div className="flex justify-center gap-2 mb-6">
              {questions.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 w-16 rounded-full ${
                    idx <= step ? 'bg-gradient-to-r from-pink-400 to-purple-600' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-600">Question {step + 1} of {questions.length}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              {currentQuestion.question}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(currentQuestion.id, option.value)}
                  className="p-6 border-2 border-gray-200 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition group"
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition">
                    {option.icon}
                  </div>
                  <div className="font-semibold text-gray-800">{option.label}</div>
                </button>
              ))}
            </div>

            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="mt-6 text-purple-600 hover:text-purple-700 font-semibold"
              >
                ← Back
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default PerfumeQuiz
