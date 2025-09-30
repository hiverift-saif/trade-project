import React from 'react';
import { Menu, Gift } from 'lucide-react';
import { formatMoney } from '../utils/formatMoney';

function TopBar({ balance, onTopUp, onToggleTradeMobile, onToggleLeftSidebar, onToggleRightRail }) {
  return (
    <header className="h-14 bg-[#0a0e18] border-b border-zinc-800/50 flex items-center justify-between px-4 shadow-md z-50 relative">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleLeftSidebar}
          className="md:hidden text-zinc-400 hover:text-white transition-all duration-200"
        >
          <Menu size={20} />
        </button>

{/* Logo */}
< div className=" items-center hidden md:flex">
  <div className="flex-shrink-0 flex items-center">
    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-md flex items-center justify-center mr-2">
      <span className="text-white font-bold">TP</span>
    </div>
    <span className="text-xl font-semibold text-white">Trade Pro</span>
  </div>
</div>

      </div>
      <div className="flex items-center gap-2">
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
          className="md:hidden px-3 py-2 rounded bg-zinc-800 text-zinc-200 hover:bg-zinc-700 transition-all duration-200"
        >
          Trade
        </button>
        {/* <button
          onClick={onToggleRightRail}
          className="md:hidden px-3 py-2 rounded bg-zinc-800 text-zinc-200 hover:bg-zinc-700 transition-all duration-200"
        >
          <Menu size={20} />
        </button> */}
      </div>
    </header>
  );
}

export default TopBar;