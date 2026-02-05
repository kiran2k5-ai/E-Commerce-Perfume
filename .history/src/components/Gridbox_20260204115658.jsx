import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Gridbox = ({ image, name, description, price, images }) => {
  // Use images array if provided, otherwise create array from single image
  const imageArray = images || [image, image, image];
  
  return (
    <div className="group flex flex-col items-center text-center gap-4 p-6 rounded-2xl bg-white hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">

      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-pink-50 to-purple-50 p-6 w-full">
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          className="w-64 h-64"
        >
          {imageArray.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`${name} - ${index + 1}`}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-500 italic">{description}</p>
        <p className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">{price}</p>
      </div>

      <button
        className="mt-3 px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium"
      >
        Add to Cart
      </button>

    </div>
  )
}

export default Gridbox
