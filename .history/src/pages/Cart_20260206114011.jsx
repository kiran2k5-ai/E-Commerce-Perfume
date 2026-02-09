import React from 'react'
import image2 from "../../public/images2.jpg"

const Cart = () => {
  const prduct = [
      { id: 1, name: "Meadow", description: "Breezy And Joyful", price: "$39.95", image: {image2} }]

  return (
    <div>
      <div>
        <img src={product.image2} alt="" />
        <div>
          <h1>{product.name}</h1>
          <h2>{product.description}</h2>
          h2
        </div>
      </div>
    </div>
  )
}

export default Cart
