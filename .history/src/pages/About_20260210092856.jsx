import React from 'react'
import image8 from "../images/image8.jpg"
const About = () => {
  return (
    <div>
        <div
            className="relative h-screen bg-fixed bg-cover bg-center"
            style={{ backgroundImage: `url(${image8})` }}
        ></div>
        <div className='flex flex-col mt-10 text-light italic'>
            <div className='flex justify-center items-center text-xl'><h1>The Artisanal Difference</h1></div>
            <div className = "flex flex-row gap-10 justify-center items-center mt-10">
                <div className='flex flex-col justify-center items-center' >
                    <h1 className='text-3xl'>95%</h1>
                    <h2 className='text-'>Sustainability First</h2>
                    <h2 className='text-lg'>Over 95% of our ingredients are responsibly sourced, <br />
                    supporting local communities and preserving biodiversity. <br />
                    Our commitment to sustainability is more than a principle.</h2>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <h1>100%</h1>
                    <h2>Cruelty-Free Excellence</h2>
                    <h2 className='text-lg'>We are proudly cruelty-free, ensuring that none of our <br />
                    products are tested on animals. This principle is woven into <br/>
                    our brand's DNA, and our dedication to ethical standards.</h2>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <h1>100%</h1>
                    <h2>Artistic Expression</h2>
                    <h2 className='text-lg'>Each of our fragrances is a result of creative vision. <br />
                    This commitment to artistic expression leads to scents that <br />
                    are 100% unique, testaments to our creativity and excellence.</h2>
                </div>
            </div>
        </div>
    </div>
  )
}

export default About
