import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaFilter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AppRoutes } from "../constant/constant";

const CarPage = () => {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [cars, setCars] = useState([]); // State to store fetched cars
  const [loading, setLoading] = useState(true); // State to handle loading

  // Fetch cars from backend
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(AppRoutes.manageCar); // Replace with your backend URL
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Filter cars based on category
  const filteredCars = categoryFilter
    ? cars.filter((car) => car.category === categoryFilter)
    : cars;

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <div className="pb-24 m-10">
      <div className="container">
        <div className="flex justify-between">
          <div>
            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl font-semibold font-serif mb-3">
              Our Car Collection
            </h1>
            <p className="text-sm pb-10">
              Choose from a variety of cars available for rent across different
              categories.
            </p>
          </div>
          {/* Filter Section */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
              <FaFilter className="text-xl text-gray-600" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="">All Categories</option>
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Luxury">Luxury</option>
                <option value="Coupe">Coupe</option>
              </select>
            </div>
          </div>
        </div>
        {/* Car listing */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 ">
            {filteredCars.map((car, index) => (
              <div
                key={index}
                className="space-y-3 border-2 border-gray-300 hover:border-primary p-3 rounded-xl relative group"
              >
                <div className="w-full h-[120px] ">
                  <img
                    src={car.image} // Use the image URL from MongoDB
                    alt={car.name}
                    className="w-full h-[120px] object-cover group-hover:sm:translate-x-5 duration-700"
                  />
                </div>
                <div className="space-y-2">
                  <h1 className="text-primary font-semibold">{car.name}</h1>
                  <div className="flex justify-between items-center text-xl font-semibold">
                    <p>${car.price}/Day</p>
                    {/* Link to car details page */}
                    <Link to={`/cars/${car._id}`} className="text-primary">Details</Link>
                  </div>
                </div>
                {/* <p className="text-xl font-semibold absolute top-0 left-3">
                  12Km
                </p> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarPage;