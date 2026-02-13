import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import image8 from "../images/image8.jpg"
import image9 from "../images/image9.jpg"
import Footer from '../components/Footer'


const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-pink-200 w-full max-w-3xl rounded-xl p-4 sm:p-6 transition-all">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <h1 className="text-base sm:text-lg md:text-xl font-semibold pr-4">{question}</h1>
        <span className="text-xl sm:text-2xl font-light flex-shrink-0">
          {open ? "−" : "+"}
        </span>
      </div>

      {open && (
        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-gray-800">
          {answer}
        </p>
      )}
    </div>
  )
}

const About = () => {
  const navigate = useNavigate()

  return (
    <div>

      <div
        className="relative bg-fixed h-64 sm:h-96 md:h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${image8})` }}
      >
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-clip-text text-transparent px-4 sm:px-6">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center leading-tight mb-4 sm:mb-6">
            Our guiding <br /> principles.
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-100 mt-2 sm:mt-4 font-light tracking-wide">
            Discover Your Signature Scent
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="mt-6 sm:mt-10 px-6 sm:px-10 py-3 sm:py-4 bg-white text-gray-800 rounded-full font-semibold text-base sm:text-lg hover:bg-pink-100 hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            Explore Collection
          </button>
        </div>
      </div>

      <div className="flex flex-col mt-12 sm:mt-16 md:mt-20 italic px-4">
        <div className="flex justify-center items-center text-xl sm:text-2xl md:text-3xl mb-8 sm:mb-12">
          <h1>The Artisanal Difference</h1>
        </div>

        <div className="flex flex-wrap gap-8 sm:gap-12 md:gap-16 justify-center text-center px-4 sm:px-10">
          <div className="flex flex-col gap-3 max-w-sm">
            <h1 className="text-4xl sm:text-5xl md:text-6xl">95%</h1>
            <h2 className="text-lg sm:text-xl md:text-2xl">Sustainability First</h2>
            <p className="text-base sm:text-lg text-gray-600">
              Over 95% of our ingredients are responsibly sourced.
            </p>
          </div>

          <div className="flex flex-col gap-3 max-w-sm">
            <h1 className="text-4xl sm:text-5xl md:text-6xl">100%</h1>
            <h2 className="text-lg sm:text-xl md:text-2xl">Cruelty-Free Excellence</h2>
            <p className="text-base sm:text-lg text-gray-600">
              Proudly cruelty-free and ethically produced.
            </p>
          </div>

          <div className="flex flex-col gap-3 max-w-sm">
            <h1 className="text-4xl sm:text-5xl md:text-6xl">100%</h1>
            <h2 className="text-lg sm:text-xl md:text-2xl">Artistic Expression</h2>
            <p className="text-base sm:text-lg text-gray-600">
              Every fragrance is a unique creative vision.
            </p>
          </div>
        </div>
      </div>

      <div
        className="relative bg-fixed h-64 sm:h-96 md:h-screen bg-cover bg-center mt-12 sm:mt-16 md:mt-20"
        style={{ backgroundImage: `url(${image9})` }}
      >
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 px-4">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold italic text-white bg-clip-text text-transparent text-center">
            Infusing passion into every bottle.
          </h1>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center text-center mt-20 font-light italic gap-10">
        <h1 className="text-5xl">
          You’ve got questions, we’ve got answers.
        </h1>

        <FAQItem
          question="How long can I expect the fragrance to last on my skin?"
          answer="On average, our fragrances last 6 to 8 hours depending on skin type, climate, and application method."
        />

        <FAQItem
          question="Are your perfumes suitable for sensitive skin or allergies?"
          answer="Yes. Our perfumes are dermatologically tested and crafted without harsh chemicals."
        />

        <FAQItem
          question="How do you ensure your commitment to sustainability?"
          answer="We source ingredients responsibly, use eco-friendly packaging, and follow cruelty-free practices."
        />
      </div>
    <div className='mt-10'><Footer></Footer></div>
    
    </div>
  )
}

export default About
