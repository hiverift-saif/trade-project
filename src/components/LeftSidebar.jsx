import React from 'react';
import { BarChart2, Coins, User, Briefcase, Trophy, MessageSquare, HelpCircle, Gift, Rocket, X, GraduationCap, FileText, Activity, Globe, DollarSign, Lock, ChevronRight } from 'lucide-react';
import IconTab from './IconTab';

function LeftSidebar({ isOpen, onClose, activeMenu, setActiveMenu, setShowLeftSidebar }) {
  const items = [
    { icon: BarChart2, label: "Trading", active: false }, // Removed initial active: true
    { icon: Coins, label: "Finance" },
    { icon: User, label: "Profile" },
    { icon: Briefcase, label: "Market" },
    { icon: Trophy, label: "Achievements" },
    { icon: MessageSquare, label: "Chat" },
    { icon: HelpCircle, label: "Help" },
  ];

  // Trading Menu Content
  const renderTradingMenu = () => (
    <div className={`fixed top-14 left-0 h-[calc(100vh-3.5rem)] w-64 bg-[#0a0e18] border-r border-zinc-800/50 p-0 shadow-lg transition-transform duration-300 overflow-y-auto z-60 ${isOpen && activeMenu === "Trading" ? 'translate-x-0' : '-translate-x-full'} md:static md:w-80 md:flex md:flex-col md:${activeMenu === "Trading" ? 'block' : 'hidden'}`}>
      <div className="flex items-center justify-between mb-4 px-4 pt-4 md:hidden">
        <div className="text-white font-bold text-lg">Trading Options</div>
        <button onClick={() => setActiveMenu(null)} className="text-zinc-400 hover:text-white">
          <X size={20} />
        </button>
      </div>
      <ul className="flex flex-col h-full gap-5">
        {[
          { icon: Coins, label: "Quick Trading Real Account", active: false },
          { icon: GraduationCap, label: "Quick Trading Demo Account", active: true },
          { icon: FileText, label: "Shares Trading Real Account", active: false },
          { icon: FileText, label: "Shares Trading Demo Account", active: false },
          { icon: Activity, label: "Forex MT4 Real Account", active: false },
          { icon: Activity, label: "Forex MT4 Demo Account", active: false },
          { icon: Globe, label: "Forex MT5 Real Account", active: false },
          { icon: Globe, label: "Forex MT5 Demo Account", active: false },
   ].map((item, index) => (
  <li key={index}>
    <div
      className={`flex items-center gap-3 px-4 py-3 text-zinc-200 hover:bg-indigo-900/50 transition-all duration-200 border border-zinc-800 rounded ${
        item.active ? 'text-white' : 'bg-[#0a0e18]'
      }`}
    >
      <item.icon size={20} className="text-blue-300" />
      <span className="flex-1">{item.label}</span>
      {item.active && <ChevronRight size={16} className="text-white" />}
    </div>
  </li>
))}

      </ul>
    </div>
  );

  // Finance Menu Content
  const renderFinanceMenu = () => (
    <div className={`fixed top-14 left-0 h-[calc(100vh-3.5rem)] w-64 bg-[#0a0e18] border-r border-zinc-800/50 p-0 shadow-lg transition-transform duration-300 overflow-y-auto z-60 ${isOpen && activeMenu === "Finance" ? 'translate-x-0' : '-translate-x-full'} md:static md:w-80 md:flex md:flex-col md:${activeMenu === "Finance" ? 'block' : 'hidden'}`}>
      <div className="flex items-center justify-between mb-4 px-4 pt-4 md:hidden">
        <div className="text-white font-bold text-lg">Finance Options</div>
        <button onClick={() => setActiveMenu(null)} className="text-zinc-400 hover:text-white">
          <X size={20} />
        </button>
      </div>
      <ul className="flex flex-col h-full">
        {[
          { icon: Coins, label: "Bank Accounts", active: false },
          { icon: DollarSign, label: "Investments", active: true },

    ].map((item, index) => (
  <li key={index}>
    <div
      className={`flex items-center gap-3 px-4 py-3 text-zinc-200 hover:bg-indigo-900/50 transition-all duration-200 border border-zinc-800 rounded ${
        item.active ? 'text-white' : 'bg-[#0a0e18]'
      }`}
    >
      <item.icon size={20} className="text-blue-300" />
      <span className="flex-1">{item.label}</span>
      {item.active && <ChevronRight size={16} className="text-white" />}
    </div>
  </li>
))}



      </ul>
    </div>
  );

  // Profile Menu Content
  const renderProfileMenu = () => (
    <div className={`fixed top-14 left-0 h-[calc(100vh-3.5rem)] w-64 bg-[#0a0e18] border-r border-zinc-800/50 p-0 shadow-lg transition-transform duration-300 overflow-y-auto z-60 ${isOpen && activeMenu === "Profile" ? 'translate-x-0' : '-translate-x-full'} md:static md:w-80 md:flex md:flex-col md:${activeMenu === "Profile" ? 'block' : 'hidden'}`}>
      <div className="flex items-center justify-between mb-4 px-4 pt-4 md:hidden">
        <div className="text-white font-bold text-lg">Profile Options</div>
        <button onClick={() => setActiveMenu(null)} className="text-zinc-400 hover:text-white">
          <X size={20} />
        </button>
      </div>
      <ul className="flex flex-col h-full">
        {[
          { icon: User, label: "Edit Profile", active: true },
          { icon: Lock, label: "Change Password", active: false },
  ].map((item, index) => (
  <li key={index}>
    <div
      className={`flex items-center gap-3 px-4 py-3 text-zinc-200 hover:bg-indigo-900/50 transition-all duration-200 border border-zinc-800/50 rounded ${
        item.active ? 'text-white' : 'bg-[#0a0e18]'
      }`}
    >
      <item.icon size={20} className="text-blue-300" />
      <span className="flex-1">{item.label}</span>
      {item.active && <ChevronRight size={16} className="text-white" />}
    </div>
  </li>
))}

      </ul>
    </div>
  );

  // Market Menu Content
  const renderMarketMenu = () => (
    <div className={`fixed top-14 left-0 h-[calc(100vh-3.5rem)] w-64 bg-[#0a0e18] border-r border-zinc-800/50 p-0 shadow-lg transition-transform duration-300 overflow-y-auto z-60 ${isOpen && activeMenu === "Market" ? 'translate-x-0' : '-translate-x-full'} md:static md:w-80 md:flex md:flex-col md:${activeMenu === "Market" ? 'block' : 'hidden'}`}>
      <div className="flex items-center justify-between mb-4 px-4 pt-4 md:hidden">
        <div className="text-white font-bold text-lg">Market Options</div>
        <button onClick={() => setActiveMenu(null)} className="text-zinc-400 hover:text-white">
          <X size={20} />
        </button>
      </div>
      <ul className="flex flex-col h-full">
        {[
          { icon: Briefcase, label: "Stock Market", active: false },
          { icon: Globe, label: "Forex Market", active: true },
 ].map((item, index) => (
  <li key={index}>
    <div
      className={`flex items-center gap-3 px-4 py-3 text-zinc-200 hover:bg-indigo-900/50 transition-all duration-200 border border-zinc-800/50 rounded ${
        item.active ? 'text-white' : 'bg-[#0a0e18]'
      }`}
    >
      <item.icon size={20} className="text-blue-300" />
      <span className="flex-1">{item.label}</span>
      {item.active && <ChevronRight size={16} className="text-white" />}
    </div>
  </li>
))}

      </ul>
    </div>
  );

  // Achievements Menu Content
  const renderAchievementsMenu = () => (
    <div className={`fixed top-14 left-0 h-[calc(100vh-3.5rem)] w-64 bg-[#0a0e18] border-r border-zinc-800/50 p-0 shadow-lg transition-transform duration-300 overflow-y-auto z-60 ${isOpen && activeMenu === "Achievements" ? 'translate-x-0' : '-translate-x-full'} md:static md:w-80 md:flex md:flex-col md:${activeMenu === "Achievements" ? 'block' : 'hidden'}`}>
      <div className="flex items-center justify-between mb-4 px-4 pt-4 md:hidden">
        <div className="text-white font-bold text-lg">Achievements</div>
        <button onClick={() => setActiveMenu(null)} className="text-zinc-400 hover:text-white">
          <X size={20} />
        </button>
      </div>
      <ul className="flex flex-col h-full">
        {[
          { icon: Trophy, label: "Level 1", active: true },
          { icon: Trophy, label: "Level 2", active: false },
   ].map((item, index) => (
  <li key={index}>
    <div
      className={`flex items-center gap-3 px-4 py-3 text-zinc-200 hover:bg-indigo-900/50 transition-all duration-200 border border-zinc-800/50 rounded ${
        item.active ? 'text-white' : 'bg-[#0a0e18]'
      }`}
    >
      <item.icon size={20} className="text-blue-300" />
      <span className="flex-1">{item.label}</span>
      {item.active && <ChevronRight size={16} className="text-white" />}
    </div>
  </li>
))}

      </ul>
    </div>
  );

  // Chat Menu Content
  const renderChatMenu = () => (
    <div className={`fixed top-14 left-0 h-[calc(100vh-3.5rem)] w-64 bg-[#0a0e18] border-r border-zinc-800/50 p-0 shadow-lg transition-transform duration-300 overflow-y-auto z-60 ${isOpen && activeMenu === "Chat" ? 'translate-x-0' : '-translate-x-full'} md:static md:w-80 md:flex md:flex-col md:${activeMenu === "Chat" ? 'block' : 'hidden'}`}>
      <div className="flex items-center justify-between mb-4 px-4 pt-4 md:hidden">
        <div className="text-white font-bold text-lg">Chat Options</div>
        <button onClick={() => setActiveMenu(null)} className="text-zinc-400 hover:text-white">
          <X size={20} />
        </button>
      </div>
      <ul className="flex flex-col h-full">
        {[
          { icon: MessageSquare, label: "Messages", active: true },
          { icon: MessageSquare, label: "Groups", active: false },
        ].map((item, index) => (
          <li key={index}>
            <div
              className={`flex items-center gap-3 px-4 py-3 text-zinc-200 hover:bg-indigo-900/50 transition-all duration-200 ${
                item.active ? ' text-white' : 'bg-[#0a0e18]'
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
  );

  // Help Menu Content
  const renderHelpMenu = () => (
    <div className={`fixed top-14 left-0 h-[calc(100vh-3.5rem)] w-64 bg-[#0a0e18] border-r border-zinc-800/50 p-0 shadow-lg transition-transform duration-300 overflow-y-auto z-60 ${isOpen && activeMenu === "Help" ? 'translate-x-0' : '-translate-x-full'} md:static md:w-80 md:flex md:flex-col md:${activeMenu === "Help" ? 'block' : 'hidden'}`}>
      <div className="flex items-center justify-between mb-4 px-4 pt-4 md:hidden">
        <div className="text-white font-bold text-lg">Help Options</div>
        <button onClick={() => setActiveMenu(null)} className="text-zinc-400 hover:text-white">
          <X size={20} />
        </button>
      </div>
      <ul className="flex flex-col h-full">
        {[
          { icon: HelpCircle, label: "FAQ", active: true },
          { icon: HelpCircle, label: "Support", active: false },


        ].map((item, index) => (
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
  );

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-60 md:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed top-14 left-0 h-[calc(100vh-3.5rem)] ${isOpen ? '10' : 'w-30'} bg-[#0a0e18] border-r border-zinc-800/50 flex flex-col items-center py-4 gap-2 z-60 shadow-lg transition-all duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:static md:${isOpen ? 'w-20' : 'w-20'} md:translate-x-0`}
      >
        <div className="flex items-center justify-between px-4 mb-4 w-full ${isOpen ? 'block' : 'hidden'}">
          <div className="text-white font-bold text-lg">Menu</div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white md:hidden">
            <X size={20} />
          </button>
        </div>

        
        <div className="flex flex-col items-center gap-2 w-full overflow-y-auto h-full">
          {items.map((it, i) => (
            <IconTab
              key={i}
              icon={it.icon}
              label={it.label}
              active={activeMenu === it.label}
              onClick={() => {
                if (activeMenu === it.label) {
                  setActiveMenu(null); // Close the current menu
                } else {
                  setActiveMenu(it.label); // Open the clicked menu
                  if (setShowLeftSidebar && isOpen) {
                    // Keep sidebar open on mobile if already open
                  } else if (setShowLeftSidebar) {
                    setShowLeftSidebar(true); // Open sidebar on mobile
                  }
                }
              }}
            />
          ))}
        </div>
        <div className="mt-auto w-full flex flex-col items-center gap-3 py-3">
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 text-xs w-full justify-start px-4 transition-all duration-200">
            <Gift size={16} />
            <span className={`${isOpen ? 'inline' : 'hidden'}`}>Bonus</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-indigo-300 text-xs w-full justify-start px-4 transition-all duration-200">
            <Rocket size={16} />
            <span className={`${isOpen ? 'inline' : 'hidden'}`}>Upgrade</span>
          </button>
        </div>
      </aside>

      {/* Render the appropriate menu based on activeMenu */}
      {activeMenu === "Trading" && renderTradingMenu()}
      {activeMenu === "Finance" && renderFinanceMenu()}
      {activeMenu === "Profile" && renderProfileMenu()}
      {activeMenu === "Market" && renderMarketMenu()}
      {activeMenu === "Achievements" && renderAchievementsMenu()}
      {activeMenu === "Chat" && renderChatMenu()}
      {activeMenu === "Help" && renderHelpMenu()}
    </>
  );
}

export default LeftSidebar;