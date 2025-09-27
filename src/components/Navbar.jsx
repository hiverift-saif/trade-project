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
    { name: "Trading", path: "/Trading" },
    { name: "About Us", path: "/aboutus" },
    { name: "Blog", path: "/blog" },

  ];

  return (
    <header className="w-full bg-black backdrop-blur-md border-b border-gray-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
           <Link to="/" className="flex items-center">
          <div className="flex-shrink-0 flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-md flex items-center justify-center mr-2">
              <span className="text-white font-bold">TP</span>
            </div>
            
            <span className="text-xl font-semibold text-white">Trade Pro</span>
          </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-300 hover:text-white transition-colors duration-300 hover:bg-gray-800 px-3 py-2 rounded-lg"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Buttons */}
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all border bg-background border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white h-9 px-4 hidden sm:inline-flex"
            >
              Log In
            </Link>
            <Link
              to="/registration"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-lg h-9 px-4"
            >
              Registration
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-gray-300">
              {isOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/90 px-4 pt-2 pb-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block text-gray-300 hover:text-white px-3 py-2 rounded-lg"
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="block text-gray-300 hover:text-white px-3 py-2 rounded-lg"
          >
            Log In
          </Link>
          <Link
            to="/registration"
            onClick={() => setIsOpen(false)}
            className="block bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-3 py-2 rounded-lg text-center"
          >
            Registration
          </Link>
        </div>
      )}
    </header>
  );
}
