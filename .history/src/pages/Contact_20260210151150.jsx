import React from 'react'

const Contact = () => {
  return (
    <div>
      
      <div className='flex flex-col justify-center items-center gap-10 font-light italic'>
        <h1 className="text-8xl font-serif italic font-light">
  Let’s chat
</h1>

        <h2 className='text-3xl'>Send us message and we'll get right back to you.</h2>
        <div className='flex flex-row gap-10'>
            <input type="text" placeholder='Fullname' className='border border-amber-950 w-65 rounded px-6 h-10'/>
            <input type="text" placeholder='Email' className='border border-amber-950 w-65 rounded px-6 h-10'/>
        </div>
        <textarea
            placeholder="How can we help you?"
            className="w-[800px] h-[220px] border border-amber-950 rounded-xl p-6 font-serif italic text-lg focus:outline-none focus:ring-1 focus:ring-amber-700 resize-none"
/>

        <button className='bg-green-600 w-45 h-10 rounded-2xl hover:bg-green-300 text-white '>Send Message</button>
      </div>

    </div>
  )
}

export default Contact
