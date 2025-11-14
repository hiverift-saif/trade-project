// src/Pages/Registration.jsx
import React, { useState, useEffect } from "react";
import { User, Mail, Smartphone, Lock, Key, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";
import toast from "react-hot-toast";

export default function Registration() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
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

  // Auto-focus first input on load
  useEffect(() => {
    document.getElementById("fullName")?.focus();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let val = type === "checkbox" ? checked : value;

    // Restrict mobile to 10 digits only
    if (name === "mobile") {
      val = val.replace(/\D/g, "").slice(0, 10);
    }

    setForm((prev) => ({ ...prev, [name]: val }));
  };

  // Strong password validation
  const isStrongPassword = (pwd) =>
    pwd.length >= 8 &&
    /[A-Z]/.test(pwd) &&
    /[a-z]/.test(pwd) &&
    /\d/.test(pwd) &&
    /[!@#$%^&*]/.test(pwd);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Registration form submitted");

    // ------------------------------
    // 🔍 VALIDATIONS
    // ------------------------------

    if (!form.fullName.trim()) return toast.error("Full name is required");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return toast.error("Enter a valid email");

    if (form.mobile.length !== 10)
      return toast.error("Enter a 10-digit mobile number");

    if (form.password !== form.confirmPassword)
      return toast.error("Passwords do not match");

    if (!isStrongPassword(form.password))
      return toast.error(
        "Password must be 8+ chars with uppercase, lowercase, number & symbol"
      );

    if (!form.terms)
      return toast.error("You must accept the terms and conditions");

    // ------------------------------
    // 🔥 API CALL
    // ------------------------------
    setLoading(true);
    const toastId = toast.loading("Creating your account...");

    try {
      const res = await registerUser({
        fullName: form.fullName,
        email: form.email,
        mobile: form.mobile,
        password: form.password,
      });

      console.log("REGISTER SUCCESS:", res);

      toast.dismiss(toastId);
      toast.success(res.message || "Registration successful!");

      // ------------------------------
      // 🔐 SAVE USER + TOKEN
      // ------------------------------
      const user = res?.data?.user;
      const token = res?.data?.token;

      if (user) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: user?.id,
            name: user?.name || form.fullName, // Registration name save hoga
            email: user?.email,
            mobile: user?.phone || form.mobile || "Not Provided",
            role: user?.role || "user",
          })
        );
      }

      if (token) {
        localStorage.setItem("authToken", token);
      }

      // ------------------------------
      // 🔁 Redirect to Login
      // ------------------------------
      navigate("/login");
    } catch (err) {
      console.error("REGISTER ERROR:", err);
      toast.dismiss(toastId);

      const msg =
        err?.response?.data?.message || err?.message || "Registration failed";

      if (err?.status === 409) {
        toast.error("Email or mobile already registered");
      } else {
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black px-5 py-10">
      <div className="w-full max-w-md p-8 bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-700/50 shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-white via-blue-100 to-green-100 bg-clip-text text-transparent">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="relative">
            <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <label htmlFor="fullName" className="sr-only">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-3 py-3 rounded-xl bg-gray-800/60 text-white border border-gray-700/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 outline-none transition"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-3 py-3 rounded-xl bg-gray-800/60 text-white border border-gray-700/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 outline-none transition"
            />
          </div>

          {/* Mobile */}
          <div className="relative">
            <Smartphone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <label htmlFor="mobile" className="sr-only">
              Mobile
            </label>
            <input
              id="mobile"
              name="mobile"
              type="tel"
              placeholder="10-digit Mobile"
              value={form.mobile}
              onChange={handleChange}
              required
              maxLength={10}
              className="w-full pl-10 pr-3 py-3 rounded-xl bg-gray-800/60 text-white border border-gray-700/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 outline-none transition"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-gray-800/60 text-white border border-gray-700/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 outline-none transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Key className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <label htmlFor="confirmPassword" className="sr-only">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-gray-800/60 text-white border border-gray-700/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 outline-none transition"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Terms */}
          <div className="flex items-center space-x-2">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              checked={form.terms}
              onChange={handleChange}
              required
              className="w-4 h-4 text-blue-500 accent-blue-500 rounded focus:ring-blue-400"
            />
            <label htmlFor="terms" className="text-gray-300 text-sm">
              I agree to the{" "}
              <a
                href="/terms"
                target="_blank"
                rel="noopener"
                className="text-blue-400 hover:underline"
              >
                Terms of Service
              </a>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl text-white font-bold text-lg shadow-2xl transition-all ${
              loading
                ? "opacity-70 cursor-not-allowed"
                : "hover:scale-105 active:scale-95"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-400 font-medium hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </section>
  );
}
