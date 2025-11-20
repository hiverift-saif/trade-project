// src/pages/Login.jsx
import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import BASE from "../config"; // 👈 jisme BASE_URL hai

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { BASE_URL } = BASE;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill in both email and password.",
      });
      return;
    }

    const payload = {
      email: formData.email,
      password: formData.password,
    };

    try {
      setLoading(true);

      const res = await axios.post(`${BASE_URL}createaccount/login`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Response:", res.data);

      if (res.data.status === "success") {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: res.data.message || "Welcome back!",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          // ✅ Optionally store user info
          localStorage.setItem("user", JSON.stringify(res.data.result));

          // ✅ Redirect
          navigate("/dashboard");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: res.data.message || "Invalid email or password",
        });
      }
    } catch (error) {
      console.error("Login error:", error.response?.data);
      Swal.fire({
        icon: "error",
        title: "Login Error",
        text: error.response?.data?.message || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
 <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black px-4 py-10 relative overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-3xl shadow-2xl p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 bg-gradient-to-r from-white via-blue-100 to-green-100 bg-clip-text text-transparent">
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
              className="w-full pl-10 pr-3 py-3 rounded-xl bg-gray-800/60 text-white border border-gray-700/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300 text-sm sm:text-base"
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
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-gray-800/60 text-white border border-gray-700/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300 text-sm sm:text-base"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Remember me */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
              className="w-4 h-4 accent-blue-500 rounded focus:ring-2 focus:ring-blue-400 transition-all duration-300"
            />
            <label className="text-gray-300 text-sm">Remember Me</label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 rounded-xl text-white font-semibold text-base sm:text-lg shadow-2xl transition-all duration-300 hover:scale-[1.02]"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex justify-center text-xs uppercase mt-6">
          <span className="bg-gray-900/50 px-2 text-gray-400">Or continue with</span>
        </div>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-2 gap-4 mt-4 sm:mt-6">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 w-full bg-gray-800/30 border border-gray-700 text-white rounded-md py-2 sm:py-2.5 hover:bg-gray-800 hover:border-gray-600 transition-all duration-300 text-sm sm:text-base"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              ></path>
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              ></path>
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              ></path>
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              ></path>
            </svg>
            Google
          </button>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 w-full bg-gray-800/30 border border-gray-700 text-white rounded-md py-2 sm:py-2.5 hover:bg-gray-800 hover:border-gray-600 transition-all duration-300 text-sm sm:text-base"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z"></path>
            </svg>
            Microsoft
          </button>
        </div>

        {/* Footer Links */}
        <div className="mt-6 text-center text-gray-400 text-sm">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/Registration")}
            className="text-blue-400 font-medium hover:underline"
          >
            Sign Up
          </button>
        </div>

        <div className="mt-2 text-center text-gray-400 text-sm">
          <a href="/forgot-password" className="text-blue-400 font-medium hover:underline">
            Forgot Password?
          </a>
        </div>
      </div>
    </section>
  );
}
