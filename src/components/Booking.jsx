

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { FaMapMarkerAlt, FaCalendarAlt, FaCar } from "react-icons/fa"

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
)

const CarBookingForm = () => {
  const [location, setLocation] = useState("")
  const [category, setCategory] = useState("") // Added state for car category
  const [bookingDate, setBookingDate] = useState(new Date())
  const [returnDate, setReturnDate] = useState(new Date())
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleLocationChange = (event) => {
    setLocation(event.target.value)
  }

  const handleCategoryChange = (event) => {
    setCategory(event.target.value)
  }

  const handleFindCar = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    console.log("Searching cars for:", { location, category, bookingDate, returnDate })
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-[80%] mx-auto bg-white p-10 rounded-lg shadow-2xl"
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Location Input */}
          <InputWrapper label="Location">
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#EC8208]" />
              <input
                type="text"
                value={location}
                onChange={handleLocationChange}
                placeholder="Enter city or airport"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EC8208] focus:border-transparent transition duration-300"
              />
            </div>
          </InputWrapper>

          {/* Car Category Dropdown */}
          <InputWrapper label="Car Category">
            <div className="relative">
              <select
                value={category}
                onChange={handleCategoryChange}
                className="w-full pl-3 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EC8208] focus:border-transparent transition duration-300"
              >
                <option value="">Select a category</option>
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Coupe">Coupe</option>
                <option value="Convertible">Convertible</option>
                <option value="Luxury">Luxury</option>
              </select>
            </div>
          </InputWrapper>

          {/* Pick-up Date */}
          <InputWrapper label="Pick-up Date">
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#EC8208]" />
              <DatePicker
                selected={bookingDate}
                onChange={(date) => setBookingDate(date)}
                dateFormat="MM/dd/yyyy"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EC8208] focus:border-transparent transition duration-300"
              />
            </div>
          </InputWrapper>

          {/* Return Date */}
          <InputWrapper label="Return Date">
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#EC8208]" />
              <DatePicker
                selected={returnDate}
                onChange={(date) => setReturnDate(date)}
                dateFormat="MM/dd/yyyy"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EC8208] focus:border-transparent transition duration-300"
              />
            </div>
          </InputWrapper>
        </div>

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
  )
}

export default CarBookingForm
