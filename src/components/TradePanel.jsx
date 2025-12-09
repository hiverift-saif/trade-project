import React, { useState, useEffect } from "react";
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
  // Removed Lock Icon Import
} from "lucide-react";

const TradePanel = ({
  selectedAsset,
  amount,
  setAmount,
  seconds,
  setSeconds,
  onBuy,
  onSell,
  balance,
  setBalance,
  livePrice,
  onAddMarker,
}) => {
  const [showCalc, setShowCalc] = useState(false);
  const [showTimeMenu, setShowTimeMenu] = useState(false);
  const [multiplier, setMultiplier] = useState(2);
  const [expiryDisplay, setExpiryDisplay] = useState("Loading...");
  
  // Profit Calculation
  const rawPayout = selectedAsset?.payout || "82%";
  const payoutString = String(rawPayout); 
  const payoutRate = parseFloat(payoutString.replace(/[^0-9.]/g, '')) || 82;
  const potentialProfit = (Number(amount) * payoutRate) / 100;

  // Live Timer (Without Lock Logic)
  useEffect(() => {
    const updateClock = () => {
      const now = Date.now();
      const expiryTimestamp = now + (Number(seconds) * 1000);
      const date = new Date(expiryTimestamp);
      const timeStr = date.toLocaleTimeString('en-US', {
        hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit"
      });
      setExpiryDisplay(timeStr);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  const formatTime = (totalSeconds) => {
    if (!totalSeconds || totalSeconds <= 0) return "00:00";
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${secs}s`;
    return `${secs}s`;
  };

  const handleBuy = async () => {
    if (!livePrice) return;
    const amt = Number(amount);
    const sec = Number(seconds);
    const expiryTs = Date.now() + sec * 1000;
    
    const payload = {
      id: Date.now(), type: "buy", asset: selectedAsset, amount: amt,
      entryPrice: livePrice, seconds: sec, expiryTime: new Date(expiryTs).toISOString(),
      status: "open", payout: payoutRate,
    };
    onBuy?.(payload);
    setBalance((b) => b - amt);
    onAddMarker?.({ price: livePrice, amount: amt, side: "buy", time: Date.now(), seconds: sec });
    try { await buyTrade(payload); } catch (e) { console.error(e); }
  };

  const handleSell = async () => {
    if (!livePrice) return;
    const amt = Number(amount);
    const sec = Number(seconds);
    const expiryTs = Date.now() + sec * 1000;

    const payload = {
      id: Date.now(), type: "sell", asset: selectedAsset, amount: amt,
      entryPrice: livePrice, seconds: sec, expiryTime: new Date(expiryTs).toISOString(),
      status: "open", payout: payoutRate,
    };
    onSell?.(payload);
    setBalance((b) => b - amt);
    onAddMarker?.({ price: livePrice, amount: amt, side: "sell", time: Date.now(), seconds: sec });
    try { await sellTrade(payload); } catch (e) { console.error(e); }
  };

  return (
    // Compact Padding for Mobile (p-3)
    <div className="relative bg-[#050713] border border-[#1a2233] p-3 sm:p-5 rounded-xl sm:rounded-2xl shadow-lg flex flex-col gap-2 sm:gap-4 z-20">
      
      {/* INPUTS ROW */}
      <div className="flex flex-row items-end justify-between gap-2 sm:gap-3">
        
        {/* --- AMOUNT INPUT --- */}
        <div className="flex-1 min-w-[100px] relative">
            <div className="flex justify-between items-center mb-1">
               <label className="text-gray-400 text-[10px] sm:text-xs font-medium">Amount</label>
               <span className="text-[9px] sm:text-[10px] text-green-400 font-bold bg-green-400/10 px-1 py-0.5 rounded">+{potentialProfit.toFixed(0)}$</span>
            </div>
            {/* Reduced height & padding for mobile */}
            <div onClick={() => { setShowCalc(!showCalc); setShowTimeMenu(false); }} className="bg-[#1e2330] hover:bg-[#252a3d] border border-gray-700 hover:border-gray-500 text-white px-2 sm:px-3 py-1.5 sm:py-2.5 rounded-lg cursor-pointer flex justify-between items-center transition-all group h-9 sm:h-auto">
              <span className="font-bold text-sm sm:text-lg">${amount}</span>
              <Calculator size={14} className="text-gray-500 group-hover:text-white transition-colors sm:w-4 sm:h-4" />
            </div>

            {/* CALCULATOR POPUP */}
            {showCalc && (
               <>
                <div className="fixed inset-0 bg-black/60 z-[9990] sm:hidden" onClick={() => setShowCalc(false)}></div>
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-[280px] z-[9999] bg-[#0b1120] border border-slate-700 rounded-xl p-4 shadow-2xl sm:absolute sm:top-[110%] sm:left-0 sm:translate-x-0 sm:translate-y-0 sm:w-64">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-slate-400">Calculator</span>
                    <button onClick={() => setShowCalc(false)}><X size={14} className="text-white" /></button>
                  </div>
                  <div className="text-center mb-2"><span className="text-[10px] text-slate-500">Balance: ${Number(balance).toLocaleString()}</span></div>
                  <div className="text-center mb-3"><div className="text-xl sm:text-2xl font-bold text-white tracking-wide">${Number(amount || 0).toLocaleString()}</div></div>
                  
                  {/* Multipliers */}
                  <div className="flex items-center justify-end gap-2 mb-3">
                    <button onClick={() => { const num = parseFloat(amount) || 0; setAmount(String((num / multiplier).toFixed(2))); }} className="w-7 h-7 bg-slate-700/60 rounded flex items-center justify-center text-xs text-slate-300">÷</button>
                    <div className="bg-slate-700/50 rounded-lg px-2 py-1 flex items-center gap-1">
                      <button onClick={() => setMultiplier(Math.max(1, multiplier - 1))} className="text-slate-400 hover:text-white"><Minus className="w-3 h-3" /></button>
                      <span className="text-white font-semibold text-sm min-w-[16px] text-center">{multiplier}</span>
                      <button onClick={() => setMultiplier(multiplier + 1)} className="text-slate-400 hover:text-white"><Plus className="w-3 h-3" /></button>
                    </div>
                    <button onClick={() => { const num = parseFloat(amount) || 0; setAmount(String((num * multiplier).toFixed(2))); }} className="w-7 h-7 bg-slate-700/60 rounded flex items-center justify-center text-xs text-slate-300">×</button>
                  </div>

                  <div className="grid grid-cols-4 gap-1.5 mb-2">
                    {[10, 50, 100].map((v, i) => (<button key={i} onClick={() => setAmount(String(v))} className="px-1.5 py-1 bg-slate-700/40 hover:bg-slate-600/40 rounded text-[11px] text-slate-300">${v}</button>))}
                    <button onClick={() => setAmount(String(balance))} className="px-1.5 py-1 bg-blue-600/80 hover:bg-blue-500 rounded text-[11px] text-white">MAX</button>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 mb-2">
                    {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((n) => (<button key={n} onClick={() => setAmount(String(amount + n))} className="h-9 bg-slate-800/40 hover:bg-slate-700/40 rounded text-slate-200 text-sm">{n}</button>))}
                    <button onClick={() => setAmount((p) => (p.includes(".") ? p : p + "."))} className="h-9 bg-slate-800/40 hover:bg-slate-700/40 rounded text-slate-200 text-lg">.</button>
                    <button onClick={() => setAmount(String(amount + "0"))} className="h-9 bg-slate-800/40 hover:bg-slate-700/40 rounded text-slate-200 text-sm">0</button>
                    <button onClick={() => setAmount((p) => (p.length > 1 ? p.slice(0, -1) : "0"))} className="h-9 bg-slate-800/40 hover:bg-slate-700/40 rounded text-slate-300 flex items-center justify-center"><Delete className="w-4 h-4" /></button>
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => setShowCalc(false)} className="w-full bg-blue-500 hover:bg-blue-600 rounded text-white text-xs py-2">Done</button>
                  </div>
                </div>
               </>
            )}
        </div>

        {/* --- TIME INPUT --- */}
        <div className="flex-1 min-w-[100px] relative">
            <div className="flex justify-between items-center mb-1">
               <label className="text-gray-400 text-[10px] sm:text-xs font-medium">Time</label>
               <span className="text-[9px] sm:text-[10px] font-mono text-gray-400">{expiryDisplay}</span>
            </div>
            
            <div onClick={() => { setShowTimeMenu(!showTimeMenu); setShowCalc(false); }} className="bg-[#1e2330] hover:bg-[#252a3d] border border-gray-700 hover:border-gray-500 text-white px-2 sm:px-3 py-1.5 sm:py-2.5 rounded-lg cursor-pointer flex justify-between items-center transition-all group h-9 sm:h-auto">
              <span className="font-bold text-sm sm:text-lg">{formatTime(seconds)}</span>
              <Clock size={14} className="text-gray-500 group-hover:text-white transition-colors sm:w-4 sm:h-4" />
            </div>

            {/* TIME MENU POPUP */}
            {showTimeMenu && (
               <>
                <div className="fixed inset-0 bg-black/60 z-[9990] sm:hidden" onClick={() => setShowTimeMenu(false)}></div>
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-[280px] z-[9999] bg-[#0b1120] border border-slate-700 rounded-xl p-4 shadow-2xl sm:absolute sm:top-[110%] sm:right-0 sm:left-auto sm:translate-x-0 sm:translate-y-0 sm:w-64">
                   <div className="flex justify-between items-center mb-3">
                       <span className="text-xs text-gray-400">Duration</span>
                       <button onClick={() => setShowTimeMenu(false)}><X size={16} className="text-gray-400 hover:text-white"/></button>
                   </div>

                   <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="flex flex-col items-center gap-1">
                            <button onClick={() => setSeconds(s => s + 60)} className="bg-slate-800 p-1 rounded hover:bg-slate-700"><Plus size={14} className="text-white"/></button>
                            <span className="text-white font-bold">{Math.floor(seconds/60).toString().padStart(2,'0')}</span>
                            <button onClick={() => setSeconds(s => Math.max(60, s - 60))} className="bg-slate-800 p-1 rounded hover:bg-slate-700"><Minus size={14} className="text-white"/></button>
                            <span className="text-[10px] text-gray-500">Min</span>
                        </div>
                        <span className="text-white">:</span>
                        <div className="flex flex-col items-center gap-1">
                            <button onClick={() => setSeconds(s => s + 1)} className="bg-slate-800 p-1 rounded hover:bg-slate-700"><Plus size={14} className="text-white"/></button>
                            <span className="text-white font-bold">{(seconds%60).toString().padStart(2,'0')}</span>
                            <button onClick={() => setSeconds(s => Math.max(0, s - 1))} className="bg-slate-800 p-1 rounded hover:bg-slate-700"><Minus size={14} className="text-white"/></button>
                            <span className="text-[10px] text-gray-500">Sec</span>
                        </div>
                   </div>

                   <div className="grid grid-cols-3 gap-2">
                       {[60, 120, 180, 300, 900].map(s => (
                           <button key={s} onClick={() => { setSeconds(s); setShowTimeMenu(false); }} className={`py-2 rounded text-sm font-medium transition-colors ${seconds === s ? "bg-blue-600 text-white" : "bg-slate-800 text-gray-300 hover:bg-slate-700"}`}>{Math.floor(s/60)}m</button>
                       ))}
                   </div>
               </div>
               </>
            )}
        </div>
      </div>

      {/* INFO BAR */}
      <div className="flex justify-between items-center bg-gray-800/30 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-gray-700/50">
          <span className="text-[10px] sm:text-xs text-gray-400">Payout</span>
          <span className="text-xs sm:text-sm font-bold text-green-400">{payoutRate}%</span>
      </div>

      {/* BUTTONS (Always Active) */}
      <div className="relative">
        <div className="flex gap-2 sm:gap-3 transition-all duration-300">
          <button onClick={handleBuy} className="flex-1 bg-gradient-to-b from-[#22c55e] to-[#16a34a] hover:from-[#16a34a] hover:to-[#15803d] text-white py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold shadow-lg shadow-green-900/20 active:scale-[0.98] transition-all flex flex-col items-center justify-center leading-tight border-t border-green-400/20">
            <div className="flex items-center gap-1"><TrendingUp size={16} className="sm:w-5 sm:h-5" /><span className="text-sm sm:text-lg">Buy</span></div>
            <span className="text-[9px] sm:text-[10px] opacity-80 font-medium tracking-wide">HIGHER</span>
          </button>

          <button onClick={handleSell} className="flex-1 bg-gradient-to-b from-[#ef4444] to-[#dc2626] hover:from-[#dc2626] hover:to-[#b91c1c] text-white py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold shadow-lg shadow-red-900/20 active:scale-[0.98] transition-all flex flex-col items-center justify-center leading-tight border-t border-red-400/20">
            <div className="flex items-center gap-1"><TrendingDown size={16} className="sm:w-5 sm:h-5" /><span className="text-sm sm:text-lg">Sell</span></div>
            <span className="text-[9px] sm:text-[10px] opacity-80 font-medium tracking-wide">LOWER</span>
          </button>
        </div>
      </div>

    </div>
  );
};

export default TradePanel;