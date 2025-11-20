import React, { useState } from "react";
import { Eye, EyeOff, ChevronUp, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function SubAffiliateSignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    ref: "PARENT-AFFILIATE-CODE", // ✅ static parent code
    agree: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [partnerOpen, setPartnerOpen] = useState(true);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.phone) {
      return Swal.fire("Error", "Please fill all required fields.", "error");
    }
    if (!formData.agree) {
      return Swal.fire("Error", "Please accept the terms & conditions.", "error");
    }

    console.log("Sub Affiliate Data:", formData);

    Swal.fire({
      icon: "success",
      title: "Sub-Affiliate Created!",
      text: `${formData.name} is now your Sub-Affiliate 🎉`,
      timer: 2500,
      showConfirmButton: false,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black p-6">
      <div className="bg-gray-900/70 border border-gray-800 rounded-2xl shadow-xl max-w-md w-full p-8 backdrop-blur-md">

        <div className="text-center mb-6">
          <h4 className="text-2xl font-semibold text-white">
            Create Sub-Affiliate
          </h4>
          <p className="text-gray-400 text-sm mt-2">
            Add partners under your affiliate network.
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

        {/* Referral / Parent Affiliate Code */}
        <div className="mb-4">
          <button
            type="button"
            onClick={() => setPartnerOpen(!partnerOpen)}
            className="flex items-center justify-between w-full text-gray-300 hover:text-white"
          >
            Parent Affiliate Code
            {partnerOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>

          {partnerOpen && (
            <div className="mt-3">
              <input
                type="text"
                name="ref"
                value={formData.ref}
                onChange={handleChange}
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
            I confirm that this Sub-Affiliate is added under my network.
          </label>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold transition"
        >
          Create Sub-Affiliate
        </button>
      </div>
    </div>
  );
}
