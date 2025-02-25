import React, { useState } from 'react';
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaLanguage, FaEdit } from "react-icons/fa";
import Modal from 'react-modal';
import Cookies from "js-cookie"

Modal.setAppElement('#root');  // App root element


const Profile = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    nic: "",
    location: "",
    role: ""
  });

  const user = Cookies.get("user");
  const userData = JSON.parse(user);
  console.log(userData);

  // Handle changes in form inputs
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  // Open and close the modal
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  // Save changes from the modal
  const saveChanges = () => {
    console.log('Profile Updated:', profileData);
    closeModal();  // Close modal after saving changes
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
          className="text-4xl font-bold mb-8 text-center text-[#EC8208]"
        >
          My Profile
        </motion.h1>
        <div className="bg-white rounded-lg shadow-xl overflow-hidden pb-5 border">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <motion.img
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                src="https://dummyimage.com/300x300"
                alt="Profile"
                className="h-48 w-full object-cover md:w-48"
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-yellow-500 font-semibold">{userData.role}</div>
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
              >
                {userData.name}
              </motion.h2>
              <p className="mt-2 text-xl text-gray-500">{userData.nic}</p>
              <p className="mt-1 text-xl text-gray-500">{userData.location}</p>
            </div>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <ProfileItem icon={FaEnvelope} title="Name" value={userData.name} />
              <ProfileItem icon={FaEnvelope} title="Email" value={userData.email} />
              <ProfileItem icon={FaPhone} title="Phone" value={userData.phone} />
              <ProfileItem icon={FaPhone} title="NIC" value={userData.nic} />
              <ProfileItem icon={FaLanguage} title="Location" value={userData.location} />
              <ProfileItem icon={FaLanguage} title="Role" value={userData.role} />
            </dl>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openModal}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-yellow-400 hover:text-black transition-colors duration-300"
            >
              <FaEdit className="mr-2" />
              Edit Profile
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Modal for editing profile details */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="bg-white rounded-lg p-5 shadow-xl mx-auto my-12 relative top-10 max-w-lg"
        >
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          {Object.keys(profileData).map(key => (
            <div key={key} className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <input
                type="text"
                id={key}
                name={key}
                value={profileData[key]}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          ))}
          <button type="button" onClick={saveChanges} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Save Changes
          </button>
          <button type="button" onClick={closeModal} className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Cancel
          </button>
        </form>
      </Modal>
    </>
  );
};

const ProfileItem = ({ icon: Icon, title, value }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.5 }}
    className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
  >
    <dt className="text-sm font-medium text-gray-500 flex items-center">
      <Icon className="mr-2 text-yellow-400" />
      {title}
    </dt>
    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{value}</dd>
  </motion.div>
);

export default Profile;
