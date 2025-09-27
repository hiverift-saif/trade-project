import React from 'react';

const IconTab = ({ icon: Icon, label, active, small, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center gap-1.5 p-2 rounded-lg transition-all duration-200 ${
      small ? 'text-[10px]' : 'text-[11px]'
    } ${
      active
        ? 'text-white bg-zinc-800/50 border border-zinc-700'
        : 'text-zinc-400 hover:text-white hover:bg-zinc-800/30'
    } ${small ? 'w-12' : 'w-16'}`}
  >
    <Icon
      size={small ? 16 : 18}
      className={`transition-transform duration-200 ${active ? 'scale-110' : 'hover:scale-110'}`}
    />
    <span className={`truncate ${small ? 'w-12' : 'w-16'} font-medium text-center`}>{label}</span>
  </button>
);

export default IconTab;