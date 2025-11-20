import React from 'react';
import { Users } from 'lucide-react';

export default function AffiliateLevelsTable() {
  const levels = [
    { name: 'Level 1', revenue: '35.00%', turnover: '2.00%', deposits: '0', ftd: '0-2' },
    { name: 'Level 2', revenue: '50.00%', turnover: '2.00%', deposits: '0', ftd: '2-19' },
    { name: 'Level 3', revenue: '60.00%', turnover: '2.00%', deposits: '0', ftd: '19-30' },
    { name: 'Level 4', revenue: '70.00%', turnover: '2.00%', deposits: '0', ftd: '30-50' },
    { name: 'Level 5', revenue: '80.00%', turnover: '2.00%', deposits: '0', ftd: '50-999' },
  ];

  return (
    <div className="space-y-4">
      {/* Table */}
      <div className="bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-gray-700">


        {/* Rows */}
        {levels.map((level, index) => (
          <div
            key={index}
            className={`grid grid-cols-5 gap-3 px-4 py-3 text-xs border-b border-gray-700/50 transition-colors ${
              index === 0 ? 'bg-blue-900/20' : 'hover:bg-gray-700/30'
            }`}
          >
            <div className="text-white font-medium">{level.name}</div>
            <div className="text-emerald-400 font-semibold">{level.revenue}</div>
            <div className="text-gray-300">{level.turnover}</div>
            <div className="text-gray-300">{level.deposits}</div>
            <div className="text-gray-300">{level.ftd}</div>
          </div>
        ))}

        {/* Footer */}
        <div className="px-4 py-3 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-t border-gray-700">
          <p className="text-xs text-gray-300">
            <span className="text-blue-400 font-medium">Level 6:</span> contact your personal manager
          </p>
        </div>
      </div>


    </div>
  );
}