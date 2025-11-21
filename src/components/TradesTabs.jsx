import React, { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Star } from "lucide-react";

export default function TradesTabs({ opened = [], closed = [] }) {
  const [tab, setTab] = useState("Opened");
  const [openedTrades, setOpenedTrades] = useState([]);

  // Helpers
  const safeString = (v) => (typeof v === "string" ? v : "");
  const safeNumber = (n) => (isNaN(Number(n)) ? 0 : Number(n));

  const getSymbol = (t) =>
    t?.asset?.name ||
    t?.asset?.displaySymbol ||
    t?.asset?.apiSymbol ||
    t?.asset?.symbol ||
    t?.symbol ||
    "Asset";

  // Clone opened trades for timers
  useEffect(() => {
    setOpenedTrades(opened.map((t) => ({ ...t })));
  }, [opened]);

  // Timer
  useEffect(() => {
    if (tab !== "Opened" || openedTrades.length === 0) return;

    const interval = setInterval(() => {
      setOpenedTrades((prev) =>
        prev.map((trade) => {
          if (!trade.expiresAt) return trade;
          const remaining = Math.max(
            0,
            Math.floor((trade.expiresAt - Date.now()) / 1000)
          );
          return { ...trade, remaining };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [tab, openedTrades.length]);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  // ⭐ FILTER: Only show ACTIVE opened trades based on createdAt + tradeTime
  const activeOpenedTrades = openedTrades.filter((t) => {
  const expiry = Number(t.expiresAt);
  if (!expiry) return true; // fallback

  return expiry > Date.now(); // show only active trades
});
console.log("Closed trades:", closed);

 const uniqueClosed = [
  ...new Map(
    closed.map(t => [t.id || t._id || t.tradeId, t])
  ).values()
];

const trades = tab === "Opened" ? activeOpenedTrades : uniqueClosed;


  return (
    <div className="p-4 rounded-2xl text-white mt-6 bg-[#050713] border border-[#1a2233] shadow-lg">
      {/* Tabs */}
      <div className="flex mb-4 border-b border-[#1a2233]">
        {["Opened", "Closed"].map((label) => (
          <button
            key={label}
            onClick={() => setTab(label)}
            className={`flex-1 py-2 font-medium transition-all duration-200 
              ${
                tab === label
                  ? "text-[#28CB72] border-b-2 border-[#28CB72]"
                  : "text-[#9ca3af] hover:text-gray-300"
              }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* EMPTY STATE */}
      {trades.length === 0 ? (
        <div className="text-[#9ca3af] text-sm text-center py-8">
          No {tab.toLowerCase()} trades yet.
        </div>
      ) : (
        <ul className="space-y-3">
          {trades.map((t) => {
            const side = safeString(t.side).toUpperCase();
            const isBuy = side === "BUY";
            const symbol = getSymbol(t);
            const amount = safeNumber(t.price);

            const payout = safeNumber(t.payout);
            const remaining = safeNumber(t.remaining);

            return (
              <li
                // key={t.id || t._id || Math.random()}
                key={t.id || t._id || t.tradeId || index}

                className="
                  bg-[#121e2f] 
                  border border-[#1a2233]
                  rounded-xl 
                  p-4 
                  transition-all 
                  hover:border-[#28CB72]/40 
                  shadow-md
                "
              >
                <div className="flex justify-between items-center">
                  {/* LEFT SIDE */}
                  <div>
                    <div className="flex items-center gap-2">
                      <Star
                        size={14}
                        className="text-[#FACC15] fill-[#FACC15]"
                      />

                      <span className="font-semibold text-sm tracking-wide">
                        {symbol}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-[#9ca3af] mt-1">
                      {isBuy ? (
                        <TrendingUp size={14} className="text-[#28CB72]" />
                      ) : (
                        <TrendingDown size={14} className="text-[#F44A4A]" />
                      )}

                      <span
                        className={`font-semibold ${
                          isBuy ? "text-[#28CB72]" : "text-[#F44A4A]"
                        }`}
                      >
                        {side}
                      </span>

                      <span className="text-gray-300">
                        • ${amount.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* RIGHT SIDE */}
                  <div className="text-right">
                    {tab === "Opened" ? (
                      <>
                        <div className="text-[#28CB72] font-semibold text-sm">
                          +{payout}%
                        </div>

                        <div className="text-[#9ca3af] text-xs">
                          {formatTime(remaining)}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-[#9ca3af] text-xs">
                          Close: {t.closePrice ? t.closePrice.toFixed(2) : "--"}
                        </div>

                        <div
                          className={`text-sm font-semibold ${
                            safeNumber(t.profit) > 0
                              ? "text-[#28CB72]"
                              : "text-[#F44A4A]"
                          }`}
                        >
                          {safeNumber(t.profit) > 0 ? "+" : ""}
                          {safeNumber(t.profit).toFixed(2)}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
