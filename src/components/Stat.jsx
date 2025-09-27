import React from 'react';

const Stat = ({ label, value, accent }) => (
  <div className="flex items-center justify-between text-sm py-1">
    <span className="text-zinc-400">{label}</span>
    <span className={accent ? accent : "text-zinc-200"}>{value}</span>
  </div>
);

export default Stat;