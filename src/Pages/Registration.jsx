// src/pages/Registration.jsx
import React, { useState } from "react";
import { User, Lock, Mail, Key, Smartphone } from "lucide-react";

export default function Registration() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registration Data:", formData);
    // API call yahan add kare
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      {/* Background shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto p-8 bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl">
        <h2 className="text-3xl font-bold  text-center mb-6 bg-gradient-to-r from-white via-blue-100 to-green-100 bg-clip-text text-transparent">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="relative">
            <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-3 py-3 rounded-xl bg-gray-800/60 text-white border border-gray-700/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-3 py-3 rounded-xl bg-gray-800/60 text-white border border-gray-700/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300"
            />
          </div>

          {/* Mobile Number */}
          <div className="relative">
            <Smartphone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-3 py-3 rounded-xl bg-gray-800/60 text-white border border-gray-700/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-3 py-3 rounded-xl bg-gray-800/60 text-white border border-gray-700/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300"
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Key className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-3 py-3 rounded-xl bg-gray-800/60 text-white border border-gray-700/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300"
            />
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              required
              className="w-4 h-4 text-blue-500 accent-blue-500 rounded focus:ring-2 focus:ring-blue-400 transition-all duration-300"
            />
            <label className="text-gray-300 text-sm">
              I agree to the{" "}
              <a href="/terms" className="text-blue-400 hover:underline">
                Terms & Conditions
              </a>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 rounded-xl text-white font-semibold text-lg shadow-2xl transition-all duration-300 hover:scale-105"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 font-medium hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </section>
  );
}
