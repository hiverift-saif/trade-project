// src/components/BalanceCard.jsx
import React from 'react';

function BalanceCard({ metrics }) {
  return (
    <div className="text-card-foreground flex flex-col gap-6 rounded-xl border bg-gray-900/50 border-gray-800">
      <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6">
        <h4 className="leading-none text-white">Your Balance</h4>
      </div>
      <div className="px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {metrics.map((metric) => (
            <div key={metric.label} className="text-center p-4 bg-gray-800/50 rounded-lg">
              <p className="text-gray-400 text-sm mb-2">{metric.label}</p>
              <p className="text-2xl text-white">{metric.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BalanceCard;