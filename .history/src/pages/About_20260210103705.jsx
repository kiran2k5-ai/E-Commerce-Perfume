import React from 'react'
import { useNavigate } from 'react-router-dom'
import image8 from "../images/image8.jpg"
import image9 from "../images/image9.jpg"

const About = () => {
  const navigate = useNavigate()

  return (
    <div>

      <div
        className="relative bg-fixed h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${image8})` }}
      >
        <div className="absolute inset-0 bg-black/10" />

        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-r from-pink-300 to-purple-400 bg-clip-text text-transparent px-6">
          <h1 className="text-7xl font-bold text-center leading-tight mb-6">
            Our guiding <br />
            principles.<br />
          </h1>

          <p className="text-xl text-gray-100 mt-4 font-light tracking-wide">
            Discover Your Signature Scent
          </p>

          <button
            onClick={() => navigate("/shop")}
            className="mt-10 px-10 py-4 bg-white text-gray-800 rounded-full font-semibold text-lg hover:bg-pink-100 hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            Explore Collection
          </button>
        </div>
      </div>

      <div className="flex flex-col mt-20 italic">
        <div className="flex justify-center items-center text-3xl mb-12">
          <h1>The Artisanal Difference</h1>
        </div>

        <div className="flex flex-wrap gap-16 justify-center items-start text-center px-10">
          <div className="flex flex-col gap-3 max-w-sm">
            <h1 className="text-6xl">95%</h1>
            <h2 className="text-2xl">Sustainability First</h2>
            <p className="text-lg text-gray-600">
              Over 95% of our ingredients are responsibly sourced, supporting
              local communities and preserving biodiversity.
            </p>
          </div>

          <div className="flex flex-col gap-3 max-w-sm">
            <h1 className="text-6xl">100%</h1>
            <h2 className="text-2xl">Cruelty-Free Excellence</h2>
            <p className="text-lg text-gray-600">
              Proudly cruelty-free, ensuring none of our products are tested on
              animals. Ethical standards define our brand.
            </p>
          </div>

          <div className="flex flex-col gap-3 max-w-sm">
            <h1 className="text-6xl">100%</h1>
            <h2 className="text-2xl">Artistic Expression</h2>
            <p className="text-lg text-gray-600">
              Each fragrance is a creative vision, resulting in scents that are
              truly unique and expressive.
            </p>
          </div>
        </div>
      </div>

      <div
        className="relative  bg-fixed h-screen bg-cover bg-center mt-20"
        style={{ backgroundImage: `url(${image9})` }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-6xl font-bold italic bg-gradient-to-r from-pink-400 to-purple-300 bg-clip-text text-transparent">
                Infusing passion into every bottle.
            </h1>
        </div>

      </div>

      <div className='flex flex-col justify-center item-center text-center mt-15 font-light it'>

        <div ><h1 className='text-5xl'>You’ve got questions, we’ve got answers.</h1></div>
        <div>
            <h1>How long can I expect the fragrance to last on my skin?</h1>
            <h2>The longevity of our fragrances varies based on factors such as skin type, <br />
            climate, and activity level. However, our carefully crafted scents are designed <br />
            to have a lasting presence. On average, you can enjoy the captivating notes for <br />
            6 to 8 hours. To enhance the longevity, consider applying the fragrance to pulse <br />
            points and using our complementary scented body products.</h2>
        </div>
        <div><h1>Are your perfumes suitable for sensitive skin or allergies?</h1></div>
        <div><h1>How do you ensure your commitment to sustainability?</h1></div>
      </div>

    </div>
  )
}

export default About
