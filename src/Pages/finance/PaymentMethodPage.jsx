// src/Pages/finance/PaymentMethodPage.jsx
import React from "react";
import { useLocation, useParams } from "react-router-dom";

export default function PaymentMethodPage() {
  const { method } = useParams();
  const location = useLocation();
  const { amount, currency } = location.state || {};

  const renderMethodDetails = () => {
    switch (method) {
      case "card":
        return (
          <div>
            <h3 className="text-lg mb-3">Enter Card Details</h3>
            <input
              placeholder="Card Number"
              className="p-2 bg-[#0f192d] border border-gray-700 w-full mb-3 rounded"
            />
            <input
              placeholder="Expiry (MM/YY)"
              className="p-2 bg-[#0f192d] border border-gray-700 w-full mb-3 rounded"
            />
            <input
              placeholder="CVV"
              className="p-2 bg-[#0f192d] border border-gray-700 w-full mb-3 rounded"
            />
            <button className="bg-green-600 px-4 py-2 rounded">Pay Now</button>
          </div>
        );

      case "crypto":
        return (
          <div>
            <h3 className="text-lg mb-3">Send Crypto to this Wallet Address:</h3>
            <p className="bg-[#0f192d] p-3 rounded border border-gray-700 text-sm break-all">
              0xB83E...D7C9FAb23900cE62A — (USDT-TRC20)
            </p>
            <p className="text-gray-400 text-xs mt-2">
              Send exactly {amount} {currency} to the above address.
            </p>
          </div>
        );

      case "bank":
        return (
          <div>
            <h3 className="text-lg mb-3">Bank Transfer Details:</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>Bank: HDFC Bank</li>
              <li>Account No: 1234567890</li>
              <li>IFSC: HDFC0001234</li>
              <li>Account Holder: MechShop Pvt. Ltd.</li>
            </ul>
            <p className="text-xs text-gray-500 mt-2">
              Once you transfer, please upload the transaction receipt.
            </p>
          </div>
        );

      default:
        return <p>Invalid payment method</p>;
    }
  };

  return (
    <div className="bg-[#0b1320] min-h-screen text-white p-6">
      <h1 className="text-2xl font-semibold mb-6 capitalize">
        Deposit via {method}
      </h1>

      <div className="bg-[#101a2b] border border-gray-700 p-5 rounded-xl">
        <p className="text-gray-300 mb-4">
          You are depositing:{" "}
          <span className="text-green-400 font-semibold">
            {amount} {currency}
          </span>
        </p>
        {renderMethodDetails()}
      </div>
    </div>
  );
}
