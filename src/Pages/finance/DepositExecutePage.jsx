import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function DepositExecutePage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { crypto, amount, address, transactionId } = state || {};

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (!file) return toast.error("Please upload a payment screenshot!");

    toast.success("Payment proof submitted!");
    navigate("/finance/history");
  };

  return (
    <div className="min-h-screen bg-[#0b1320] text-white p-6">
      
      {/* Step Indicator */}
      <div className="flex items-center gap-8 mb-8 text-gray-400 text-sm font-medium">
        <div>1. Deposit method</div>
        <div>2. Payment details</div>
        <div>3. Payment process</div>
        <div className="text-green-400">4. Payment execution</div>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="text-gray-400 hover:text-white mb-4"
      >
        ← Back
      </button>

      <div className="max-w-xl bg-[#101a2b] border border-gray-700 rounded-xl p-6 mx-auto">
        <h2 className="text-xl font-semibold mb-4">Confirm Your Payment</h2>

        <div className="bg-[#0f192d] p-4 rounded-lg border border-gray-700 mb-4">
          <p className="text-gray-400 text-sm">Amount Paid</p>
          <p className="text-3xl font-bold text-green-400">₹{amount}</p>
        </div>

        <div className="bg-[#0f192d] p-4 rounded-lg border border-gray-700 mb-4">
          <p className="text-gray-400 text-sm">UPI ID</p>
          <p className="text-lg font-semibold">{address}</p>
        </div>

        <div className="bg-[#0f192d] p-4 rounded-lg border border-gray-700 mb-6">
          <p className="text-gray-400 text-sm">Transaction ID</p>
          <p className="text-yellow-400 font-semibold">{transactionId}</p>
        </div>

        <p className="text-gray-300 mb-4">
          Upload the payment screenshot to complete your deposit.
        </p>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4 text-gray-300"
        />

        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold"
        >
          Submit Payment Proof
        </button>

        <p className="mt-4 text-center text-gray-400 text-sm">
          Need help?{" "}
          <span className="text-blue-400 cursor-pointer hover:underline">
            Contact Support
          </span>
        </p>
      </div>
    </div>
  );
}
