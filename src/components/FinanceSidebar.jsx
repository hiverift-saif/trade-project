import React from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { name: "Deposit", path: "/finance/deposit" },
  { name: "Withdraw", path: "/finance/withdraw" },
  { name: "History", path: "/finance/history" },
//   { name: "Cashback", path: "/finance/cashback" },
//   { name: "Promo Codes", path: "/finance/promocodes" },
//   { name: "My Safe", path: "/finance/mysafe" },
];

export default function FinanceSidebar() {
  const location = useLocation();

  return (
    <div className="w-64 bg-[#0e1729] min-h-screen p-4 border-r border-gray-700">
      <h2 className="text-xl font-semibold mb-6 text-white">Finance</h2>
      <ul className="space-y-3">
        {links.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`block px-3 py-2 rounded-lg text-sm font-medium transition ${
                location.pathname === item.path
                  ? "bg-green-600 text-white"
                  : "text-gray-300 hover:bg-[#1a243a]"
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
