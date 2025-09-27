import React from 'react';
import { BarChart2, Coins, User, MessageSquare, Bell } from 'lucide-react';
import IconTab from './IconTab';

function MobileBottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0a0e18] border-t border-zinc-800/50 flex justify-around items-center h-[60px] z-40 shadow-lg">
      <IconTab icon={BarChart2} label="Trade" small onClick={() => {}} />
      <IconTab icon={Coins} label="Finance" small onClick={() => {}} />
      <IconTab icon={User} label="Profile" small onClick={() => {}} />
      <IconTab icon={MessageSquare} label="Chat" small onClick={() => {}} />
      <IconTab icon={Bell} label="Alerts" small onClick={() => {}} />
    </nav>
  );
}

export default MobileBottomNav;