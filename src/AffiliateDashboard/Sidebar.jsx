// src/components/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Sidebar({ navItems }) {
  const location = useLocation();

  return (
    <aside className="w-64 bg-gray-900/50 border-r border-gray-800 min-h-screen sticky top-0 backdrop-blur-xl">
      <div className="p-6">
        {/* Logo */}
        <div className="flex items-center mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center mr-3">
            <span className="text-white font-bold">TP</span>
          </div>
          <Link to="/">
            <span className="text-xl text-white">Trade Pro</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="space-y-4">
          {navItems.map((item) => {
            const active = location.pathname === item.link;
            return (
              <Link
                key={item.label}
                to={item.link}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  active
                    ? 'bg-gradient-to-r from-blue-500/20 to-green-500/20 text-white border border-blue-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
