import React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaEnvelope, FaLock, FaGoogle, FaApple, FaFacebook } from "react-icons/fa"
import FloatingInput from "../components/FloatingInput"
import AuthLayout from "../components/AuthLayout"
import { Link, useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import { AppRoutes } from "../constant/constant"
import { notification } from "antd";
import axios from "axios"


export default function Login() {
  const [formData, setFormData] = useState({
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
    e.preventDefault()
    
    setIsLoading(true)
    try {
      const response = await axios.post(AppRoutes.login, formData);
      console.log(response);
      
      if (response.data.status) {
        notification.success({
          message: "Login Successful",
          description: response.data.message || "Welcome back!",
        });

        Cookies.set("authToken", response.data.data.token, { expires: 7 });
        Cookies.set("user", JSON.stringify(response.data.data.user), { expires: 7 });
        navigate("/");
      } else{
        notification.error({
          message: "Login Failed",
          description: error.response?.data?.message || "An error occurred while logging in.",
          });
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
        <AnimatePresence mode="wait">
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <FloatingInput icon={FaEnvelope} type="email" name="email" placeholder="Email address" value={formData.email} onChange={handleInputChange} />
            <FloatingInput icon={FaLock} type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center">
            <motion.input
              whileTap={{ scale: 0.9 }}
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-[#FDB23D] focus:ring-[#FDB23D]"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>
          <Link href="/forgot-password" className="text-sm font-medium text-[#FDB23D] hover:text-[#FFB740]">
            Forgot your password?
          </Link>
        </motion.div>

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
        Don't have an account?{" "}
        <Link to="/register" className="font-medium text-[#FDB23D] transition-colors hover:text-[#FFB740]">
          Sign up
        </Link>
      </motion.p>
    </AuthLayout>
  )
}

