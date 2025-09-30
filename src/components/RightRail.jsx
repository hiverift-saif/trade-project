import React from 'react';
import { Bell, Swords, Zap, Trophy, ToggleRight } from 'lucide-react'; // X icon removed
import IconTab from './IconTab';

function RightRail({ isOpen, onClose, onSignalsClick }) {
  const handleSignalsClick = () => {
    if (onSignalsClick) onSignalsClick();
    console.log('Signals clicked');
  };

  const handleSocialClick = () => {
    alert('Social feature is activated!');
    console.log('Social clicked');
  };

  const handleExpressClick = () => {
    alert('Express feature is activated!');
    console.log('Express clicked');
  };

  const handleTournamentsClick = () => {
    alert('Tournaments feature is activated!');
    console.log('Tournaments clicked');
  };

  const handleHotkeysClick = () => {
    alert('Hotkeys feature is activated!');
    console.log('Hotkeys clicked');
  };

  const items = [
    { icon: Bell, label: "Signals", onClick: handleSignalsClick },
    { icon: Swords, label: "Social", onClick: handleSocialClick },
    { icon: Zap, label: "Express", onClick: handleExpressClick },
    { icon: Trophy, label: "Tournaments", onClick: handleTournamentsClick },
    { icon: ToggleRight, label: "Hotkeys", onClick: handleHotkeysClick },
  ];

  return (
    <>
      {/* Overlay and onClose logic removed since toggle is gone */}
      <aside
        className={`fixed bottom-0 left-0 w-full h-16 md:h-[calc(100vh-3.5rem)] bg-[#0a0e18] border-t border-zinc-800/50 flex items-center justify-around py-2 gap-2 z-50 shadow-lg transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        } md:static md:w-24 md:flex-col md:translate-y-0 md:border-l md:border-t-0`}
      >
        {/* Header with toggle removed */}
        <div className="flex flex-row items-center justify-around w-full px-4 md:flex-col md:items-center md:gap-2">
          {items.map((it, i) => (
            <IconTab
              key={i}
              icon={it.icon}
              label={it.label}
              onClick={it.onClick}
              className="flex flex-col items-center text-xs md:text-[10px] text-zinc-200 hover:text-white"
            />
          ))}
        </div>
        <div className="hidden md:block mt-auto text-zinc-400 text-[10px] font-medium">Full screen</div>
      </aside>
    </>
  );
}

export default RightRail;