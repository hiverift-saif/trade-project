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
  onExpiryPreview, // ⭐ chart expiry line callback
  onAddMarker,

}) => {
  const [autoOffset, setAutoOffset] = useState(false);
  const [showCalc, setShowCalc] = useState(false);
  const [showTimeMenu, setShowTimeMenu] = useState(false);
  const [multiplier, setMultiplier] = useState(2);

  // ⭐ send expiry line to chart
  // const updateExpiryPreview = (sec) => {
  //   if (!sec) return;
  //   const ts = Date.now() + sec * 1000;
  //   onExpiryPreview?.(ts);
  // };

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

  // ---------------- BUY / SELL ----------------
const handleBuy = async () => {
  // ⛔ Basic validations
  if (!livePrice) {
    console.error("❌ Missing live price");
    return;
  }

  const amt = Number(amount);
  if (!amt || amt <= 0) {
    console.error("❌ Missing or invalid amount");
    return;
  }

  const sec = Number(seconds);
  if (!sec || sec <= 0) {
    console.error("❌ Missing or invalid time");
    return;
  }

  // ⏳ Calculate expiry timestamp
  const expiryTs = Date.now() + sec * 1000;
  const expiryIso = new Date(expiryTs).toISOString();

  // 📦 Prepare payload for API
 const payload = {
  userId: "69119a266c6337fc08afa94a",
  type: "buy",

  symbol:
    selectedAsset?.apiSymbol || selectedAsset?.id || selectedAsset?.symbol,

  asset: selectedAsset,

  amount: amt,

  // ⭐ YOUR REQUIREMENT
  price: amt,
  entryPrice: livePrice, 

  quantity: Number((amt / livePrice).toFixed(6)),
    seconds: sec,  
  expiryTime: expiryIso,
  status: "open",
  profitLoss: 0,
  stopLoss: null,
  takeProfit: null,
  txHash: "",
  exitPrice: null,
  closeReason: null,
  isPublic: true,
};


  // 📡 API HIT — Buy Trade
  const res = await buyTrade(payload);

  console.log("BUY TRADE RESPONSE...........:", res);

  // ⭐ SAFE TRADE ID (No crash)
  const tradeId =
    res?.data?.trade?._id ||
    res?.data?._id ||
    res?.trade?._id ||
    Date.now();

  // 🟢 Update UI (Opened Trades)
  onBuy?.({
    ...payload,
    id: tradeId,
    createdAt: Date.now(),
    expiresAt: expiryTs,
  });

  // 💰 Deduct balance
  setBalance((b) => b - amt);

  // 📍 Add marker on chart
  onAddMarker?.({
    price: livePrice,
    amount: amt,
    side: "buy",
    time: Date.now(),
    seconds: sec,
  });
};


 const handleSell = async () => {
  // ⛔ Basic validations
  if (!livePrice) {
    console.error("❌ Missing live price");
    return;
  }

  const amt = Number(amount);
  if (!amt || amt <= 0) {
    console.error("❌ Missing or invalid amount");
    return;
  }

  const sec = Number(seconds);
  if (!sec || sec <= 0) {
    console.error("❌ Missing or invalid time");
    return;
  }

  // ⏳ expiry timestamp
  const expiryTs = Date.now() + sec * 1000;
  const expiryIso = new Date(expiryTs).toISOString();

  // 📦 payload
const payload = {
  userId: "69119a266c6337fc08afa94a",
  type: "sell",

  symbol:
    selectedAsset?.apiSymbol || selectedAsset?.id || selectedAsset?.symbol,

  asset: selectedAsset,

  amount: amt,

  // ⭐ YOUR REQUIREMENT
   price: amt,
  entryPrice: livePrice,

  quantity: Number((amt / livePrice).toFixed(6)),
  expiryTime: expiryIso,
  status: "open",
  profitLoss: 0,
  stopLoss: null,
  takeProfit: null,
  txHash: "",
  exitPrice: null,
  closeReason: null,
  isPublic: true,
};


  // 📡 API call
  const res = await sellTrade(payload);

  console.log("SELL TRADE RESPONSE...........:", res);

  // ⭐ SAFE TRADE ID (never crashes)
  const tradeId =
    res?.data?.trade?._id ||
    res?.data?._id ||
    res?.trade?._id ||
    Date.now();

  // 🟢 Update opened trade list
  onSell?.({
    ...payload,
    id: tradeId,
    createdAt: Date.now(),
    expiresAt: expiryTs,
  });

  // 💰 update balance
  setBalance((b) => b - amt);

  // 📍 add chart marker
  onAddMarker?.({
    price: livePrice,
    amount: amt,
    side: "sell",
    time: Date.now(),
    seconds: sec,
  });
};


  // ---------------- UI ----------------
  return (
    <div className="relative bg-[#050713] border border-[#1a2233] p-5 rounded-2xl shadow-lg flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-6">
        {/* 💰 Amount Input */}
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="relative">
            <label className="text-gray-400 text-sm block mb-1">
              Amount ($)
            </label>

            <div
              onClick={() => {
                setShowCalc((p) => !p);
                setShowTimeMenu(false);
              }}
              className="bg-zinc-900 px-4 py-2 rounded-md text-gray-100 w-28 border border-gray-700 cursor-pointer flex justify-between items-center"
            >
              <span>${amount}</span>
              <Calculator size={16} className="text-gray-400" />
            </div>

            {/* ---------------- Calculator Popup ---------------- */}
            {showCalc && (
              <div className="absolute z-30 top-0 -left-[230px] bg-[#0b1120]/95 border border-slate-700 rounded-xl w-60 p-3 shadow-2xl backdrop-blur-md">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-slate-400">
                    Amount Calculator
                  </span>
                  <button
                    onClick={() => setShowCalc(false)}
                    className="text-slate-400 hover:text-white"
                  >
                    <X size={14} />
                  </button>
                </div>

                <div className="text-center mb-2">
                  <span className="text-[11px] text-slate-500">
                    Balance: ${Number(balance).toLocaleString()}
                  </span>
                </div>

                <div className="text-center mb-3">
                  <div className="text-2xl font-bold text-white tracking-wide">
                    ${Number(amount || 0).toLocaleString()}
                  </div>
                </div>

                {/* Multiplier */}
                <div className="flex items-center justify-end gap-2 mb-3">
                  <button
                    onClick={() => {
                      const num = parseFloat(amount) || 0;
                      setAmount(String((num / multiplier).toFixed(2)));
                    }}
                    className="w-7 h-7 bg-slate-700/60 rounded flex items-center justify-center text-xs text-slate-300"
                  >
                    ÷
                  </button>

                  <div className="bg-slate-700/50 rounded-lg px-2 py-1 flex items-center gap-1">
                    <button
                      onClick={() => setMultiplier(Math.max(1, multiplier - 1))}
                      className="text-slate-400 hover:text-white"
                    >
                      <Minus className="w-3 h-3" />
                    </button>

                    <span className="text-white font-semibold text-sm min-w-[16px] text-center">
                      {multiplier}
                    </span>

                    <button
                      onClick={() => setMultiplier(multiplier + 1)}
                      className="text-slate-400 hover:text-white"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      const num = parseFloat(amount) || 0;
                      setAmount(String((num * multiplier).toFixed(2)));
                    }}
                    className="w-7 h-7 bg-slate-700/60 rounded flex items-center justify-center text-xs text-slate-300"
                  >
                    ×
                  </button>
                </div>

                {/* Quick Amount Buttons */}
                <div className="grid grid-cols-4 gap-1.5 mb-2">
                  {[10, 50, 100].map((v, i) => (
                    <button
                      key={i}
                      onClick={() => setAmount(String(v))}
                      className="px-1.5 py-1 bg-slate-700/40 hover:bg-slate-600/40 rounded text-[11px] text-slate-300"
                    >
                      ${v}
                    </button>
                  ))}

                  <button
                    onClick={() => setAmount(String(balance))}
                    className="px-1.5 py-1 bg-blue-600/80 hover:bg-blue-500 rounded text-[11px] text-white"
                  >
                    MAX
                  </button>
                </div>

                {/* Numpad */}
                <div className="grid grid-cols-3 gap-1.5 mb-2">
                  {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((n) => (
                    <button
                      key={n}
                      onClick={() => setAmount(String(amount + n))}
                      className="h-10 bg-slate-800/40 hover:bg-slate-700/40 rounded text-slate-200 text-sm"
                    >
                      {n}
                    </button>
                  ))}

                  <button
                    onClick={() =>
                      setAmount((p) => (p.includes(".") ? p : p + "."))
                    }
                    className="h-10 bg-slate-800/40 hover:bg-slate-700/40 rounded text-slate-200 text-lg"
                  >
                    .
                  </button>

                  <button
                    onClick={() => setAmount(String(amount + "0"))}
                    className="h-10 bg-slate-800/40 hover:bg-slate-700/40 rounded text-slate-200 text-sm"
                  >
                    0
                  </button>

                  <button
                    onClick={() =>
                      setAmount((p) => (p.length > 1 ? p.slice(0, -1) : "0"))
                    }
                    className="h-10 bg-slate-800/40 hover:bg-slate-700/40 rounded text-slate-300 flex items-center justify-center"
                  >
                    <Delete className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => setAmount("0")}
                    className="flex-1 bg-slate-700/60 hover:bg-slate-600/70 rounded text-slate-200 text-sm py-1.5"
                  >
                    Reset
                  </button>

                  <button
                    onClick={() => setShowCalc(false)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 rounded text-white text-sm py-1.5"
                  >
                    OK
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ---------------- TIME SELECTOR ---------------- */}
          <div className="relative">
            <label className="text-gray-400 text-sm block mb-1">Time</label>

            <div
              onClick={() => {
                setShowTimeMenu((p) => !p);
                setShowCalc(false);
              }}
              className="bg-zinc-900 px-4 py-2 rounded-md text-gray-100 w-28 border border-gray-700 cursor-pointer flex justify-between items-center"
            >
              <span>{formatTime(seconds)}</span>
              <Clock size={16} className="text-gray-400" />
            </div>

            {showTimeMenu && (
              <div className="absolute z-50 top-0 -left-[270px] bg-slate-800/95 border border-slate-700 rounded-xl w-72 p-5 shadow-2xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-slate-400">
                    Expiration Timer
                  </span>
                  <button
                    onClick={() => setShowTimeMenu(false)}
                    className="text-slate-400 hover:text-white"
                  >
                    <X size={14} />
                  </button>
                </div>

                <div className="flex items-center justify-center gap-3 mb-4">
                  {/* Hours */}
                  <div className="flex flex-col items-center gap-1.5">
                    <button
                      onClick={() =>
                        setSeconds((prev) => {
                          const n = prev + 3600;
                          // updateExpiryPreview(n);
                          return n;
                        })
                      }
                      className="w-9 h-9 bg-slate-700/50 hover:bg-slate-600/50 rounded flex items-center justify-center"
                    >
                      <Plus size={12} className="text-slate-300" />
                    </button>

                    <div className="text-2xl font-bold text-white w-10 text-center">
                      {String(Math.floor(seconds / 3600)).padStart(2, "0")}
                    </div>

                    <button
                      onClick={() =>
                        setSeconds((prev) => {
                          const n = Math.max(0, prev - 3600);
                          // updateExpiryPreview(n);
                          return n;
                        })
                      }
                      className="w-9 h-9 bg-slate-700/50 hover:bg-slate-600/50 rounded flex items-center justify-center"
                    >
                      <Minus size={12} className="text-slate-300" />
                    </button>
                  </div>

                  <span className="text-xl text-slate-500 mb-2">:</span>

                  {/* Minutes */}
                  <div className="flex flex-col items-center gap-1.5">
                    <button
                      onClick={() =>
                        setSeconds((prev) => {
                          const n = prev + 60;
                          // updateExpiryPreview(n);
                          return n;
                        })
                      }
                      className="w-9 h-9 bg-slate-700/50 hover:bg-slate-600/50 rounded flex items-center justify-center"
                    >
                      <Plus size={12} className="text-slate-300" />
                    </button>

                    <div className="text-2xl font-bold text-white w-10 text-center">
                      {String(Math.floor((seconds % 3600) / 60)).padStart(
                        2,
                        "0"
                      )}
                    </div>

                    <button
                      onClick={() =>
                        setSeconds((prev) => {
                          const n = Math.max(0, prev - 60);
                          // updateExpiryPreview(n);
                          return n;
                        })
                      }
                      className="w-9 h-9 bg-slate-700/50 hover:bg-slate-600/50 rounded flex items-center justify-center"
                    >
                      <Minus size={12} className="text-slate-300" />
                    </button>
                  </div>

                  <span className="text-xl text-slate-500 mb-2">:</span>

                  {/* Seconds */}
                  <div className="flex flex-col items-center gap-1.5">
                    <button
                      onClick={() =>
                        setSeconds((prev) => {
                          const n = prev + 1;
                          // updateExpiryPreview(n);
                          return n;
                        })
                      }
                      className="w-9 h-9 bg-slate-700/50 hover:bg-slate-600/50 rounded flex items-center justify-center"
                    >
                      <Plus size={12} className="text-slate-300" />
                    </button>

                    <div className="text-2xl font-bold text-white w-10 text-center">
                      {String(seconds % 60).padStart(2, "0")}
                    </div>

                    <button
                      onClick={() =>
                        setSeconds((prev) => {
                          const n = Math.max(0, prev - 1);
                          // updateExpiryPreview(n);
                          return n;
                        })
                      }
                      className="w-9 h-9 bg-slate-700/50 hover:bg-slate-600/50 rounded flex items-center justify-center"
                    >
                      <Minus size={12} className="text-slate-300" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setShowTimeMenu(false)}
                  className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold py-1.5 rounded-lg"
                >
                  Apply
                </button>
              </div>
            )}
          </div>
        </div>

        {/* BUY / SELL */}
        <div className="flex gap-4">
          <button
            onClick={handleBuy}
            className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-md text-white font-semibold flex items-center gap-2 shadow-md"
          >
            <TrendingUp size={18} /> Buy
          </button>

          <button
            onClick={handleSell}
            className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-md text-white font-semibold flex items-center gap-2 shadow-md"
          >
            <TrendingDown size={18} /> Sell
          </button>
        </div>
      </div>
    </div>
  );
};

export default TradePanel;
