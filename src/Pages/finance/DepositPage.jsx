// src/Pages/finance/DepositPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Smartphone, Bitcoin, CreditCard } from "lucide-react";

const paymentMethods = [
  { id: "usdt", name: "Tether (USDT) TRC-20", min: "₹2,670", time: "instantly" },
  { id: "upi", name: "UPI", min: "₹444", time: "~5 min" },
  { id: "binance", name: "Binance Pay", min: "₹444", time: "~1 min" },
  { id: "gpay", name: "GPay", min: "₹444", time: "~5 min" },
  { id: "phonepe", name: "PhonePe", min: "₹444", time: "~5 min" },
  { id: "visa", name: "Visa / MasterCard", min: "₹888", time: "~3 min" },
];

export default function DepositPage() {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const navigate = useNavigate();

  const handleNext = () => {
    if (!selectedMethod) return alert("Please select a payment method!");
 navigate(`/finance/deposit/${selectedMethod.id}`, {
  state: { method: selectedMethod },
});

  };

  return (
    <div className="bg-[#0b1320] text-white min-h-screen p-6">
      {/* Step Indicator */}
      <div className="flex items-center gap-8 mb-8 text-gray-400 text-sm font-medium">
        <div className="text-green-400">1. Deposit method</div>
        <div>2. Payment details</div>
        <div>3. Payment process</div>
        <div>4. Payment execution</div>
      </div>

      <div className="bg-[#101a2b] rounded-xl border border-gray-700 p-6">
        <h2 className="text-xl font-semibold mb-4">Account Top-up</h2>

        {/* Welcome Bonus */}
        <div className="bg-[#13233c] border border-[#1f2b40] p-4 rounded-lg mb-6">
          <p className="text-blue-400 font-semibold mb-2">🎁 Welcome Bonus</p>
          <p className="text-gray-300 text-sm">
            Top up your real account balance and get the <span className="text-green-400">50% bonus</span>.
          </p>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search payment methods"
          className="w-full bg-[#0f192d] border border-gray-700 rounded-lg px-4 py-2 mb-6 focus:outline-none focus:border-green-500"
        />

        {/* Payment Methods */}
        <h3 className="text-gray-400 mb-3">⭐ Popular</h3>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              onClick={() => setSelectedMethod(method)}
              className={`cursor-pointer border rounded-lg p-4 transition-all ${
                selectedMethod?.id === method.id
                  ? "border-green-500 bg-[#13233c]"
                  : "border-gray-700 bg-[#0f192d] hover:border-gray-600"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-gray-200 text-sm">{method.name}</span>
                <Smartphone size={18} className="text-green-400" />
              </div>
              <p className="text-xs text-gray-400">Min: {method.min}</p>
              <p className="text-xs text-gray-400">Time: {method.time}</p>
            </div>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="mt-8 bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg text-sm font-semibold"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
