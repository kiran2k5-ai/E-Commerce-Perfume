import React from 'react'

const Contact = () => {
  return (
    <div>
      
      <div className='flex flex-col justify-center items-center gap-10 font-light italic'>
        <h1 className='text-8xl'>Let's chat</h1>
        <h2 className='text-3xl'>Send us message and we'll get right back to you.</h2>
        <div className='flex flex-row gap-10'>
            <input type="text" placeholder='Fullname' className='border border-amber-950 w-65 rounded px-6 h-10'/>
            <input type="text" placeholder='Email' className='border border-amber-950 w-65 rounded px-6 h-10'/>
        </div>
        <input type="text" placeholder='How can we help you?' className='w-200 h-50 border border-amber-950 -py-10 rounded'/>
        <button className='bg-green-600 w-65 h-'>Send Message</button>
      </div>

    </div>
  )
}

export default Contact
