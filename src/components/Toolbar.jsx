import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

function Toolbar({ assets, activeAsset, setActiveAsset, timeframe, setTimeframe }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center gap-4 flex-wrap justify-end text-wh">
      <div className="relative" ref={dropdownRef}>
        {/* <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white text-sm px-3 py-1 rounded"
        >
          {activeAsset.symbol}
          <ChevronDown size={14} />
        </button> */}
        {/* {isDropdownOpen && (
          <div className="absolute right-0 mt-1 bg-zinc-800 rounded-lg shadow-lg z-50 w-36 max-h-64 overflow-y-auto">
            {assets.map((asset) => (


              <button
                key={asset.id}
                onClick={() => {
                  setActiveAsset(asset);
                  setIsDropdownOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-zinc-700"
              >
                {asset.symbol}
              </button>

              
            ))}
          </div>
        )} */}
      </div>

      {/* <div className="flex items-center gap-2 ">
        {["M1", "M5", "M15", "H1", "H4"].map((t) => (
          <button
            key={t}
            onClick={() => setTimeframe(t)}
            className={`px-3 py-1 rounded text-xs font-medium border ${
              timeframe === t
                ? "bg-emerald-600 border-emerald-500 text-white"
                : "bg-transparent border-zinc-700 text-black hover:border-zinc-500"
            }`}
          >
            {t}
          </button>
        ))}
      </div> */}
    </div>
  );
}

export default Toolbar;
