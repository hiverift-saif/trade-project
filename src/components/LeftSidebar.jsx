import React from 'react';
import { BarChart2, Coins, User, Briefcase, Trophy, MessageSquare, HelpCircle, Gift, Rocket, X } from 'lucide-react';
import IconTab from './IconTab';
import TradingMenuTab from './TradingMenuTab';
import FinanceMenuTab from './FinanceMenuTab';
import ProfileMenuTab from './ProfileMenuTab';
import MarketMenuTab from './MarketMenuTab';
import AchievementsMenuTab from './AchievementsMenuTab';
import ChatMenuTab from './ChatMenuTab';
import HelpMenuTab from './HelpMenuTab';

function LeftSidebar({ isOpen, onClose, activeMenu, setActiveMenu }) {
  const items = [
    { icon: BarChart2, label: "Trading", active: true },
    { icon: Coins, label: "Finance" },
    { icon: User, label: "Profile" },
    { icon: Briefcase, label: "Market" },
    { icon: Trophy, label: "Achievements" },
    { icon: MessageSquare, label: "Chat" },
    { icon: HelpCircle, label: "Help" },
  ];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed top-14 left-0 h-[calc(100vh-3.5rem)] w-64 md:w-20 md:static bg-[#0a0e18] border-r border-zinc-800/50 flex flex-col items-center py-4 gap-2 z-50 shadow-lg transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-between px-4 mb-4 md:hidden">
          <div className="text-white font-bold text-lg">Menu</div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            <X size={20} />
          </button>
        </div>
        <div className="flex flex-col items-center gap-2 w-full">
          {items.map((it, i) => (
            <IconTab
              key={i}
              icon={it.icon}
              label={it.label}
              active={it.active}
              onClick={() => {
                if (activeMenu === it.label) {
                  setActiveMenu(null); // Close if already open
                } else {
                  setActiveMenu(it.label); // Open new menu, closing others
                }
              }}
            />
          ))}
        </div>
        <div className="mt-auto w-full flex flex-col items-center gap-3 py-3">
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 text-xs w-16 justify-center transition-all duration-200 md:w-full md:justify-start md:px-4">
            <Gift size={16} />
            <span className="md:inline hidden">Bonus</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 text-xs w-16 justify-center transition-all duration-200 md:w-full md:justify-start md:px-4">
            <Rocket size={16} />
            <span className="md:inline hidden">Upgrade</span>
          </button>
        </div>
      </aside>
      <TradingMenuTab isOpen={activeMenu === "Trading"} onClose={() => setActiveMenu(null)} />
      <FinanceMenuTab isOpen={activeMenu === "Finance"} onClose={() => setActiveMenu(null)} />
      <ProfileMenuTab isOpen={activeMenu === "Profile"} onClose={() => setActiveMenu(null)} />
      <MarketMenuTab isOpen={activeMenu === "Market"} onClose={() => setActiveMenu(null)} />
      <AchievementsMenuTab isOpen={activeMenu === "Achievements"} onClose={() => setActiveMenu(null)} />
      <ChatMenuTab isOpen={activeMenu === "Chat"} onClose={() => setActiveMenu(null)} />
      <HelpMenuTab isOpen={activeMenu === "Help"} onClose={() => setActiveMenu(null)} />
    </>
  );
}

export default LeftSidebar;