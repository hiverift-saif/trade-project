import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import TopBar from '../components/TopBar';
import LeftSidebar from '../components/LeftSidebar';
import RightRail from '../components/RightRail';
import Toolbar from '../components/Toolbar';
import PriceChart from '../components/PriceChart';
import TradePanel from '../components/TradePanel';
import TradesTabs from '../components/TradesTabs';
import SignalsWidget from '../components/SignalsWidget';
import SocialTrading from '../components/SocialTradingModal';
import QuickTradingRealAccount from '../assets/Trading/QuickTradingRealAccount';
import QuickTradingDemoAccount from '../assets/Trading/QuickTradingDemoAccount';
import SharesTradingRealAccount from '../assets/Trading/SharesTradingRealAccount';
import SharesTradingDemoAccount from '../assets/Trading/SharesTradingDemoAccount';
import ForexMT4RealAccount from '../assets/Trading/ForexMT4RealAccount';
import ForexMT4DemoAccount from '../assets/Trading/ForexMT4DemoAccount';
import ForexMT5RealAccount from '../assets/Trading/ForexMT5RealAccount';
import ForexMT5DemoAccount from '../assets/Trading/ForexMT5DemoAccount';
import { X } from 'lucide-react'; // For close icon

export default function Trading() {
  const [assets, setAssets] = useState([]);
  const [activeAsset, setActiveAsset] = useState(null);
  const [seriesData, setSeriesData] = useState([]);
  const [latestPrice, setLatestPrice] = useState(null);
  const [timeframe, setTimeframe] = useState('M4');
  const [showSignals, setShowSignals] = useState(false);
  const [showSocialModal, setShowSocialModal] = useState(false);
  const [amount, setAmount] = useState(10);
  const [seconds, setSeconds] = useState(60);
  const [balance, setBalance] = useState(50000);
  const [opened, setOpened] = useState([]);
  const [closed, setClosed] = useState([]);
  const [showTradeMobile, setShowTradeMobile] = useState(true);
  const [showLeftSidebar, setShowLeftSidebar] = useState(false);
  const [showRightRail, setShowRightRail] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (showSignals || showSocialModal || isModalOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, [showSignals, showSocialModal, isModalOpen]);

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

  useEffect(() => {
    const _assets = getAssets();
    setAssets(_assets);
    setActiveAsset(_assets[0]);
  }, []);

  useEffect(() => {
    if (!activeAsset) return;
    const initialData = Array.from({ length: 200 }).map((_, i) => {
      const time = Math.floor((Date.now() - (200 - i) * 1000) / 1000) * 1000;
      const prevClose = i === 0 ? 1.167 : seriesData[i - 1]?.close || 1.167;
      const { open, high, low, close } = generateOHLC(prevClose, i);
      return { time, open, high, low, close };
    });
    setSeriesData(initialData);
    setLatestPrice(initialData[initialData.length - 1]?.close);
  }, [activeAsset]);

  const generateOHLC = (prevClose, index) => {
    const baseVolatility = 0.005;
    const volatility = baseVolatility * (1 + 0.2 * Math.sin(index / 25));
    const trend = index % 50 === 0 ? (Math.random() > 0.5 ? 0.015 : -0.015) : 0;
    const open = prevClose + (Math.random() - 0.5) * volatility * 0.5;
    const close = open + (Math.random() - 0.5) * volatility + trend;
    const high = Math.max(open, close) + Math.random() * volatility * 1.5;
    const low = Math.min(open, close) - Math.random() * volatility * 1.5;
    return { open, high, low, close };
  };

  useEffect(() => {
    if (seriesData.length === 0) return;
    const id = setInterval(() => {
      setLatestPrice((prev) => {
        const prevClose = prev || seriesData[seriesData.length - 1]?.close || 1.167;
        const { open, high, low, close } = generateOHLC(prevClose, seriesData.length);
        setSeriesData((current) => [...current.slice(-199), { time: Date.now(), open, high, low, close }]);
        return close;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [seriesData.length]);

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
              const closePrice = latestPrice ?? t.openPrice ?? seriesData[seriesData.length - 1]?.close ?? 0;
              const win = t.side === 'BUY' ? closePrice > t.openPrice : closePrice < t.openPrice;
              const profit = win ? Math.round(t.amount * t.payout * 100) / 100 : -t.amount;
              return { ...t, closed: true, closePrice, profit };
            });
            return [...updates, ...c];
          });
          const pnl = toClose.reduce((acc, t) => {
            const closePrice = latestPrice ?? t.openPrice ?? seriesData[seriesData.length - 1]?.close ?? 0;
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
      openPrice: latestPrice ?? seriesData[seriesData.length - 1]?.close,
      openTime: now,
      expiresAt: now + seconds * 1000,
      remaining: seconds,
      closed: false,
    };
    setOpened((o) => [trade, ...o]);
  };

  if (!activeAsset) return <div className="min-h-screen flex items-center justify-center bg-[#070b14] text-white">Loading…</div>;

  return (
    <div className="min-h-screen bg-[#070b14] text-white flex flex-col font-sans antialiased relative">
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
          setShowSignals={setShowSignals}
          setShowSocialModal={setShowSocialModal}
        />
        <main className="flex-1 min-w-0 min-h-0 flex flex-col w-full transition-all duration-300 z-10 overflow-y-auto">
          <Routes>
            <Route
              path="quick-real"
              element={
                <div className="flex flex-col min-h-screen">
                  <Toolbar
                    assets={assets}
                    activeAsset={activeAsset}
                    setActiveAsset={setActiveAsset}
                    timeframe={timeframe}
                    setTimeframe={setTimeframe}
                    className="sticky top-0 z-20 bg-[#070b14]"
                  />
                  <QuickTradingRealAccount />
                </div>
              }
            />
            <Route
              path="quick-demo"
              element={
                <div className="flex flex-col min-h-screen">
                  <Toolbar
                    assets={assets}
                    activeAsset={activeAsset}
                    setActiveAsset={setActiveAsset}
                    timeframe={timeframe}
                    setTimeframe={setTimeframe}
                    className="sticky top-0 z-20 bg-[#070b14]"
                  />
                  <QuickTradingDemoAccount
                    assets={assets}
                    activeAsset={activeAsset}
                    setActiveAsset={setActiveAsset}
                    seriesData={seriesData}
                    latestPrice={latestPrice}
                    timeframe={timeframe}
                    balance={balance}
                    amount={amount}
                    setAmount={setAmount}
                    seconds={seconds}
                    setSeconds={setSeconds}
                    place={place}
                  />
                </div>
              }
            />
            <Route
              path="shares-real"
              element={
                <div className="flex flex-col min-h-screen">
                  <Toolbar
                    assets={assets}
                    activeAsset={activeAsset}
                    setActiveAsset={setActiveAsset}
                    timeframe={timeframe}
                    setTimeframe={setTimeframe}
                    className="sticky top-0 z-20 bg-[#070b14]"
                  />
                  <SharesTradingRealAccount
                    assets={assets}
                    activeAsset={activeAsset}
                    setActiveAsset={setActiveAsset}
                    seriesData={seriesData}
                    latestPrice={latestPrice}
                    timeframe={timeframe}
                    balance={balance}
                    amount={amount}
                    setAmount={setAmount}
                    seconds={seconds}
                    setSeconds={setSeconds}
                    place={place}
                  />
                </div>
              }
            />
            <Route
              path="shares-demo"
              element={
                <div className="flex flex-col min-h-screen">
                  <Toolbar
                    assets={assets}
                    activeAsset={activeAsset}
                    setActiveAsset={setActiveAsset}
                    timeframe={timeframe}
                    setTimeframe={setTimeframe}
                    className="sticky top-0 z-20 bg-[#070b14]"
                  />
                  <SharesTradingDemoAccount
                    assets={assets}
                    activeAsset={activeAsset}
                    setActiveAsset={setActiveAsset}
                    seriesData={seriesData}
                    latestPrice={latestPrice}
                    timeframe={timeframe}
                    balance={balance}
                    amount={amount}
                    setAmount={setAmount}
                    seconds={seconds}
                    setSeconds={setSeconds}
                    place={place}
                  />
                </div>
              }
            />
            <Route
              path="forex-mt4-real"
              element={
                <div className="flex flex-col min-h-screen">
                  <Toolbar
                    assets={assets}
                    activeAsset={activeAsset}
                    setActiveAsset={setActiveAsset}
                    timeframe={timeframe}
                    setTimeframe={setTimeframe}
                    className="sticky top-0 z-20 bg-[#070b14]"
                  />
                  <ForexMT4RealAccount
                    assets={assets}
                    activeAsset={activeAsset}
                    setActiveAsset={setActiveAsset}
                    seriesData={seriesData}
                    latestPrice={latestPrice}
                    timeframe={timeframe}
                    balance={balance}
                    amount={amount}
                    setAmount={setAmount}
                    seconds={seconds}
                    setSeconds={setSeconds}
                    place={place}
                  />
                </div>
              }
            />
            <Route
              path="forex-mt4-demo"
              element={
                <div className="flex flex-col min-h-screen">
                  <Toolbar
                    assets={assets}
                    activeAsset={activeAsset}
                    setActiveAsset={setActiveAsset}
                    timeframe={timeframe}
                    setTimeframe={setTimeframe}
                    className="sticky top-0 z-20 bg-[#070b14]"
                  />
                  <ForexMT4DemoAccount
                    assets={assets}
                    activeAsset={activeAsset}
                    setActiveAsset={setActiveAsset}
                    seriesData={seriesData}
                    latestPrice={latestPrice}
                    timeframe={timeframe}
                    balance={balance}
                    amount={amount}
                    setAmount={setAmount}
                    seconds={seconds}
                    setSeconds={setSeconds}
                    place={place}
                  />
                </div>
              }
            />
            <Route
              path="forex-mt5-real"
              element={
                <div className="flex flex-col min-h-screen">
                  <Toolbar
                    assets={assets}
                    activeAsset={activeAsset}
                    setActiveAsset={setActiveAsset}
                    timeframe={timeframe}
                    setTimeframe={setTimeframe}
                    className="sticky top-0 z-20 bg-[#070b14]"
                  />
                  <ForexMT5RealAccount
                    assets={assets}
                    activeAsset={activeAsset}
                    setActiveAsset={setActiveAsset}
                    seriesData={seriesData}
                    latestPrice={latestPrice}
                    timeframe={timeframe}
                    balance={balance}
                    amount={amount}
                    setAmount={setAmount}
                    seconds={seconds}
                    setSeconds={setSeconds}
                    place={place}
                  />
                </div>
              }
            />
            <Route
              path="forex-mt5-demo"
              element={
                <div className="flex flex-col min-h-screen">
                  <Toolbar
                    assets={assets}
                    activeAsset={activeAsset}
                    setActiveAsset={setActiveAsset}
                    timeframe={timeframe}
                    setTimeframe={setTimeframe}
                    className="sticky top-0 z-20 bg-[#070b14]"
                  />
                  <ForexMT5DemoAccount
                    assets={assets}
                    activeAsset={activeAsset}
                    setActiveAsset={setActiveAsset}
                    seriesData={seriesData}
                    latestPrice={latestPrice}
                    timeframe={timeframe}
                    balance={balance}
                    amount={amount}
                    setAmount={setAmount}
                    seconds={seconds}
                    setSeconds={setSeconds}
                    place={place}
                  />
                </div>
              }
            />
            <Route
              path="/"
              element={
                <div className="flex flex-col min-h-screen">
                  <Toolbar
                    assets={assets}
                    activeAsset={activeAsset}
                    setActiveAsset={setActiveAsset}
                    timeframe={timeframe}
                    setTimeframe={setTimeframe}
                    className="sticky top-0 z-20 bg-[#070b14]"
                  />
                  <div className="flex-1 flex flex-col lg:grid lg:grid-cols-[1fr_20rem] min-h-0 w-full h-full relative z-10">
                    <div className="flex flex-col flex-1 min-h-[50vh] sm:min-h-[60vh] lg:h-full w-full min-w-0 overflow-visible relative">
                      <div className="flex items-center justify-between px-4 py-2 bg-[#0a0e18] border-b border-zinc-800/50 shadow-sm z-20">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-zinc-400 font-medium">Expiration time</span>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-4">
                          <div className="text-xs bg-zinc-800/70 px-2 sm:px-3 py-1 rounded font-medium">{activeAsset.symbol}</div>
                          <div className="text-xs bg-zinc-900/70 px-2 sm:px-3 py-1 rounded font-mono">
                            {latestPrice != null ? latestPrice.toFixed(activeAsset.precision) : '--'}
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 p-0 bg-[#0b0f1a] shadow-inner w-full min-w-0 overflow-auto relative" style={{ minHeight: '500px' }}>
                        <PriceChart
                          data={seriesData}
                          precision={activeAsset.precision}
                          isModalOpen={isModalOpen}
                          setIsModalOpen={setIsModalOpen}
                        />
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
                    <div className="flex flex-col md:h-screen h-[400px] bg-[#0b0f1a] md:border-l md:border-zinc-800/50 w-full md:w-[20rem]">
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
                      <div className="flex-1 overflow-y-auto px-4 md:block">
                        <TradesTabs opened={opened} closed={closed} />
                      </div>
                    </div>
                  </div>
                </div>
              }
            />
            <Route path="*" element={<div className="p-4 text-white">404 - Page Not Found</div>} />
          </Routes>
        </main>
        <RightRail
          isOpen={showRightRail}
          onClose={() => setShowRightRail(false)}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          setShowRightRail={setShowRightRail}
          setShowSignals={setShowSignals}
          setShowSocialModal={setShowSocialModal}
        />
        {showSignals && (
          <div className="fixed inset-0 bg-black/50 z-60 flex justify-end">
            <div
              className={`w-80 bg-[#0a0e18] border-l border-zinc-800 shadow-lg transform transition-transform duration-300 ease-in-out mt-[70px] ${
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
        {showSocialModal && (
          <div className="fixed inset-0 bg-black/50 z-60 flex justify-end">
            <div
              className={`w-80 bg-[#0a0e18] border-l border-zinc-800 shadow-lg transform transition-transform duration-300 ease-in-out mt-[70px] ${
                showSocialModal ? 'translate-x-0' : 'translate-x-full'
              } h-full overflow-y-auto`}
            >
              <SocialTrading isOpen={showSocialModal} onClose={() => setShowSocialModal(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}