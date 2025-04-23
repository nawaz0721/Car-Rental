import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaSignOutAlt, FaTicketAlt } from 'react-icons/fa';
import Cookies from "js-cookie"
import { BiSolidBookmark } from 'react-icons/bi';

const AdminSidebar = () => {
  const handellogout= () => {
    Cookies.remove("authToken");
    window.location.href = "/";
  }
  return (
    <div className="w-64 bg-black text-white h-screen ">
      <h1 className="text-2xl font-semibold mb-6 p-2">Admin Dashboard</h1>
      <ul className='p-2'>
        <li>
          <Link to="/dashboard/admin/manage-car" className="flex items-center py-2  hover:bg-[#EC8208]">
            <FaTicketAlt className="mr-3" /> Manage Cars
          </Link>
        </li>
        <li>
          <Link to="/dashboard/admin/booking" className="flex items-center py-2 hover:bg-[#EC8208]">
            <BiSolidBookmark className="mr-3" /> Mange Booking
          </Link>
        </li>
        <li>
          <Link to="/dashboard/admin/profile" className="flex items-center py-2 hover:bg-[#EC8208]">
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

export default AdminSidebar;
