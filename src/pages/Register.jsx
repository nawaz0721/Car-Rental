import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaLock, FaUser, FaPhone } from "react-icons/fa";
import AuthLayout from "../components/AuthLayout";
import FloatingInput from "../components/FloatingInput";
import { Link, useNavigate } from "react-router-dom";
import { notification } from "antd";
import axios from "axios";
import { AppRoutes } from "../constant/constant";
import Cookies from "js-cookie";

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Check if the user is already authenticated
  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      navigate("/"); // Redirect to home if logged in
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.phone
    ) {
      notification.error({
        message: "Please complete the form",
        description: "All fields are required.",
      });
      return;
    }
    setIsLoading(true);
    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
      };
      const response = await axios.post(AppRoutes.register, userData);
      notification.success({
        message: "Signup Successful",
        description: response.data.message || "User registered successfully!",
      });

      navigate("/login");
    } catch (error) {
      notification.error({
        message: "Signup Failed",
        description: error.response?.data.message || "Unable to register, please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Create account" subtitle="Start your journey with us">
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key="register"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <FloatingInput icon={FaUser} type="text" placeholder="Full Name" name="name" value={formData.name} onChange={handleInputChange} />
            <FloatingInput icon={FaPhone} type="tel" placeholder="Phone Number" name="phone" value={formData.phone} onChange={handleInputChange} />
            <FloatingInput icon={FaEnvelope} type="email" placeholder="Email address" name="email" value={formData.email} onChange={handleInputChange} />
            <FloatingInput icon={FaLock} type="password" placeholder="Password" name="password" value={formData.password} onChange={handleInputChange} />
          </motion.div>
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading}
          className="group relative flex w-full justify-center rounded-lg bg-black py-3 text-sm font-semibold text-white transition-all hover:bg-[#FFB740] hover:text-black focus:outline-none focus:ring-2 focus:ring-[#FDB23D]/50 disabled:opacity-70"
        >
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
            />
          ) : (
            "Create account"
          )}
        </motion.button>
      </form>
    </AuthLayout>
  );
}
