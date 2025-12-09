import React, { useState } from 'react';
import { Bell, Swords, Zap, Trophy, ToggleRight, Clock, X, ChevronRight } from 'lucide-react';

// --- DUMMY COMPONENTS (Taaki code error na de) ---
const SignalsWidget = () => <div className="text-zinc-400 p-4">📡 Signals Loading...</div>;
const SocialTrading = () => <div className="text-zinc-400 p-4">👥 Social Leaders...</div>;
const PendingTradesModal = () => <div className="text-zinc-400 p-4">⏰ Pending Orders...</div>;

// --- MAIN COMPONENT ---
function RightRail() {
  const [activeItem, setActiveItem] = useState(null);

  const toggleItem = (label) => {
    setActiveItem(prev => (prev === label ? null : label));
  };

  const items = [
    { icon: Bell, label: 'Signals', component: <SignalsWidget /> },
    { icon: Swords, label: 'Social', component: <SocialTrading /> },
    { icon: Clock, label: 'Pending', component: <PendingTradesModal /> },
    { icon: Zap, label: 'Express', component: <div className="p-4 text-zinc-400">⚡ Express Mode</div> },
    { icon: Trophy, label: 'Tourney', component: <div className="p-4 text-zinc-400">🏆 Tournaments</div> },
    { icon: ToggleRight, label: 'Hotkeys', component: <div className="p-4 text-zinc-400">⌨️ Hotkeys Config</div> },
  ];

  return (
    <>
      {/* ================================================= */}
      {/* 🖥️ DESKTOP VIEW (Right Sidebar) - md:flex */}
      {/* ================================================= */}
      <aside className="hidden md:h-screen md:flex w-[70px] lg:w-[80px] bg-[#1a1d28] border-l border-[#2d3748] flex-col items-center py-4 gap-4 shrink-0 h-full z-40">
        {items.map((item) => (
          <button
            key={item.label}
            onClick={() => toggleItem(item.label)}
            className={`flex flex-col items-center justify-center p-2 rounded-lg w-full transition-all group ${
              activeItem === item.label 
                ? "bg-[#2d3748] text-blue-400" 
                : "text-zinc-400 hover:bg-[#2d3748]/50 hover:text-zinc-200"
            }`}
          >
            <item.icon size={22} className="group-hover:scale-110 transition-transform" />
            <span className="text-[10px] mt-1 font-medium">{item.label}</span>
          </button>
        ))}
      </aside>

      {/* DESKTOP DRAWER (Slides from Right) */}
      <div
        className={`hidden md:block fixed top-14 right-[70px] lg:right-[80px] h-[calc(100vh-3.5rem)] w-80 bg-[#0b1120] border-l border-zinc-800 shadow-2xl transform transition-transform duration-300 ease-in-out z-30 ${
          activeItem ? 'translate-x-0' : 'translate-x-[120%]'
        }`}
      >
        {activeItem && (
          <>
            <div className="flex justify-between items-center p-4 border-b border-zinc-700/50 bg-[#0f172a]">
              <h2 className="text-white font-semibold">{activeItem}</h2>
              <button onClick={() => setActiveItem(null)} className="text-zinc-400 hover:text-white">
                <ChevronRight size={20} />
              </button>
            </div>
            <div className="overflow-y-auto h-full pb-20">
              {items.find(i => i.label === activeItem)?.component}
            </div>
          </>
        )}
      </div>


      {/* ================================================= */}
      {/* 📱 MOBILE VIEW (Bottom Bar) - md:hidden */}
      {/* ================================================= */}
      
      {/* 1. Backdrop (Jab menu khule to piche ka dhundla ho jaye) */}
      {activeItem && (
        <div 
            className="fixed inset-0 bg-black/60 z-[60] md:hidden backdrop-blur-[2px]" 
            onClick={() => setActiveItem(null)}
        />
      )}

      {/* 2. Mobile Drawer (Slides Up form Bottom) */}
      <div className={`md:hidden fixed bottom-[60px] left-0 right-0 bg-[#1a1d28] rounded-t-2xl border-t border-zinc-700 shadow-2xl z-[70] transform transition-transform duration-300 flex flex-col max-h-[60vh] ${
          activeItem ? 'translate-y-0' : 'translate-y-[150%]'
      }`}>
          {activeItem && (
            <>
              {/* Header */}
              <div className="flex justify-between items-center p-3 border-b border-zinc-700 shrink-0">
                  <h3 className="text-white font-bold text-sm tracking-wide">{activeItem}</h3>
                  <button onClick={() => setActiveItem(null)} className="p-1 bg-zinc-800 rounded-full text-zinc-400 hover:text-white">
                    <X size={16}/>
                  </button>
              </div>
              {/* Content */}
              <div className="p-4 overflow-y-auto">
                  {items.find(i => i.label === activeItem)?.component}
              </div>
            </>
          )}
      </div>

      {/* 3. Bottom Navigation Bar (Sticky Footer) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0a0e18] border-t border-zinc-800 flex justify-between items-center px-1 py-1 z-[80] safe-area-pb">
        {items.slice(0, 6).map((item) => (
          <button
            key={item.label}
            onClick={() => toggleItem(item.label)}
            className={`flex flex-col items-center justify-center py-2 flex-1 rounded-lg transition-colors active:scale-95 ${
               activeItem === item.label ? 'text-blue-400 bg-zinc-800/50' : 'text-zinc-500'
            }`}
          >
            <item.icon size={20} strokeWidth={activeItem === item.label ? 2.5 : 2} />
            {/* Mobile pe text chota rakha hai taaki kate na */}
            <span className="text-[9px] mt-0.5 font-medium leading-none">{item.label}</span>
          </button>
        ))}
      </div>

    </>
  );
}

export default RightRail;