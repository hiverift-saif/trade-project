import React from 'react';
import { Menu, Gift } from 'lucide-react';
import { formatMoney } from '../utils/formatMoney';

function TopBar({ balance, onTopUp, onToggleTradeMobile, onToggleLeftSidebar, onToggleRightRail }) {
  return (
    <header className="h-14 bg-[#0a0e18] border-b border-zinc-800/50 flex items-center justify-between px-4 shadow-md z-50">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleLeftSidebar}
          className="md:hidden text-zinc-400 hover:text-white transition-all duration-200"
        >
          <Menu size={20} />
        </button>
        <div className="text-white font-bold tracking-wide text-lg">TradeX</div>
        <span className="text-zinc-500 text-sm">Demo</span>
      </div>
      <div className="flex items-center gap-3">
        <button className="px-3 py-1 rounded-lg bg-sky-600/20 text-sky-300 text-sm hover:bg-sky-600/30 flex items-center gap-2 transition-all duration-200">
          <Gift size={16} />
          <span className="hidden sm:inline">Get 50% Bonus</span>
        </button>
        <div className="px-3 py-1 rounded-lg bg-zinc-800 text-zinc-200 text-sm font-medium">
          ${formatMoney(balance)} <span className="text-zinc-400 ml-1">USD</span>
        </div>
        <button
          onClick={onTopUp}
          className="px-3 py-1 rounded-lg bg-emerald-600 text-white text-sm hover:bg-emerald-500 transition-all duration-200 font-medium"
        >
          TOP UP
        </button>
        <button
          onClick={onToggleTradeMobile}
          className="md:hidden px-2 py-1 rounded bg-zinc-800 text-zinc-200 hover:bg-zinc-700 transition-all duration-200"
        >
          Trade
        </button>
        <button
          onClick={onToggleRightRail}
          className="md:hidden px-2 py-1 rounded bg-zinc-800 text-zinc-200 hover:bg-zinc-700 transition-all duration-200"
        >
          <Menu size={20} />
        </button>
      </div>
    </header>
  );
}

export default TopBar;