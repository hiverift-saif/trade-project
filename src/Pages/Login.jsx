// src/pages/Login.jsx
import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    // API call yahan add kare
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      {/* Background shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Login Form */}
      <div className="relative z-10 w-full max-w-md mx-auto p-8 bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-white via-blue-100 to-green-100 bg-clip-text text-transparent">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-gray-800/60 text-white border border-gray-700/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Remember Me */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
              className="w-4 h-4 text-blue-500 accent-blue-500 rounded focus:ring-2 focus:ring-blue-400 transition-all duration-300"
            />
            <label className="text-gray-300 text-sm">Remember Me</label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 rounded-xl text-white font-semibold text-lg shadow-2xl transition-all duration-300 hover:scale-105"
          >
            Login
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-4 text-center text-gray-400 text-sm">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-blue-400 font-medium hover:underline"
          >
            Sign Up
          </button>
        </div>

        {/* Forgot Password */}
        <div className="mt-2 text-center text-gray-400 text-sm">
          <a href="/forgot-password" className="text-blue-400 font-medium hover:underline">
            Forgot Password?
          </a>
        </div>
      </div>
    </section>
  );
}
