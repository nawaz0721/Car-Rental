import React, { useEffect, useState } from "react";
import { notification } from "antd";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { AppRoutes } from "../constant/constant";
import FloatingInput from "../components/FloatingInput";
import AuthLayout from "../components/AuthLayout";
import { FaEnvelope, FaLock } from "react-icons/fa";

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Check if the user is already authenticated
  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      navigate("/"); 
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(AppRoutes.login, formData);
      if (response.data.status) {
        notification.success({
          message: "Login Successful",
          description: response.data.message || "Welcome back!",
        });

        // Store JWT token in cookies
        Cookies.set("authToken", response.data.data.token, { expires: 7 });
        Cookies.set("user", JSON.stringify(response.data.data.user), { expires: 7 });

        // Redirect to dashboard or user-specific route
        navigate("/"); 
      }
    } catch (error) {
      notification.error({
        message: "Login Failed",
        description: error.response?.data?.message || "An error occurred while logging in.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to access your account">
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <FloatingInput icon={FaEnvelope} type="email" name="email" placeholder="Email address" value={formData.email} onChange={handleInputChange} />
        <FloatingInput icon={FaLock} type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
        
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
            "Sign in"
          )}
        </motion.button>
      </form>
    </AuthLayout>
  );
}
