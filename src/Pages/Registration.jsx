// src/Pages/Registration.jsx
import React, { useState, useEffect } from "react";
import { User, Mail, Lock, Key, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import BASE from "../config"; // Ye config file jisme AFFILIATE_URL hai

export default function Registration() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Auto focus on first input
  useEffect(() => {
    document.getElementById("fullName")?.focus();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Strong password checker
  const isStrongPassword = (pwd) =>
    pwd.length >= 8 &&
    /[A-Z]/.test(pwd) &&
    /[a-z]/.test(pwd) &&
    /\d/.test(pwd) &&
    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // === All Validations ===
    if (!form.fullName.trim()) return toast.error("Full Name is required");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) return toast.error("Enter a valid email address");

    if (!form.password || !form.confirmPassword)
      return toast.error("Password fields cannot be empty");

    if (form.password !== form.confirmPassword)
      return toast.error("Passwords do not match");

    if (!isStrongPassword(form.password))
      return toast.error(
        "Password must be 8+ characters with uppercase, lowercase, number & special char"
      );

    if (!form.terms)
      return toast.error("You must accept the Terms & Conditions");

    // === API Call ===
    setLoading(true);
    const toastId = toast.loading("Creating your account...");
    try {
      const response = await axios.post(`${BASE.AFFILIATE_URL}/auth/register`, {
        name: form.fullName.trim(),
        email: form.email.toLowerCase().trim(),
        password: form.password,
      });

      // SUCCESS
      toast.dismiss(toastId);
      
      // Ye line hata di → double toast ki wajah thi
      // toast.success("Account created successfully! Taking you to login...");

      // Ab sirf ek baar success dikhega (loading toast khud convert ho jayega)
      toast.success("Account created successfully!");

      // Save user info
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: response.data.result._id,
          name: response.data.result.name,
          email: response.data.result.email,
          affiliateCode: response.data.result.affiliateCode,
        })
      );

      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err) {
      toast.dismiss(toastId);
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        "Registration failed! Please try again.";
      toast.error(errorMsg);
      console.error("Registration Error:", err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#000213] via-[#041379]/90 to-[#041379]/40 px-5 py-10">
      <div className="w-full max-w-md p-8 bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-white via-blue-100 to-green-100 bg-clip-text text-transparent">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="relative">
            <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-3 rounded-xl bg-gray-800/60 text-white border border-gray-700/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 outline-none transition"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-3 rounded-xl bg-gray-800/60 text-white border border-gray-700/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 outline-none transition"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-gray-800/60 text-white border border-gray-700/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 outline-none transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Key className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-gray-800/60 text-white border border-gray-700/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 outline-none transition"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-center space-x-2">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              checked={form.terms}
              onChange={handleChange}
              className="w-4 h-4 text-blue-500 rounded focus:ring-blue-400"
            />
            <label htmlFor="terms" className="text-gray-300 text-sm">
              I agree to the{" "}
              <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                Terms of Service
              </a>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-bold text-lg shadow-2xl transition-all ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-green-500 to-blue-600 hover:scale-105 active:scale-95"
            }`}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-blue-400 font-medium hover:underline"
          >
            Login here
          </button>
        </p>
      </div>
    </section>
  );
}