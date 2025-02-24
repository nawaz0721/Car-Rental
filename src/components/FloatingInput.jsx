import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const FloatingInput = ({ icon: Icon, type, placeholder, name, value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    if (type === "password") {
      setShowPassword(!showPassword);
    }
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Icon
        className={`absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transition-colors duration-200 ${
          isFocused || value ? "text-[#FDB23D]" : "text-gray-400"
        }`}
      />
      <input
        id={`input-${name}`}
        type={showPassword ? "text" : type}
        required
        name={name}
        value={value}
        onChange={onChange}
        className="peer w-full rounded-lg border border-gray-300 bg-white/80 py-3 pl-10 pr-3 text-gray-900 backdrop-blur-sm transition-all duration-200 placeholder:text-transparent hover:bg-white/90 focus:border-[#FDB23D] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FDB23D]/50"
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <label
        htmlFor={`input-${name}`}
        className={`absolute left-10 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200 peer-focus:-top-0.5 peer-focus:left-3 peer-focus:text-xs peer-focus:text-[#FDB23D] ${
          value ? "-top-0.5 left-3 text-xs text-[#FDB23D]" : ""
        }`}
      >
        {placeholder}
      </label>
      {type === "password" && (
        <button
          type="button"
          onClick={toggleShowPassword}
          className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-[#FDB23D]"
        >
          {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
        </button>
      )}
    </motion.div>
  );
};

export default FloatingInput;
