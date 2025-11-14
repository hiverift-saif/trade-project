import React, { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Star } from "lucide-react";

export default function TradesTabs({ opened = [], closed = [] }) {
  const [tab, setTab] = useState("Opened");
  const [openedTrades, setOpenedTrades] = useState([]);

  // =============== SAFETY HELPERS ==================
  const safeString = (val) => {
    if (!val) return "";
    return typeof val === "string" ? val : "";
  };

  const safeNumber = (num) => {
    const n = Number(num);
    return isNaN(n) ? 0 : n;
  };

  const getSymbol = (t) => {
    return (
      safeString(t?.asset?.symbol) ||
      safeString(t?.symbol) ||
      safeString(t?.raw?.symbol) ||
      "Asset"
    );
  };

  // =================================================

  // Clone opened trades (avoid mutation)
  useEffect(() => {
    setOpenedTrades(opened.map((t) => ({ ...t })));
  }, [opened]);

  // Countdown updater
  useEffect(() => {
    if (tab !== "Opened" || openedTrades.length === 0) return;

    const interval = setInterval(() => {
      setOpenedTrades((prev) =>
        prev.map((trade) => {
          if (trade.expiresAt) {
            const remaining = Math.max(
              0,
              Math.floor((trade.expiresAt - Date.now()) / 1000)
            );
            return { ...trade, remaining };
          }
          return trade;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [tab, openedTrades.length]);

  // Format seconds → mm:ss
  const formatTime = (seconds) => {
    if (seconds == null || isNaN(seconds)) return "--:--";
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  const trades = tab === "Opened" ? openedTrades : closed;

  return (
    <div className="p-4 bg-[#0b0f1a] border border-zinc-800 rounded-2xl text-white mt-6">

      {/* Tabs */}
      <div className="flex mb-4 border-b border-zinc-800">
        {["Opened", "Closed"].map((label) => (
          <button
            key={label}
            className={`flex-1 py-2 font-medium transition-colors duration-150 ${
              tab === label
                ? "text-emerald-400 border-b-2 border-emerald-400"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
            onClick={() => setTab(label)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Trade List */}
      {trades.length === 0 ? (
        <div className="text-zinc-500 text-sm text-center py-8">
          No {tab.toLowerCase()} trades yet.
        </div>
      ) : (
        <ul className="space-y-3">
          {trades.map((t) => {
            const side = safeString(t.side).toUpperCase();
            const isBuy = side === "BUY";
            const symbol = getSymbol(t);
            const amount = safeNumber(t.amount);
            const payout = safeNumber(t.payout);
            const remaining = safeNumber(t.remaining);

            return (
              <li
                key={t.id || t._id || Math.random()}
                className="bg-[#111827] border border-zinc-800 rounded-lg p-3 shadow-sm hover:border-emerald-500/30 transition"
              >
                <div className="flex justify-between items-center">

                  {/* Left */}
                  <div>
                    <div className="flex items-center gap-2">
                      <Star size={14} className="text-yellow-400 fill-yellow-400" />
                      <span className="font-semibold text-sm">
                        {symbol} OTC
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-zinc-500 mt-1">
                      {isBuy ? (
                        <TrendingUp size={14} className="text-emerald-400 inline-block" />
                      ) : (
                        <TrendingDown size={14} className="text-red-400 inline-block" />
                      )}

                      <span
                        className={`${
                          isBuy ? "text-emerald-400" : "text-red-400"
                        } font-medium`}
                      >
                        {side}
                      </span>

                      <span>• ${amount.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="text-right">
                    {tab === "Opened" ? (
                      <>
                        <div className="text-emerald-400 text-sm">
                          +{payout}% 
                        </div>
                        <div className="text-zinc-400 text-xs">
                          {formatTime(remaining)}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-zinc-400 text-xs">
                          Close: {t.closePrice ? t.closePrice.toFixed(2) : "--"}
                        </div>
                        <div
                          className={`text-sm font-medium ${
                            safeNumber(t.profit) > 0
                              ? "text-emerald-400"
                              : "text-red-400"
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








// import React, { useState, useEffect } from "react";
// import { TrendingUp, TrendingDown, Star } from "lucide-react";
// import { useSelector } from "react-redux";

// export default function TradesTabs() {
//   const [tab, setTab] = useState("Opened");
//   const [openedTrades, setOpenedTrades] = useState([]);

//   // 🔥 Redux State (instead of props)
//   const { opened, closed } = useSelector((state) => state.trade);

//   // 🔄 Clone opened trades from Redux to local state for timer updates
//   useEffect(() => {
//     setOpenedTrades(opened.map((t) => ({ ...t })));
//   }, [opened]);

//   // 🕒 Handle countdown timer
//   useEffect(() => {
//     if (tab !== "Opened" || openedTrades.length === 0) return;

//     const interval = setInterval(() => {
//       setOpenedTrades((prev) =>
//         prev.map((trade) => {
//           if (trade.expiresAt) {
//             const remaining = Math.max(
//               0,
//               Math.floor((trade.expiresAt - Date.now()) / 1000)
//             );
//             return { ...trade, remaining };
//           }
//           return trade;
//         })
//       );
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [tab, openedTrades.length]);

//   // Format seconds → mm:ss
//   const formatTime = (seconds) => {
//     if (seconds == null || isNaN(seconds)) return "--:--";
//     const m = Math.floor(seconds / 60)
//       .toString()
//       .padStart(2, "0");
//     const s = Math.floor(seconds % 60)
//       .toString()
//       .padStart(2, "0");
//     return `${m}:${s}`;
//   };

//   const trades = tab === "Opened" ? openedTrades : closed;

//   return (
//     <div className="p-4 bg-[#0b0f1a] border border-zinc-800 rounded-2xl text-white mt-6">
//       {/* Tabs */}
//       <div className="flex mb-4 border-b border-zinc-800">
//         {["Opened", "Closed"].map((label) => (
//           <button
//             key={label}
//             className={`flex-1 py-2 font-medium transition-colors duration-150 ${
//               tab === label
//                 ? "text-emerald-400 border-b-2 border-emerald-400"
//                 : "text-zinc-500 hover:text-zinc-300"
//             }`}
//             onClick={() => setTab(label)}
//           >
//             {label}
//           </button>
//         ))}
//       </div>

//       {/* Trade list */}
//       {trades.length === 0 ? (
//         <div className="text-zinc-500 text-sm text-center py-8">
//           No {tab.toLowerCase()} trades yet.
//         </div>
//       ) : (
//         <ul className="space-y-3">
//           {trades.map((t) => {
//             const isBuy = t.side === "BUY";

//             return (
//               <li
//                 key={t.id}
//                 className="bg-[#111827] border border-zinc-800 rounded-lg p-3 shadow-sm hover:border-emerald-500/30 transition"
//               >
//                 <div className="flex justify-between items-center">
                  
//                   {/* Left */}
//                   <div>
//                     <div className="flex items-center gap-2">
//                       <Star size={14} className="text-yellow-400 fill-yellow-400" />
//                       <span className="font-semibold text-sm">
//                         {t.asset?.symbol || "Asset"} OTC
//                       </span>
//                     </div>

//                     <div className="flex items-center gap-1 text-xs text-zinc-500 mt-1">
//                       {isBuy ? (
//                         <TrendingUp size={14} className="text-emerald-400" />
//                       ) : (
//                         <TrendingDown size={14} className="text-red-400" />
//                       )}

//                       <span
//                         className={`${
//                           isBuy ? "text-emerald-400" : "text-red-400"
//                         } font-medium`}
//                       >
//                         {t.side}
//                       </span>

//                       <span>• ${Math.round(t.amount)}</span>
//                     </div>
//                   </div>

//                   {/* Right */}
//                   <div className="text-right">
//                     {tab === "Opened" ? (
//                       <>
//                         <div className="text-emerald-400 text-sm">
//                           +{t.payout ?? 90}%
//                         </div>
//                         <div className="text-zinc-400 text-xs">
//                           {formatTime(t.remaining ?? 0)}
//                         </div>
//                       </>
//                     ) : (
//                       <>
//                         <div className="text-zinc-400 text-xs">
//                           Close: {t.closePrice?.toFixed(2) ?? "--"}
//                         </div>
//                         <div
//                           className={`text-sm font-medium ${
//                             t.profit > 0 ? "text-emerald-400" : "text-red-400"
//                           }`}
//                         >
//                           {t.profit > 0 ? "+" : ""}
//                           {t.profit?.toFixed(2) ?? 0}
//                         </div>
//                       </>
//                     )}
//                   </div>

//                 </div>
//               </li>
//             );
//           })}
//         </ul>
//       )}
//     </div>
//   );
// }

