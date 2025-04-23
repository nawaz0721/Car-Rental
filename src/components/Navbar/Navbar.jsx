import React, { useState } from "react";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import { CgProfile } from "react-icons/cg"; // For the profile icon
import ResponsiveMenu from "./ResponsiveMenu";
import Cookies from "js-cookie"
import { Link } from "react-router-dom";

// Mock user authentication state
// This should be integrated with your actual authentication logic
const token = Cookies.get("authToken");

const user = Cookies.get("user");
const userData = JSON.parse(user);
console.log(userData.role);

if(token){
  var isAuthenticated = true;
}else{
  var isAuthenticated = false;
}

const handellogout= () => {
  Cookies.remove("authToken");
  window.location.reload();
}
export const Navlinks = [
  {
    id: 1,
    name: "HOME",
    link: "/#",
  },
  {
    id: 2,
    name: "CARS",
    link: "/cars",
  },
  {
    id: 3,
    name: "ABOUT",
    link: "/#about",
  },
  {
    id: 4,
    name: "BLOGS",
    link: "/#blogs",
  }
];

const ProfileDropdown = ({ isAuthenticated }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <div className="relative">
      <CgProfile onClick={toggleDropdown} className="text-2xl cursor-pointer" />
      {showDropdown && (
        <ul className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-lg shadow-lg border">
          {isAuthenticated ? (
            <>
            {
              userData?.role === "admin" ? (
                <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <Link to="/dashboard/admin">Admin Dashboard</Link>
              </li>
              ): (
                <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <Link to="/dashboard/user">User Dashboard</Link>
              </li>
              )
            }
              {/* <li><a href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">User Dashboard</a></li> */}
              <li><button onClick={handellogout} className="block w-full flex items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button></li>
            </>
          ) : (
            <>
              <li><a href="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Login</a></li>
              <li><a href="/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Register</a></li>
            </>
          )}
        </ul>
      )}
    </div>
  );
};

const Navbar = ({ theme, setTheme }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="relative z-10 shadow-md w-full dark:bg-black dark:text-white duration-300 p-5">
      <div className="container py-2 md:py-0">
        <div className="flex justify-between items-center">
          <span className="text-3xl font-bold font-serif">Car Rental</span>
          <nav className="hidden md:flex items-center gap-8">
            {Navlinks.map(({ id, name, link }) => (
              <a key={id} href={link} className="text-lg font-medium hover:text-primary py-2 hover:border-b-2 hover:border-primary transition-colors duration-500">
                {name}
              </a>
            ))}
            <ProfileDropdown isAuthenticated={isAuthenticated} />
            {theme === "dark" ? (
              <BiSolidSun onClick={() => setTheme("light")} className="text-2xl" />
            ) : (
              <BiSolidMoon onClick={() => setTheme("dark")} className="text-2xl" />
            )}
          </nav>
          <div className="flex items-center gap-4 md:hidden">
            {theme === "dark" ? (
              <BiSolidSun onClick={() => setTheme("light")} className="text-2xl" />
            ) : (
              <BiSolidMoon onClick={() => setTheme("dark")} className="text-2xl" />
            )}
            {showMenu ? (
              <HiMenuAlt1 onClick={toggleMenu} className="cursor-pointer transition-all" size={30} />
            ) : (
              <HiMenuAlt3 onClick={toggleMenu} className="cursor-pointer transition-all" size={30} />
            )}
          </div>
        </div>
      </div>
      <ResponsiveMenu showMenu={showMenu} />
    </div>
  );
};

export default Navbar;
