import React from "react"
import { motion } from "framer-motion"
import { MdDirectionsCar } from "react-icons/md"


export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="flex min-h-screen">
      {/* Form Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative flex w-full items-center justify-center bg-gradient-to-br from-white to-gray-100 px-4 sm:w-1/2 lg:px-8"
      >
        <div className="absolute inset-0 bg-grid-black/[0.02]" />
        <div className="relative w-full max-w-md space-y-8 rounded-2xl bg-white/60 p-8 shadow-xl backdrop-blur-xl">
          <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <motion.div whileHover={{ scale: 1.1, rotate: 360 }} transition={{ duration: 0.5 }}>
              <MdDirectionsCar className="mx-auto h-12 w-12 text-[#FDB23D]" />
            </motion.div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">{title}</h2>
            <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
          </motion.div>
          {children}
        </div>
      </motion.div>

      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden bg-black sm:block sm:w-1/2"
      >
        <div className="relative h-full w-full">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-A5M1Ruup5Tnkhg7AROHY9cNgP21lFv.png"
            alt="Luxury car"
            className="h-full w-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-transparent" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-8 left-8 max-w-md text-white"
          >
            <h3 className="text-3xl font-bold">Premium Car Rental Service</h3>
            <p className="mt-4 text-lg text-gray-300">
              Experience luxury and comfort with our premium fleet of vehicles. Drive your dreams today.
            </p>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 100 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-4 h-1 bg-[#FDB23D]"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

