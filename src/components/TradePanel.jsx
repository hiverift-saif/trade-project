import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, X } from 'lucide-react';
import Stat from './Stat';

function TradePanel({ asset, amount, setAmount, seconds, setSeconds, payout, onBuy, onSell, isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={onClose} />
      )}
      <div
        className={`fixed bottom-0 left-0 right-0 md:static md:w-80 bg-[#0b0f1a] border-t md:border-t-0 md:border-l border-zinc-800/50 p-4 flex flex-col shadow-lg rounded-t-lg md:rounded-none z-50 transition-transform duration-300 md:transition-none md:transform-none ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="flex items-center justify-between mb-3 md:hidden">
          <div className="text-zinc-300 font-medium text-base">Trade Panel</div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            <X size={20} />
          </button>
        </div>
        <div className="text-sm text-zinc-400 font-medium mb-1">Time</div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSeconds(Math.max(5, seconds - 5))}
            className="px-3 py-2 rounded bg-zinc-800 text-zinc-200 hover:bg-zinc-700 transition-all duration-200 font-medium"
          >
            -
          </button>
          <div className="flex-1 px-4 py-2 rounded bg-zinc-900 border border-zinc-700 text-zinc-100 text-center tracking-widest font-mono">
            {new Date(seconds * 1000).toISOString().substring(14, 19)}
          </div>
          <button
            onClick={() => setSeconds(seconds + 5)}
            className="px-3 py-2 rounded bg-zinc-800 text-zinc-200 hover:bg-zinc-700 transition-all duration-200 font-medium"
          >
            +
          </button>
        </div>

        <div className="text-sm text-zinc-400 font-medium mt-4 mb-1">Amount</div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 flex-1 px-4 py-2 rounded bg-zinc-900 border border-zinc-700 text-zinc-100">
            <DollarSign size={16} className="text-zinc-500" />
            <input
              className="bg-transparent w-full outline-none font-mono"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value || 0))}
              type="number"
              min={1}
            />
          </div>
          <button
            onClick={() => setAmount(10)}
            className="text-xs px-3 py-2 rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-all duration-200 font-medium"
          >
            $10
          </button>
          <button
            onClick={() => setAmount(50)}
            className="text-xs px-3 py-2 rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-all duration-200 font-medium"
          >
            $50
          </button>
        </div>

        <div className="mt-4">
          <Stat label="Payout" value={`${Math.round(payout * 100)}%`} accent="text-emerald-400 font-medium" />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            onClick={onBuy}
            className="h-12 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center justify-center gap-2 transition-all duration-200 shadow-md"
          >
            <TrendingUp size={18} /> BUY
          </button>
          <button
            onClick={onSell}
            className="h-12 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold flex items-center justify-center gap-2 transition-all duration-200 shadow-md"
          >
            <TrendingDown size={18} /> SELL
          </button>
        </div>
      </div>
    </>
  );
}

export default TradePanel;