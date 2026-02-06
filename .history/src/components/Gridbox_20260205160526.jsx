import React from 'react'

const Gridbox = ({ image, name, description, price }) => {
  return (
    <div className="w-[300px] h-[300px] group flex flex-col items-center text-center gap-4  rounded-2xl bg-white hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">

      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-pink-50 to-purple-50 p-6">
        <img
          src={image}
          alt={name}
          className="w-64 h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-500 italic">{description}</p>
        <p className="text-2xl font-bold bg-gradient-to-r from-pink-300 to-purple-600 bg-clip-text text-transparent">{price}</p>
      </div>

      <button
        className="mt-3 px-8 py-3 bg-gradient-to-r from-pink-300 to-purple-600 text-white rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium"
      >
        Add to Cart
      </button>

    </div>
  )
}

export default Gridbox
