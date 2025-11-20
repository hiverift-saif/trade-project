import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Phone, Lock, Eye, EyeOff, UserPlus } from "lucide-react";
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // --- Basic validation ---
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Passwords do not match!",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    if (!formData.email.includes("@")) {
      Swal.fire({
        icon: "error",
        title: "Please enter a valid email address!",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    if (!formData.terms) {
      Swal.fire({
        icon: "warning",
        title: "Please accept the terms and conditions!",
        confirmButtonColor: "#3085d6",
      });
      return;
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
        `${BASE.BASE_URL}/affiliate/auth/registerAffiliateAccount`,
        payload
      );

      console.log("Response:", res);

      if (res.status === 201) {
        // ✅ SweetAlert2 success popup
        Swal.fire({
          icon: "success",
          title: "Affiliate registration successful!",
          text: "Redirecting to login...",
          timer: 2000, // 2 seconds
          showConfirmButton: false,
          background: "#111827",
          color: "#fff",
        }).then(() => {
          navigate("/affiliatelogin");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: res.data?.message || "Registration failed!",
          confirmButtonColor: "#d33",
        });
      }

    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: error.response?.data?.message || "Please try again later.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4 py-20 relative overflow-hidden">
      {/* Background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Signup Card */}
      <div className="flex flex-col gap-6 rounded-xl border w-full max-w-md bg-gray-900/50 border-gray-800 backdrop-blur-xl relative z-10">
        <div className="px-6 pt-6 text-center space-y-4">
          <div className="flex justify-center items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center mr-3">
              <span className="text-white font-bold text-xl">TP</span>
            </div>
            <span className="text-2xl text-white">Trade Pro</span>
          </div>
          <div>
            <h4 className="text-2xl text-white">Join as an Affiliate</h4>
            <p className="text-gray-400">
              Create your affiliate account and start earning
            </p>
          </div>
        </div>

        <div className="px-6 pb-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="space-y-2">
              <label htmlFor="fullName" className="text-sm text-gray-300">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full h-9 rounded-md border border-gray-700 bg-gray-800/50 pl-10 px-3 py-1 text-white placeholder:text-gray-500 focus-visible:ring-[3px] focus-visible:ring-blue-500/50 outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm text-gray-300">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full h-9 rounded-md border border-gray-700 bg-gray-800/50 pl-10 px-3 py-1 text-white placeholder:text-gray-500 focus-visible:ring-[3px] focus-visible:ring-blue-500/50 outline-none"
                />
              </div>
            </div>

            {/* Phone */}
            {/* <div className="space-y-2">
              <label htmlFor="mobile" className="text-sm text-gray-300">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  className="w-full h-9 rounded-md border border-gray-700 bg-gray-800/50 pl-10 px-3 py-1 text-white placeholder:text-gray-500 focus-visible:ring-[3px] focus-visible:ring-blue-500/50 outline-none"
                />
              </div>
            </div> */}

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm text-gray-300">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full h-9 rounded-md border border-gray-700 bg-gray-800/50 pl-10 pr-10 px-3 py-1 text-white placeholder:text-gray-500 focus-visible:ring-[3px] focus-visible:ring-blue-500/50 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm text-gray-300">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full h-9 rounded-md border border-gray-700 bg-gray-800/50 pl-10 pr-10 px-3 py-1 text-white placeholder:text-gray-500 focus-visible:ring-[3px] focus-visible:ring-blue-500/50 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                className="mt-1 border-gray-600 rounded"
                required
              />
              <label htmlFor="terms" className="text-sm text-gray-400 cursor-pointer">
                I agree to the{" "}
                <span className="text-blue-400 hover:underline">Terms & Conditions</span> and{" "}
                <span className="text-blue-400 hover:underline">Affiliate Agreement</span>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-9 px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white rounded-md flex items-center justify-center font-medium transition-all disabled:opacity-50"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              {loading ? "Registering..." : "Create Affiliate Account"}
            </button>

            {/* Login link */}
            <div className="text-center pt-4 border-t border-gray-800">
              <p className="text-gray-400">
                Already have an account?{" "}
                <Link to="/affiliateLogin">
                  <button type="button" className="text-blue-400 hover:text-blue-300 transition-colors">
                    Log In
                  </button>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
