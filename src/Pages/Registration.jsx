import React, { useState } from "react";
import { User, Mail, Lock, Key, Smartphone, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (!formData.email.includes("@")) {
      alert("Please enter a valid email address!");
      return;
    }
    if (!formData.terms) {
      alert("Please accept the terms and conditions!");
      return;
    }

    console.log("Registration Data:", formData);

    // TODO: API call
    navigate("/login");
  };

  return (
    <section className=" px-5 py-20 flex items-center justify-center relative bg-gradient-to-br from-black via-gray-900 to-gray-800 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto p-8 bg-black/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-white via-blue-100 to-green-100 bg-clip-text text-transparent">
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
              className="w-full pl-10 pr-3 py-3 rounded-xl bg-gray-900/60 text-white border border-gray-700/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300"
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
              className="w-full pl-10 pr-3 py-3 rounded-xl bg-gray-900/60 text-white border border-gray-700/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300"
            />
          </div>

          {/* Mobile */}
          <div className="relative">
            <Smartphone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-3 py-3 rounded-xl bg-gray-900/60 text-white border border-gray-700/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300"
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
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-gray-900/60 text-white border border-gray-700/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Key className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-gray-900/60 text-white border border-gray-700/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Terms */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              required
              className="w-4 h-4 text-blue-500 accent-blue-500 rounded focus:ring-2 focus:ring-blue-400 transition-all duration-300"
            />
            <label className="text-gray-300 text-xs sm:text-sm">
              I agree to the{" "}
              <a href="/terms" className="text-blue-400 hover:underline">
                Terms & Conditions
              </a>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 rounded-xl text-white font-semibold text-lg shadow-2xl transition-all duration-300 hover:scale-105"
          >
            Register
          </button>
        </form>

        {/* Already have account */}
        <p className="mt-4 text-center text-gray-400 text-xs sm:text-sm">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-400 font-medium hover:underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </section>
  );
}
