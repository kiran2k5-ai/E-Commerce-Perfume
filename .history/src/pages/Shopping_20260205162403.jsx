import React from 'react'
import Gridbox from '../components/Gridbox'
import Footer from '../components/Footer'
import img6 from '../images/image6.jpg'

const Shopping = () => {
  const products = [
    { id: 1, name: "Meadow", description: "Breezy And Joyful", price: "$39.95", image: img6 },
    { id: 2, name: "Noir", description: "Mysterious & Elegant", price: "$49.95", image: img6 },
    { id: 3, name: "Rose Garden", description: "Romantic & Fresh", price: "$44.95", image: img6 },
    { id: 4, name: "Ocean Breeze", description: "Cool & Refreshing", price: "$42.95", image: img6 },
    { id: 5, name: "Amber Nights", description: "Warm & Sensual", price: "$54.95", image: img6 },
    { id: 6, name: "Citrus Bloom", description: "Bright & Energetic", price: "$38.95", image: img6 },
  ]

  return (
    <div>

      {/* HERO */}
      <div
        className="relative h-screen bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url('/images/image7.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-[200px] text-gray-100 font-light italic">
            All fragrances...
          </h1>
        </div>
      </div>

      {/* GRID */}
      <div className="mt-20 px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.map(p => (
          <Gridbox key={p.id} {...p} />
        ))}
      </div>

      {/* FOOTER */}
      <div className="mt-20">
        <Footer />
      </div>

    </div>
  )
}

export default Shopping
