import React from "react";

function MetricsCard({ title, value, icon: Icon, iconColor }) {
  return (
    <div className="bg-gray-900 p-4 sm:p-6 rounded-xl border border-gray-800 shadow-md flex items-center justify-between ">
      <div>
        <p className="text-xs sm:text-sm text-gray-400">{title}</p>
        <h2 className="text-lg sm:text-2xl font-bold text-white mt-1">
          {value}
        </h2>
      </div>

      <div
        className={`p-2 sm:p-3 rounded-lg bg-gray-800 ${iconColor}`}
      >
        <Icon className="w-4 h-4 sm:w-6 sm:h-6" />
      </div>
    </div>
  );
}

export default MetricsCard;
