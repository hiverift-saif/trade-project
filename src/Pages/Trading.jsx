import React, { useEffect, useState } from 'react';
import TopBar from '../components/TopBar';
import LeftSidebar from '../components/LeftSidebar';
import RightRail from '../components/RightRail';
import Toolbar from '../components/Toolbar';
import PriceChart from '../components/PriceChart';
import TradePanel from '../components/TradePanel';
import TradesTabs from '../components/TradesTabs';
import { randomWalk } from '../utils/randomWalk';
import { formatMoney } from '../utils/formatMoney';
import SignalsWidget from '../components/SignalsWidget';
import { Menu, Gift ,X } from 'lucide-react';

export default function Trading() {
  const [assets, setAssets] = useState([]);
  const [activeAsset, setActiveAsset] = useState(null);
  const [seriesData, setSeriesData] = useState([]);
  const [latestPrice, setLatestPrice] = useState(null);
  const [timeframe, setTimeframe] = useState('M4');
  const [showSignals, setShowSignals] = useState(false);

  const [amount, setAmount] = useState(10);
  const [seconds, setSeconds] = useState(60);
  const [balance, setBalance] = useState(50000);
  const [opened, setOpened] = useState([]);
  const [closed, setClosed] = useState([]);

  const [showTradeMobile, setShowTradeMobile] = useState(true);
  const [showLeftSidebar, setShowLeftSidebar] = useState(false);
  const [showRightRail, setShowRightRail] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);

  useEffect(() => {
    if (showLeftSidebar || showRightRail || showSignals) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showLeftSidebar, showRightRail, showSignals]);

  const getAssets = () => [
    { id: 'EURUSD-OTC', symbol: 'EUR/USD OTC', precision: 5, payout: 0.92 },
    { id: 'BTCUSD', symbol: 'BTC/USD', precision: 2, payout: 0.9 },
    { id: 'AAPL', symbol: 'AAPL', precision: 2, payout: 0.88 },
    { id: 'EURKWD', symbol: 'EUR/KWD', precision: 5, payout: 0.91 },
    { id: 'EURBHD', symbol: 'EUR/BHD', precision: 5, payout: 0.91 },
    { id: 'EUROMR', symbol: 'EUR/OMR', precision: 5, payout: 0.91 },
    { id: 'EURJOD', symbol: 'EUR/JOD', precision: 5, payout: 0.91 },
    { id: 'EURGBP', symbol: 'EUR/GBP', precision: 5, payout: 0.90 },
  ];

  const getInitialSeries = (assetId) => {
    const basePrices = {
      'EURUSD-OTC': 1.167,
      BTCUSD: 123000,
      AAPL: 255,
      EURKWD: 0.357,
      EURBHD: 0.440,
      EUROMR: 0.452,
      EURJOD: 0.830,
      EURGBP: 0.874,
    };
    const base = basePrices[assetId] || 1.167;
    const now = Date.now();
    const data = Array.from({ length: 200 }).map((_, i) => {
      const time = Math.floor((now - (200 - i) * 1000) / 1000);
      return { time, value: randomWalk(base, i) };
    });
    return data;
  };

  useEffect(() => {
    const _assets = getAssets();
    setAssets(_assets);
    setActiveAsset(_assets[0]);
  }, []);

  useEffect(() => {
    if (!activeAsset) return;
    const series = getInitialSeries(activeAsset.id);
    setSeriesData(series);
    setLatestPrice(series[series.length - 1]?.value ?? null);
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
        const still = [];
        const toClose = [];
        for (const t of curr) {
          const remaining = Math.max(0, Math.floor((t.expiresAt - Date.now()) / 1000));
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
              const win = t.side === 'BUY' ? closePrice > t.openPrice : closePrice < t.openPrice;
              const profit = win ? Math.round(t.amount * t.payout * 100) / 100 : -t.amount;
              return { ...t, closed: true, closePrice, profit };
            });
            return [...updates, ...c];
          });
          const pnl = toClose.reduce((acc, t) => {
            const closePrice = latestPrice ?? t.openPrice;
            const win = t.side === 'BUY' ? closePrice > t.openPrice : closePrice < t.openPrice;
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

  if (!activeAsset) return <div className="min-h-screen flex items-center justify-center bg-[#070b14] text-white">Loading…</div>;

  return (
    <div className="min-h-screen overflow-hidden bg-[#070b14] text-white flex flex-col font-sans antialiased relative">
      <TopBar
        balance={balance}
        onTopUp={onTopUp}
        onToggleTradeMobile={() => setShowTradeMobile((s) => !s)}
        onToggleLeftSidebar={() => setShowLeftSidebar((s) => !s)}
        onToggleRightRail={() => setShowRightRail((s) => !s)}
      />

      <div className="flex flex-1 min-h-0 pb-0 md:pb-0 relative">
        <LeftSidebar
          isOpen={showLeftSidebar}
          onClose={() => setShowLeftSidebar(false)}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          setShowLeftSidebar={setShowLeftSidebar}
        />

        <main
          className={`flex-1 min-w-0 min-h-0 flex flex-col w-full transition-all duration-300 ${showLeftSidebar ? 'ml-[20rem]' : ''} ${showRightRail ? '' : 'mr-0'} ${showSignals ? 'mr-[20rem]' : ''} md:${showLeftSidebar ? '' : ''} z-10`}
        >
          <Toolbar
            assets={assets}
            activeAsset={activeAsset}
            setActiveAsset={setActiveAsset}
            timeframe={timeframe}
            setTimeframe={setTimeframe}
            className="sticky top-0 z-20 bg-[#070b14]"
          />

          <div className="flex-1 flex flex-col lg:grid lg:grid-cols-[1fr_20rem] min-h-0 w-full h-full relative z-10">
            <div className="flex flex-col flex-1 min-h-[40vh] sm:min-h[50vh] lg:h-full w-full min-w-0 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 bg-[#0a0e18] border-b border-zinc-800/50 shadow-sm z-20">
                <div className="text-xs text-zinc-400 font-medium">Expiration time</div>
                <div className="flex items-center gap-2 sm:gap-4">
                  <div className="text-xs bg-zinc-800/70 px-2 sm:px-3 py-1 rounded font-medium">{activeAsset.symbol}</div>
                  <div className="text-xs bg-zinc-900/70 px-2 sm:px-3 py-1 rounded font-mono">
                    {latestPrice != null ? latestPrice.toFixed(activeAsset.precision) : '--'}
                  </div>
                </div>
              </div>
              <div className="flex-1 p-0 bg-[#0b0f1a] shadow-inner w-full min-w-0 overflow-hidden">
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

            <div className="flex flex-col min-h-0 bg-[#0b0f1a] md:border-l md:border-zinc-800/50 w-full md:w-[20rem] h-full">
              <TradePanel
                asset={activeAsset}
                amount={amount}
                setAmount={setAmount}
                seconds={seconds}
                setSeconds={setSeconds}
                payout={activeAsset.payout}
                onBuy={() => place('BUY')}
                onSell={() => place('SELL')}
                isOpen={showTradeMobile}
                onClose={() => setShowTradeMobile(false)}
                className="md:sticky md:top-0 z-30 md:max-h-[calc(100vh-3.5rem)] md:overflow-y-auto"
              />
              <div className="px-4 md:block">
                <TradesTabs opened={opened} closed={closed} />
              </div>
            </div>
          </div>
        </main>

        <RightRail
          isOpen={showRightRail}
          onClose={() => setShowRightRail(false)}
          onSignalsClick={() => setShowSignals(true)}
          className={`fixed inset-y-0 right-0 z-50 w-16 md:w-24 bg-[#0a0e18] border-l border-zinc-800/50 transform ${
            showRightRail ? 'translate-x-0' : 'translate-x-full'
          } md:static md:transform-none transition-transform duration-300 ease-in-out`}
        />

        {/* SignalsWidget as Right Sliding Panel */}
        {showSignals && (
          <div className="fixed inset-0 bg-black/50 z-60 flex justify-end">
            <div
              className={`w-80 bg-[#0a0e18] border-l border-zinc-800 shadow-lg transform transition-transform duration-300 ease-in-out ${
                showSignals ? 'translate-x-0' : 'translate-x-full'
              } h-full overflow-y-auto`}
            >
              <div className="flex justify-between items-center p-4 border-b border-zinc-700">
                <h2 className="text-white font-medium">Signals</h2>
                <button onClick={() => setShowSignals(false)} className="text-zinc-400 hover:text-white">
                  <X size={20} />
                </button>
              </div>
              <div className="p-4">
                <SignalsWidget />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}