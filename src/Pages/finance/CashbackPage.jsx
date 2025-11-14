// src/Pages/finance/CashbackPage.jsx
import React from "react";

export default function CashbackPage() {
  return (
    <div className="bg-[#0b1320] min-h-screen text-white p-6">
      <h1 className="text-2xl font-semibold mb-6">Cashback</h1>

      {/* Summary */}
      <div className="bg-[#101a2b] border border-gray-700 p-5 rounded-xl mb-6">
        <h2 className="text-lg font-medium text-gray-300 mb-3">
          Your Cashback Summary
        </h2>
        <p className="text-gray-400 text-sm">
          Receive cashback for your trading volume and account activities.
        </p>

        <div className="flex flex-wrap gap-6 mt-5">
          <div className="flex-1 bg-[#0f192d] p-4 rounded-lg border border-gray-700">
            <p className="text-gray-400 text-sm">Available Cashback</p>
            <h3 className="text-2xl font-semibold text-green-400 mt-2">₹0</h3>
          </div>
          <div className="flex-1 bg-[#0f192d] p-4 rounded-lg border border-gray-700">
            <p className="text-gray-400 text-sm">Pending Cashback</p>
            <h3 className="text-2xl font-semibold text-yellow-400 mt-2">₹0</h3>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="bg-[#101a2b] border border-gray-700 p-5 rounded-xl">
        <h2 className="text-lg font-medium text-gray-300 mb-3">
          Cashback Program Details
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed">
          Cashback rewards are calculated based on your total trading volume.
          Cashback can be credited automatically to your balance every week.
        </p>
      </div>
    </div>
  );
}
