// src/Pages/finance/MySafePage.jsx
import React from "react";

export default function MySafePage() {
  return (
    <div className="bg-[#0b1320] min-h-screen text-white p-6">
      <h1 className="text-2xl font-semibold mb-6">My Safe</h1>

      {/* Info */}
      <div className="bg-[#101a2b] border border-gray-700 p-5 rounded-xl mb-6">
        <h2 className="text-lg font-medium text-gray-300 mb-3">
          What is “My Safe”?
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed">
          “My Safe” allows you to securely store a part of your balance that you
          don’t want to use for trading. Funds in the safe are protected from
          losses during trading and can be withdrawn anytime.
        </p>
      </div>

      {/* Balance Info */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="bg-[#0f192d] p-5 rounded-lg border border-gray-700">
          <p className="text-gray-400 text-sm">Balance in Safe</p>
          <h3 className="text-2xl font-semibold text-blue-400 mt-2">₹0</h3>
        </div>
        <div className="bg-[#0f192d] p-5 rounded-lg border border-gray-700">
          <p className="text-gray-400 text-sm">Available for Transfer</p>
          <h3 className="text-2xl font-semibold text-green-400 mt-2">₹0</h3>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-8">
        <button className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg font-semibold text-sm">
          Add to Safe
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold text-sm">
          Withdraw from Safe
        </button>
      </div>
    </div>
  );
}
