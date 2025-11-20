// src/Pages/finance/PaymentDetailsPage.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { depositAmount } from "../../api/financeApi";
import toast from "react-hot-toast";

export default function PaymentDetailsPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    upiId: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePay = async () => {
    if (!amount) {
      toast.error("Please enter amount!");
      return;
    }
const cryptoType = state?.method?.id?.toUpperCase() || "BTC";
const payload = { crypto: cryptoType, amount: Number(amount) };  // 🔥 FIXED


    const toastId = toast.loading("Processing your deposit...");

    try {
      const res = await depositAmount(payload);
      toast.dismiss(toastId);

      if (res.statusCode === 200) {
        toast.success(res.message || "Deposit successful!");

        // Navigate to process page (Step 3)
        navigate(`/finance/deposit/process/${cryptoType.toLowerCase()}`, {
          state: {
            crypto: cryptoType,
            amount,
            address: res.result.address,
            transactionId: res.result._id,
          },
        });
      } else {
        toast.error("Deposit failed!");
      }
    } catch (err) {
      toast.dismiss(toastId);
      console.error("Deposit API Error:", err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="bg-[#0b1320] text-white min-h-screen p-6">
      {/* Step Indicator */}
      <div className="flex items-center gap-8 mb-8 text-gray-400 text-sm font-medium">
        <div>1. Deposit method</div>
        <div className="text-green-400">2. Payment details</div>
        <div>3. Payment process</div>
        <div>4. Payment execution</div>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="text-gray-400 hover:text-white mb-4"
      >
        ← Back
      </button>

      <div className="bg-[#101a2b] border border-gray-700 rounded-xl p-6 max-w-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            {state?.method?.name || "Payment"}
          </h2>
          <span className="text-green-400 text-xl font-bold">
            ₹{amount || "0"}
          </span>
        </div>

        <p className="text-gray-400 text-sm mb-6">
          Commission: <span className="text-green-400">0%</span> | Min:{" "}
          {state?.method?.min || "₹444"} | Max: ₹99,900 | Processing:{" "}
          {state?.method?.time || "~5 min"}
        </p>

        {/* Amount Input */}
        <label className="block text-gray-400 text-sm mb-2">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full bg-[#0f192d] border border-gray-700 rounded-lg px-4 py-2 mb-4 text-gray-200 focus:outline-none focus:border-green-500"
        />

        {/* User Info Inputs */}
        <input
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="w-full bg-[#0f192d] border border-gray-700 rounded-lg px-4 py-2 mb-3 text-gray-200 focus:outline-none focus:border-green-500"
        />
        <input
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="w-full bg-[#0f192d] border border-gray-700 rounded-lg px-4 py-2 mb-3 text-gray-200 focus:outline-none focus:border-green-500"
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone number"
          type="number"
          className="w-full bg-[#0f192d] border border-gray-700 rounded-lg px-4 py-2 mb-3 text-gray-200 focus:outline-none focus:border-green-500"
        />
        <input
          name="upiId"
          value={form.upiId}
          onChange={handleChange}
          placeholder="UPI ID (optional)"
          className="w-full bg-[#0f192d] border border-gray-700 rounded-lg px-4 py-2 mb-3 text-gray-200 focus:outline-none focus:border-green-500"
        />

        <button
          onClick={handlePay}
          className="w-full mt-6 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg text-sm font-semibold"
        >
          Continue and Pay ₹{amount || "0"}
        </button>

        <div className="mt-6 text-gray-400 text-sm">
          <p>
            Need help?{" "}
            <a href="#" className="text-blue-400 hover:underline">
              View our User Guide
            </a>
          </p>
          <p>
            or{" "}
            <a href="#" className="text-blue-400 hover:underline">
              Contact Support Service
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
