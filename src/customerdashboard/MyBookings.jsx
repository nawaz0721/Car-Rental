"use client"
import { motion } from "framer-motion"
import { FaCalendarAlt, FaCar, FaCheckCircle, FaClock } from "react-icons/fa"

const bookings = [
  {
    car: "BMW X5",
    pickupDate: "04-01-2025",
    returnDate: "04-05-2025",
    bookingStatus: "Confirmed",
    image: "/car-placeholder.png", // Replace with actual car images
  },
  {
    car: "Tesla Model X",
    pickupDate: "04-15-2025",
    returnDate: "04-20-2025",
    bookingStatus: "Pending",
    image: "/car-placeholder.png",
  },
  {
    car: "Mercedes E-Class",
    pickupDate: "05-01-2025",
    returnDate: "05-07-2025",
    bookingStatus: "Confirmed",
    image: "/car-placeholder.png",
  },
]

const MyBookings = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
        className="text-4xl font-bold mb-8 text-center text-gray-800"
      >
        My Car Bookings
      </motion.h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {bookings.map((booking, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-48">
              <img
                src={booking.image || "/car-placeholder.png"}
                alt={booking.car}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <h3 className="text-white text-2xl font-semibold">{booking.car}</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <FaCar className="text-yellow-400 mr-2" />
                <p className="text-gray-700 font-medium">Car: {booking.car}</p>
              </div>
              <div className="flex items-center mb-2">
                <FaCalendarAlt className="text-yellow-400 mr-2" />
                <p className="text-gray-700">Pickup: {booking.pickupDate}</p>
              </div>
              <div className="flex items-center mb-4">
                <FaCalendarAlt className="text-yellow-400 mr-2" />
                <p className="text-gray-700">Return: {booking.returnDate}</p>
              </div>
              <div className="flex items-center">
                {booking.bookingStatus === "Confirmed" ? (
                  <FaCheckCircle className="text-green-500 mr-2" />
                ) : (
                  <FaClock className="text-orange-500 mr-2" />
                )}
                <p
                  className={`font-semibold ${
                    booking.bookingStatus === "Confirmed" ? "text-green-500" : "text-orange-500"
                  }`}
                >
                  {booking.bookingStatus}
                </p>
              </div>
            </div>
            <div className="bg-gray-100 px-6 py-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-black text-white py-2 rounded-lg hover:bg-yellow-400 hover:text-black transition-colors duration-300"
              >
                View Details
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default MyBookings
