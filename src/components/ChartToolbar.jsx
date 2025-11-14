import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function AssetSelector({
  selectedAsset,
  onAssetChange,
  chartType,
  onChartTypeChange,
  timeFrame,
  onTimeFrameChange,
}) {
  const [showChartType, setShowChartType] = useState(false);

  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch assets when category changes
  useEffect(() => {
    if (!category) return;
    setLoading(true);

    if (category === "Cryptocurrencies") {
      fetch("https://api.binance.com/api/v3/exchangeInfo")
        .then((res) => res.json())
        .then((data) => {
          const cryptoPairs = data.symbols
            .filter((s) => s.quoteAsset === "USDT")
            .map((s) => ({
              name: s.baseAsset,
              symbol: s.symbol,
              payout: Math.floor(Math.random() * 40) + 60,
            }));
          setAssets(cryptoPairs);
        })
        .catch((err) => console.error("Error fetching Binance assets:", err))
        .finally(() => setLoading(false));
    } else {
      // Dummy data for other categories
      setAssets([
        { name: "EUR/USD", symbol: "EURUSD", payout: 78 },
        { name: "GBP/USD", symbol: "GBPUSD", payout: 81 },
      ]);
      setLoading(false);
    }
  }, [category]);

  const filteredAssets = assets.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Chart types which should show Time Frame
  const showTimeFrame = ["candles", "bars", "heikin"].includes(chartType);

  return (
    <div className="flex items-start gap-3">
      {/* === Left: Asset Dropdown === */}
      <div className="bg-[#0b1520] border border-gray-800 rounded-lg overflow-hidden text-white w-[320px]">
        {/* Header */}
        <div
          onClick={() => setOpen(!open)}
          className="flex justify-between items-center px-4 py-3 cursor-pointer hover:bg-[#131f33]"
        >
          <span className="text-gray-200 font-medium">
            {selectedAsset ? selectedAsset : "Select Asset"}
          </span>
          {open ? (
            <ChevronUp className="text-gray-400" size={18} />
          ) : (
            <ChevronDown className="text-gray-400" size={18} />
          )}
        </div>

        {/* Dropdown Body */}
        {open && (
          <div className="border-t border-gray-700 bg-[#0e1a2b] animate-fade-in">
            {/* Step 1: Category selection */}
            {!category ? (
              <div className="flex flex-col">
                {["Cryptocurrencies"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className="text-left px-4 py-3 text-sm text-gray-300 hover:bg-[#1a2436]"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            ) : (
              <>
                {/* Step 2: Asset list */}
                <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700">
                  <button
                    onClick={() => setCategory("")}
                    className="text-gray-400 text-sm hover:text-white"
                  >
                    ← Back
                  </button>
                  <h2 className="text-sm text-gray-300">{category}</h2>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-[#1a2436] text-white px-2 py-1 text-xs rounded w-28"
                  />
                </div>

                {loading ? (
                  <div className="text-center py-4 text-gray-400 text-sm">
                    Loading assets...
                  </div>
                ) : (
                  <div className="max-h-72 overflow-y-auto">
                    {filteredAssets.map((asset) => (
                      <div
                        key={asset.symbol}
                        onClick={() => {
                          onAssetChange(asset.symbol);
                          setOpen(false);
                          setCategory("");
                        }}
                        className={`flex justify-between items-center px-4 py-2 text-sm cursor-pointer ${
                          selectedAsset === asset.symbol
                            ? "bg-[#1f2b45]"
                            : "hover:bg-[#1a2436]"
                        }`}
                      >
                        <span>{asset.name}</span>
                        <span className="text-green-400">+{asset.payout}%</span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* === Right: Chart Type & Conditional Time Frame === */}
      <div className="flex flex-col gap-2 bg-[#0b1520] border border-gray-800 rounded-lg p-3 text-white w-[220px]">
        {/* Chart Type Toggle Section */}
        <div>
          <div
            onClick={() => setShowChartType(!showChartType)}
            className="flex justify-between items-center cursor-pointer select-none"
          >
            <label className="text-xs text-gray-400 block">Chart Type</label>
            {showChartType ? (
              <ChevronUp size={16} className="text-gray-400" />
            ) : (
              <ChevronDown size={16} className="text-gray-400" />
            )}
          </div>

          {showChartType && (
            <select
              value={chartType}
              onChange={(e) => onChartTypeChange(e.target.value)}
              className="w-full bg-[#1a2436] text-white px-2 py-1 rounded text-sm mt-2"
            >
              <option value="candles">Candles</option>
              <option value="line">Line</option>
              <option value="bars">Bars</option>
              <option value="heikin">Heikin Ashi</option>
            </select>
          )}
        </div>

        {/* ✅ Time Frame (Only for candle/bars/heikin) */}
        {showChartType && showTimeFrame && (
          <div>
            <label className="text-xs text-gray-400 block mb-1">
              Time Frame
            </label>
            <select
              value={timeFrame}
              onChange={(e) => onTimeFrameChange(e.target.value)}
              className="w-full bg-[#1a2436] text-white px-2 py-1 rounded text-sm"
            >
              <option value="1m">1m</option>
              <option value="5m">5m</option>
              <option value="15m">15m</option>
              <option value="30m">30m</option>
              <option value="1h">1h</option>
              <option value="4h">4h</option>
              <option value="1d">1d</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
}







// import React, { useState, useEffect } from "react";
// import {
//   ChevronDown,
//   BarChart3,
//   Menu,
//   Edit3,
//   Minus,
//   Grid3x3,
//   Bitcoin,
//   Star,
//   Search,
// } from "lucide-react";

// export default function CryptoTradingDashboard() {
//   const [selectedCrypto, setSelectedCrypto] = useState("Bitcoin OTC");
//   const [activeTab, setActiveTab] = useState("cryptocurrencies");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [favorites, setFavorites] = useState(new Set(["Bitcoin OTC"]));
//   const [showSidebar, setShowSidebar] = useState(false);
//   const [assets, setAssets] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const menuItems = [
//     { id: "cryptocurrencies", icon: Bitcoin, label: "Cryptocurrencies" },
//   ];

//   // ⭐ Fetch crypto assets dynamically from Binance API
//   useEffect(() => {
//     if (activeTab !== "cryptocurrencies") return;

//     setLoading(true);
//     fetch("https://api.binance.com/api/v3/exchangeInfo")
//       .then((res) => res.json())
//       .then((data) => {
//         const cryptoPairs = data.symbols
//           .filter((s) => s.quoteAsset === "USDT")
//           .map((s) => ({
//             name: `${s.baseAsset} / USDT`,
//             symbol: s.symbol,
//             payout: `+${Math.floor(Math.random() * 35) + 60}%`,
//             color: getRandomColor(),
//           }));
//         setAssets(cryptoPairs);
//       })
//       .catch((err) => console.error("Error fetching Binance assets:", err))
//       .finally(() => setLoading(false));
//   }, [activeTab]);

//   const getRandomColor = () => {
//     const colors = [
//       "bg-orange-400",
//       "bg-blue-400",
//       "bg-purple-500",
//       "bg-green-500",
//       "bg-red-500",
//       "bg-pink-500",
//       "bg-yellow-400",
//       "bg-teal-400",
//       "bg-slate-500",
//     ];
//     return colors[Math.floor(Math.random() * colors.length)];
//   };

//   const toggleFavorite = (name) => {
//     const newFavorites = new Set(favorites);
//     if (newFavorites.has(name)) newFavorites.delete(name);
//     else newFavorites.add(name);
//     setFavorites(newFavorites);
//   };

//   const filteredAssets = assets.filter(
//     (asset) =>
//       asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       asset.symbol.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-slate-900 flex flex-col ">
//       {/* === Top Navigation Bar === */}
//       <div className="bg-slate-800 px-4 py-3 flex items-center gap-3 border-b border-slate-700">
//         {/* Asset Selector Button */}
//         <button
//           onClick={() => setShowSidebar((prev) => !prev)}
//           className="flex items-center gap-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded transition-colors text-white text-sm font-medium"
//         >
//           <span>{selectedCrypto}</span>
//           <ChevronDown
//             className={`w-4 h-4 transition-transform ${
//               showSidebar ? "rotate-180" : ""
//             }`}
//           />
//         </button>

//         {/* Divider */}
//         <div className="w-px h-8 bg-slate-700"></div>

//         {/* Toolbar Buttons */}
//         <div className="flex items-center gap-2">
//           <button className="relative w-9 h-9 bg-blue-600 hover:bg-blue-500 rounded flex items-center justify-center transition-colors">
//             <BarChart3 className="w-4 h-4 text-white" />
//             <span className="absolute -top-1 -right-1 bg-blue-400 text-white text-[10px] font-bold px-1.5 rounded">
//               M1
//             </span>
//           </button>

//           <button className="w-9 h-9 bg-slate-700 hover:bg-slate-600 rounded flex items-center justify-center">
//             <Menu className="w-4 h-4 text-slate-300" />
//           </button>

//           <button className="w-9 h-9 bg-slate-700 hover:bg-slate-600 rounded flex items-center justify-center">
//             <Edit3 className="w-4 h-4 text-slate-300" />
//           </button>

//           <button className="w-9 h-9 bg-slate-700 hover:bg-slate-600 rounded flex items-center justify-center">
//             <Minus className="w-4 h-4 text-slate-300" />
//           </button>

//           <button className="w-9 h-9 bg-slate-700 hover:bg-slate-600 rounded flex items-center justify-center">
//             <Grid3x3 className="w-4 h-4 text-slate-300" />
//           </button>
//         </div>
//       </div>

//       {/* === Sidebar + Asset List === */}
//       {showSidebar && (
//         <div className="flex flex-1 overflow-hidden">
//           {/* Left Sidebar (Categories) */}
//           <div className="w-48 bg-slate-900 border-r border-slate-800 flex flex-col p-3">
//             <div className="space-y-1 mb-6">
//               {menuItems.map((item) => (
//                 <button
//                   key={item.id}
//                   onClick={() => setActiveTab(item.id)}
//                   className={`w-full flex items-center gap-3 px-3 py-2 rounded transition-colors ${
//                     activeTab === item.id
//                       ? "bg-blue-600 text-white"
//                       : "text-slate-400 hover:bg-slate-800 hover:text-slate-300"
//                   }`}
//                 >
//                   <item.icon className="w-4 h-4" />
//                   <span className="text-sm">{item.label}</span>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Right Side — Asset List */}
//           <div className="flex-1 flex flex-col bg-slate-900">
//             {/* Search Bar */}
//             <div className="p-4 border-b border-slate-800">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
//                 <input
//                   type="text"
//                   placeholder="Search assets..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full bg-slate-800 border border-slate-700 rounded pl-10 pr-10 py-2 text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:border-slate-600"
//                 />
//               </div>
//             </div>

//             {/* Header */}
//             <div className="flex items-center justify-between px-6 py-3 border-b border-slate-800">
//               <div className="text-slate-400 text-sm">Asset</div>
//               <div className="text-slate-400 text-sm">Payout</div>
//             </div>

//             {/* ✅ Scrollable Asset List with Tailwind 4.1 scrollbar */}
//             <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-900 hover:scrollbar-thumb-slate-500 scrollbar-thumb-rounded">
//               {loading ? (
//                 <div className="text-center py-6 text-slate-400 text-sm">
//                   Fetching assets from Binance...
//                 </div>
//               ) : (
//                 <div className="px-3 py-2">
//                   {filteredAssets.map((asset, index) => (
//                     <div
//                       key={index}
//                       onClick={() => {
//                         setSelectedCrypto(asset.name);
//                         setShowSidebar(false);
//                       }}
//                       className={`flex items-center justify-between px-3 py-2.5 rounded transition-colors cursor-pointer group ${
//                         asset.name === selectedCrypto
//                           ? "bg-slate-800"
//                           : "hover:bg-slate-800/50"
//                       }`}
//                     >
//                       <div className="flex items-center gap-3">
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             toggleFavorite(asset.name);
//                           }}
//                           className="transition-colors"
//                         >
//                           <Star
//                             className={`w-4 h-4 ${
//                               favorites.has(asset.name)
//                                 ? "fill-yellow-500 text-yellow-500"
//                                 : "text-slate-600 group-hover:text-slate-500"
//                             }`}
//                           />
//                         </button>
//                         <div
//                           className={`w-6 h-6 ${asset.color} rounded-full flex items-center justify-center text-white text-xs font-semibold`}
//                         >
//                           {asset.symbol.charAt(0)}
//                         </div>
//                         <span className="text-slate-300 text-sm">
//                           {asset.name}
//                         </span>
//                       </div>
//                       <div className="text-green-400 text-sm font-medium">
//                         {asset.payout}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


