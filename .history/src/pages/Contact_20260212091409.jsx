import React, { useState } from 'react'
import Footer from '../components/Footer'
import axios from 'axios'

const Contact = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async () => {
    try {
      await axios.post("https://e-commerce-perfume-alpha.vercel.app/api/contact", {
        name,
        email,
        message,
      })
      alert("Message sent successfully")
      setName("")
      setEmail("")
      setMessage("")
    } catch (err) {
      alert("Failed to send message")
    }
  }

  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-10 font-light italic">
        <h1 className="text-8xl font-serif italic">Let’s chat</h1>

        <h2 className="text-3xl">
          Send us message and we'll get right back to you.
        </h2>

        <div className="flex gap-10">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            className="border border-amber-950 w-65 rounded px-6 h-10"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="border border-amber-950 w-65 rounded px-6 h-10"
          />
        </div>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="How can we help you?"
          className="w-[800px] h-[220px] border border-amber-950 rounded-xl p-6 resize-none"
        />

        <button
          onClick={handleSubmit}
          className="bg-green-600 w-45 h-10 rounded-2xl hover:bg-green-300 text-white"
        >
          Send Message
        </button>
      </div>

      <div className="mt-10">
        <Footer />
      </div>
    </div>
  )
}

export default Contact
