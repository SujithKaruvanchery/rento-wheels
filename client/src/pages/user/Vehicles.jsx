import React, { useEffect, useState } from "react";
import { AxiosInstance } from "../../config/AxiosInstance";
import CarCard from "../../components/user/CarCard";

const Vehicles = () => {
  const [cars, setCars] = useState([]);

  const getAllCars = async () => {
    try {
      const response = await AxiosInstance({
        method: "GET",
        url: "/car",
      });
      console.log("response=====", response);
      setCars(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCars();
  }, []);

  return (
    <div>
      {cars?.map((value) => (
        <CarCard key={value._id} car={value} />
      ))}
    </div>
  );
};

export default Vehicles;
