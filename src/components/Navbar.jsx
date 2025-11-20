// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Quickstart", path: "/Quickstart" },
    { name: "Free Demo", path: "/freedemo" },
   { name: "Trading", path: "/trading" },  // ⬅ FIXED ⬅
    { name: "Affiliates", path: "/affiliates" },
    { name: "About Us", path: "/aboutus" },
    { name: "Blog", path: "/blog" },
  ];

  return (
    <header className="w-full bg-black/90 backdrop-blur-md border-b border-gray-800 shadow-lg fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-md flex items-center justify-center mr-2">
              <span className="text-white font-bold">TP</span>
            </div>
            <span className="text-xl font-semibold text-white tracking-wide">
              Trade Pro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded-lg transition-all duration-200"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            <Link
              to="/login"
              className="border border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white rounded-md text-sm font-medium h-9 px-4 flex items-center transition-all"
            >
              Log In
            </Link>
            <Link
              to="/registration"
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white rounded-md text-sm font-medium h-9 px-4 flex items-center shadow-lg transition-all"
            >
              Registration
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-2"
          >
            {isOpen ? (
              <span className="text-2xl font-bold">✕</span>
            ) : (
              <span className="text-2xl font-bold">☰</span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-screen opacity-100 visible"
            : "max-h-0 opacity-0 invisible"
        } overflow-hidden`}
      >
        <div className="bg-black/95 border-t border-gray-800 px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block text-gray-300 hover:text-white px-3 py-2 rounded-lg transition-all"
            >
              {link.name}
            </Link>
          ))}

          <div className="flex flex-col space-y-2 pt-2 border-t border-gray-800">
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block border border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white rounded-md text-sm font-medium h-9 px-4 text-center"
            >
              Log In
            </Link>
            <Link
              to="/registration"
              onClick={() => setIsOpen(false)}
              className="block bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white rounded-md text-sm font-medium h-9 px-4 text-center shadow-lg"
            >
              Registration
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
