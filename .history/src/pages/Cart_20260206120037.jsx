import React from 'react'
import image2 from "../images/image2.jpg"

const Cart = () => {
  const product = [
      { id: 1, name: "Meadow", description: "Breezy And Joyful", price: "$39.95", image: {image2} }]

  return (
    <div>
      <div className='flex flex-row ju'>
        <img src={image2} alt="" className='w-[300px] h-[300px] mt-30'/>
        <div className='mt-50'>
          <h1>{product.name}</h1>
          <h2>{product.description}</h2>
          <h2>Captures the essence of a carefree <br />
          breeze through wildflower fields,<br />
           evoking pure joy with its light and <br />
           refreshing notes.</h2>
        </div>
      </div>
    </div>
  )
}

export default Cart
