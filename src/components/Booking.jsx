import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaMapMarkerAlt, FaCalendarAlt, FaCar } from "react-icons/fa";
import axios from "axios";
import { AppRoutes } from "@/constant/constant";
import { toast } from "react-toastify"; // Optional for alerts

const allowedCategories = ["SUV", "Sedan", "Sport", "Van", "Truck"];

const InputWrapper = ({ children, label }) => (
  <motion.div
    className="flex flex-col space-y-2"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <label className="text-sm font-medium text-gray-700">{label}</label>
    {children}
  </motion.div>
);

const CarBookingForm = () => {
  const [cars, setCars] = useState([]); // Store all cars from API
  const [availableCategories, setAvailableCategories] = useState([]); // Store categories based on location
  const [filteredCars, setFilteredCars] = useState([]); // Store cars based on category
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [carName, setCarName] = useState("");
  const [bookingDate, setBookingDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchCars();
  }, []);

  // Fetch cars from MongoDB
  const fetchCars = async () => {
    try {
      const response = await axios.get(AppRoutes.manageCar);
      setCars(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Filter categories based on location
  useEffect(() => {
    if (location) {
      const categories = [...new Set(
        cars
          .filter((car) => car.city?.toLowerCase() === location.toLowerCase() && allowedCategories.includes(car.category))
          .map((car) => car.category)
      )];
      setAvailableCategories(categories);
      setCategory("");
      setFilteredCars([]);
      setCarName("");
    }
  }, [location, cars]);

  // Filter cars based on selected category
  useEffect(() => {
    if (category) {
      const filtered = cars.filter(
        (car) => car.city?.toLowerCase() === location.toLowerCase() && car.category === category
      );
      setFilteredCars(filtered);
      setCarName("");
    }
  }, [category, location, cars]);

  const handleFindCar = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    
    if (!location || !category || !carName) {
      toast.warn("Please select location, category, and car name.");
      setIsSubmitting(false);
      return;
    }
    
    // Find car matching location, category, and name
    const matchingCar = cars.find(
      (car) =>
        car.city?.toLowerCase() === location.toLowerCase() &&
        car.category === category &&
        car.name === carName
    );
      
    if (!matchingCar) {
      toast.warn("No cars found matching your criteria.");
    } else if (matchingCar.status !== "available") {
      toast.error("Car is not available.");
    } else {
      toast.success(`Car found: ${matchingCar.name}, Redirecting...`);
      window.location.href = `/cars/${matchingCar._id}`;
    }

    setIsSubmitting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mx-auto bg-white p-10 rounded-lg shadow-2xl"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-3xl font-bold text-center text-gray-800 mb-8"
      >
        Find Your Perfect Ride
      </motion.h2>

      <form onSubmit={handleFindCar} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Location Input */}
          <InputWrapper label="Location">
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#EC8208]" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter city or airport"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EC8208]"
              />
            </div>
          </InputWrapper>

          {/* Car Category Dropdown */}
          <InputWrapper label="Car Category">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full pl-3 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EC8208]"
              disabled={!availableCategories.length}
            >
              <option value="">Select a category</option>
              {availableCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </InputWrapper>

          {/* Car Name Dropdown - Dynamic based on Category */}
          <InputWrapper label="Car Name">
            <select
              value={carName}
              onChange={(e) => setCarName(e.target.value)}
              className="w-full pl-3 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EC8208]"
              disabled={!filteredCars.length}
            >
              <option value="">Select a Car</option>
              {filteredCars.map((car) => (
                <option key={car._id} value={car.name}>
                  {car.name}
                </option>
              ))}
            </select>
          </InputWrapper>
        </div>

        {/* Submit Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="text-center"
        >
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-black text-white font-bold rounded-lg hover:bg-[#EC8208] hover:text-black focus:outline-none focus:ring-2 focus:ring-[#EC8208] focus:ring-opacity-50 transition duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <AnimatePresence mode="wait">
              {isSubmitting ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-6 h-6 border-t-2 border-white rounded-full animate-spin"
                />
              ) : (
                <motion.div
                  key="icon"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center space-x-2"
                >
                  <FaCar />
                  <span>Find Your Car</span>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default CarBookingForm;
