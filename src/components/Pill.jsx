import React from 'react';

const Pill = ({ children, variant = "default" }) => (
  <span
    className={`px-2 py-1 rounded-full text-xs ${
      variant === "green"
        ? "bg-emerald-500/15 text-emerald-300"
        : variant === "red"
        ? "bg-red-500/15 text-red-300"
        : "bg-zinc-700/60 text-zinc-200"
    }`}
  >
    {children}
  </span>
);

export default Pill;