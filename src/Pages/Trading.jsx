'use client';
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

import {
  Coins,
  User,
  Briefcase,
  Trophy,
  MessageSquare,
  HelpCircle,
  BarChart2,
  ChevronDown,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Bell,
  Swords,
  Zap,
  Gift,
  Rocket,
  ToggleRight,
  Menu,
  X,
} from "lucide-react";

const api = {
  async getAssets() {
    return [
      { id: "EURUSD-OTC", symbol: "EUR/USD OTC", precision: 5, payout: 0.92 },
      { id: "BTCUSD", symbol: "BTC/USD", precision: 2, payout: 0.9 },
      { id: "AAPL", symbol: "AAPL", precision: 2, payout: 0.88 },
    ];
  },
  async getInitialSeries(assetId) {
    const base = assetId === "EURUSD-OTC" ? 1.156 : assetId === "BTCUSD" ? 68000 : 175;
    const now = Date.now();
    const data = Array.from({ length: 200 }).map((_, i) => {
      const time = Math.floor((now - (200 - i) * 1000) / 1000);
      return { time, value: randomWalk(base, i) };
    });
    return data;
  },
};

function randomWalk(base, i) {
  const noise = Math.sin(i / 9) * 0.0007 + Math.cos(i / 5) * 0.0003;
  const drift = (Math.random() - 0.5) * (base > 1000 ? 40 : base > 10 ? 0.02 : 0.0012);
  const v = base + noise + drift;
  return Number(v.toFixed(base > 1000 ? 0 : base > 10 ? 2 : 5));
}

const formatMoney = (n) => new Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(n);

const IconTab = ({ icon: Icon, label, active, small, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center gap-1.5 p-2 rounded-lg transition-all duration-200 ${
      small ? 'text-[10px]' : 'text-[11px]'
    } ${
      active
        ? 'text-white bg-zinc-800/50 border border-zinc-700'
        : 'text-zinc-400 hover:text-white hover:bg-zinc-800/30'
    } ${small ? 'w-12' : 'w-16'}`}
  >
    <Icon
      size={small ? 16 : 18}
      className={`transition-transform duration-200 ${active ? 'scale-110' : 'hover:scale-110'}`}
    />
    <span className={`truncate ${small ? 'w-12' : 'w-16'} font-medium text-center`}>{label}</span>
  </button>
);

const Stat = ({ label, value, accent }) => (
  <div className="flex items-center justify-between text-sm py-1">
    <span className="text-zinc-400">{label}</span>
    <span className={accent ? accent : "text-zinc-200"}>{value}</span>
  </div>
);

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

function PriceChart({ data, precision }) {
  const series = React.useMemo(
    () => [
      {
        name: "Price",
        data: data.map((p) => [p.time * 1000, p.value]),
      },
    ],
    [data]
  );

  const options = {
    chart: {
      type: 'area',
      height: '100%',
      background: '#0b0f1a',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000,
        },
      },
      toolbar: { show: false },
      zoom: { enabled: true },
    },
    theme: { mode: 'dark' },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 2 },
    grid: {
      borderColor: '#161a27',
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } },
    },
    xaxis: {
      type: 'datetime',
      labels: { datetimeUTC: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      opposite: true,
      labels: { formatter: (val) => val.toFixed(precision) },
      axisBorder: { show: false },
    },
    tooltip: { x: { format: 'dd MMM yyyy HH:mm:ss' } },
    fill: {
      type: 'gradient',
      gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.1, stops: [0, 100] },
    },
  };

  return (
    <div className="flex-1 h-full w-[200vw] sm:w-[150vw] md:w-full overflow-x-auto md:overflow-x-hidden">
      <Chart options={options} series={series} type="area" height="100%" width="100%" />
    </div>
  );
}

function LeftSidebar({ isOpen, onClose }) {
  const items = [
    { icon: BarChart2, label: "Trading", active: true },
    { icon: Coins, label: "Finance" },
    { icon: User, label: "Profile" },
    { icon: Briefcase, label: "Market" },
    { icon: Trophy, label: "Achievements" },
    { icon: MessageSquare, label: "Chat" },
    { icon: HelpCircle, label: "Help" },
  ];
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed top-14 left-0 h-[calc(100vh-3.5rem)] w-64 md:w-20 md:static bg-[#0a0e18] border-r border-zinc-800/50 flex flex-col items-center py-4 gap-2 z-50 shadow-lg transition-transform duration-300 md:transform-none md:flex hidden md:flex`}
      >
        <div className="flex items-center justify-between px-4 mb-4 md:hidden">
          <div className="text-white font-bold text-lg">Menu</div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            <X size={20} />
          </button>
        </div>
        <div className="flex flex-col items-center gap-2 w-full">
          {items.map((it, i) => (
            <IconTab key={i} icon={it.icon} label={it.label} active={it.active} onClick={() => {}} />
          ))}
        </div>
        <div className="mt-auto w-full flex flex-col items-center gap-3 py-3">
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 text-xs w-16 justify-center transition-all duration-200 md:w-full md:justify-start md:px-4">
            <Gift size={16} />
            <span className="md:inline hidden">Bonus</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 text-xs w-16 justify-center transition-all duration-200 md:w-full md:justify-start md:px-4">
            <Rocket size={16} />
            <span className="md:inline hidden">Upgrade</span>
          </button>
        </div>
      </aside>
    </>
  );
}

function RightRail({ isOpen, onClose }) {
  const items = [
    { icon: Bell, label: "Signals" },
    { icon: Swords, label: "Social" },
    { icon: Zap, label: "Express" },
    { icon: Trophy, label: "Tournaments" },
    { icon: ToggleRight, label: "Hotkeys" },
  ];
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed top-14 right-0 h-[calc(100vh-3.5rem)] w-64 md:w-24 md:static bg-[#0a0e18] border-l border-zinc-800/50 flex flex-col items-center py-4 gap-2 z-50 shadow-lg transition-transform duration-300 md:transform-none md:flex hidden md:flex`}
      >
        <div className="flex items-center justify-between px-4 mb-4 md:hidden">
          <div className="text-white font-bold text-lg">Tools</div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            <X size={20} />
          </button>
        </div>
        <div className="flex flex-col items-center gap-2 w-full">
          {items.map((it, i) => (
            <IconTab key={i} icon={it.icon} label={it.label} onClick={() => {}} />
          ))}
        </div>
        <div className="mt-auto text-zinc-400 text-[11px] font-medium">Full screen</div>
      </aside>
    </>
  );
}

function MobileBottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0a0e18] border-t border-zinc-800/50 flex justify-around items-center h-[60px] z-40 shadow-lg">
      <IconTab icon={BarChart2} label="Trade" small onClick={() => {}} />
      <IconTab icon={Coins} label="Finance" small onClick={() => {}} />
      <IconTab icon={User} label="Profile" small onClick={() => {}} />
      <IconTab icon={MessageSquare} label="Chat" small onClick={() => {}} />
      <IconTab icon={Bell} label="Alerts" small onClick={() => {}} />
    </nav>
  );
}

function TopBar({ balance, onTopUp, onToggleTradeMobile, onToggleLeftSidebar, onToggleRightRail }) {
  return (
    <header className="h-14 bg-[#0a0e18] border-b border-zinc-800/50 flex items-center justify-between px-4 shadow-md z-50">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleLeftSidebar}
          className="md:hidden text-zinc-400 hover:text-white transition-all duration-200"
        >
          <Menu size={20} />
        </button>
        <div className="text-white font-bold tracking-wide text-lg">TradeX</div>
        <span className="text-zinc-500 text-sm">Demo</span>
      </div>
      <div className="flex items-center gap-3">
        <button className="px-3 py-1 rounded-lg bg-sky-600/20 text-sky-300 text-sm hover:bg-sky-600/30 flex items-center gap-2 transition-all duration-200">
          <Gift size={16} />
          <span className="hidden sm:inline">Get 50% Bonus</span>
        </button>
        <div className="px-3 py-1 rounded-lg bg-zinc-800 text-zinc-200 text-sm font-medium">
          ${formatMoney(balance)} <span className="text-zinc-400 ml-1">USD</span>
        </div>
        <button
          onClick={onTopUp}
          className="px-3 py-1 rounded-lg bg-emerald-600 text-white text-sm hover:bg-emerald-500 transition-all duration-200 font-medium"
        >
          TOP UP
        </button>
        <button
          onClick={onToggleTradeMobile}
          className="md:hidden px-2 py-1 rounded bg-zinc-800 text-zinc-200 hover:bg-zinc-700 transition-all duration-200"
        >
          Trade
        </button>
        <button
          onClick={onToggleRightRail}
          className="md:hidden px-2 py-1 rounded bg-zinc-800 text-zinc-200 hover:bg-zinc-700 transition-all duration-200"
        >
          <Menu size={20} />
        </button>
      </div>
    </header>
  );
}

function Toolbar({ assets, activeAsset, setActiveAsset, timeframe, setTimeframe }) {
  return (
    <div className="flex items-center gap-4 px-4 py-2 border-b border-zinc-800/50 bg-[#0b0f1a] flex-wrap shadow-sm">
      <div className="flex items-center gap-2">
        <label className="text-xs text-zinc-400 font-medium">Asset</label>
        <div className="relative">
          <button className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-sm px-3 py-1 rounded transition-all duration-200">
            {activeAsset.symbol}
            <ChevronDown size={16} />
          </button>
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

function TradesTabs({ opened, closed }) {
  const [tab, setTab] = useState("Opened");
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between px-3">
        <div className="text-zinc-300 font-medium text-base">Trades</div>
        <div className="flex text-sm">
          {[
            { k: "Opened", c: opened.length },
            { k: "Closed", c: closed.length },
          ].map((t) => (
            <button
              key={t.k}
              onClick={() => setTab(t.k)}
              className={`px-4 py-2 border-b-2 font-medium ${
                tab === t.k ? "border-sky-500 text-white" : "border-transparent text-zinc-400 hover:text-zinc-200"
              } transition-all duration-200`}
            >
              {t.k}
            </button>
          ))}
        </div>
      </div>
      <div className="h-44 sm:h-52 md:h-full overflow-auto p-3 space-y-2">
        {(tab === "Opened" ? opened : closed).length === 0 ? (
          <div className="text-zinc-500 text-sm font-medium">No {tab.toLowerCase()} trades</div>
        ) : (
          <ul className="space-y-3">
            {(tab === "Opened" ? opened : closed).map((t) => (
              <li
                key={t.id}
                className="bg-zinc-900/60 border border-zinc-800/50 rounded-lg p-3 flex items-center justify-between shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <Pill variant={t.side === "BUY" ? "green" : "red"}>{t.side}</Pill>
                  <div>
                    <div className="text-zinc-200 text-sm font-medium">{t.asset.symbol}</div>
                    <div className="text-xs text-zinc-500">
                      Amt ${formatMoney(t.amount)} • Payout {Math.round(t.payout * 100)}%
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  {t.closed ? (
                    <div className={`${t.profit >= 0 ? "text-emerald-400" : "text-red-400"} font-medium`}>
                      {t.profit >= 0 ? "+" : ""}${formatMoney(t.profit)}
                    </div>
                  ) : (
                    <div className="text-zinc-400 text-sm font-medium">{t.remaining}s</div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function TradePanel({ asset, amount, setAmount, seconds, setSeconds, payout, onBuy, onSell, isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={onClose} />
      )}
      <div
        className={`fixed bottom-0 left-0 right-0 md:static md:w-80 bg-[#0b0f1a] border-t md:border-t-0 md:border-l border-zinc-800/50 p-4 flex flex-col shadow-lg rounded-t-lg md:rounded-none z-50 transition-transform duration-300 md:transition-none md:transform-none ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="flex items-center justify-between mb-3 md:hidden">
          <div className="text-zinc-300 font-medium text-base">Trade Panel</div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            <X size={20} />
          </button>
        </div>
        <div className="text-sm text-zinc-400 font-medium mb-1">Time</div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSeconds(Math.max(5, seconds - 5))}
            className="px-3 py-2 rounded bg-zinc-800 text-zinc-200 hover:bg-zinc-700 transition-all duration-200 font-medium"
          >
            -
          </button>
          <div className="flex-1 px-4 py-2 rounded bg-zinc-900 border border-zinc-700 text-zinc-100 text-center tracking-widest font-mono">
            {new Date(seconds * 1000).toISOString().substring(14, 19)}
          </div>
          <button
            onClick={() => setSeconds(seconds + 5)}
            className="px-3 py-2 rounded bg-zinc-800 text-zinc-200 hover:bg-zinc-700 transition-all duration-200 font-medium"
          >
            +
          </button>
        </div>

        <div className="text-sm text-zinc-400 font-medium mt-4 mb-1">Amount</div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 flex-1 px-4 py-2 rounded bg-zinc-900 border border-zinc-700 text-zinc-100">
            <DollarSign size={16} className="text-zinc-500" />
            <input
              className="bg-transparent w-full outline-none font-mono"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value || 0))}
              type="number"
              min={1}
            />
          </div>
          <button
            onClick={() => setAmount(10)}
            className="text-xs px-3 py-2 rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-all duration-200 font-medium"
          >
            $10
          </button>
          <button
            onClick={() => setAmount(50)}
            className="text-xs px-3 py-2 rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-all duration-200 font-medium"
          >
            $50
          </button>
        </div>

        <div className="mt-4">
          <Stat label="Payout" value={`${Math.round(payout * 100)}%`} accent="text-emerald-400 font-medium" />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            onClick={onBuy}
            className="h-12 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center justify-center gap-2 transition-all duration-200 shadow-md"
          >
            <TrendingUp size={18} /> BUY
          </button>
          <button
            onClick={onSell}
            className="h-12 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold flex items-center justify-center gap-2 transition-all duration-200 shadow-md"
          >
            <TrendingDown size={18} /> SELL
          </button>
        </div>
      </div>
    </>
  );
}

export default function Trading() {
  const [assets, setAssets] = useState([]);
  const [activeAsset, setActiveAsset] = useState(null);
  const [seriesData, setSeriesData] = useState([]);
  const [latestPrice, setLatestPrice] = useState(null);
  const [timeframe, setTimeframe] = useState("M4");

  const [amount, setAmount] = useState(10);
  const [seconds, setSeconds] = useState(60);
  const [balance, setBalance] = useState(50000);
  const [opened, setOpened] = useState([]);
  const [closed, setClosed] = useState([]);

  const [showTradeMobile, setShowTradeMobile] = useState(true);
  const [showLeftSidebar, setShowLeftSidebar] = useState(false);
  const [showRightRail, setShowRightRail] = useState(false);

  useEffect(() => {
    (async () => {
      const _assets = await api.getAssets();
      setAssets(_assets);
      setActiveAsset(_assets[0]);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!activeAsset) return;
      const series = await api.getInitialSeries(activeAsset.id);
      setSeriesData(series);
      setLatestPrice(series[series.length - 1]?.value ?? null);
    })();
  }, [activeAsset]);

  useEffect(() => {
    if (seriesData.length === 0) return;

    const id = setInterval(() => {
      setLatestPrice((p) => {
        const base = p ?? 1.156;
        const i = Date.now();
        return randomWalk(base, i);
      });
    }, 1000);
    return () => clearInterval(id);
  }, [seriesData.length]);

  useEffect(() => {
    if (latestPrice === null) return;
    const time = Math.floor(Date.now() / 1000);
    setSeriesData((currentData) => [...currentData.slice(-399), { time, value: latestPrice }]);
  }, [latestPrice]);

  useEffect(() => {
    const id = setInterval(() => {
      setOpened((curr) => {
        const now = Date.now();
        const still = [];
        const toClose = [];
        for (const t of curr) {
          const remaining = Math.max(0, Math.floor((t.expiresAt - now) / 1000));
          if (remaining <= 0) {
            toClose.push(t);
          } else {
            still.push({ ...t, remaining });
          }
        }
        if (toClose.length) {
          setClosed((c) => {
            const updates = toClose.map((t) => {
              const closePrice = latestPrice ?? t.openPrice;
              const win = t.side === "BUY" ? closePrice > t.openPrice : closePrice < t.openPrice;
              const profit = win ? Math.round(t.amount * t.payout * 100) / 100 : -t.amount;
              return { ...t, closed: true, closePrice, profit };
            });
            return [...updates, ...c];
          });
          const pnl = toClose.reduce((acc, t) => {
            const closePrice = latestPrice ?? t.openPrice;
            const win = t.side === "BUY" ? closePrice > t.openPrice : closePrice < t.openPrice;
            const profit = win ? Math.round(t.amount * t.payout * 100) / 100 : -t.amount;
            return acc + profit;
          }, 0);
          setBalance((b) => Math.round((b + pnl) * 100) / 100);
        }
        return still;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [latestPrice]);

  const onTopUp = () => setBalance((b) => b + 1000);

  const place = (side) => {
    if (!activeAsset || amount <= 0) return;
    const now = Date.now();
    const trade = {
      id: Math.random().toString(36).slice(2),
      side,
      asset: activeAsset,
      amount: Math.round(amount * 100) / 100,
      payout: activeAsset.payout,
      openPrice: latestPrice ?? seriesData[seriesData.length - 1]?.value,
      openTime: now,
      expiresAt: now + seconds * 1000,
      remaining: seconds,
      closed: false,
    };
    setOpened((o) => [trade, ...o]);
  };

  if (!activeAsset) return <div className="h-screen flex items-center justify-center bg-[#070b14] text-white">Loading…</div>;

  return (
    <div className="h-screen overflow-hidden bg-[#070b14] text-white flex flex-col font-sans antialiased">
      <TopBar
        balance={balance}
        onTopUp={onTopUp}
        onToggleTradeMobile={() => setShowTradeMobile((s) => !s)}
        onToggleLeftSidebar={() => setShowLeftSidebar((s) => !s)}
        onToggleRightRail={() => setShowRightRail((s) => !s)}
      />

      <div className="flex flex-1 min-h-0 pb-[60px] md:pb-0">
        <LeftSidebar isOpen={showLeftSidebar} onClose={() => setShowLeftSidebar(false)} />

        <main className="flex-1 min-w-0 min-h-0 flex flex-col">
          <Toolbar
            assets={assets}
            activeAsset={activeAsset}
            setActiveAsset={setActiveAsset}
            timeframe={timeframe}
            setTimeframe={setTimeframe}
          />

          <div className="flex-1 flex flex-col md:grid md:grid-cols-[1fr_20rem] min-h-0">
            <div className="flex flex-col flex-1 min-h-[50vh] sm:min-h-[60vh] md:h-full">
              <div className="flex items-center justify-between px-4 py-2 bg-[#0a0e18] border-b border-zinc-800/50 shadow-sm">
                <div className="text-xs text-zinc-400 font-medium">Expiration time</div>
                <div className="flex items-center gap-4">
                  <div className="text-xs bg-zinc-800/70 px-3 py-1 rounded font-medium">{activeAsset.symbol}</div>
                  <div className="text-xs bg-zinc-900/70 px-3 py-1 rounded font-mono">
                    {latestPrice != null ? latestPrice.toFixed(activeAsset.precision) : "--"}
                  </div>
                </div>
              </div>
              <div className="flex-1 p-4 bg-[#0b0f1a] shadow-inner">
                <PriceChart data={seriesData} precision={activeAsset.precision} />
              </div>
              <div className="md:hidden p-4 bg-[#0b0f1a] border-t border-zinc-800/50">
                <div className="flex items-center justify-between gap-3 p-2 bg-zinc-800/50 rounded-lg shadow-sm">
                  <div className="text-sm text-zinc-400 font-medium">Quick Actions</div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setAmount(10)}
                      className="text-xs px-3 py-2 rounded bg-zinc-700 text-zinc-300 hover:bg-zinc-600 transition-all duration-200 font-medium"
                    >
                      $10
                    </button>
                    <button
                      onClick={() => setAmount(50)}
                      className="text-xs px-3 py-2 rounded bg-zinc-700 text-zinc-300 hover:bg-zinc-600 transition-all duration-200 font-medium"
                    >
                      $50
                    </button>
                    <button
                      onClick={() => setShowTradeMobile((s) => !s)}
                      className="text-xs px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-500 transition-all duration-200 font-medium"
                    >
                      {showTradeMobile ? 'Hide Panel' : 'Trade'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col min-h-0 bg-[#0b0f1a] md:border-l md:border-zinc-800/50">
              <TradePanel
                asset={activeAsset}
                amount={amount}
                setAmount={setAmount}
                seconds={seconds}
                setSeconds={setSeconds}
                payout={activeAsset.payout}
                onBuy={() => place("BUY")}
                onSell={() => place("SELL")}
                isOpen={showTradeMobile}
                onClose={() => setShowTradeMobile(false)}
              />
              <div className="px-4 md:block">
                <TradesTabs opened={opened} closed={closed} />
              </div>
            </div>
          </div>
        </main>

        <RightRail isOpen={showRightRail} onClose={() => setShowRightRail(false)} />
      </div>

      <MobileBottomNav />
    </div>
  );
}