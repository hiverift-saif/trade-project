import React, { useState } from "react";
import { buyTrade, sellTrade } from "../api/tradeApi";

import {
  TrendingUp,
  TrendingDown,
  Clock,
  Calculator,
  X,
  Plus,
  Minus,
  Delete,
  Info,
} from "lucide-react";

const TradePanel = ({
  selectedAsset,
  amount,
  setAmount,
  seconds,
  setSeconds,
  payout,
  onBuy,
  onSell,
  balance,
  setBalance,
  livePrice,
}) => {
  const [autoOffset, setAutoOffset] = useState(false);
  const [showCalc, setShowCalc] = useState(false);
  const [showTimeMenu, setShowTimeMenu] = useState(false);
  const [multiplier, setMultiplier] = useState(2);

  // 🕒 Format time into readable string (e.g. "2h 5m 30s")
  const formatTime = (totalSeconds) => {
    if (!totalSeconds || totalSeconds <= 0) return "Select";

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (hours > 0 && minutes === 0 && secs === 0) return `${hours}h`;
    if (hours > 0 && minutes > 0 && secs === 0) return `${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m ${secs}s`;
    if (minutes > 0 && secs === 0) return `${minutes}m`;
    if (minutes > 0) return `${minutes}m ${secs}s`;
    return `${secs}s`;
  };

  // ✅ Buy Handler
  const handleBuy = async () => {
    try {
      const expiryIso = new Date(Date.now() + seconds * 1000).toISOString();

      const payload = {
        userId: "69119a266c6337fc08afa94a",
        type: "buy",
        symbol: selectedAsset,
        amount,
        price: livePrice,
        entryPrice: livePrice,
        quantity: Number(((amount || 1) / livePrice).toFixed(6)),
        expiryTime: expiryIso,
        status: "open",
        isPublic: true,
        profitLoss: 0,
      };

      const res = await buyTrade(payload);

      const trade = res.data.trade;

      const expiresAt = new Date(expiryIso).getTime();
      const remaining = Math.floor((expiresAt - Date.now()) / 1000);

      onBuy?.({
        ...trade,
        expiresAt,
        remaining,
        payout,
        side: "BUY",
        asset: { symbol: selectedAsset },
      });

      setBalance((prev) => prev - amount);
    } catch (err) {
      console.error("BUY ERROR:", err);
      alert("Buy failed!");
    }
  };

  // 🔴 Sell Handler
  const handleSell = async () => {
    try {
      const expiryIso = new Date(Date.now() + seconds * 1000).toISOString();

      const payload = {
        userId: "69119a266c6337fc08afa94a",
        type: "sell",
        symbol: selectedAsset,
        amount,
        price: livePrice,
        entryPrice: livePrice,
        quantity: Number(((amount || 1) / livePrice).toFixed(6)),
        expiryTime: expiryIso,
        status: "open",
        isPublic: true,
        profitLoss: 0,
      };

      const res = await sellTrade(payload);

      const trade = res.data.trade;

      const expiresAt = new Date(expiryIso).getTime();
      const remaining = Math.floor((expiresAt - Date.now()) / 1000);

      onSell?.({
        ...trade,
        expiresAt,
        remaining,
        payout,
        side: "SELL",
        asset: { symbol: selectedAsset },
      });

      setBalance((prev) => prev - amount);
    } catch (err) {
      console.error("SELL ERROR:", err);
      alert("Sell failed!");
    }
  };

  return (
    <div className="relative bg-[#071022] border border-gray-700 p-5 rounded-2xl shadow-lg flex flex-col gap-5 mt-4">
      {/* === Inputs Section === */}
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* 💰 Amount Input */}
          <div className="relative">
            <label className="text-gray-400 text-sm block mb-1">
              Amount ($)
            </label>
            <div
              onClick={() => {
                setShowCalc((prev) => !prev);
                setShowTimeMenu(false);
              }}
              className="bg-zinc-900 px-4 py-2 rounded-md text-gray-100 w-28 border border-gray-700 cursor-pointer flex justify-between items-center"
            >
              <span>${amount}</span>
              <Calculator size={16} className="text-gray-400" />
            </div>

            {/* === Modern Calculator Popup === */}
            {showCalc && (
              <div
                className="
      absolute z-30 top-0
      -left-[230px]  /* open neatly on the left side of input */
      bg-[#0b1120]/95 border border-slate-700 rounded-xl
      w-60 p-3 shadow-2xl backdrop-blur-md
      animate-in fade-in-10 zoom-in-90 duration-300
    "
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-slate-400">
                    Amount Calculator
                  </span>
                  <button
                    onClick={() => setShowCalc(false)}
                    className="text-slate-400 hover:text-white transition"
                  >
                    <X size={14} />
                  </button>
                </div>

                {/* Balance Display */}
                <div className="text-center mb-2">
                  <span className="text-[11px] text-slate-500">
                    Balance: ${Number(balance).toLocaleString()}
                  </span>
                </div>

                {/* Amount Display */}
                <div className="text-center mb-3">
                  <div className="text-2xl font-bold text-white tracking-wide">
                    ${Number(amount || 0).toLocaleString()}
                  </div>
                </div>

                {/* Multiplier Row */}
                <div className="flex items-center justify-end gap-2 mb-3">
                  <button
                    onClick={() => {
                      const num = parseFloat(amount) || 0;
                      setAmount(String((num / multiplier).toFixed(2)));
                    }}
                    className="w-7 h-7 bg-slate-700/60 hover:bg-slate-600/70 rounded flex items-center justify-center text-xs text-slate-300 font-semibold transition"
                  >
                    ÷
                  </button>

                  <div className="bg-slate-700/50 rounded-lg px-2 py-1 flex items-center gap-1">
                    <button
                      onClick={() => setMultiplier(Math.max(1, multiplier - 1))}
                      className="text-slate-400 hover:text-white transition"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-white font-semibold text-sm min-w-[16px] text-center">
                      {multiplier}
                    </span>
                    <button
                      onClick={() => setMultiplier(multiplier + 1)}
                      className="text-slate-400 hover:text-white transition"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      const num = parseFloat(amount) || 0;
                      setAmount(String((num * multiplier).toFixed(2)));
                    }}
                    className="w-7 h-7 bg-slate-700/60 hover:bg-slate-600/70 rounded flex items-center justify-center text-xs text-slate-300 font-semibold transition"
                  >
                    ×
                  </button>
                </div>

                {/* Quick Amount Buttons */}
                <div className="grid grid-cols-4 gap-1.5 mb-2">
                  {[
                    { label: "$10", value: 10 },
                    { label: "$50", value: 50 },
                    { label: "$100", value: 100 },
                    { label: "MAX", value: "max" },
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (item.value === "max") setAmount(String(balance));
                        else setAmount(String(item.value));
                      }}
                      className={`px-1.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                        item.value === "max"
                          ? "bg-blue-600/80 hover:bg-blue-500 text-white"
                          : "bg-slate-700/40 hover:bg-slate-600/40 text-slate-300"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                {/* Numpad */}
                <div className="grid grid-cols-3 gap-1.5">
                  {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((num) => (
                    <button
                      key={num}
                      onClick={() =>
                        setAmount((prev) =>
                          prev.toString() === "0"
                            ? num.toString()
                            : prev.toString() + num
                        )
                      }
                      className="h-10 bg-slate-800/40 hover:bg-slate-700/40 rounded text-slate-200 text-sm font-medium transition"
                    >
                      {num}
                    </button>
                  ))}

                  <button
                    onClick={() =>
                      setAmount((prev) => {
                        const s = String(prev ?? "0");
                        return s.includes(".") ? s : s + ".";
                      })
                    }
                    className="h-10 bg-slate-800/40 hover:bg-slate-700/40 rounded text-slate-200 text-lg font-medium transition"
                  >
                    .
                  </button>

                  <button
                    onClick={() => setAmount((prev) => prev.toString() + "0")}
                    className="h-10 bg-slate-800/40 hover:bg-slate-700/40 rounded text-slate-200 text-sm font-medium transition"
                  >
                    0
                  </button>

                  <button
                    onClick={() =>
                      setAmount((prev) => {
                        const s = String(prev ?? "0");
                        return s.length > 1 ? s.slice(0, -1) : "0";
                      })
                    }
                    className="h-10 bg-slate-800/40 hover:bg-slate-700/40 rounded flex items-center justify-center text-slate-300 transition"
                  >
                    <Delete className="w-4 h-4" />
                  </button>
                </div>

                {/* OK Button */}
                {/* Action Buttons */}
                <div className="flex items-center justify-between gap-2 mt-3">
                  {/* Reset Button */}
                  <button
                    onClick={() => setAmount("0")}
                    className="flex-1 bg-slate-700/60 hover:bg-slate-600/70 text-slate-200 text-sm font-semibold py-1.5 rounded-lg transition"
                  >
                    Reset
                  </button>

                  {/* OK Button */}
                  <button
                    onClick={() => setShowCalc(false)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-1.5 rounded-lg transition"
                  >
                    OK
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 🕓 Time Input */}
          <div className="relative">
            <label className="text-gray-400 text-sm block mb-1">Time</label>
            <div
              onClick={() => {
                setShowTimeMenu((prev) => !prev);
                setShowCalc(false);
              }}
              className="bg-zinc-900 px-4 py-2 rounded-md text-gray-100 w-28 border border-gray-700 cursor-pointer flex justify-between items-center"
            >
              <span>{formatTime(seconds)}</span>

              <Clock size={16} className="text-gray-400" />
            </div>

            {/* Add your existing Time Modal here... */}

            {showTimeMenu && (
              <div
                className="
      absolute z-50 top-0
      -left-[270px]
      bg-slate-800/95 border border-slate-700 rounded-xl
      w-72 p-5 shadow-2xl backdrop-blur-md
      animate-[fadeInLeft_0.25s_ease-in-out]
    "
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-slate-400">
                    Expiration Timer
                  </span>
                  <button
                    onClick={() => setShowTimeMenu(false)}
                    className="text-slate-400 hover:text-white transition"
                  >
                    <X size={14} />
                  </button>
                </div>

                {/* Time Selection */}
                <div className="flex items-center justify-center gap-3 mb-4">
                  {/* Hours */}
                  <div className="flex flex-col items-center gap-1.5">
                    <button
                      onClick={() => setSeconds((prev) => prev + 3600)}
                      className="w-9 h-9 bg-slate-700/50 hover:bg-slate-600/50 rounded flex items-center justify-center transition"
                    >
                      <Plus className="w-3.5 h-3.5 text-slate-300" />
                    </button>
                    <div className="text-2xl font-bold text-white tabular-nums w-10 text-center">
                      {String(Math.floor(seconds / 3600)).padStart(2, "0")}
                    </div>
                    <button
                      onClick={() =>
                        setSeconds((prev) => Math.max(0, prev - 3600))
                      }
                      className="w-9 h-9 bg-slate-700/50 hover:bg-slate-600/50 rounded flex items-center justify-center transition"
                    >
                      <Minus className="w-3.5 h-3.5 text-slate-300" />
                    </button>
                  </div>

                  <span className="text-xl text-slate-500 mb-2">:</span>

                  {/* Minutes */}
                  <div className="flex flex-col items-center gap-1.5">
                    <button
                      onClick={() => setSeconds((prev) => prev + 60)}
                      className="w-9 h-9 bg-slate-700/50 hover:bg-slate-600/50 rounded flex items-center justify-center transition"
                    >
                      <Plus className="w-3.5 h-3.5 text-slate-300" />
                    </button>
                    <div className="text-2xl font-bold text-white tabular-nums w-10 text-center">
                      {String(Math.floor((seconds % 3600) / 60)).padStart(
                        2,
                        "0"
                      )}
                    </div>
                    <button
                      onClick={() =>
                        setSeconds((prev) => Math.max(0, prev - 60))
                      }
                      className="w-9 h-9 bg-slate-700/50 hover:bg-slate-600/50 rounded flex items-center justify-center transition"
                    >
                      <Minus className="w-3.5 h-3.5 text-slate-300" />
                    </button>
                  </div>

                  <span className="text-xl text-slate-500 mb-2">:</span>

                  {/* Seconds */}
                  <div className="flex flex-col items-center gap-1.5">
                    <button
                      onClick={() => setSeconds((prev) => prev + 1)}
                      className="w-9 h-9 bg-slate-700/50 hover:bg-slate-600/50 rounded flex items-center justify-center transition"
                    >
                      <Plus className="w-3.5 h-3.5 text-slate-300" />
                    </button>
                    <div className="text-2xl font-bold text-white tabular-nums w-10 text-center">
                      {String(seconds % 60).padStart(2, "0")}
                    </div>
                    <button
                      onClick={() =>
                        setSeconds((prev) => Math.max(0, prev - 1))
                      }
                      className="w-9 h-9 bg-slate-700/50 hover:bg-slate-600/50 rounded flex items-center justify-center transition"
                    >
                      <Minus className="w-3.5 h-3.5 text-slate-300" />
                    </button>
                  </div>
                </div>

                {/* Auto Time Offset Toggle */}
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-700/50">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400 text-xs">
                      Auto Time Offset
                    </span>
                    <Info className="w-3 h-3 text-slate-500" />
                  </div>
                  <button
                    onClick={() => setAutoOffset((prev) => !prev)}
                    className={`w-10 h-5 rounded-full relative transition-colors ${
                      autoOffset ? "bg-blue-500" : "bg-slate-600"
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                        autoOffset ? "translate-x-5" : "translate-x-0.5"
                      }`}
                    ></div>
                  </button>
                </div>

                {/* Quick Buttons — visible only if autoOffset is ON */}
                {autoOffset && (
                  <div className="grid grid-cols-3 gap-2 mb-2 transition-all duration-200 ease-in-out">
                    {[
                      { label: "+S30", add: 30 },
                      { label: "+M1", add: 60 },
                      { label: "+M2", add: 120 },
                      { label: "+M3", add: 180 },
                      { label: "+M5", add: 300 },
                    ].map((b) => (
                      <button
                        key={b.label}
                        onClick={() => setSeconds((prev) => prev + b.add)}
                        className="px-3 py-1.5 bg-slate-700/50 hover:bg-blue-600 text-slate-300 hover:text-white rounded text-xs font-medium transition"
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Apply Button */}
                <button
                  onClick={() => setShowTimeMenu(false)}
                  className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold py-1.5 rounded-lg transition"
                >
                  Apply
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ✅ Buy / Sell Buttons */}
        <div className="flex gap-4 flex-wrap justify-end">
          <button
            onClick={handleBuy}
            className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-md font-semibold text-white flex items-center gap-2 transition-all shadow-md"
          >
            <TrendingUp size={18} /> Buy
          </button>
          <button
            onClick={handleSell}
            className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-md font-semibold text-white flex items-center gap-2 transition-all shadow-md"
          >
            <TrendingDown size={18} /> Sell
          </button>
        </div>
      </div>

      {/* === Footer Info === */}
      <div className="border-t border-gray-700"></div>
      <div className="flex items-center justify-between text-sm text-gray-400">
        <span>Selected Asset:</span>
        <span className="text-gray-100 font-medium">
          {selectedAsset || "—"}
        </span>
      </div>
      <div className="flex items-center justify-between text-sm text-gray-400">
        <span>Payout:</span>
        <span className="text-green-400 font-semibold">{payout}%</span>
      </div>
    </div>
  );
};

export default TradePanel;

// import React, { useState } from "react";
// import {
//   TrendingUp,
//   TrendingDown,
//   Clock,
//   Calculator,
//   X,
//   Plus,
//   Minus,
//   Delete,
//   Info,
// } from "lucide-react";

// import { useSelector, useDispatch } from "react-redux";
// import {
//   setAmount,
//   setSeconds,
//   deductBalance,
//   addOpenedTrade,
// } from "../slices/tradeSlice";

// const TradePanel = ({ isOpen, onClose }) => {
//   const dispatch = useDispatch();

//   // 🔥 Redux State
//   const {
//     selectedAsset,
//     amount,
//     seconds,
//     payout,
//     balance,
//     livePrice,
//   } = useSelector((state) => state.trade);

//   // Local UI states
//   const [autoOffset, setAutoOffset] = useState(false);
//   const [showCalc, setShowCalc] = useState(false);
//   const [showTimeMenu, setShowTimeMenu] = useState(false);
//   const [multiplier, setMultiplier] = useState(2);

//   // 🕒 Format time
//   const formatTime = (totalSeconds) => {
//     if (!totalSeconds || totalSeconds <= 0) return "Select";
//     const h = Math.floor(totalSeconds / 3600);
//     const m = Math.floor((totalSeconds % 3600) / 60);
//     const s = totalSeconds % 60;
//     if (h) return `${h}h ${m}m ${s}s`;
//     if (m) return `${m}m ${s}s`;
//     return `${s}s`;
//   };

//   // 🟢 BUY Handler
//   const handleBuy = async () => {
//     if (amount > balance) {
//       alert("Insufficient balance!");
//       return;
//     }

//     try {
//       const expiryIso = new Date(Date.now() + seconds * 1000).toISOString();

//       const response = await fetch("http://192.168.0.49:3000/api/orders", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization:
//             "Bearer YOUR_TOKEN_HERE",
//         },
//         body: JSON.stringify({
//           symbol: selectedAsset,
//           side: "BUY",
//           type: "LIMIT",
//           ownerType: "USER",
//           amount,
//           price: livePrice,
//           quantity: Number(((amount || 0) / (livePrice || 1)).toFixed(6)),
//           expiry: expiryIso,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         alert(data.message || "Order failed");
//         return;
//       }

//       // Deduct balance from Redux
//       dispatch(deductBalance(amount));

//       // Add to global trade list
//       const expiresAt = new Date(expiryIso).getTime();
//       const remaining = Math.floor((expiresAt - Date.now()) / 1000);

//       dispatch(
//         addOpenedTrade({
//           ...data.order,
//           expiresAt,
//           remaining,
//           payout,
//           side: "BUY",
//         })
//       );
//     } catch (error) {
//       console.error(error);
//       alert("Order failed! Try again.");
//     }
//   };

//   // 🔴 SELL Handler
//   const handleSell = async () => {
//     if (amount > balance) {
//       alert("Insufficient balance!");
//       return;
//     }

//     try {
//       const expiryIso = new Date(Date.now() + seconds * 1000).toISOString();

//       const response = await fetch("http://192.168.0.49:3000/api/orders", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization:
//             "Bearer YOUR_TOKEN_HERE",
//         },
//         body: JSON.stringify({
//           symbol: selectedAsset,
//           side: "SELL",
//           type: "LIMIT",
//           ownerType: "USER",
//           amount,
//           price: livePrice,
//           quantity: Number(((amount || 0) / (livePrice || 1)).toFixed(6)),
//           expiry: expiryIso,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         alert(data.message || "Order failed");
//         return;
//       }

//       dispatch(deductBalance(amount));
//       dispatch(addOpenedTrade({ ...data.order, side: "SELL" }));
//     } catch (error) {
//       console.error(error);
//       alert("Order failed! Try again.");
//     }
//   };

//   return (
//     <div
//       className={`${
//         isOpen ? "" : "hidden"
//       } relative bg-[#071022] border border-gray-700 p-5 rounded-2xl shadow-lg flex flex-col gap-5`}
//     >
//       {/* === Inputs Section === */}
//       <div className="flex flex-wrap items-center justify-between gap-6">
//         <div className="flex flex-col sm:flex-row gap-6">
//           {/* 💰 Amount Input */}
//           <div className="relative">
//             <label className="text-gray-400 text-sm block mb-1">
//               Amount ($)
//             </label>
//             <div
//               onClick={() => {
//                 setShowCalc(!showCalc);
//                 setShowTimeMenu(false);
//               }}
//               className="bg-zinc-900 px-4 py-2 rounded-md text-gray-100 w-28 border border-gray-700 cursor-pointer flex justify-between items-center"
//             >
//               <span>${amount}</span>
//               <Calculator size={16} className="text-gray-400" />
//             </div>

//             {/* Calculator Popup */}
//             {showCalc && (
//               <div className="absolute z-30 top-0 -left-[230px] bg-[#0b1120]/95 border border-slate-700 rounded-xl w-60 p-3 shadow-2xl backdrop-blur-md">
//                 {/* Header */}
//                 <div className="flex items-center justify-between mb-3">
//                   <span className="text-xs text-slate-400">
//                     Amount Calculator
//                   </span>
//                   <button
//                     onClick={() => setShowCalc(false)}
//                     className="text-slate-400 hover:text-white"
//                   >
//                     <X size={14} />
//                   </button>
//                 </div>

//                 {/* Display */}
//                 <div className="text-center mb-3">
//                   <div className="text-2xl font-bold text-white tracking-wide">
//                     ${amount}
//                   </div>
//                 </div>

//                 {/* Multiplier */}
//                 <div className="flex items-center justify-end gap-2 mb-3">
//                   <button
//                     onClick={() => dispatch(setAmount(amount / multiplier))}
//                     className="w-7 h-7 bg-slate-700/60 hover:bg-slate-600/70 rounded"
//                   >
//                     ÷
//                   </button>

//                   <div className="bg-slate-700/50 rounded-lg px-2 py-1 flex items-center gap-1">
//                     <button
//                       onClick={() => setMultiplier(multiplier - 1)}
//                     >
//                       <Minus className="w-3 h-3 text-slate-300" />
//                     </button>

//                     <span className="text-white font-semibold text-sm">
//                       {multiplier}
//                     </span>

//                     <button
//                       onClick={() => setMultiplier(multiplier + 1)}
//                     >
//                       <Plus className="w-3 h-3 text-slate-300" />
//                     </button>
//                   </div>

//                   <button
//                     onClick={() => dispatch(setAmount(amount * multiplier))}
//                     className="w-7 h-7 bg-slate-700/60 hover:bg-slate-600/70 rounded"
//                   >
//                     ×
//                   </button>
//                 </div>

//                 {/* Quick Buttons */}
//                 <div className="grid grid-cols-4 gap-1.5 mb-2">
//                   {[10, 50, 100].map((v) => (
//                     <button
//                       key={v}
//                       onClick={() => dispatch(setAmount(v))}
//                       className="px-1.5 py-1 bg-slate-700/40 hover:bg-slate-600/40 text-slate-300 text-[11px] rounded"
//                     >
//                       ${v}
//                     </button>
//                   ))}

//                   <button
//                     onClick={() => dispatch(setAmount(balance))}
//                     className="px-1.5 py-1 bg-blue-600 text-white text-[11px] rounded"
//                   >
//                     MAX
//                   </button>
//                 </div>

//                 {/* Numpad */}
//                 <div className="grid grid-cols-3 gap-1.5">
//                   {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((num) => (
//                     <button
//                       key={num}
//                       onClick={() =>
//                         dispatch(setAmount(Number(String(amount) + num)))
//                       }
//                       className="h-10 bg-slate-800/40 hover:bg-slate-700/40 rounded text-slate-200"
//                     >
//                       {num}
//                     </button>
//                   ))}

//                   <button
//                     onClick={() =>
//                       !String(amount).includes(".") &&
//                       dispatch(setAmount(String(amount) + "."))
//                     }
//                     className="h-10 bg-slate-800/40 text-slate-200 rounded"
//                   >
//                     .
//                   </button>

//                   <button
//                     onClick={() =>
//                       dispatch(setAmount(Number(String(amount) + "0")))
//                     }
//                     className="h-10 bg-slate-800/40 text-slate-200 rounded"
//                   >
//                     0
//                   </button>

//                   <button
//                     onClick={() => {
//                       const s = String(amount);
//                       dispatch(
//                         setAmount(Number(s.length > 1 ? s.slice(0, -1) : "0"))
//                       );
//                     }}
//                     className="h-10 bg-slate-800/40 rounded text-slate-200"
//                   >
//                     <Delete className="w-4 h-4" />
//                   </button>
//                 </div>

//                 {/* Footer */}
//                 <div className="flex items-center justify-between gap-2 mt-3">
//                   <button
//                     onClick={() => dispatch(setAmount(0))}
//                     className="flex-1 bg-slate-700 text-slate-200 py-1.5 rounded"
//                   >
//                     Reset
//                   </button>

//                   <button
//                     onClick={() => setShowCalc(false)}
//                     className="flex-1 bg-blue-500 text-white py-1.5 rounded"
//                   >
//                     OK
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* TIME MENU */}
//           <div className="relative">
//             <label className="text-gray-400 text-sm block mb-1">Time</label>
//             <div
//               onClick={() => {
//                 setShowTimeMenu(!showTimeMenu);
//                 setShowCalc(false);
//               }}
//               className="bg-zinc-900 px-4 py-2 rounded-md text-gray-100 w-28 border border-gray-700 cursor-pointer flex justify-between items-center"
//             >
//               <span>{formatTime(seconds)}</span>
//               <Clock size={16} className="text-gray-400" />
//             </div>

//             {showTimeMenu && (
//               <div className="absolute z-50 top-0 -left-[270px] bg-slate-800/95 border border-slate-700 rounded-xl w-72 p-5 shadow-2xl backdrop-blur-xl">
//                 {/* Hours */}
//                 <div className="flex items-center justify-center gap-3 mb-4">
//                   <div className="flex flex-col items-center gap-1.5">
//                     <button
//                       onClick={() => dispatch(setSeconds(seconds + 3600))}
//                       className="w-9 h-9 bg-slate-700 rounded"
//                     >
//                       <Plus size={14} className="text-slate-300" />
//                     </button>

//                     <div className="text-2xl text-white">
//                       {String(Math.floor(seconds / 3600)).padStart(2, "0")}
//                     </div>

//                     <button
//                       onClick={() =>
//                         dispatch(setSeconds(Math.max(0, seconds - 3600)))
//                       }
//                       className="w-9 h-9 bg-slate-700 rounded"
//                     >
//                       <Minus size={14} className="text-slate-300" />
//                     </button>
//                   </div>

//                   {/* Minutes */}
//                   <div className="flex flex-col items-center gap-1.5">
//                     <button
//                       onClick={() => dispatch(setSeconds(seconds + 60))}
//                       className="w-9 h-9 bg-slate-700 rounded"
//                     >
//                       <Plus size={14} className="text-slate-300" />
//                     </button>

//                     <div className="text-2xl text-white">
//                       {String(Math.floor((seconds % 3600) / 60)).padStart(
//                         2,
//                         "0"
//                       )}
//                     </div>

//                     <button
//                       onClick={() =>
//                         dispatch(setSeconds(Math.max(0, seconds - 60)))
//                       }
//                       className="w-9 h-9 bg-slate-700 rounded"
//                     >
//                       <Minus size={14} className="text-slate-300" />
//                     </button>
//                   </div>

//                   {/* Seconds */}
//                   <div className="flex flex-col items-center gap-1.5">
//                     <button
//                       onClick={() => dispatch(setSeconds(seconds + 1))}
//                       className="w-9 h-9 bg-slate-700 rounded"
//                     >
//                       <Plus size={14} className="text-slate-300" />
//                     </button>

//                     <div className="text-2xl text-white">
//                       {String(seconds % 60).padStart(2, "0")}
//                     </div>

//                     <button
//                       onClick={() =>
//                         dispatch(setSeconds(Math.max(0, seconds - 1)))
//                       }
//                       className="w-9 h-9 bg-slate-700 rounded"
//                     >
//                       <Minus size={14} className="text-slate-300" />
//                     </button>
//                   </div>
//                 </div>

//                 <button
//                   onClick={() => setShowTimeMenu(false)}
//                   className="mt-3 w-full bg-blue-500 text-white py-1.5 rounded"
//                 >
//                   Apply
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* BUY / SELL */}
//         <div className="flex gap-4 flex-wrap justify-end">
//           <button
//             onClick={handleBuy}
//             className="bg-green-500 px-6 py-2 rounded-md text-white font-semibold flex items-center gap-2"
//           >
//             <TrendingUp size={18} /> Buy
//           </button>

//           <button
//             onClick={handleSell}
//             className="bg-red-500 px-6 py-2 rounded-md text-white font-semibold flex items-center gap-2"
//           >
//             <TrendingDown size={18} /> Sell
//           </button>
//         </div>
//       </div>

//       {/* FOOTER */}
//       <div className="border-t border-gray-700"></div>

//       <div className="flex items-center justify-between text-sm text-gray-400">
//         <span>Selected Asset:</span>
//         <span className="text-gray-100 font-medium">{selectedAsset}</span>
//       </div>

//       <div className="flex items-center justify-between text-sm text-gray-400">
//         <span>Payout:</span>
//         <span className="text-green-400 font-semibold">{payout}%</span>
//       </div>
//     </div>
//   );
// };

// export default TradePanel;
