import React from 'react';
import { Bell, Swords, Zap, Trophy, ToggleRight } from 'lucide-react';
import IconTab from './IconTab';

function RightRail({ isOpen, onClose, onSignalsClick, onSocialClick }) {
  const handleSignalsClick = () => {
    if (onSignalsClick) onSignalsClick();
    console.log('Signals clicked');
  };

  const handleSocialClick = () => {
    if (onSocialClick) onSocialClick();
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
    { icon: Bell, label: 'Signals', onClick: handleSignalsClick },
    { icon: Swords, label: 'Social', onClick: handleSocialClick },
    { icon: Zap, label: 'Express', onClick: handleExpressClick },
    { icon: Trophy, label: 'Tournaments', onClick: handleTournamentsClick },
    { icon: ToggleRight, label: 'Hotkeys', onClick: handleHotkeysClick },
  ];

  return (
    <>
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
              className="flex flex-col items-center text-xs md:text-[10px] text-zinc-200 hover:text-white"
            />
          ))}
        </div>
        <div className="mt-auto text-zinc-400 text-[10px] font-medium">Full screen</div>
      </aside>

      {/* Mobile Buttons (Bottom Bar) */}
      <div
        className="fixed bottom-0 left-0 w-full bg-[#0a0e18] border-t border-zinc-800/50 flex justify-around items-center py-2 px-4 z-50 md:hidden"
      >
        {items.map((item, index) => (
          <IconTab
            key={index}
            icon={item.icon}
            label={item.label}
            onClick={item.onClick}
            className="flex flex-col items-center text-xs text-zinc-200 hover:text-white"
          />
        ))}
      </div>
    </>
  );
}

export default RightRail;