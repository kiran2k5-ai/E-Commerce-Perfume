import React from 'react'
import image2 from "../images/image2.jpg"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const product = {
    id: 1, name: "Meadow", description: "Breezy And Joyful", price: "$39.95", image: {image2} }
  const [count,setCount] = useState(0)
  return (
    <div >
      <div className='flex flex-row justify-center item-center gap-100 text-black '>
        <img src={image2} alt="" className='w-[300px] h-[300px] mt-70'/>

        <div className='flex flex-col mt-50 gap-5 justify-center items-center text-2xl font-light italic border border-grey-300 w-130 h-150 '>
          <h1>{product.name}</h1>
          <div className='flex flex-row gap-10 '>
          <h2>{product.description}</h2>
          <h2>{product.price}</h2>
          </div>
          <h2 className=''>Captures the essence of a carefree <br />
          breeze through wildflower fields,<br />
           evoking pure joy with its light and <br />
           refreshing notes.</h2>
          <div >
            <div className='flex flex-row gap-5'>Qty <div className='w-20 h-10 border-2 pl-8'>{count}</div>
            <button className='' onClick={()=>setCount(count+1)}>+</button></div>
            
          </div>
          <button onClick={()=>navigate() } className='w-75 h-10 bg-green-400 rounded-2xl'>Buy</button>
          <div className='flex flex-row gap-40 w-85 h-10 bg-pink-100 pl-4'>SCENTNOTES <button>+</button></div>
          <div className='flex flex-row gap-40 w-85 h-10 bg-pink-100 pl-4'>INGREDIENTS <button>+</button></div>
        </div>
      </div>
    </div>
  )
}

export default Cart
