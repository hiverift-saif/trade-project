import React from 'react';
import { NavLink } from 'react-router-dom';

function QuickActionCard({ icon: Icon, label, link, color }) {
  const colorStyles = {
    blue: 'bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20 hover:border-blue-500/40 text-blue-400',
    green: 'bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20 hover:border-green-500/40 text-green-400',
    purple: 'bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20 hover:border-purple-500/40 text-purple-400',
    orange: 'bg-gradient-to-br from-orange-500/10 to-orange-500/5 border-orange-500/20 hover:border-orange-500/40 text-orange-400',
  };

  return (
    <NavLink
      to={link}
      className={`flex flex-col gap-6 rounded-xl border ${colorStyles[color] || colorStyles.blue} transition-all cursor-pointer group`}
    >
      <div className="p-6 text-center">
        <Icon className={`w-8 h-8 mx-auto mb-2 group-hover:scale-110 transition-transform`} aria-hidden="true" />
        <p className="text-white">{label}</p>
      </div>
    </NavLink>
  );
}

export default QuickActionCard;