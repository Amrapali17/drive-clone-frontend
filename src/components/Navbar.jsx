// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between bg-[#001f3f] text-white px-6 py-4 fixed w-full z-10">
      <h1 className="text-2xl font-bold">DriveClone</h1>
      <div className="flex gap-4">
        {!token ? (
          <>
            <Link
              to="/login"
              className="px-4 py-2 border border-white rounded hover:bg-white hover:text-[#001f3f] transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 border border-white rounded hover:bg-white hover:text-[#001f3f] transition"
            >
              Signup
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-white rounded hover:bg-white hover:text-[#001f3f] transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
