import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Siderbar';

const DashboardLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-6"> 
        <h1 className="text-3xl font-semibold mb-6">Welcome Back!</h1>
        <Outlet />  
      </div>
    </div>
  );
};

export default DashboardLayout;
