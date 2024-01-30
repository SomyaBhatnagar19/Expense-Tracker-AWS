/* /frontend/Views/Header.js */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import wallet from "../assets/wallet.png";
import user from "../assets/user.png";
import premuim from "../assets/premuim.png";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate(); 

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      alert("Logout successful!");
      navigate("/"); 
    }
  };

  return (
    <div className="bg-cyan-500 text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img src={wallet} alt="wallet-logo" className="h-20 w-20" />
          <h1 className="text-lg ml-2 font-semibold text-sky-900">Spendzi</h1>
        </div>

        <div className="relative ml-auto mr-5 shadow-md">
          <button className="flex items-center justify-between border rounded-lg bg-orange-900 px-3 py-1 hover:bg-orange-800">
            <span className="mr-1">Buy Premium</span>
            <img src={premuim} alt="premuim-logo" className="h-8 w-8" />
          </button>
        </div>

        <div className="relative">
          <div
            className="cursor-pointer h-8 w-8 flex items-center"
            onClick={toggleDropdown}
          >
            <img
              src={user}
              alt="user-logo"
              className="rounded-full h-full w-full bg-slate-400"
            />
          </div>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 bg-red-500 rounded-lg shadow-md">
              <button
                className="block px-4 py-2 text-gray-800 hover:bg-red-300 rounded-lg"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
