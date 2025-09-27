import React, { useState } from 'react';
import { BarChart2, Coins, User, Briefcase, Trophy, MessageSquare, HelpCircle, Gift, Rocket } from 'lucide-react';
import IconTab from './IconTab';
import TradingMenuTab from './TradingMenuTab';
import FinanceMenuTab from './FinanceMenuTab';
import ProfileMenuTab from './ProfileMenuTab';
import MarketMenuTab from './MarketMenuTab';
import AchievementsMenuTab from './AchievementsMenuTab';
import ChatMenuTab from './ChatMenuTab';
import HelpMenuTab from './HelpMenuTab';

function LeftSidebar({ isOpen, onClose }) {
  const [openMenu, setOpenMenu] = useState(null); // Track which menu is open

  const items = [
    { icon: BarChart2, label: "Trading" },
    { icon: Coins, label: "Finance" },
    { icon: User, label: "Profile" },
    { icon: Briefcase, label: "Market" },
    { icon: Trophy, label: "Achievements" },
    { icon: MessageSquare, label: "Chat" },
    { icon: HelpCircle, label: "Help" },
  ];

  return (
    <>
      {/* Bottom-fixed sidebar on mobile, static on desktop */}
      <aside
        className={`fixed bottom-0 left-0 right-0 md:static md:top-14 md:h-[calc(100vh-3.5rem)] md:w-20 bg-[#0a0e18] border-t md:border-t-0 md:border-r border-zinc-800/50 flex flex-row md:flex-col items-center justify-around md:justify-start py-2 md:py-4 gap-2 z-50 shadow-lg h-[60px] md:h-auto md:${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className="flex flex-row md:flex-col items-center justify-around md:gap-2 w-full">
          {items.map((it, i) => (
            <IconTab
              key={i}
              icon={it.icon}
              label={it.label}
              active={openMenu === it.label}
              small={true}
              onClick={() => {
                setOpenMenu(openMenu === it.label ? null : it.label); // Toggle menu
                if (!isOpen) onClose(); // Close sidebar if needed
              }}
            />
          ))}
        </div>
        {/* Bonus and Upgrade buttons (desktop only) */}
        <div className="mt-auto w-full flex flex-col items-center gap-3 py-3 hidden md:flex">
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
      {/* Menu tabs */}
      <TradingMenuTab isOpen={openMenu === "Trading"} onClose={() => setOpenMenu(null)} />
      <FinanceMenuTab isOpen={openMenu === "Finance"} onClose={() => setOpenMenu(null)} />
      <ProfileMenuTab isOpen={openMenu === "Profile"} onClose={() => setOpenMenu(null)} />
      <MarketMenuTab isOpen={openMenu === "Market"} onClose={() => setOpenMenu(null)} />
      <AchievementsMenuTab isOpen={openMenu === "Achievements"} onClose={() => setOpenMenu(null)} />
      <ChatMenuTab isOpen={openMenu === "Chat"} onClose={() => setOpenMenu(null)} />
      <HelpMenuTab isOpen={openMenu === "Help"} onClose={() => setOpenMenu(null)} />
    </>
  );
}

export default LeftSidebar;