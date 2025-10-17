// src/components/MetricsCard.jsx
import React from 'react';

function MetricsCard({ title, value, icon: Icon, iconColor }) {
  return (
    <div className="text-card-foreground flex flex-col gap-6 rounded-xl border bg-gray-900/50 border-gray-800">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm mb-2">{title}</p>
            <p className="text-3xl text-white">{value}</p>
          </div>
          <Icon className={`w-12 h-12 ${iconColor}`} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

export default MetricsCard;