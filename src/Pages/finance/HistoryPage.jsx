// src/Pages/finance/HistoryPage.jsx
import React, { useState, useEffect } from "react";

export default function HistoryPage() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // ✅ Mock API Data (later you can replace with your backend API)
    const mockData = [
      {
        id: "91843401",
        date: "2025-11-01 11:55:26",
        amount: 500,
        method: "UPI",
        type: "Deposit",
        status: "Pending",
        bonus: 0,
      },
      {
        id: "91843387",
        date: "2025-10-30 17:22:14",
        amount: 1200,
        method: "Bank Transfer",
        type: "Withdraw",
        status: "Completed",
        bonus: 0,
      },
      {
        id: "91843125",
        date: "2025-10-25 15:02:45",
        amount: 800,
        method: "Card",
        type: "Deposit",
        status: "Completed",
        bonus: 100,
      },
    ];

    setTransactions(mockData);
  }, []);

  return (
    <div className="bg-[#0b1320] min-h-screen text-white p-6">
      {/* Header */}
      <h1 className="text-2xl font-semibold mb-6">Transaction History</h1>

      {/* Info */}
      <div className="bg-[#101a2b] border border-gray-700 p-5 rounded-xl mb-6">
        <p className="text-gray-400 text-sm">
          Below is the list of all your deposits and withdrawals.  
          You can check their current status and transaction details.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-[#101a2b] border border-gray-700 rounded-xl">
        <table className="w-full text-sm text-gray-300">
          <thead className="bg-[#131c2f] text-gray-400 text-xs uppercase">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Method</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Bonus amount</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((txn) => (
              <tr
                key={txn.id}
                className="border-t border-gray-700 hover:bg-[#152238] transition-colors"
              >
                <td className="px-4 py-3 font-mono text-gray-200">{txn.id}</td>
                <td className="px-4 py-3">{txn.date}</td>
                <td className="px-4 py-3 text-green-400 font-medium">
                  ₹{txn.amount}
                </td>
                <td className="px-4 py-3">{txn.method}</td>
                <td className="px-4 py-3">{txn.type}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      txn.status === "Completed"
                        ? "bg-green-500/20 text-green-400"
                        : txn.status === "Pending"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {txn.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-blue-400">₹{txn.bonus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
