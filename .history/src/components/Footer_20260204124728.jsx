import React from 'react'

const Footer = () => {
  return (
    <div className='flex justify-center'>
      <div className='h-100 w-350 bg-pink-400 rounded-3xl'>
        <div className='mt-10 ml-10 '>
            <h2 className='font-bold text-4xl  text-white'>We Send great emails</h2>
            <div className='flex flex-row gap-2 mt-5'>
            <input type="text" className='bg-white rounded-xl w-65 h-10 px-3 placeholder-black placeholder:px-5 hover:bg-none' placeholder='Enter Your E-mail'/>
            <button className=' bg-white w-20 h-10 rounded-xl text-black hover:bg-gradient-to-r from-pink-300 to-purple-600'>Subscribe</button>
            </div>
        </div>
        <div>
            <div>
                <h1></h1>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
