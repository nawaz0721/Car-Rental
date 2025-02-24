import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Component imports
import Navbar from './components/Navbar/Navbar';
import About from './components/About/About';
import Services from './components/Services/Services';
import CarList from './components/CarList/CarList';
import AppStoreBanner from './components/AppStoreBanner/AppStoreBanner';
import Contact from './components/Contact/Contact';
import Testimonial from './components/Testimonial/Testimonial';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import CarPage from './pages/CarPage';
import CarDetails from './pages/CarDetails';
import DashboardLayout from './customerdashboard/DashboardLayout'; // New Dashboard layout
import MyBookings from './customerdashboard/MyBookings';
import Profile from './customerdashboard/Profile';
import Login from './pages/Login';
import Register from './pages/register';

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light');
  const element = document.documentElement;

  useEffect(() => {
    if (theme === 'dark') {
      element.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      element.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: 'ease-in-sine',
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <Router>
      <div className="bg-white dark:bg-black dark:text-white text-black overflow-x-hidden">
        {/* Conditional Navbar */}
        {['/login', '/register', '/dashboard', '/dashboard/my-bookings', '/dashboard/profile'].indexOf(window.location.pathname) === -1 && <Navbar theme={theme} setTheme={setTheme} />}

        <Routes>
          <Route path="/" element={<Home theme={theme} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Nested routes for Dashboard */}
          <Route path="/dashboard/*" element={<DashboardLayout />}>
            {/* <Route index element={<Dashboard />} /> */}
            <Route path="my-bookings" element={<MyBookings />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route path="/cars" element={<CarPage />} />
          <Route path="/cars/:title" element={<CarDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/testimonials" element={<Testimonial />} />
          <Route path="/appstore" element={<AppStoreBanner />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cars" element={<CarList />} />
        </Routes>

        {/* Conditional Footer */}
        {['/login', '/register', '/dashboard', '/dashboard/my-bookings', '/dashboard/profile'].indexOf(window.location.pathname) === -1 && <Footer />}
      </div>
    </Router>
  );
};

export default App;
