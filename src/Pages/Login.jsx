// src/Pages/Login.jsx
import React, { useState, useEffect } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import BASE from "../config";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);

  // Restore remembered email
  useEffect(() => {
    const savedEmail = localStorage.getItem("remember_email");
    if (savedEmail) {
      setFormData((prev) => ({ ...prev, email: savedEmail }));
      setRemember(true);
    }
    document.getElementById("email")?.focus();
  }, []);

  // 🟢 IMPORTANT: handleChange must be inside component
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim()) return toast.error("Email is required");
    if (!formData.password) return toast.error("Password is required");

    setLoading(true);
    const toastId = toast.loading("Logging you in...");

    try {
      const response = await axios.post(`${BASE.AFFILIATE_URL}/auth/login`, {
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
      });

      console.log("Login response:", response.data);

      // 🟢 Token extraction (all possible keys)
      const token =
        response.data.data?.access_token ||
        response.data.data?.accessToken ||
        response.data.token ||
        response.data.access_token;

      const user = response.data.data?.user;

      if (!token) {
        toast.dismiss(toastId);
        return toast.error("No token received from server");
      }

      toast.dismiss(toastId);
      toast.success("Login Successful!");

      // 🟢 Save Token
      if (remember) {
        localStorage.setItem("tp_user_token", token);
      } else {
        sessionStorage.setItem("tp_user_token", token);
      }

      // 🟢 Save User
      const userObj = {
        id: user?.id,
        email: user?.email,
      };

      if (remember) {
        localStorage.setItem("user", JSON.stringify(userObj));
      } else {
        sessionStorage.setItem("user", JSON.stringify(userObj));
      }

      // Redirect
      const from = location.state?.from || "/trading";
      navigate(from, { replace: true });

    } catch (err) {
      toast.dismiss(toastId);
      toast.error("Invalid email or password");
      console.error("Login error:", err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#000213] via-[#041379]/90 to-[#041379]/40 px-5 py-10">
      <div className="w-full max-w-md p-8 bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-800/60 text-white"
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
              className="w-full pl-10 pr-12 py-3 rounded-xl bg-gray-800/60 text-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {/* Remember Me */}
          <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
              className="w-4 h-4 rounded accent-blue-500"
            />
            Remember me
          </label>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold text-lg bg-gradient-to-r from-green-500 to-blue-600 text-white"
          >
            {loading ? "Logging in..." : "Login"}
          </button>


          {/* Login with Google */}
<button
  type="button"
  className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl font-bold text-lg bg-white text-gray-800 border border-gray-300 hover:bg-gray-100 transition"
>
  <img
    src="https://developers.google.com/identity/images/g-logo.png"
    alt="google"
    className="w-5 h-5"
  />
  Login with Google
</button>

        </form>
      </div>
    </section>
  );
}
