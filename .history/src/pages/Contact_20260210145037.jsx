import React from 'react'

const Contact = () => {
  return (
    <div>
      
      <div className='flex flex-col justify-center items-center'>
        <h1 cl>Let's chat</h1>
        <h2>Send us message and we'll get right back to you.</h2>
        <div>
            <input type="text" placeholder='Fullname'/>
            <input type="text" placeholder='Email'/>
        </div>
        <input type="text" placeholder='How can we help you?'/>
        <button>Send Message</button>
      </div>

    </div>
  )
}

export default Contact
