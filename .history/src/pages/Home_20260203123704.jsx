import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css";

const Home = () => {
  return (
    <>
      {/* HERO VERTICAL SWIPER */}
      <Swiper
        direction="vertical"
        slidesPerView={1}
        mousewheel={true}
        modules={[Mousewheel]}
        className="h-screen"
      >
        {/* SLIDE 1 */}
        <SwiperSlide>
          <div className="relative h-screen">
            <img
              src="src/images/image1.jpg"
              alt=""
              className="w-full h-full object-cover rotate-90"
            />

            <div className="absolute inset-0 z-10 flex items-center justify-center text-white text-center px-6">
              <h1 className="text-5xl md:text-7xl lg:text-9xl font-light">
                Elevate Everyday <br /> Moments To <br /> Extraordinary
              </h1>
            </div>
          </div>
        </SwiperSlide>

        {/* SLIDE 2 (brands section) */}
        <SwiperSlide>
          <div className="h-screen flex items-center justify-center">
            <div className="flex items-center justify-between w-full px-16 text-4xl">
              <h1 className="font-light italic">flow</h1>
              <h1 className="font-semibold tracking-wide">NINO</h1>
              <h1 className="font-medium">InTrend</h1>
              <h1 className="font-bold">JUNE</h1>
              <h1 className="font-semibold tracking-widest">ZINE</h1>
              <h1 className="font-extrabold">MAX</h1>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Home;
