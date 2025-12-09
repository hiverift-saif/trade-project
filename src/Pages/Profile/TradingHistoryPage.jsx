// src/Pages/TradingHistoryPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE from "../../config";

export function TradingHistoryPage() {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // FILTER STATE
  const [filters, setFilters] = useState({
    timeframe: "",
    instrument: "",
    type: "",
    status: "",
    search: "",
  });

  // UPDATE FILTER FUNCTION
  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // GET USER & TOKEN
  const getUser = () => {
    const str = localStorage.getItem("user") || sessionStorage.getItem("user");
    if (!str) return null;
    try {
      return JSON.parse(str);
    } catch {
      return null;
    }
  };

  const getToken = () => {
    return (
      localStorage.getItem("tp_user_token") ||
      sessionStorage.getItem("tp_user_token")
    );
  };

  // API CALL
  useEffect(() => {
    const fetchTrades = async () => {
      const user = getUser();
      const token = getToken();

      if (!user || !token) {
        setError("Please login first");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${BASE.AFFILIATE_URL}/trades/history/open/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.statusCode === 200) {
          setTrades(response.data.result);
        } else {
          setTrades([]);
        }
      } catch (err) {
        setError("Failed to load trades");
      } finally {
        setLoading(false);
      }
    };

    fetchTrades();
  }, []);

  // FILTERING LOGIC
  const filteredTrades = trades.filter((t) => {
    // TIMEFRAME
    if (filters.timeframe === "today") {
      if (new Date(t.createdAt).toDateString() !== new Date().toDateString())
        return false;
    }

    if (filters.timeframe === "7") {
      const diff =
        (new Date() - new Date(t.createdAt)) / (1000 * 60 * 60 * 24);
      if (diff > 7) return false;
    }

    if (filters.timeframe === "30") {
      const diff =
        (new Date() - new Date(t.createdAt)) / (1000 * 60 * 60 * 24);
      if (diff > 30) return false;
    }

    // TYPE
    if (filters.type && t.type.toLowerCase() !== filters.type.toLowerCase())
      return false;

    // STATUS
    if (filters.status && t.status.toLowerCase() !== filters.status.toLowerCase())
      return false;

    // INSTRUMENT
    if (filters.instrument && t.symbol !== filters.instrument) return false;

    // SEARCH
    if (filters.search) {
      const s = filters.search.toLowerCase();
      if (
        !t.symbol.toLowerCase().includes(s) &&
        !t.type.toLowerCase().includes(s) &&
        !String(t.price).includes(s)
      ) {
        return false;
      }
    }

    return true;
  });

  // FORMAT TIME
  const formatTime = (date) =>
    new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <h2 className="text-2xl font-semibold mb-6">Trading History</h2>

        {/* FILTERS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-6">
          <select
            onChange={(e) => updateFilter("timeframe", e.target.value)}
            className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm w-full"
          >
            <option value="">Timeframe</option>
            <option value="today">Today</option>
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
          </select>

          <select
            onChange={(e) => updateFilter("instrument", e.target.value)}
            className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm w-full"
          >
            <option value="">Instrument</option>
            <option value="BTC/USDT">BTC/USDT</option>
            <option value="ETH/USDT">ETH/USDT</option>
          </select>

          <select
            onChange={(e) => updateFilter("type", e.target.value)}
            className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm w-full"
          >
            <option value="">Type</option>
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>

          <select
            onChange={(e) => updateFilter("status", e.target.value)}
            className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm w-full"
          >
            <option value="">Status</option>
            <option value="win">Win</option>
            <option value="loss">Loss</option>
          </select>

          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => updateFilter("search", e.target.value)}
            className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm w-full"
          />

          <button className="bg-emerald-600 hover:bg-emerald-500 rounded-lg px-3 py-2 text-sm font-medium w-full">
            Apply Filters
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-black/60 rounded-xl border border-zinc-800 shadow-lg overflow-x-auto">
          {loading ? (
            <div className="p-10 text-center text-zinc-400">Loading...</div>
          ) : error ? (
            <div className="p-10 text-center text-red-400">{error}</div>
          ) : filteredTrades.length === 0 ? (
            <div className="p-10 text-center text-zinc-400">No trades found</div>
          ) : (
            <table className="w-full text-sm whitespace-nowrap">
              <thead>
                <tr className="bg-zinc-900/80 text-zinc-300">
                  <th className="px-4 py-3 text-left">Time</th>
                  <th className="px-4 py-3 text-left">Instrument</th>
                  <th className="px-4 py-3 text-left">Type</th>
                  <th className="px-4 py-3 text-left">Stake</th>
                  <th className="px-4 py-3 text-left">Entry</th>
                  <th className="px-4 py-3 text-left">Exit</th>
                  <th className="px-4 py-3 text-left">P/L</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-zinc-800">
                {filteredTrades.map((t) => (
                  <tr
                    key={t._id}
                    className="hover:bg-zinc-800/40 transition"
                  >
                    <td className="px-4 py-3">{formatTime(t.createdAt)}</td>
                    <td className="px-4 py-3">{t.symbol}</td>
                    <td
                      className={`px-4 py-3 font-semibold ${
                        t.type === "buy"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {t.type.toUpperCase()}
                    </td>
                    <td className="px-4 py-3">${t.quantity * t.price}</td>
                    <td className="px-4 py-3">${t.price.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      {t.exitPrice
                        ? `$${t.exitPrice.toFixed(2)}`
                        : "-"}
                    </td>
                    <td className="px-4 py-3">
                      {t.profitLoss > 0 ? (
                        <span className="text-emerald-400 font-semibold">
                          +${t.profitLoss.toFixed(2)}
                        </span>
                      ) : (
                        <span className="text-red-400 font-semibold">
                          -${Math.abs(t.profitLoss).toFixed(2)}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 text-xs rounded-lg ${
                          t.profitLoss > 0
                            ? "bg-emerald-600/20 text-emerald-400"
                            : "bg-red-600/20 text-red-400"
                        }`}
                      >
                        {t.profitLoss > 0 ? "Win" : "Loss"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
