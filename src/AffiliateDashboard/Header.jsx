// src/AffiliateDashboard/Header.jsx
import React from 'react';

function Header({ balanceData }) {
  return (
    <div className="bg-gray-900/50 border-b border-gray-800 sticky top-0 z-10 backdrop-blur-xl hidden md:block">
      <div className="px-6 py-4">
        <div className="flex items-center justify-end space-x-4">
          {balanceData.map((item) => (
            <div key={item.label} className="text-right">
              <p className="text-xs text-gray-400">{item.label}</p>
              <p className={item.color}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Header;