// RightRail.jsx - Updated to open modals like LeftSidebar sub-menus (internal state + inline rendering)
import React, { useState, useCallback } from 'react';
import { Bell, Swords, Zap, Trophy, ToggleRight, Clock, X } from 'lucide-react';
import IconTab from './IconTab';
import SignalsWidget from './SignalsWidget'; // Assume this exists, or inline if needed
import SocialTrading from './SocialTradingModal'; // Assume this exists
import PendingTradesModal from './PendingTradesModal'; // From previous code

function RightRail({ isOpen, onClose }) {
  const [activeRailItem, setActiveRailItem] = useState(null); // Like activeMenu in LeftSidebar

  const handleSignalsClick = useCallback(() => {
    setActiveRailItem(activeRailItem === 'Signals' ? null : 'Signals');
    console.log('Signals clicked');
  }, [activeRailItem]);

  const handleSocialClick = useCallback(() => {
    setActiveRailItem(activeRailItem === 'Social' ? null : 'Social');
    console.log('Social clicked');
  }, [activeRailItem]);

  const handlePendingTradesClick = useCallback(() => {
    setActiveRailItem(activeRailItem === 'Pending Trades' ? null : 'Pending Trades');
    console.log('Pending Trades clicked');
  }, [activeRailItem]);

  const handleExpressClick = useCallback(() => {
    alert('Express feature is activated!');
    console.log('Express clicked');
  }, []);

  const handleTournamentsClick = useCallback(() => {
    alert('Tournaments feature is activated!');
    console.log('Tournaments clicked');
  }, []);

  const handleHotkeysClick = useCallback(() => {
    alert('Hotkeys feature is activated!');
    console.log('Hotkeys clicked');
  }, []);

  const items = [
    { icon: Bell, label: 'Signals', onClick: handleSignalsClick },
    { icon: Swords, label: 'Social', onClick: handleSocialClick },
    { icon: Zap, label: 'Express', onClick: handleExpressClick },
    { icon: Trophy, label: 'Tournaments', onClick: handleTournamentsClick },
    { icon: ToggleRight, label: 'Hotkeys', onClick: handleHotkeysClick },
    { icon: Clock, label: 'Pending Trades', onClick: handlePendingTradesClick },
  ];

  const renderRailSubPanel = (item) => {
    if (item === 'Signals') {
      return (
        <div
          className={`fixed top-14 right-0 h-[calc(100vh-3.5rem)] w-80 bg-[#0a0e18] border-l border-zinc-800 shadow-lg transform transition-transform duration-300 ease-in-out overflow-y-auto z-60 ${
            activeRailItem === item ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex justify-between items-center p-4 border-b border-zinc-700">
            <h2 className="text-white font-medium">Signals</h2>
            <button onClick={() => setActiveRailItem(null)} className="text-zinc-400 hover:text-white">
              <X size={20} />
            </button>
          </div>
          <div className="p-4">
            <SignalsWidget />
          </div>
        </div>
      );
    }

    if (item === 'Social') {
      return (
        <div
          className={`fixed top-14 right-0 h-[calc(100vh-3.5rem)] w-80 bg-[#0a0e18] border-l border-zinc-800 shadow-lg transform transition-transform duration-300 ease-in-out overflow-y-auto z-60 ${
            activeRailItem === item ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex justify-between items-center p-4 border-b border-zinc-700">
            <h2 className="text-white font-medium">Social</h2>
            <button onClick={() => setActiveRailItem(null)} className="text-zinc-400 hover:text-white">
              <X size={20} />
            </button>
          </div>
          <SocialTrading isOpen={true} onClose={() => setActiveRailItem(null)} />
        </div>
      );
    }

    if (item === 'Pending Trades') {
      return (
        <div
          className={`fixed top-14 right-0 h-[calc(100vh-3.5rem)] w-80 bg-[#0a0e18] border-l border-zinc-800 shadow-lg transform transition-transform duration-300 ease-in-out overflow-y-auto z-60 ${
            activeRailItem === item ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <PendingTradesModal isOpen={true} onClose={() => setActiveRailItem(null)} />
        </div>
      );
    }

    // For other items like Express, Tournaments, Hotkeys - simple alerts or empty panels
    if (item === 'Express' || item === 'Tournaments' || item === 'Hotkeys') {
      return (
        <div
          className={`fixed top-14 right-0 h-[calc(100vh-3.5rem)] w-80 bg-[#0a0e18] border-l border-zinc-800 shadow-lg transform transition-transform duration-300 ease-in-out overflow-y-auto z-60 ${
            activeRailItem === item ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex justify-between items-center p-4 border-b border-zinc-700">
            <h2 className="text-white font-medium">{item}</h2>
            <button onClick={() => setActiveRailItem(null)} className="text-zinc-400 hover:text-white">
              <X size={20} />
            </button>
          </div>
          <div className="p-4 text-center text-zinc-400">
            Feature activated! (Coming soon)
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      {/* Overlay for mobile when sub-panel open */}
      {activeRailItem && (
        <div className="fixed inset-0 bg-black/50 z-50 md:hidden" onClick={() => setActiveRailItem(null)} />
      )}
      {/* Desktop Sidebar (Right Side) */}
      <aside
        className={`fixed right-0 top-0 w-16 h-full md:h-[calc(100vh-3.5rem)] bg-[#0a0e18] border-l border-zinc-800/50 flex flex-col items-center justify-start py-4 gap-2 z-50 shadow-lg transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } md:static md:w-24 md:flex-col md:translate-x-0 md:border-l md:border-t-0 hidden md:flex`}
      >
        <div className="flex flex-col items-center gap-2 w-full px-2">
          {items.map((item, index) => (
            <IconTab
              key={index}
              icon={item.icon}
              label={item.label}
              onClick={item.onClick}
              className="flex flex-col items-center text-xs md:text-[10px] text-zinc-200 hover:text-white transition-colors duration-200"
              active={activeRailItem === item.label}
            />
          ))}
        </div>
        <div className="mt-auto text-zinc-400 text-[10px] font-medium">Full screen</div>
      </aside>

      {/* Mobile Buttons (Bottom Bar) - Smaller size, perfect layout */}
      <div
        className="fixed bottom-0 left-0 right-0 bg-[#0a0e18] border-t border-zinc-800/50 flex justify-around items-center py-2 px-1 z-50 md:hidden shadow-lg"
      >
        {items.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1 gap-0.5">
            <button
              onClick={item.onClick}
              className={`p-1.5 rounded-full bg-zinc-800/30 hover:bg-zinc-700/50 transition-all duration-200 flex items-center justify-center w-9 h-9 ${
                activeRailItem === item.label ? 'bg-indigo-600 text-white shadow-md' : 'text-zinc-300'
              }`}
            >
              <item.icon size={18} />
            </button>
            <span className={`text-[10px] text-zinc-400 leading-tight ${activeRailItem === item.label ? 'text-white font-medium' : ''} transition-colors duration-200 truncate w-16 text-center`}>
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Render Sub-Panels like LeftSidebar's renderSubMenu */}
      {renderRailSubPanel('Signals')}
      {renderRailSubPanel('Social')}
      {renderRailSubPanel('Pending Trades')}
      {renderRailSubPanel('Express')}
      {renderRailSubPanel('Tournaments')}
      {renderRailSubPanel('Hotkeys')}
    </>
  );
}

export default RightRail;