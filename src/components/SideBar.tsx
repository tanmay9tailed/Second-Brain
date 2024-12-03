import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const SideBar = ({ setOpenSideBar, openSideBar }) => {
  const handleSideBar = () => {
    setOpenSideBar(!openSideBar);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="fixed inset-0 bg-blue-50 z-50 shadow-lg flex flex-col">
      {/* Close Button */}
      <div
        className="sm:hidden absolute top-6 right-6 cursor-pointer bg-red-600 hover:bg-red-700 transition-all p-2 rounded-full"
        onClick={() => handleSideBar()}
      >
        <svg
          fill="white"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 490 490"
          className="w-6 h-6"
        >
          <polygon points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490 489.292,457.678 277.331,245.004 489.292,32.337 "></polygon>
        </svg>
      </div>

      {/* Sidebar Content */}
      <div className="h-full w-full flex flex-col justify-between items-center py-12 px-8">
        {/* Header */}
        <h1 className="text-5xl font-bold text-blue-600 mb-16 tracking-wide drop-shadow-md">
          Brain
        </h1>

        {/* Navigation Links */}
        <div className="flex flex-col gap-4 w-full">
          <button className="text-lg font-medium text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white py-3 px-6 rounded-lg shadow-md transition-all duration-300">
            YouTube
          </button>
          <button className="text-lg font-medium text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white py-3 px-6 rounded-lg shadow-md transition-all duration-300">
            Twitter
          </button>
        </div>

        {/* Logout Button */}
        <button
          className="text-lg font-medium text-red-600 bg-transparent hover:bg-red-600 hover:text-white py-3 px-6 rounded-lg shadow-md transition-all duration-300 cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideBar;
