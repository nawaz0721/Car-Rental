import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaTimes } from "react-icons/fa";
import { MdDirectionsCar } from "react-icons/md";
import { useParams } from "react-router-dom";
import axios from "axios"; // Import axios
import { AppRoutes } from "../constant/constant";

const CarDetails = () => {
  const { title } = useParams(); // Use useParams to capture the 'title' from the URL
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true); // State to handle loading

  // Fetch car details from backend
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`${AppRoutes.manageCar}/${title}`);
        setCar(response.data);
      } catch (error) {
        console.error("Error fetching car details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [title]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    nic: "",
    location: "",
    pickUpDate: "",
    dropOffDate: "",
  });

  const [isValid, setIsValid] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.nic.length !== 13 || isNaN(formData.nic)) {
      setIsValid(false);
      return;
    }
  
    const pickUpDate = new Date(formData.pickUpDate);
    const dropOffDate = new Date(formData.dropOffDate);
    const rentalDays = Math.ceil((dropOffDate - pickUpDate) / (1000 * 3600 * 24));
  
    const bookingData = {
      carTitle: car?.name,
      name: formData.name,
      mobile: formData.mobile,
      nic: formData.nic,
      location: formData.location,
      pickUpDate: formData.pickUpDate,
      dropOffDate: formData.dropOffDate,
      totalDays: rentalDays,
      totalPrice: rentalDays * car?.price,
    };
    console.log(bookingData);
    
  
    try {
      const response = await axios.post(AppRoutes.bookCar, bookingData);
      console.log("Booking successful:", response.data);
      alert("Booking confirmed!");
      setShowModal(false);
    } catch (error) {
      console.error("Error booking car:", error);
      setShowModal(false);
      alert("Booking failed. Please try again.");
    }
  };
  
  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (!car) {
    return <div className="container mx-auto px-4 py-8">Car not found.</div>;
  }

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded overflow-hidden"
          >
            <img
              src={car.image || "/placeholder.svg"}
              alt={car.name}
              width={500}
              height={300}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0"
          >
            <h2 className="text-sm title-font text-gray-500 tracking-widest">CAR RENTAL</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{car.name}</h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                {[...Array(4)].map((_, i) => (
                  <FaStar key={i} className="w-4 h-4 text-yellow-400" />
                ))}
                <FaStar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600 ml-3">4 Reviews</span>
              </span>
            </div>
            <p className="leading-relaxed">
              Description of the {car.name}. This car is available for rent at ${car.price}/day.
            </p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
              <div className="flex items-center">
                <MdDirectionsCar className="w-6 h-6 mr-2 text-yellow-400" />
                <span className="mr-3">Category:</span>
                <span className="font-medium">{car.category}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="title-font font-medium text-2xl text-gray-900">${car.price} / Day</span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowModal(true)}
                className="flex ml-auto text-white bg-black border-0 py-2 px-6 focus:outline-none hover:bg-yellow-400 hover:text-black rounded transition-colors duration-300"
              >
                Book Now
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="w-6 h-6" />
              </motion.button>
              <h2 className="text-2xl font-bold mb-6">Book Your Car</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <InputField label="Name" name="name" value={formData.name} onChange={handleInputChange} />
                <InputField label="Mobile Number" name="mobile" value={formData.mobile} onChange={handleInputChange} />
                <InputField
                  label="NIC Number"
                  name="nic"
                  value={formData.nic}
                  onChange={handleInputChange}
                  maxLength={13}
                  error={!isValid && "NIC number must be 13 digits"}
                />
                <InputField label="Location" name="location" value={formData.location} onChange={handleInputChange} />
                <InputField
                  label="Pick-up Date"
                  name="pickUpDate"
                  type="date"
                  value={formData.pickUpDate}
                  onChange={handleInputChange}
                />
                <InputField
                  label="Drop-off Date"
                  name="dropOffDate"
                  type="date"
                  value={formData.dropOffDate}
                  onChange={handleInputChange}
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-2 bg-black text-white rounded-lg hover:bg-yellow-400 hover:text-black transition-colors duration-300"
                >
                  Submit Booking
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const InputField = ({ label, name, type = "text", value, onChange, maxLength, error }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition duration-300"
      required
      maxLength={maxLength}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default CarDetails;