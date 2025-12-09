import React, { useState } from "react";
import { Mail } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import { forgotPasswordRequest } from "../api/authApi"; // create API accordingly

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) return toast.error("Email is required");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return toast.error("Enter a valid email");

    setLoading(true);
    const toastId = toast.loading("Sending reset link...");

    try {
      await forgotPasswordRequest({ email });

      toast.dismiss(toastId);
      toast.success("Reset link sent to your email! 📧");
      navigate("/login");
    } catch (err) {
      toast.dismiss(toastId);
      toast.error(err?.response?.data?.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#000213] via-[#041379] to-[#041379] px-5 pt-32">
      
      <div className="w-full max-w-md p-8 bg-gray-900/80 rounded-3xl border border-gray-700 shadow-md">

        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-white via-blue-100 to-green-100 bg-clip-text text-transparent">
          Forgot Password
        </h2>

        <p className="text-gray-400 text-center text-sm mb-6">
          Enter your registered email to receive a reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-3 rounded-xl bg-gray-800/80 text-white border border-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 bg-gradient-to-r from-blue-600 to-teal-500 rounded-xl text-white font-bold text-lg shadow-md transition-all ${
              loading ? "opacity-70" : "hover:scale-105"
            }`}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {/* Back to login */}
        <div className="mt-6 text-center text-gray-400 text-sm">
          Remember password?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-400 font-medium hover:underline"
          >
            Login
          </button>
        </div>

      </div>
    </section>
  );
}
