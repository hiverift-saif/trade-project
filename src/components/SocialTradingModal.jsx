import React, { useState, useEffect, Component } from "react";
import {
  Trophy,
  Star,
  Search,
  Eye,
  Rss,
  Settings,
  ChevronDown,
  Copy,
  Share2,
  Menu,
  X,
} from "lucide-react";

// Error Boundary Component
class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-center text-red-500 bg-slate-800/50 rounded-lg">
          <h3 className="text-lg font-bold">Something went wrong!</h3>
          <p className="text-sm mt-2">Please try again or contact support.</p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600"
          >
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const traders = [
  { id: 100062363, name: "user100062363", country: "ru", trades: 329, profit: 11042.1, winRate: 54, level: 3, badge: "guru" },
  { id: 100687136, name: "David", country: "ru", trades: 68, profit: 9810.12, winRate: 43, level: 2, badge: "master" },
  { id: 109914407, name: "user109914407", country: "co", trades: 9, profit: 5383.65, winRate: 89, level: 2, badge: "master" },
  { id: 99250460, name: "user99250460", country: null, trades: 111, profit: 5164.94, winRate: 85, level: 2, badge: "master" },
  { id: 100935438, name: "user100935438", country: "ru", trades: 447, profit: 4629.1, winRate: 53, level: 4, badge: "vip" },
  { id: 104599282, name: "youknowmaname", country: null, trades: 159, profit: 3100.01, winRate: 60, level: 2, badge: "master" },
];

const getBadgeColor = (badge) => {
  const colors = {
    guru: "from-yellow-600 to-yellow-400",
    master: "from-blue-700 to-blue-500",
    vip: "from-amber-600 to-amber-400",
    beginner: "from-green-700 to-green-500",
  };
  return colors[badge] || "from-gray-600 to-gray-400";
};

const getCountryFlag = (country) => {
  const flags = {
    ru: "🇷🇺",
    co: "🇨🇴",
    za: "🇿🇦",
    am: "🇦🇲",
  };
  return flags[country] || "👤";
};

const RankIcon = () => (
  <svg
    viewBox="0 0 384 512"
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4 fill-current"
  >
    <path d="M97.12 362.63c-8.69-8.69-4.16-6.24-25.12-11.85-9.51-2.55-17.87-7.45-25.43-13.32L1.2 448.7c-4.39 10.77 3.81 22.47 15.43 22.03l52.69-2.01L105.56 507c8 8.44 22.04 5.81 26.43-4.96l52.05-127.62c-10.84 6.04-22.87 9.58-35.31 9.58-19.5 0-37.82-7.59-51.61-21.37ZM382.8 448.7l-45.37-111.24c-7.56 5.88-15.92 10.77-25.43 13.32-21.07 5.64-16.45 3.18-25.12 11.85-13.79 13.78-32.12 21.37-51.62 21.37-12.44 0-24.47-3.55-35.31-9.58L252 502.04c4.39 10.77 18.44 13.4 26.43 4.96l36.25-38.28 52.69 2.01c11.62.44 19.82-11.27 15.43-22.03ZM263 340c15.28-15.55 17.03-14.21 38.79-20.14 13.89-3.79 24.75-14.84 28.47-28.98 7.48-28.4 5.54-24.97 25.95-45.75 10.17-10.35 14.14-25.44 10.42-39.58-7.47-28.38-7.48-24.42 0-52.83 3.72-14.14-.25-29.23-10.42-39.58-20.41-20.78-18.47-17.36-25.95-45.75-3.72-14.14-14.58-25.19-28.47-28.98-27.88-7.61-24.52-5.62-44.95-26.41-10.17-10.35-25-14.4-38.89-10.61-27.87 7.6-23.98 7.61-51.9 0-13.89-3.79-28.72.25-38.89 10.61-20.41 20.78-17.05 18.8-44.94 26.41-13.89 3.79-24.75 14.84-28.47 28.98-7.47 28.39-5.54 24.97-25.95 45.75-10.17 10.35-14.15 25.44-10.42 39.58 7.47 28.36 7.48 24.4 0 52.82-3.72 14.14.25 29.23 10.42 39.59 20.41 20.78 18.47 17.35 25.95 45.75 3.72 14.14 14.58 25.19 28.47 28.98C104.6 325.96 106.27 325 121 340c13.23 13.47 33.84 15.88 49.74 5.82 12.957-8.226 29.573-8.226 42.53 0 15.89 10.06 36.5 7.65 49.73-5.82Zm11.139-88.494c-5.18 0-9.17-1.4-11.97-4.2-2.8-2.8-4.2-6.86-4.2-12.18v-11.97h-47.04c-5.18 0-9.31-1.155-12.39-3.465-3.08-2.31-4.62-5.845-4.62-10.605 0-2.8.63-5.635 1.89-8.505 1.26-2.87 3.5-6.545 6.72-11.025l54.39-79.17c2.38-3.64 5.005-6.335 7.875-8.085 2.87-1.75 6.265-2.625 10.185-2.625 4.62 0 8.26 1.365 10.92 4.095 2.66 2.73 3.99 6.825 3.99 12.285v81.48h7.77c9.38 0 14.07 4.27 14.07 12.81 0 8.54-4.69 12.81-14.07 12.81h-7.77v11.97c0 5.32-1.365 9.38-4.095 12.18-2.73 2.8-6.615 4.2-11.655 4.2Zm-183.12-1.89c-5.32 0-9.17-1.225-11.55-3.675-2.38-2.45-3.57-6.055-3.57-10.815 0-3.08.77-5.95 2.31-8.61 1.54-2.66 3.64-5.39 6.3-8.19l39.48-41.58c5.88-6.3 10.115-11.9 12.705-16.8s3.885-9.8 3.885-14.7c0-12.6-7.77-18.9-23.31-18.9-4.06 0-8.225.56-12.495 1.68-4.27 1.12-8.715 3.08-13.335 5.88-3.78 2.24-7.245 2.73-10.395 1.47-3.15-1.26-5.46-3.43-6.93-6.51-1.47-3.08-1.82-6.335-1.05-9.765.77-3.43 3.045-6.265 6.825-8.505 6.16-3.78 12.88-6.615 20.16-8.505 7.28-1.89 14.49-2.835 21.63-2.835 16.52 0 29.155 3.675 37.905 11.025 8.75 7.35 13.125 17.815 13.125 31.395 0 8.96-2.065 17.535-6.195 25.725-4.13 8.19-10.885 17.045-20.265 26.565l-28.56 28.98h48.72c9.1 0 13.65 4.41 13.65 13.23 0 8.96-4.55 13.44-13.65 13.44h-75.39Zm166.95-52.08v-48.93l-33.18 48.93h33.18Z" />
  </svg>
);

function TradingLeaderboard({ isOpen, onClose }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-black/70 z-50 flex justify-end lg:justify-start transition-opacity duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Sidebar Panel */}
      <div
        className={`w-full max-w-md h-full bg-gradient-to-br from-slate-900 to-slate-800 overflow-y-auto
                lg:fixed lg:right-0 lg:w-72 lg:h-full
                transform transition-transform duration-300 ease-in-out
                ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-2 md:p-3 lg:p-2">
          {/* Header */}
          <div className="flex items-center justify-between mb-2 md:mb-3 lg:mb-2">
            <h2 className="text-white text-base md:text-lg lg:text-base font-bold flex items-center gap-1">
              <Trophy className="w-4 h-4 md:w-5 lg:w-4 text-yellow-500" />
              Social Trading
            </h2>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4 md:w-5 lg:w-4" />
            </button>
          </div>

          {/* Warning */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-md p-2 mb-2 md:mb-3 lg:mb-2 max-w-xs mx-auto">
            <p className="text-amber-200 text-xs md:text-sm lg:text-xs text-center">
              This section is only available for real accounts.
            </p>
          </div>

          {/* Mobile Dropdown */}
          <div className="mb-2">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full bg-slate-800/50 hover:bg-slate-800 transition-colors rounded-md p-2 flex items-center justify-between text-white border border-slate-700/50"
            >
              <div className="flex items-center gap-1">
                <RankIcon className="w-3 h-3 lg:w-3" />
                <span className="text-xs md:text-sm lg:text-xs font-medium">Top ranked traders for 24h</span>
              </div>
              <ChevronDown
                className={`w-3 h-3 lg:w-3 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <ul className="mt-1 bg-slate-800/50 rounded-md border border-slate-700/50 overflow-hidden">
                {[
                  { icon: RankIcon, label: "Top ranked traders for 24h" },
                  { icon: Star, label: "Top ranked trades" },
                  { icon: Trophy, label: "Top 100 traders" },
                  { icon: Search, label: "Search" },
                  { icon: Copy, label: "List of copied traders (0)" },
                  { icon: Share2, label: "Traders who copy me" },
                  { icon: Eye, label: "List of watched traders" },
                  { icon: Rss, label: "Traders who watch me" },
                  { icon: Settings, label: "Settings" },
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="p-2 text-white hover:bg-slate-700/50 flex items-center gap-1 border-b border-slate-700/30 last:border-0"
                  >
                    <item.icon className="w-3 h-3 lg:w-3" />
                    <span className="text-xs md:text-sm lg:text-xs">{item.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Traders List */}
          <div className="space-y-1">
            {traders.map((trader, index) => (
              <div
                key={trader.id}
                className="bg-slate-800/30 rounded-md p-2 hover:bg-slate-800/50 transition-colors border border-slate-700/30 hover:border-slate-600/50 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 flex items-center justify-center bg-slate-700/50 rounded-full text-white font-bold text-xs">
                    {index + 1}
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full bg-gradient-to-br ${getBadgeColor(
                      trader.badge
                    )} flex items-center justify-center text-xl border border-slate-600`}
                  >
                    {getCountryFlag(trader.country)}
                  </div>
                  <div className="flex-grow">
                    <p className="text-white font-medium text-xs md:text-sm lg:text-xs truncate">
                      {trader.name}
                    </p>
                    <p className="text-slate-400 text-[10px] md:text-xs lg:text-[10px]">{trader.trades} trades</p>
                  </div>
                  <div className="text-right">
                    <p className="text-emerald-400 font-bold text-xs md:text-sm lg:text-xs">
                      ${trader.profit.toLocaleString()}
                    </p>
                    <p className="text-slate-400 text-[10px] md:text-xs lg:text-[10px]">{trader.winRate}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SocialTrading({ isOpen, onClose }) {
  const [localIsOpen, setLocalIsOpen] = useState(isOpen || false);

  useEffect(() => {
    setLocalIsOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setLocalIsOpen(false);
    if (onClose) onClose();
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 relative">
      {/* Toggle Button for Mobile */}
      {!localIsOpen && (
        <button
          onClick={() => setLocalIsOpen(true)}
          className="fixed bottom-4 right-4 lg:hidden bg-emerald-500 p-3 rounded-full shadow-lg hover:bg-emerald-600 transition-colors z-10"
        >
          <Menu className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex fixed right-4 top-4 bottom-4">
        <ErrorBoundary>
          <TradingLeaderboard isOpen={true} onClose={handleClose} />
        </ErrorBoundary>
      </div>

      {/* Mobile Modal */}
      <ErrorBoundary>
        <TradingLeaderboard isOpen={localIsOpen && window.innerWidth < 1024} onClose={handleClose} />
      </ErrorBoundary>
    </div>
  );
}