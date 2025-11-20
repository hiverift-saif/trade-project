// src/Pages/finance/DepositProcessPage.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getDepositStatus } from "../../api/financeApi";
import toast from "react-hot-toast";

export default function DepositProcessPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { crypto, amount, transactionId, address } = state || {};

  const [status, setStatus] = useState("pending");

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    toast.success("Address copied to clipboard!");
  };

  const checkStatus = async () => {
    if (!transactionId) return toast.error("Invalid transaction ID");
    try {
      const res = await getDepositStatus(transactionId);
      if (res.status === "success") {
        setStatus("success");
        toast.success("Payment received successfully!");
      } else {
        toast.loading("Payment still pending...");
      }
    } catch (err) {
      toast.error("Error checking payment status");
    }
  };

  return (
    <div className="bg-[#0b1320] text-white min-h-screen p-6">
      {/* Step Indicator */}
      <div className="flex items-center gap-8 mb-8 text-gray-400 text-sm font-medium">
        <div>1. Deposit method</div>
        <div>2. Payment details</div>
        <div className="text-green-400">3. Payment process</div>
        <div>4. Payment execution</div>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="text-gray-400 hover:text-white mb-4"
      >
        ← Back
      </button>

      <div className="bg-[#101a2b] border border-gray-700 rounded-xl p-6 max-w-xl">
        <h2 className="text-lg font-semibold mb-4">
          Deposit Process ({crypto})
        </h2>

        <p className="text-gray-300 mb-2">
          Amount: <span className="text-green-400">₹{amount}</span>
        </p>
        <p className="text-gray-300 mb-2">
          Transaction ID:{" "}
          <span className="text-yellow-400">{transactionId}</span>
        </p>
        <p className="text-gray-300 mb-4">
          Deposit Address:{" "}
          <span className="text-blue-400 break-all">{address}</span>
        </p>

        <button
          onClick={handleCopy}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm mb-4"
        >
          Copy Address
        </button>

        <div className="mt-6">
          <p className="text-gray-400 mb-2">Current Status:</p>
          <div
            className={`text-lg font-bold ${
              status === "success"
                ? "text-green-400"
                : status === "failed"
                ? "text-red-400"
                : "text-yellow-400"
            }`}
          >
            {status.toUpperCase()}
          </div>

          <button
            onClick={checkStatus}
            className="mt-4 bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg text-sm font-semibold"
          >
            Check Payment Status
          </button>
        </div>
      </div>
    </div>
  );
}
