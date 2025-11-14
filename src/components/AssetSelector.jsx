// src/components/AssetSelector.jsx
import React, { useEffect, useState } from "react";

export default function AssetSelector({ selectedAsset, onAssetChange }) {
  const [category, setCategory] = useState("Cryptocurrencies");
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
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
        });
    } else {
      setAssets([
        { name: "EUR/USD", symbol: "EURUSD", payout: 78 },
        { name: "GBP/USD", symbol: "GBPUSD", payout: 81 },
      ]);
    }
  }, [category]);

  const filteredAssets = assets.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex bg-[#0b1520] border border-gray-800 rounded-lg overflow-hidden text-white">
      {/* Sidebar Categories */}
      <div className="w-48 bg-[#141e30] border-r border-gray-700 flex flex-col">
        {[
          "Currencies",
          "Cryptocurrencies",
          "Commodities",
          "Stocks",
          "Indices",
        ].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`text-left px-4 py-3 text-sm ${
              category === cat
                ? "bg-[#1f2b45] text-white"
                : "text-gray-400 hover:text-white hover:bg-[#1a2436]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Asset List */}
      <div className="flex-1 p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-sm text-gray-300">{category}</h2>
          <input
            type="text"
            placeholder="Search asset..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[#1a2436] text-white px-2 py-1 text-sm rounded"
          />
        </div>

        <div className="max-h-72 overflow-y-auto space-y-1">
          {filteredAssets.map((asset) => (
            <div
              key={asset.symbol}
              onClick={() => onAssetChange(asset.symbol)}
              className={`flex justify-between items-center px-3 py-2 rounded cursor-pointer ${
                selectedAsset === asset.symbol
                  ? "bg-[#1f2b45]"
                  : "hover:bg-[#1a2436]"
              }`}
            >
              <div className="flex items-center gap-2">
                <span>⭐</span>
                <span>{asset.name}</span>
              </div>
              <span className="text-green-400 text-sm">
                +{asset.payout}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
