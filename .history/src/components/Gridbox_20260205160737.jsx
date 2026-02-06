import React from 'react'

const Gridbox = ({ image, name, description, price }) => {
  return (
    <div className="
      group
      flex flex-col items-center text-center
      gap-3
      rounded-xl
      bg-white
      p-4
      hover:shadow-xl
      transition-all duration-500
      hover:-translate-y-1
    ">

      {/* IMAGE */}
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={image}
          alt={name}
          className="
            w-68 h-68
            object-cover
            transition-transform duration-500
            group-hover:scale-110
          "
        />
        <div className="
          absolute inset-0
          bg-gradient-to-t from-black/20 to-transparent
          opacity-0 group-hover:opacity-100
          transition-opacity
        " />
      </div>

      {/* TEXT */}
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-gray-800">
          {name}
        </h2>
        <p className="text-xs text-gray-500 italic">
          {description}
        </p>
        <p className="
          text-lg font-bold
          bg-gradient-to-r from-pink-300 to-purple-600
          bg-clip-text text-transparent
        ">
          {price}
        </p>
      </div>

      {/* BUTTON */}
      <button
        className="
          mt-2
          px-5 py-2
          text-sm
          bg-gradient-to-r from-pink-300 to-purple-600
          text-white
          rounded-full
          hover:shadow-md
          transition
        "
      >
        Add to Cart
      </button>

    </div>
  )
}

export default Gridbox
