//src/pages/Login.jsx
import React, { useState, useEffect } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.getElementById("email")?.focus();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // VALIDATIONS
    if (!formData.email.trim()) {
      return toast.error("Email is required");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return toast.error("Enter a valid email");
    }
    if (!formData.password.trim()) {
      return toast.error("Password is required");
    }

    if (formData.password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    // API CALL
    setLoading(true);
    const toastId = toast.loading("Logging in...");

    try {
      const res = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      toast.dismiss(toastId);
      toast.success("Login Successful! 🎉");

      const token = res?.data?.access_token;
      const loginUserData = res?.data?.user;

      // Save Token
      if (token) {
        localStorage.setItem("tp_user_token", token);
      }

      // Save User
      if (loginUserData) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: loginUserData?.id,
            name: loginUserData?.name || "User",
            email: loginUserData?.email,
            mobile: loginUserData?.phone || "Not Provided",
          })
        );
      }

      // 🔥 REDIRECT LOGIC FIXED HERE
      const redirectTo = localStorage.getItem("redirect_to");

      if (redirectTo) {
        navigate(redirectTo);
        localStorage.removeItem("redirect_to");
      } else {
        navigate("/trading");
      }

    } catch (err) {
      toast.dismiss(toastId);
      toast.error(err?.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black px-5 py-10">
      <div className="w-full max-w-md p-8 bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-white via-blue-100 to-green-100 bg-clip-text text-transparent">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-3 py-3 rounded-xl bg-gray-800/60 text-white border border-gray-700/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-gray-800/60 text-white border border-gray-700/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl text-white font-bold text-lg shadow-2xl transition-all ${
              loading ? "opacity-70" : "hover:scale-105"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 text-center text-gray-400 text-sm">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/registration")}
            className="text-blue-400 font-medium hover:underline"
          >
            Register
          </button>
        </div>
      </div>
    </section>
  );
}
