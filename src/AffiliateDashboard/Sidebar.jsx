// src/components/Sidebar.jsx
import React from 'react';
import {
  Globe,
  LayoutDashboard,
  User,
  ChartColumn,
  Link2,
  CreditCard,
  Image,
  Send,
  CircleQuestionMark,
  FileText,
  Users,
} from 'lucide-react';

function Sidebar({ navItems }) {
  return (
    <aside className="w-64 bg-gray-900/50 border-r border-gray-800 min-h-screen sticky top-0 backdrop-blur-xl">
      <div className="p-6">
        {/* Logo */}
        <div className="flex items-center mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center mr-3">
            <span className="text-white font-bold">TP</span>
          </div>
          <span className="text-xl text-white">Trade Pro</span>
        </div>
        {/* Profile Card */}
        <div className="mb-8 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
          <div className="flex items-center space-x-2 mb-2">
            <Globe className="w-4 h-4 text-gray-400" aria-hidden="true" />
            <span className="text-sm text-gray-400">EN</span>
          </div>
          <p className="text-white">Trade Pro</p>
          <span className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 border-transparent text-primary-foreground mt-2 bg-gradient-to-r from-blue-500 to-green-500">
            LEVEL 1
          </span>
        </div>
        {/* Navigation */}
        <div className="relative h-[calc(100vh-300px)] overflow-y-auto">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.link}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  item.active
                    ? 'bg-gradient-to-r from-blue-500/20 to-green-500/20 text-white border border-blue-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <item.icon className="w-5 h-5" aria-hidden="true" />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;