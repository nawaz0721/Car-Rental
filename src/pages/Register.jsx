import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaLock, FaUser, FaPhone, FaGoogle, FaApple, FaFacebook } from "react-icons/fa";
import AuthLayout from "../components/AuthLayout";
import FloatingInput from "../components/FloatingInput";
import { Link, useNavigate } from "react-router-dom";
import { notification } from "antd";
import axios from "axios";
import { AppRoutes } from "../constant/constant";

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
      console.log(userData);
      const response = await axios.post(AppRoutes.register, userData);
      console.log("Response:", response);

      notification.success({
        message: "Signup Successful",
        description: response.data.message || "User registered successfully!",
      });

      navigate("/login"); 
    } catch (error) {
      console.error("Error during registration:", error);
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

        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white/60 px-2 text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: FaGoogle, color: "bg-red-500" },
            { icon: FaFacebook, color: "bg-blue-600" },
            { icon: FaApple, color: "bg-black" },
          ].map((social, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className={`${social.color} flex items-center justify-center rounded-lg p-2 text-white transition-transform hover:opacity-90`}
            >
              <social.icon className="h-5 w-5" />
            </motion.button>
          ))}
        </div>
      </form>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 text-center text-sm text-gray-600"
      >
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-[#FDB23D] transition-colors hover:text-[#FFB740]">
          Sign in
        </Link>
      </motion.p>
    </AuthLayout>
  );
}
