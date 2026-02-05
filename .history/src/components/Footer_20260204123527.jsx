import React from 'react'

const Footer = () => {
  return (
    <div className='flex justify-center text-white'>
      <div className='h-100 w-350 bg-pink-400 rounded-3xl'>
        <div className='mt-10 ml-10 '>
            <h2 className='font-bold text-4xl'>We Send great emails</h2>
            <input type="text" className='' placeholder='Enter Your E-mail'/>
            <button className='bg-white w-20 h-20 rounded-3xl text-'>Subscribe</button>
        </div>
      </div>
    </div>
  )
}

export default Footer
