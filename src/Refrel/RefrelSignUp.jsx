import React, { useState, useEffect } from "react";
import { Eye, EyeOff, ChevronUp, ChevronDown } from "lucide-react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Swal from "sweetalert2";
import BASE from "../config"; // ✅ your config file

export default function RefrelSignUp() {
  const navigate = useNavigate();
  const { id } = useParams(); // <-- get referral code from URL

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    ref: "", // ✅ for referral
    agree: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [partnerOpen, setPartnerOpen] = useState(true);

  // ✅ Auto fill referral code from URL
  useEffect(() => {
    if (id) setFormData((prev) => ({ ...prev, ref: id }));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.password || !formData.phone) {
      return Swal.fire("Error", "Please fill all required fields.", "error");
    }
    if (!formData.agree) {
      return Swal.fire("Error", "Please accept the terms and conditions.", "error");
    }

    try {
      const response = await fetch(
        `${BASE.BASE_URL}/affiliate/auth/registerUserWithReferral`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      console.log("Signup Response:", data);

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: `Welcome ${data.user?.name || "User"} 🎉`,
          timer: 2500,
          showConfirmButton: false,
        }).then(() => navigate("/Trading"));
      } else {
        Swal.fire("Error", data.message || "Signup failed.", "error");
      }
    } catch (err) {
      console.error("Signup error:", err);
      Swal.fire("Error", "Something went wrong. Try again later.", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="bg-gray-900/70 border border-gray-800 rounded-2xl shadow-xl max-w-md w-full p-8 backdrop-blur-md">
        <div className="text-center mb-6">
          <h4 className="text-2xl font-semibold text-white">
            Get started in under a minute!
          </h4>
          <p className="text-gray-400 text-sm mt-2">
            Register now and unlock exclusive benefits today.
          </p>
        </div>

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Full name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-xl bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-xl bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* Phone */}
        <input
          type="text"
          name="phone"
          placeholder="Phone number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-xl bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* Password */}
        <div className="mb-4 relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-white"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Referral / Partner Code */}
        <div className="mb-4">
          <button
            type="button"
            onClick={() => setPartnerOpen(!partnerOpen)}
            className="flex items-center justify-between w-full text-gray-300 hover:text-white"
          >
            Referral code (optional)
            {partnerOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {partnerOpen && (
            <div className="mt-3">
              <input
              readOnly
                type="text"
                name="ref"
                value={formData.ref}
                onChange={handleChange}
                placeholder="Referral code"
                className="w-full p-3 rounded-xl bg-gray-800 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          )}
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start mb-4 space-x-2">
          <input
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
            className="mt-1 accent-blue-600"
          />
          <label className="text-gray-400 text-sm">
            I have read and accepted the{" "}
            <Link to="/terms-and-conditions" className="text-blue-500 hover:underline">
              Public offer agreement
            </Link>
          </label>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold transition"
        >
          Sign Up
        </button>

        <p className="text-center text-gray-400 text-sm mt-4">
          Already have an account?{" "}
          <Link to="/AffiliateLogin" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
