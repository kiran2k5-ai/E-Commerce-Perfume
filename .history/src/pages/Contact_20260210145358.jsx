import React from 'react'

const Contact = () => {
  return (
    <div>
      
      <div className='flex flex-col justify-center items-center gap-10 font-light italic'>
        <h1 className='text-8xl'>Let's chat</h1>
        <h2 className='text-3xl'>Send us message and we'll get right back to you.</h2>
        <div className='flex flex-row gap-20'>
            <input type="text" placeholder='Fullname' className='border border-amber-950 w-100'/>
            <input type="text" placeholder='Email' className='border border-amber-950'/>
        </div>
        <input type="text" placeholder='How can we help you?'/>
        <button>Send Message</button>
      </div>

    </div>
  )
}

export default Contact
