import React from 'react'

const Gridbox = () => {
  return (
    <div className="flex flex-col items-center text-center gap-2">

      <img
        src="src/images/image2.jpg"
        alt="Medow Perfume"
        className="w-64 h-64 object-contain"
      />

      <div>
        <h2 className="text-lg font-semibold">Medow</h2>
        <p className="text-sm">Breezy And JoyFull</p>
        <p className="text-lg font-bold mt-1">$39.95</p>
      </div>

      <a
        href="#"
        className="mt-2  text-sm hover:opacity-70 transition"
      >
        Shop Now
      </a>

    </div>
  )
}

export default Gridbox
