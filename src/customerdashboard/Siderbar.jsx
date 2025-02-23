import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaSignOutAlt, FaTicketAlt } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="w-64 bg-black text-white h-screen p-5">
      <h1 className="text-2xl font-semibold mb-6">Customer Dashboard</h1>
      <ul>
        {/* <li>
          <Link to="/dashboard" className="flex items-center py-2 hover:bg-[#EC8208]">
            <FaHome className="mr-3" /> Dashboard
          </Link>
        </li> */}
        <li>
          <Link to="/dashboard/my-bookings" className="flex items-center py-2 hover:bg-[#EC8208]">
            <FaTicketAlt className="mr-3" /> My Bookings
          </Link>
        </li>
        <li>
          <Link to="/dashboard/profile" className="flex items-center py-2 hover:bg-[#EC8208]">
            <FaUser className="mr-3" /> Profile
          </Link>
        </li>
        <li>
            <Link to="/" className="flex items-center py-2 hover:bg-[#EC8208]">
            <FaSignOutAlt className="mr-3" /> Logout
            </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
