import React from 'react'

const Shopping = () => {
  return (
    <div>
      <div className='relative w-full h-screen'>
        <img src="src\images\image7.jpg" alt="" className='w-screen h-[650px] object-cover'/>
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
    </div>
  )
}

export default Shopping
