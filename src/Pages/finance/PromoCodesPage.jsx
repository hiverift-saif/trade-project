// src/Pages/finance/PromoCodesPage.jsx
import React, { useState } from "react";

export default function PromoCodesPage() {
  const [code, setCode] = useState("");

  const handleApply = () => {
    if (!code) {
      alert("Please enter a promo code!");
      return;
    }
    alert(`Promo code "${code}" applied successfully!`);
    setCode("");
  };

  return (
    <div className="bg-[#0b1320] min-h-screen text-white p-6">
      <h1 className="text-2xl font-semibold mb-6">Promo Codes</h1>

      <div className="bg-[#101a2b] border border-gray-700 p-6 rounded-xl">
        <h2 className="text-lg font-medium text-gray-300 mb-4">
          Apply Your Promo Code
        </h2>

        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter promo code"
            className="w-full sm:w-1/2 px-4 py-2 rounded-lg bg-[#0f192d] border border-gray-700 text-gray-200 focus:border-green-500 focus:outline-none"
          />
          <button
            onClick={handleApply}
            className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg text-sm font-semibold"
          >
            Apply
          </button>
        </div>

        <p className="text-gray-400 text-sm mt-4">
          Promo codes give you additional deposit bonuses or cashback.
        </p>
      </div>

      {/* Active Promo Codes */}
      <div className="bg-[#101a2b] border border-gray-700 p-6 rounded-xl mt-6">
        <h2 className="text-lg font-medium text-gray-300 mb-3">
          Active Promotions
        </h2>
        <p className="text-gray-400 text-sm">No active promo codes available.</p>
      </div>
    </div>
  );
}
