// src/components/CommissionsCard.jsx
import React from 'react';
import { TrendingUp } from 'lucide-react';

function CommissionsCard({ amount }) {
  return (
    <div className="text-card-foreground flex flex-col gap-6 rounded-xl border bg-gradient-to-r from-blue-500/10 to-green-500/10 border-blue-500/20">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 mb-2">Total Commissions Earned</p>
            <p className="text-4xl text-white">{amount}</p>
          </div>
          <TrendingUp className="w-16 h-16 text-green-400" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

export default CommissionsCard;