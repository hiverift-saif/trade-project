// src/components/FreeDemo.jsx
import React, { useState } from "react";
import { Play } from "lucide-react";

export default function FreeDemo() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    agree: false,
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
    console.log("Demo Form Data:", formData);
    alert("Demo request submitted!");
    // Yahan API call ya modal show kar sakte ho
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden h-screen">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2280%22%20height%3D%2280%22%20viewBox%3D%220%200%2080%2080%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23fff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M0%2040h80v1H0zM40%200v80h1V0z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-green-200 bg-clip-text text-transparent">
            Try Free Demo
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            Experience our trading platform risk-free. Get access to real-time data, trading charts, and practice tools.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-gray-700/50 shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="flex flex-col">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 mb-4 rounded-xl bg-gray-800/60 border border-gray-700/50 text-white focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 mb-4 rounded-xl bg-gray-800/60 border border-gray-700/50 text-white focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Mobile Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-gray-800/60 border border-gray-700/50 text-white focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300"
            />
          </div>

          <div className="flex flex-col justify-between">
            <div className="flex items-center space-x-2 mb-4">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                required
                className="w-4 h-4 text-blue-500 accent-blue-500 rounded focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              />
              <label className="text-gray-300 text-sm">
                I agree to the Terms and Conditions
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-4 mt-2 md:mt-0 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 rounded-xl text-white font-semibold text-lg shadow-2xl flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105"
            >
              <Play className="w-5 h-5" /> Start Free Demo
            </button>
          </div>
        </form>

        <p className="text-gray-400 text-center mt-6 text-sm">
          No credit card required. Experience live trading with virtual funds.
        </p>
      </div>
    </section>
  );
}
