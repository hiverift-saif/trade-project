import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

function Toolbar({ assets, activeAsset, setActiveAsset, timeframe, setTimeframe }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex items-center gap-4 px-4 py-2 border-b border-zinc-800/50 bg-[#0b0f1a] flex-wrap shadow-sm">
      <div className="flex items-center gap-2">
        <label className="text-xs text-zinc-400 font-medium">Asset</label>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-sm px-3 py-1 rounded transition-all duration-200"
          >
            {activeAsset.symbol}
            <ChevronDown size={16} />
          </button>
          {isDropdownOpen && (
            <div className="absolute top-full mt-1 bg-zinc-800 rounded-lg shadow-lg z-50 w-40 max-h-64 overflow-y-auto">
              {assets.map((asset) => (
                <button
                  key={asset.id}
                  onClick={() => {
                    setActiveAsset(asset);
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-zinc-100 hover:bg-zinc-700 transition-all duration-200"
                >
                  {asset.symbol}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <label className="text-xs text-zinc-400 font-medium">Timeframe</label>
        {[
          { key: "M1", label: "M1" },
          { key: "M4", label: "M4" },
          { key: "M5", label: "M5" },
          { key: "M15", label: "M15" },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTimeframe(t.key)}
            className={`px-3 py-1 rounded text-xs border font-medium ${
              timeframe === t.key
                ? "bg-zinc-800 text-white border-zinc-700"
                : "bg-transparent text-zinc-400 border-zinc-700 hover:text-zinc-200 hover:border-zinc-600"
            } transition-all duration-200`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Toolbar;