import React from 'react';
import { Coins, GraduationCap, FileText, Activity, Globe, ChevronRight, X } from 'lucide-react';

function TradingMenuTab({ isOpen, onClose }) {
  const menuItems = [
    { icon: Coins, label: "Quick Trading Real Account", active: false },
    { icon: GraduationCap, label: "Quick Trading Demo Account", active: true },
    { icon: FileText, label: "Shares Trading Real Account", active: false },
    { icon: FileText, label: "Shares Trading Demo Account", active: false },
    { icon: Activity, label: "Forex MT4 Real Account", active: false },
    { icon: Activity, label: "Forex MT4 Demo Account", active: false },
    { icon: Globe, label: "Forex MT5 Real Account", active: false },
    { icon: Globe, label: "Forex MT5 Demo Account", active: false },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-60 md:hidden"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed top-14 left-0 h-[calc(100vh-3.5rem)] w-64 bg-[#0a0e18] border-r border-zinc-800/50 p-0 shadow-lg transition-transform duration-300 md:w-80 md:static md:flex md:flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:${isOpen ? 'block' : 'hidden'} overflow-y-auto z-60`}
      >
        <div className="flex items-center justify-between mb-4 px-4 pt-4 md:hidden">
          <div className="text-white font-bold text-lg">Trading Options</div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            <X size={20} />
          </button>
        </div>
        <ul className="flex flex-col h-full">
          {menuItems.map((item, index) => (
            <li key={index}>
              <div
                className={`flex items-center gap-3 px-4 py-3 text-zinc-200 hover:bg-indigo-900/50 transition-all duration-200 ${
                  item.active ? 'bg-blue-600 text-white' : 'bg-[#0a0e18]'
                } border-b border-zinc-800/50 last:border-b-0`}
              >
                <item.icon size={20} className="text-blue-300" />
                <span className="flex-1">{item.label}</span>
                {item.active && <ChevronRight size={16} className="text-white" />}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default TradingMenuTab;