import React from "react";
import { Settings, Fuel, Snowflake } from "lucide-react";

const CarCard = ({ car }) => {
  return (
    <div className="w-[416px] h-[513px] bg-white rounded-2xl shadow-md flex flex-col justify-between p-6">
      <img
        src={car.images?.[0] || "https://via.placeholder.com/400x200?text=No+Image"}
        alt={`${car.brand} ${car.model}`}
        className="w-full h-40 object-contain mb-4"
      />

      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-black">{car.brand}</h2>
          <p className="text-gray-600">{car.model}</p>
        </div>
        <div className="text-right">
          <h3 className="font-bold text-lg" style={{ color: "#5937E0" }}>
            ₹{car.rentPerDay}
          </h3>
          <p className="text-sm text-gray-500">per day</p>
        </div>
      </div>

      <div className="flex justify-between text-sm text-gray-700 mt-4">
        <div className="flex items-center gap-1">
          <Settings size={16} />
          {car.transmission}
        </div>
        <div className="flex items-center gap-1">
          <Fuel size={16} />
          {car.fuelType}
        </div>
        <div className="flex items-center gap-1">
          <Snowflake size={16} />
          Air Conditioner
        </div>
      </div>

      <button
        className="mt-6 text-white py-3 rounded-xl font-semibold transition"
        style={{ backgroundColor: "#5937E0" }}
      >
        View Details
      </button>
    </div>
  );
};

export default CarCard;
