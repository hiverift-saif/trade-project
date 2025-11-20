import React, { useState } from "react";
import { User, Mail, Lock, Key, Smartphone, Eye, EyeOff, MapPin, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE from "../config";
// src/Pages/Registration.jsx
import React, { useState, useEffect } from "react";
import { User, Mail, Smartphone, Lock, Key, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";
import toast from "react-hot-toast";

export default function Registration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    country: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { BASE_URL } = BASE;

  // 👇 Add this just above handleSubmit
const handleChange = (e) => {
  const { name, value, type, checked } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value,
  }));
};

const handleSubmit = async (e) => {
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

  // ✅ Correct payload structure
  const payload = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    phoneNumber: formData.mobile,
    country: formData.country,
    password: formData.password,
    confirmPassword: formData.confirmPassword,
  };

  try {
    setLoading(true);
    console.log("Sending payload:", payload);

    const res = await axios.post(`${BASE_URL}createaccount/register`, payload, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("Response:", res.data);

    if (res.data.status === "success") {
      alert(res.data.message || "Registration successful!");
      navigate("/login");
    } else {
      alert(res.data.message || "Registration failed!");
    }
  } catch (error) {
    console.error("Registration error:", error.response?.data);
    alert(error.response?.data?.message || "Something went wrong!");
  } finally {
    setLoading(false);
  }
};


  return (
    <section className="min-h-[calc(100vh-200px)] bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4 py-20 relative overflow-hidden">
      {/* Floating blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Glass card */}
      <div className="relative z-10 text-white flex flex-col gap-6 rounded-xl border w-full max-w-2xl bg-gray-900/50 border-gray-800 backdrop-blur-xl p-6">
        {/* Card header */}
        <div className="grid auto-rows-min items-start gap-1.5 pb-6 space-y-4">
          <div className="flex justify-center items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">TP</span>
            </div>
            <span className="text-2xl">Trade Pro</span>
          </div>
          <div className="text-center space-y-2">
            <h4 className="text-2xl">Create Your Account</h4>
            <p className="text-gray-400">Start your trading journey today</p>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-300" htmlFor="firstName">First Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"/>
                <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter first name" required
                  className="w-full pl-10 py-2 rounded-md bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-300" htmlFor="lastName">Last Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"/>
                <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter last name" required
                  className="w-full pl-10 py-2 rounded-md bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-300" htmlFor="email">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"/>
              <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required
                className="w-full pl-10 py-2 rounded-md bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-300" htmlFor="mobile">Phone Number</label>
              <div className="relative">
                <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"/>
                <input type="tel" name="mobile" id="mobile" value={formData.mobile} onChange={handleChange} placeholder="Enter phone number" required
                  className="w-full pl-10 py-2 rounded-md bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-300" htmlFor="country">Country</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"/>
                <input type="text" name="country" id="country" value={formData.country} onChange={handleChange} placeholder="Enter your country" required
                  className="w-full pl-10 py-2 rounded-md bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              </div>
            </div>
          </div>

          {/* Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 relative">
              <label className="text-sm text-gray-300" htmlFor="password">Password</label>
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"/>
              <input type={showPassword ? "text" : "password"} name="password" id="password" value={formData.password} onChange={handleChange} placeholder="Create a password" required
                className="w-full pl-10 py-2 rounded-md bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                {showPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
              </button>
            </div>
            <div className="space-y-2 relative">
              <label className="text-sm text-gray-300" htmlFor="confirmPassword">Confirm Password</label>
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"/>
              <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm password" required
                className="w-full pl-10 py-2 rounded-md bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                {showConfirmPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
              </button>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start space-x-2">
            <input type="checkbox" id="terms" name="terms" checked={formData.terms} onChange={handleChange} className="mt-1"/>
            <label htmlFor="terms" className="text-sm text-gray-400 cursor-pointer">
              I agree to the <span className="text-blue-400 hover:underline">Terms & Conditions</span>, <span className="text-blue-400 hover:underline">Privacy Policy</span>, and <span className="text-blue-400 hover:underline">Risk Disclosure</span>
            </label>
          </div>

          {/* Submit */}
          <button type="submit" disabled={loading} className="inline-flex items-center justify-center gap-2 w-full h-9 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 rounded-md text-white font-medium">
            <UserPlus className="w-5 h-5"/> {loading ? "Registering..." : "Create Account"}
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



          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-800"></span></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-gray-900/50 px-2 text-gray-400">Or sign up with</span></div>
          </div>




          {/* Social */}
          <div className="grid grid-cols-2 gap-4">
            <button className="w-full h-9 bg-gray-800/30 border border-gray-700 text-white rounded-md hover:bg-gray-800 hover:border-gray-600 flex items-center justify-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Google
            </button>
            <button className="w-full h-9 bg-gray-800/30 border border-gray-700 text-white rounded-md hover:bg-gray-800 hover:border-gray-600 flex items-center justify-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z"/></svg>
              Microsoft
            </button>
          </div>

          {/* Footer */}
          <div className="text-center pt-4 border-t border-gray-800">
            <p className="text-gray-400">Already have an account? <button type="button" onClick={() => navigate("/login")} className="text-blue-400 hover:text-blue-300 transition-colors">Log In</button></p>
          </div>
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
