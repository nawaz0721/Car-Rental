import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaSignOutAlt, FaTicketAlt } from 'react-icons/fa';
import Cookies from "js-cookie"

const Sidebar = () => {
  const handellogout= () => {
    Cookies.remove("authToken");
    window.location.href = "/";
  }
  return (
    <div className="w-64 bg-black text-white h-screen ">
      <h1 className="text-2xl font-semibold mb-6 p-2">Customer Dashboard</h1>
      <ul className='p-2'>
        <li>
          <Link to="/dashboard/user/myBookings" className="flex items-center py-2  hover:bg-[#EC8208]">
            <FaTicketAlt className="mr-3" /> My Bookings
          </Link>
        </li>
        <li>
          <Link to="/dashboard/user/profile" className="flex items-center py-2 hover:bg-[#EC8208]">
            <FaUser className="mr-3" /> Profile
          </Link>
        </li>
        <li>
            <button onClick={handellogout} className="flex items- w-full py-2 hover:bg-[#EC8208]">
            <FaSignOutAlt className="mr-3" /> Logout
            </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
