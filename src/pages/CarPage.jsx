import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { Link } from "react-router-dom";  // Import Link for routing
import car1 from "../assets/car1.png";
import car2 from "../assets/car2.png";
import car3 from "../assets/car6.png";
import car4 from "../assets/car2.png";
import car5 from "../assets/car1.png";
import car6 from "../assets/car6.png";
import car7 from "../assets/car1.png";
import car8 from "../assets/car6.png";
import car9 from "../assets/car2.png";
import car10 from "../assets/car5.png";

const carList = [
  { name: "BMW UX", price: 100, category: "SUV", image: car1 },
  { name: "KIA UX", price: 140, category: "Sedan", image: car2 },
  { name: "Audi Q5", price: 180, category: "SUV", image: car3 },
  { name: "Mercedes E-Class", price: 200, category: "Luxury", image: car4 },
  { name: "BMW 3 Series", price: 120, category: "Sedan", image: car5 },
  { name: "Honda CR-V", price: 90, category: "SUV", image: car6 },
  { name: "Toyota Corolla", price: 80, category: "Sedan", image: car7 },
  { name: "Tesla Model X", price: 250, category: "Luxury", image: car8 },
  { name: "Ford Mustang", price: 150, category: "Coupe", image: car9 },
  { name: "Chevrolet Camaro", price: 140, category: "Coupe", image: car10 },
];

const CarPage = () => {
  const [categoryFilter, setCategoryFilter] = useState("");

  const filteredCars = categoryFilter
    ? carList.filter((car) => car.category === categoryFilter)
    : carList;

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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16">
            {filteredCars.map((data, index) => (
              <div
                key={index}
                className="space-y-3 border-2 border-gray-300 hover:border-primary p-3 rounded-xl relative group"
              >
                <div className="w-full h-[120px]">
                  <img
                    src={data.image}
                    alt={data.name}
                    className="w-full h-[120px] object-contain sm:translate-x-8 group-hover:sm:translate-x-16 duration-700"
                  />
                </div>
                <div className="space-y-2">
                  <h1 className="text-primary font-semibold">{data.name}</h1>
                  <div className="flex justify-between items-center text-xl font-semibold">
                    <p>${data.price}/Day</p>
                    {/* Link to car details page */}
                    <Link to={`/cars/${data.name}`} className="text-primary">Details</Link>
                  </div>
                </div>
                <p className="text-xl font-semibold absolute top-0 left-3">
                  12Km
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarPage;
