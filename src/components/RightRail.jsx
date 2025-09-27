import React from 'react';
import { Bell, Swords, Zap, Trophy, ToggleRight, X } from 'lucide-react';
import IconTab from './IconTab';

function RightRail({ isOpen, onClose }) {
  const items = [
    { icon: Bell, label: "Signals" },
    { icon: Swords, label: "Social" },
    { icon: Zap, label: "Express" },
    { icon: Trophy, label: "Tournaments" },
    { icon: ToggleRight, label: "Hotkeys" },
  ];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed top-14 right-0 h-[calc(100vh-3.5rem)] w-64 md:w-24 md:static bg-[#0a0e18] border-l border-zinc-800/50 flex flex-col items-center py-4 gap-2 z-50 shadow-lg transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } md:translate-x-0  hidden md:flex`}
      >
        <div className="flex items-center justify-between px-4 mb-4 md:hidden">
          <div className="text-white font-bold text-lg">Tools</div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            <X size={20} />
          </button>
        </div>
        <div className="flex flex-col items-center gap-2 w-full">
          {items.map((it, i) => (
            <IconTab key={i} icon={it.icon} label={it.label} onClick={() => {}} />
          ))}
        </div>
        <div className="mt-auto text-zinc-400 text-[11px] font-medium">Full screen</div>
      </aside>
    </>
  );
}

export default RightRail;