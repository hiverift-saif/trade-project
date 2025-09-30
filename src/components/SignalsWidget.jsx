import React from "react";
import { HelpCircle, Settings, ArrowUp, ArrowDown } from "lucide-react";

const signals = [
  {
    id: 1,
    symbol: "EUR/USD OTC",
    direction: "down", // "up" ya "down"
    progress: 3,
    time: "04:51",
    price: "$10",
    result: "-$",
    copied: 8,
    ago: "9 sec ago",
  },
  {
    id: 2,
    symbol: "EUR/USD OTC",
    direction: "down",
    progress: 30,
    time: "02:06",
    price: "$10",
    result: "-$",
    copied: 79,
    ago: "54 sec ago",
  },
  {
    id: 3,
    symbol: "EUR/USD OTC",
    direction: "up",
    progress: 18,
    time: "04:06",
    price: "$10",
    result: "+$",
    copied: 22,
    ago: "54 sec ago",
  },
];

export default function SignalsWidget() {
  return (
    <div className="bg-[#0a0e18] border border-zinc-800 rounded-lg h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-zinc-700">
        <h2 className="text-white font-medium">Signals</h2>
        <div className="flex items-center gap-2 text-zinc-400">
          <HelpCircle size={18} className="cursor-pointer hover:text-white" />
          <Settings size={18} className="cursor-pointer hover:text-white" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-700 text-sm">
        <button className="flex-1 py-2 text-white border-b-2 border-blue-500">
          Updates
        </button>
        <button className="flex-1 py-2 text-zinc-400 hover:text-white">
          All
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {signals.map((s) => (
          <div
            key={s.id}
            className="bg-zinc-900 rounded-md p-3 space-y-2 shadow-sm"
          >
            {/* Row 1 */}
            <div className="flex items-center justify-between">
              <span className="text-white font-medium">{s.symbol}</span>
              <div>
                {s.direction === "up" ? (
                  <ArrowUp className="text-green-400" />
                ) : (
                  <ArrowDown className="text-red-400" />
                )}
              </div>
              <div className="flex items-center gap-2 w-1/3">
                <div className="w-full bg-zinc-700 h-1 rounded">
                  <div
                    className={`h-1 rounded ${
                      s.direction === "up" ? "bg-green-500" : "bg-red-500"
                    }`}
                    style={{ width: `${s.progress}%` }}
                  />
                </div>
                <span className="text-xs text-zinc-400">{s.time}</span>
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-white">{s.price}</span>
              <span
                className={`${
                  s.direction === "up" ? "text-green-400" : "text-red-400"
                }`}
              >
                {s.result}
              </span>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs">
                Copy signal
              </button>
            </div>

            {/* Row 3 */}
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>Copied: {s.copied} times</span>
              <span>{s.ago}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
