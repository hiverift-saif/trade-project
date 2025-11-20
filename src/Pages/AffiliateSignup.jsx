import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, UserPlus } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";
import BASE from "../config";

export default function AffiliateSignup() {
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
  const [loading, setLoading] = useState(false);

  // Handle form input updates
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle signup submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (formData.password !== formData.confirmPassword) {
      return Swal.fire({
        icon: "error",
        title: "Passwords do not match!",
      });
    }

    if (!formData.email.includes("@")) {
      return Swal.fire({
        icon: "error",
        title: "Invalid email address!",
      });
    }

    if (!formData.terms) {
      return Swal.fire({
        icon: "warning",
        title: "Please accept Terms & Conditions!",
      });
    }

    const payload = {
      name: formData.fullName,
      email: formData.email,
      phone: formData.mobile,
      password: formData.password,
    };

    try {
      setLoading(true);

      const res = await axios.post(
        `${BASE.AFFILIATE_URL}/auth/register`,
        payload
      );

      console.log("Signup Response:", res);

      if (res.status === 201 || res.data?.statusCode === 201) {
        Swal.fire({
          icon: "success",
          title: "Signup Successful!",
          text: "Redirecting to login...",
          timer: 2000,
          showConfirmButton: false,
          background: "#111827",
          color: "#fff",
        }).then(() => navigate("/affiliateLogin"));
      } else {
        Swal.fire({
          icon: "error",
          title: res.data?.message || "Signup Failed!",
        });
      }
    } catch (error) {
      console.error("Signup Error:", error);
      Swal.fire({
        icon: "error",
        title: "Server Error!",
        text: error.response?.data?.message || "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4 py-20 relative overflow-hidden">

      {/* Background Blur Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Signup Card */}
      <div className="flex flex-col gap-6 rounded-xl border w-full max-w-md bg-gray-900/60 border-gray-800 backdrop-blur-xl relative z-10">

        {/* Header */}
        <div className="px-6 pt-6 text-center space-y-2">
          <div className="flex justify-center items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center mr-3">
              <span className="text-white font-bold text-xl">TP</span>
            </div>
            <span className="text-2xl text-white">Trade Pro</span>
          </div>
          <p className="text-gray-400">Create your affiliate account</p>
        </div>

        {/* Form */}
        <div className="px-6 pb-6">
          <form className="space-y-4" onSubmit={handleSubmit}>

            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-sm text-gray-300">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  name="fullName"
                  type="text"
                  placeholder="Enter full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full h-10 rounded-md border border-gray-700 bg-gray-800/50 pl-10 text-white focus-visible:ring-2 focus-visible:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-sm text-gray-300">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full h-10 rounded-md border border-gray-700 bg-gray-800/50 pl-10 text-white focus-visible:ring-2 focus-visible:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-sm text-gray-300">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full h-10 rounded-md border border-gray-700 bg-gray-800/50 pl-10 pr-10 text-white focus-visible:ring-2 focus-visible:ring-blue-500 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-sm text-gray-300">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full h-10 rounded-md border border-gray-700 bg-gray-800/50 pl-10 pr-10 text-white focus-visible:ring-2 focus-visible:ring-blue-500 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex gap-2 items-start">
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                className="mt-1"
              />
              <p className="text-sm text-gray-400">
                I agree to the{" "}
                <span className="text-blue-400">Terms & Conditions</span>
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-10 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-md flex items-center justify-center font-semibold disabled:opacity-50"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              {loading ? "Registering..." : "Create Affiliate Account"}
            </button>

            {/* Login Link */}
            <div className="text-center pt-4 border-t border-gray-800">
              <p className="text-gray-400">
                Already have an account?{" "}
                <Link to="/affiliateLogin">
                  <span className="text-blue-400 cursor-pointer hover:text-blue-300">
                    Log In
                  </span>
                </Link>
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
