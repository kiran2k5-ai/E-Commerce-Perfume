import React from 'react'
import Gridbox from '../components/Gridbox';
import Footer from '../components/Footer';

const Shopping = () => {
      const products = [
    { id: 1, name: "Meadow", description: "Breezy And Joyful", price: "$39.95", image: "src/images/image6.jpg" },
    { id: 2, name: "Noir", description: "Mysterious & Elegant", price: "$49.95", image: "src/images/image6.jpg" },
    { id: 3, name: "Rose Garden", description: "Romantic & Fresh", price: "$44.95", image: "src/images/image6.jpg" },
    { id: 4, name: "Ocean Breeze", description: "Cool & Refreshing", price: "$42.95", image: "src/images/image6.jpg" },
    { id: 5, name: "Amber Nights", description: "Warm & Sensual", price: "$54.95", image: "src/images/image6.jpg" },
    { id: 6, name: "Citrus Bloom", description: "Bright & Energetic", price: "$38.95", image: "src/images/image6.jpg" },
  ];
  return (
    <div>
      <div className='relative w-full h-screen'>
        <img src="src\images\image7.jpg" alt="" className='w-screen h-screen object-cover'/>
        <div className='absolute inset-0 flex items-center justify-center'>
            <h1 className='text-[200px] text-gray-100 font-light italic mt-5'>All fragrances...</h1>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) => (
            <Gridbox
              key={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </div>
      <div className='mt-20'> 
        <Footer ></Footer>
      </div>
    </div>
  )
}

export default Shopping
