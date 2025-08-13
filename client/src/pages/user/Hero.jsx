import React from "react";
import carImage from "../../assets/car.png";

const Hero = () => {
  return (
    <div className="px-4 sm:px-8 md:px-12 pt-1 bg-white">
      <section className="bg-[#5937E0] text-white px-6 sm:px-12 py-12 rounded-[30px] sm:rounded-[50px]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
              Experience the road
              <br />
              like never before
            </h1>
            <p className="text-base sm:text-lg max-w-md mx-auto lg:mx-0 mb-6">
              More than a car. It’s an experience. Pick your wheels, hit the
              road. Unforgettable rides start here.
            </p>
            <button
              style={{ backgroundColor: "#FF9E0C" }}
              className="text-white font-semibold px-6 py-3 rounded-md hover:brightness-90 transition"
            >
              View all cars
            </button>
          </div>

          <div className="flex-1 relative w-full max-w-md">
            <img
              src={carImage}
              alt="Car"
              className="absolute top-[10.5rem] -left-[23.5rem] w-[600px] blur opacity-30 z-0 pointer-events-none hidden md:block"
            />
            <div className="relative z-10 bg-white text-black p-6 sm:p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 text-center">Book your car</h2>
              <div className="space-y-4">
                <select className="w-full border p-3 rounded-md text-black bg-[#FAFAFA]">
                  <option>Car type</option>
                </select>
                <select className="w-full border p-3 rounded-md text-black bg-[#FAFAFA]">
                  <option>Place of rental</option>
                </select>
                <select className="w-full border p-3 rounded-md text-black bg-[#FAFAFA]">
                  <option>Place of return</option>
                </select>
                <input
                  type="date"
                  className="w-full border p-3 rounded-md text-black bg-[#FAFAFA]"
                />
                <input
                  type="date"
                  className="w-full border p-3 rounded-md text-black bg-[#FAFAFA]"
                />
                <button
                  style={{ backgroundColor: "#FF9E0C" }}
                  className="text-white w-full py-3 font-semibold rounded-md hover:brightness-90 transition"
                >
                  Book now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
