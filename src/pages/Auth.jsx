import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaEnvelope, FaLock, FaUser, FaPhone, FaGoogle, FaApple, FaFacebook } from "react-icons/fa"
import { MdDirectionsCar } from "react-icons/md"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

const FloatingInput = ({ icon: Icon, type, placeholder, required = true }) => {
  const [isFocused, setIsFocused] = useState(false)
  const [value, setValue] = useState("")

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Icon
        className={`absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transition-colors duration-200 ${
          isFocused || value ? "text-yellow-400" : "text-gray-400"
        }`}
      />
      <input
        type={type}
        required={required}
        className="peer w-full rounded-lg border border-gray-300 bg-white/80 py-3 pl-10 pr-3 text-gray-900 backdrop-blur-sm transition-all duration-200 placeholder:text-transparent hover:bg-white/90 focus:border-yellow-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => setValue(e.target.value)}
      />
      <label
        className={`absolute left-10 top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-200 peer-focus:-top-0.5 peer-focus:left-3 peer-focus:text-xs peer-focus:text-yellow-400 ${
          value ? "-top-0.5 left-3 text-xs text-yellow-400" : ""
        }`}
      >
        {placeholder}
      </label>
    </motion.div>
  )
}

export default function AuthForms() {
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

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
          <motion.div className="text-center" variants={fadeIn} initial="initial" animate="animate">
            <motion.div whileHover={{ scale: 1.1, rotate: 360 }} transition={{ duration: 0.5 }}>
              <MdDirectionsCar className="mx-auto h-12 w-12 text-yellow-400" />
            </motion.div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
              {isLogin ? "Welcome back" : "Create account"}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {isLogin ? "Sign in to access your account" : "Start your journey with us"}
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? "login" : "register"}
                variants={fadeIn}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-4"
              >
                {!isLogin && (
                  <>
                    <FloatingInput icon={FaUser} type="text" placeholder="Full Name" />
                    <FloatingInput icon={FaPhone} type="tel" placeholder="Phone Number" />
                  </>
                )}
                <FloatingInput icon={FaEnvelope} type="email" placeholder="Email address" />
                <FloatingInput icon={FaLock} type="password" placeholder="Password" />
              </motion.div>
            </AnimatePresence>

            {isLogin && (
              <motion.div variants={fadeIn} className="flex items-center justify-between">
                <div className="flex items-center">
                  <motion.input
                    whileTap={{ scale: 0.9 }}
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-yellow-400 focus:ring-yellow-400"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>
                
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center rounded-lg bg-black py-3 text-sm font-semibold text-white transition-all hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 disabled:opacity-70"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : isLogin ? (
                "Sign in"
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

          <motion.p variants={fadeIn} className="mt-2 text-center text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium text-yellow-400 transition-colors hover:text-yellow-500"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </motion.p>
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
            layout="fill"
            objectFit="cover"
            className="opacity-90"
            priority
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
              className="mt-4 h-1 bg-yellow-400"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

