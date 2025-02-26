import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import DashboardLayout from './customerdashboard/DashboardLayout'; 
import MyBookings from './customerdashboard/MyBookings';
import Profile from './customerdashboard/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboardLayout from './admindashboard/AdminDashboardLoyout';
import AddCar from './admindashboard/AddCars';
import ManageBooking from './admindashboard/ManageBooking';
import Cookies from 'js-cookie';

const Layout = ({ children }) => {
  const location = useLocation(); // ✅ Get the current route

  // Routes where we **HIDE** the Navbar and Footer
  const hideNavFooterRoutes = [
    '/login',
    '/register',
    '/dashboard/admin',
    '/dashboard/admin/manage-car',
    '/dashboard/admin/booking',
    '/dashboard/admin/profile',
    '/dashboard/user',
    '/dashboard/user/myBookings',
    '/dashboard/user/profile',
  ];

  const shouldHideNavFooter = hideNavFooterRoutes.includes(location.pathname);

  return (
    <div className="bg-white dark:bg-black dark:text-white text-black overflow-x-hidden">
      {!shouldHideNavFooter && <Navbar />} {/* ✅ Show Navbar only if needed */}
      {children}
      {!shouldHideNavFooter && <Footer />} {/* ✅ Show Footer only if needed */}
    </div>
  );
};

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [role, setRole] = useState(Cookies.get('user') ? JSON.parse(Cookies.get('user')).role : null);  // Get role from cookies

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    AOS.init({ offset: 100, duration: 800, easing: 'ease-in-sine', delay: 100 });
    AOS.refresh();
  }, []);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home theme={theme} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        {/* Conditionally render dashboard based on user role */}
        {role === 'user' && (
            <Route path="/dashboard/user/*" element={<DashboardLayout />}>
              <Route path="myBookings" element={<MyBookings />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          )}

          {role === 'admin' && (
            <Route path="/dashboard/admin/*" element={<AdminDashboardLayout />}>
              <Route path="manage-car" element={<AddCar />} />
              <Route path="booking" element={<ManageBooking />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          )}
          <Route path="/cars" element={<CarPage />} />
          <Route path="/cars/:title" element={<CarDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/testimonials" element={<Testimonial />} />
          <Route path="/appstore" element={<AppStoreBanner />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cars" element={<CarList />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
