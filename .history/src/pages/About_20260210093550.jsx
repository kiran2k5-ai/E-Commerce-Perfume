import React from 'react'
import image8 from "../images/image8.jpg"
import image9 from "../images/image9.jpg"
const About = () => {
  return (
    <div>
        <div
            className="relative h-screen bg-fixed bg-cover bg-center"
            style={{ backgroundImage: `url(${image8})` }}
        ></div>
                <div className='absolute inset-0 flex flex-col items-center justify-center text-white px-6'>
          <h1 className='text-7xl font-bold text-center leading-tight mb-6'>
            Elevate EveryDay<br />
            Moments To<br />
            <button  className='bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent'>
              Extraordinary
            </button>
          </h1>
          <p className='text-xl text-gray-100 mt-4 font-light tracking-wide'>
            Discover Your Signature Scent
          </p>
          <button onClick = {()=>{navigate("/shop")}} className='mt-10 px-10 py-4 bg-white text-gray-800 rounded-full font-semibold text-lg hover:bg-pink-100 hover:scale-105 transition-all duration-300 shadow-2xl'>
            Explore Collection
          </button>
        </div>
      </div>
        <div className='flex flex-col mt-10 text-light italic'>
            <div className='flex justify-center items-center text-3xl'><h1>The Artisanal Difference</h1></div>
            <div className = "flex flex-row gap-10 justify-center items-center mt-10">
                <div className='flex flex-col justify-center items-center' >
                    <h1 className='text-6xl'>95%</h1>
                    <h2 className='text-2xl'>Sustainability First</h2>
                    <h2 className='text-lg'>Over 95% of our ingredients are responsibly sourced, <br />
                    supporting local communities and preserving biodiversity. <br />
                    Our commitment to sustainability is more than a principle.</h2>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-6xl'>100%</h1>
                    <h2 className='text-2xl'>Cruelty-Free Excellence</h2>
                    <h2 className='text-lg'>We are proudly cruelty-free, ensuring that none of our <br />
                    products are tested on animals. This principle is woven into <br/>
                    our brand's DNA, and our dedication to ethical standards.</h2>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-6xl'>100%</h1>
                    <h2 className='text-2xl'>Artistic Expression</h2>
                    <h2 className='text-lg'>Each of our fragrances is a result of creative vision. <br />
                    This commitment to artistic expression leads to scents that <br />
                    are 100% unique, testaments to our creativity and excellence.</h2>
                </div>
            </div>
        </div>
        <div
            className="relative h-screen bg-fixed bg-cover bg-center"
            style={{ backgroundImage: `url(${image9})` }}
        ></div>
    </div>
  )
}

export default About
