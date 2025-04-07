import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaCar, FaCheckCircle, FaClock } from "react-icons/fa";
import axios from "axios";
import { AppRoutes } from "../constant/constant";
import Cookies from "js-cookie"; // For handling the authToken

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const userToken = Cookies.get("authToken"); // Get auth token from cookies
  const Userdetails = Cookies.get("user"); // Get auth token from cookies

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Send the token in the request header for authorization
        const response = await axios.get(AppRoutes.getBookings, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        console.log(response.data);
        console.log(userToken);
        console.log(Userdetails);
        
        
        const bookingsData = response.data;

        // Fetch car details for each booking
        const bookingsWithCars = await Promise.all(
          bookingsData.map(async (booking) => {
            try {
              const carResponse = await axios.get(`${AppRoutes.manageCar}/${booking.car}`);

              return { ...booking, carName: carResponse.data.name, carImage: carResponse.data.image, carId: carResponse.data.id };
            } catch (error) {
              console.error("Error fetching car details:", error);
              return { ...booking, carName: "Unknown Car", carImage: "/car-placeholder.png", carId: "Unknown"};
            }
          })
        );

        setBookings(bookingsWithCars);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userToken]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // Formats as DD/MM/YYYY
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
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
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-400"
          >
            <div className="relative h-48">
              <img src={booking.carImage || "/car-placeholder.png"} alt={booking.carName} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <h3 className="text-white text-2xl font-semibold">{booking.carName}</h3>
              </div>
            </div>
            <div className="p-7">
              <div className="flex items-center mb-4">
                <FaCar className="text-yellow-400 mr-2" />
                <p className="text-gray-700 font-medium">Car: {booking.carName}</p>
              </div>
              <div className="flex items-center mb-2">
                <FaCalendarAlt className="text-yellow-400 mr-2" />
                <p className="text-gray-700">Pickup: {formatDate(booking.pickUpDate)}</p>
              </div>
              <div className="flex items-center mb-4">
                <FaCalendarAlt className="text-yellow-400 mr-2" />
                <p className="text-gray-700">Return: {formatDate(booking.dropOffDate)}</p>
              </div>
              <div className="flex items-center">
                {booking.status === "completed" ? (
                  <FaCheckCircle className="text-green-500 mr-2" />
                ) : (
                  <FaClock className="text-orange-500 mr-2" />
                )}
                <p className={`font-semibold ${booking.status === "completed" ? "text-green-500" : "text-orange-500"}`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MyBookings;
