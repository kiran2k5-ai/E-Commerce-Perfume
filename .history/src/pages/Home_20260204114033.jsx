import React from "react";
import Gridbox from "../components/Gridbox";

const Home = () => {
  return (
    <>
      {/* HERO SECTION (FULL WIDTH, NO GAPS) */}
      <div className="relative w-screen h-screen overflow-hidden">
        <img
          src="/images/image1.jpg"
          alt="Hero"
          className="w-screen h-screen object-cover"
        />

        {/* Text Overlay */}
        <div className="absolute inset-0 z-10 flex items-center justify-center text-white text-center px-6">
          <h1 className="text-4xl md:text-6xl lg:text-9xl font-light leading-tight">
            Elevate Everyday <br />
            Moments To <br />
            Extraordinary
          </h1>
        </div>
      </div>

      <div className="w-full px-6 md:px-16 py-12">
        <div className="flex flex-wrap justify-between items-center gap-6 text-2xl md:text-4xl">
          <h1 className="font-light italic">flow</h1>
          <h1 className="font-semibold tracking-wide">NINO</h1>
          <h1 className="font-medium">InTrend</h1>
          <h1 className="font-bold">JUNE</h1>
          <h1 className="font-semibold tracking-widest">ZINE</h1>
          <h1 className="font-extrabold">MAX</h1>
        </div>
      </div>

      <div className="w-full px-6 md:px-16 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
          <Gridbox />
        </div>
      </div>
    </>
  );
};

export default Home;
